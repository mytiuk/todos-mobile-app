import { View, StyleSheet, TextInput, Alert, Keyboard} from 'react-native'
import { IMGButton } from '../UI/Button'
import { useState } from 'react'
import { image, SHADOWS, COLORS, SIZES, FONTS } from '../styles'

export const AddTodo = ({onAddTodo}) => {
  const [text, setText] = useState('')

  const addHandler = () => { 
    if(text.trim()) {
      onAddTodo(text) 
      setText('')   
      Keyboard.dismiss()
    } else {
      Alert.alert("Note can't be empty")
    }
  }

  return (
    <View style={styles.block}>
      <TextInput 
        placeholder='Write a note...'
        style={styles.input} 
        value={text}
        onChangeText={(value) => setText(value)}
        onSubmitEditing={addHandler}
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={30}
      />
      <IMGButton 
        imgUrl={image.accept} 
        width={50} height={50} 
        size={0} 
        top={5}
        {...SHADOWS.medium}
        onPress={addHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    width: '80%',
    borderBottomWidth: 2,
    borderColor: COLORS.blue,
    borderStyle: 'solid',
    paddingLeft: SIZES.small - 2,
    paddingBottom: 2,
    color: COLORS.blue,
    fontSize: SIZES.extraLarge,
    ...SHADOWS.dark,
    fontFamily: FONTS.regular
  }
})


