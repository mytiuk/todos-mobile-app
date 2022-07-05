import { StyleSheet, Text, TouchableOpacity, Image, Platform, TouchableNativeFeedback } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'

const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

export const IMGButton = ({imgUrl, onPress, size, ...props}) => {
  return (
    <Wrapper 
      onPress={onPress} 
      style={[styles.button, {...props}]}>
      <Image 
        source={imgUrl} 
        style={{width: 100 - size + '%', height: 100 - size + '%', resizeMode: 'contain'}}/>
    </Wrapper>
  )
}

export const TXTButton = ({title, onPress, size, ...props}) => {
  return (
    <Wrapper 
      onPress={onPress} 
      style={[styles.button, {...props}]}>
      <Text 
        style={[styles.button, {fontSize: size, textAlign: 'center'}]}>
        {title}
      </Text>
    </Wrapper>
  )
}

export const ICNButton = ({type, name, onPress, size, color, ...props}) => {
  return (
    <Wrapper 
      onPress={onPress} 
      activeOpacity={0.5}
      style={[styles.button, {...props}]}
    >
      {type === 'Ionicons' 
        ? <Ionicons name={name} style={[styles.button, {fontSize: size, color: color}]}/>
        : <Entypo name={name} style={[styles.button, {fontSize: size, color: color}]}/>
      }
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})