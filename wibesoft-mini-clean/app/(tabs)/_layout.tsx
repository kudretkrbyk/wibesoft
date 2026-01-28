import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: '#0a0a0a', borderTopColor: '#111' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#a1a1aa',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />

      {/* template'ten geldiyse gizle */}
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  )
}
