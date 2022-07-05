import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SIZES, COLORS, SHADOWS, FONTS } from '../styles'
import { ICNButton } from '../UI/Button'

export const ListTodos = ({todo, onOpenTodo, onAddMark}) => {
  
  return ( 
      <TouchableOpacity 
        activeOpacity={0.7}
        style={styles.todo} 
        onPress={() => onOpenTodo(todo.id)}
        onLongPress={() => onAddMark(todo.id, 'pin')}
      >
        <ICNButton 
          name={todo.mark} 
          type='Entypo'
          size={SIZES.extraLarge + 10}
          onPress={() => onAddMark(todo.id, '')}
          {...styles.clip}
          />
        <Text style={styles.list}>{todo.text}</Text>
      </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
  todo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%',
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base,
    borderRadius: SIZES.small,
    padding: SIZES.base - 2,
    ...SHADOWS.light,
  },

  list: {
    color: COLORS.blue,
    fontSize: SIZES.large,
    fontFamily: FONTS.medium
  },

  clip: {
    position: 'absolute',
    color: COLORS.red,
    left: 8,
    top: 10,
    ...SHADOWS.medium
  }
})