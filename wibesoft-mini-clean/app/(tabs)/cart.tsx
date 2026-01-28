import React from 'react'
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native'
import { useCart } from '../../lib/cart'

export default function CartScreen() {
  const { items, totalPrice, totalQty, removeOne, clear } = useCart()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>
          Cart
        </Text>
        <Text style={{ color: '#a1a1aa', marginTop: 4 }}>
          {totalQty} ürün • Toplam: {totalPrice.toFixed(2)} ₺
        </Text>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
          <Pressable
            onPress={clear}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              backgroundColor: '#18181b',
              borderRadius: 12,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Clear</Text>
          </Pressable>
        </View>

        <FlatList
          style={{ marginTop: 12 }}
          data={items}
          keyExtractor={(x) => String(x.id)}
          ListEmptyComponent={
            <Text style={{ color: '#a1a1aa', marginTop: 16 }}>Sepet boş.</Text>
          }
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#18181b',
                padding: 12,
                borderRadius: 14,
                marginBottom: 10,
              }}
            >
              <Text
                style={{ color: 'white', fontWeight: '600' }}
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text style={{ color: '#d4d4d8', marginTop: 6 }}>
                {item.qty} x {item.price} ₺
              </Text>

              <Pressable
                onPress={() => removeOne(item.id)}
                style={{
                  marginTop: 10,
                  alignSelf: 'flex-start',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: '#27272a',
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  Remove 1
                </Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
