import React, { createContext, useContext, useMemo, useState } from 'react'

export type Product = {
  id: number
  title: string
  price: number
  image: string
}

type CartItem = Product & { qty: number }

type CartCtx = {
  items: CartItem[]
  totalQty: number
  totalPrice: number
  add: (p: Product) => void
  removeOne: (id: number) => void
  clear: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = (p: Product) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === p.id)
      if (found)
        return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x))
      return [...prev, { ...p, qty: 1 }]
    })
  }

  const removeOne = (id: number) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === id)
      if (!found) return prev
      if (found.qty === 1) return prev.filter((x) => x.id !== id)
      return prev.map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
    })
  }

  const clear = () => setItems([])

  const { totalQty, totalPrice } = useMemo(() => {
    const q = items.reduce((a, x) => a + x.qty, 0)
    const p = items.reduce((a, x) => a + x.qty * x.price, 0)
    return { totalQty: q, totalPrice: p }
  }, [items])

  const value = useMemo(
    () => ({ items, totalQty, totalPrice, add, removeOne, clear }),
    [items, totalQty, totalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
