import React, { useEffect, useMemo, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import { useCart, type Product } from '../../lib/cart'

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const productId = useMemo(() => Number(id), [id])

  const { add } = useCart()
  const [p, setP] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        setErr(null)
        setLoading(true)
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`,
        )
        if (!res.ok) throw new Error('Ürün detayı alınamadı.')
        const json = (await res.json()) as Product
        if (alive) setP(json)
      } catch (e: any) {
        if (alive) setErr(e?.message ?? 'Hata oluştu.')
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [productId])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <View style={{ padding: 16, flex: 1 }}>
        <Pressable
          onPress={() => router.back()}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: '#18181b',
            borderRadius: 12,
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>← Back</Text>
        </Pressable>

        {loading && (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator />
            <Text style={{ color: '#a1a1aa', marginTop: 8 }}>Yükleniyor…</Text>
          </View>
        )}

        {!loading && err && (
          <View
            style={{
              marginTop: 16,
              backgroundColor: '#18181b',
              padding: 12,
              borderRadius: 14,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '700' }}>Hata</Text>
            <Text style={{ color: '#d4d4d8', marginTop: 6 }}>{err}</Text>
          </View>
        )}

        {!loading && !err && p && (
          <View style={{ marginTop: 14 }}>
            <Image
              source={{ uri: p.image }}
              style={{
                width: '100%',
                height: 240,
                borderRadius: 18,
                backgroundColor: '#18181b',
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '700',
                marginTop: 14,
              }}
            >
              {p.title}
            </Text>
            <Text style={{ color: '#d4d4d8', marginTop: 8, fontSize: 16 }}>
              {p.price} ₺
            </Text>

            <Pressable
              onPress={() => add(p)}
              style={({ pressed }) => ({
                marginTop: 14,
                paddingVertical: 12,
                paddingHorizontal: 14,
                backgroundColor: '#27272a',
                borderRadius: 14,
                opacity: pressed ? 0.7 : 1,
                alignItems: 'center',
              })}
            >
              <Text style={{ color: 'white', fontWeight: '700' }}>
                Add to cart
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
