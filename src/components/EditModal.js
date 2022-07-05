import { StyleSheet, TextInput, View, Modal, Alert } from 'react-native'
import { useState } from 'react'
import { IMGButton } from '../UI/Button'
import { COLORS, SHADOWS, SIZES, image, FONTS } from '../styles'

export const EditModal = ({visible, todo, onClose, onChangeTodo}) => {
  const [text, setText] = useState(todo.text)

  const onCencelHandler = () => {
    onClose()
    setText(todo.text)
  }

  const addTextHandler = () => {
    if(text.trim()) {
      onChangeTodo(text, todo.id)
    } else {
      Alert.alert("Note can't be empty")
    }
  }
  return (
    <Modal visible={visible} transparent={true} animationType='fade'>
      <View style={styles.container}>
        <TextInput 
          value={text} 
          style={styles.text} 
          onChangeText={setText}
          autoFocus={true}
          maxLength={30}
        />
        <IMGButton 
          imgUrl={image.cencel} 
          size={0}
          onPress={onCencelHandler}
          {...styles.cencel}
        />
        <IMGButton 
          imgUrl={image.save} 
          size={20}
          onPress={addTextHandler}
          {...styles.save}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 100, 
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.base,
    marginTop: '95%',
    paddingVertical: SIZES.font,
    paddingHorizontal: SIZES.font,
    marginHorizontal: SIZES.medium + 3,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 14  
  },

  text: {
    fontSize: SIZES.extraLarge,
    color: COLORS.blue,
    fontFamily: FONTS.regular
  },

  cencel: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 75,
    left: 15,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium
  },
    
  save: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 75,
    right: 15,
    borderRadius: 50,
    ...SHADOWS.medium
  }
})