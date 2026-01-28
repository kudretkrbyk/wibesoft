import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { CartProvider } from '../lib/cart'

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a0a' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* template’ten gelen modal varsa görünmesin diye header kapatıyoruz */}
        <Stack.Screen
          name="modal"
          options={{ headerShown: false, presentation: 'modal' }}
        />
      </Stack>
    </CartProvider>
  )
}
