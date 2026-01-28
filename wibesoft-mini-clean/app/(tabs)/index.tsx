import React, { useEffect, useState } from 'react'
import { useCart } from '../../lib/cart'
import type { Product } from '../../lib/cart'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native'

export default function HomeScreen() {
  const { add, totalQty } = useCart()
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  async function load() {
    try {
      setErr(null)
      setLoading(true)
      const res = await fetch('https://fakestoreapi.com/products')
      if (!res.ok) throw new Error('Ürünler alınamadı.')
      const json = (await res.json()) as Product[]
      setData(json)
    } catch (e: any) {
      setErr(e?.message ?? 'Hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <View style={{ padding: 16, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ color: '#a1a1aa', marginTop: 4 }}>
              API + FlatList + state • Sepet: {totalQty}
            </Text>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>
              Mini Marketplace
            </Text>
            <Text style={{ color: '#a1a1aa', marginTop: 4 }}>
              API + FlatList + state
            </Text>
          </View>

          <Pressable
            onPress={load}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: '#18181b',
              borderRadius: 12,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Refresh</Text>
          </Pressable>
        </View>

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

        {!loading && !err && (
          <FlatList
            style={{ marginTop: 12, flex: 1 }}
            contentContainerStyle={{ paddingBottom: 24 }}
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  backgroundColor: '#18181b',
                  padding: 12,
                  borderRadius: 14,
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: '#27272a',
                  }}
                  resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: 'white', fontWeight: '600' }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ color: '#d4d4d8', marginTop: 6 }}>
                    {item.price} ₺
                  </Text>
                  <Pressable
                    onPress={() => add(item)}
                    style={{
                      marginTop: 8,
                      alignSelf: 'flex-start',
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      backgroundColor: '#27272a',
                      borderRadius: 12,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: '600' }}>
                      Add to cart
                    </Text>
                  </Pressable>
                  <Text
                    style={{ color: '#71717a', marginTop: 4, fontSize: 12 }}
                  >
                    (Sepet ekleme: bir sonraki adım)
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}
