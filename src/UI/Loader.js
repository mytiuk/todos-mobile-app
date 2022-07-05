import { StyleSheet, View, ActivityIndicator } from 'react-native'

export const Loader = () => {
  return (
    <View style={styles.load}>
      <ActivityIndicator size='large' />
    </View>
  )
}

const styles = StyleSheet.create({
  load: {
    top: '200%'
  }
})

