import { StyleSheet, Text, View,  useWindowDimensions } from 'react-native'
import { COLORS, SIZES, image, SHADOWS, FONTS } from '../styles'
import { useState, useEffect, useContext } from 'react'
import { TodoContext } from '../context/todo/todoContext'
import { IMGButton } from '../UI/Button'
import { EditModal } from '../components/EditModal'

export const Todo = () => {
  const [edit, setEdit] = useState(false)
  const {height, width} = useWindowDimensions()
  const [diviceWidth, setDiviceWidth] = useState(width - 20)
  const [diviceHeight, setDiviceHeight] = useState(height - 75)
  const {todoId, openTodo, removeTodo, changeTodo} = useContext(TodoContext)

  useEffect(() => {
    let currentWidth 
    let currentHeight 

    if(width <= 400) {
      currentWidth = 20
    } else {
      currentWidth = 120
    }
     setDiviceWidth(width - currentWidth)

     if(height >= 812) {
      currentHeight = 512
     } else {
      currentHeight = 150
     }

     setDiviceHeight(height - currentHeight)

  }, [width, height])

  const addChangedTodo = (text, id) => {
    changeTodo(text, id)
    setEdit(false)
  }

  return (
    <View style={{...styles.container,  width: diviceWidth, marginTop: '50%',  height: diviceHeight}}>
      <EditModal 
        visible={edit} 
        todo={todoId}
        onChangeTodo={addChangedTodo}
        onClose={() => setEdit(prev => !prev)}
      />
   
      <Text 
        style={styles.text}>
        {todoId.text}
      </Text>
    
      <IMGButton 
        imgUrl={image.left} 
        size={30}
        onPress={() => openTodo(null)}
        {...styles.left}
      />

      <IMGButton 
        imgUrl={image.edit} 
        size={30}
        onPress={() => setEdit(prev => !prev)}
        {...styles.edit}
      />

      <IMGButton 
        imgUrl={image.trash} 
        size={18}
        onPress={() => removeTodo(todoId.id)}
        {...styles.trash}
      />
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.base,
    paddingVertical: SIZES.extraLarge * 2,
    paddingHorizontal: SIZES.extraLarge,
    ...SHADOWS.medium
  },

  text: {
      fontSize: SIZES.extraLarge,
      color: COLORS.blue,
      fontFamily: FONTS.regular
    },

    left: {
      width: 50,
      height: 50,
      position: 'absolute',
      top: -30,
      left: 15,
      borderRadius: 50,
      backgroundColor: COLORS.white,
      ...SHADOWS.medium
    },

    edit: {
      width: 50,
      height: 50,
      position: 'absolute',
      top: -30,
      left: '50%',
      borderRadius: 50,
      backgroundColor: COLORS.white,
      ...SHADOWS.medium
    },

    trash: {
      width: 50,
      height: 50,
      position: 'absolute',
      top: -30,
      right: 15,
      borderRadius: 50,
      backgroundColor: COLORS.white,
      ...SHADOWS.medium
    }
})
