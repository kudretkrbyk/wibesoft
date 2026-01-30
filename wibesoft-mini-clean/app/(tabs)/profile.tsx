import { SafeAreaView, Text, View } from 'react-native'

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>
          Profile
        </Text>
        <Text style={{ color: '#a1a1aa', marginTop: 6 }}>
          Profil sayfası deneme
        </Text>
      </View>
    </SafeAreaView>
  )
}
