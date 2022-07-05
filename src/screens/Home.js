import { StyleSheet, View, FlatList, Image, useWindowDimensions, Text } from 'react-native';
import { useState, useEffect, useContext, useCallback } from 'react';
import { TodoContext } from '../context/todo/todoContext';
import { AddTodo } from '../components/AddTodo';
import { ListTodos } from '../components/ListTodos';
import { SIZES, SHADOWS, image, COLORS } from '../styles';
import { Loader } from '../UI/Loader';
import { ICNButton } from '../UI/Button';

export const Home = () => {
  const {width} = useWindowDimensions()
  const [diviceWidth, setDiviceWidth] = useState(width - 20)
  const { todos, addTodo, removeTodo, openTodo,
          addMark, fetchTodos, loading, error} = useContext(TodoContext)
  
  const loaderTodos = useCallback(async() => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loaderTodos()
  }, [])  

  useEffect(() => {
    let size 
    if(width <= 400) {
      size = 20 
    } else {
      size = 120
    }
    setDiviceWidth(width - size)
    }, [width]) 
  
  const infoType = loading ? <Loader/> : <View style={styles.add}><Image source={image.add} style={styles.img}/></View>
  const renderInfo = error ? <View style={styles.info}>
                                <Text style={styles.error}>{error}</Text>
                                <ICNButton 
                                  type='Ionicons' 
                                  name='reload-circle'
                                  size={SIZES.extraLarge * 2.5}
                                  opacity={0.8}
                                  color={COLORS.red}
                                  onPress={() => loaderTodos()}
                                  />
                              </View> 
                            : infoType

  return (
        <View style={styles.container}>
          <AddTodo onAddTodo={addTodo}/>
          {todos.length
            ? <View style={{width: diviceWidth}}> 
                <FlatList 
                  style={{marginTop: SIZES.extraLarge + 5}}
                  keyExtractor={(item) => item.id}
                  data={todos}
                  renderItem={({item}) => 
                    (<ListTodos 
                      todo={item} 
                      onRemoveTodo={removeTodo} 
                      onOpenTodo={openTodo}
                      onAddMark={addMark}
                    />)}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            : renderInfo 
          }
        </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.small - 7,
    paddingVertical: SIZES.extraLarge + 15,
  },
  
  add: {
    width: SIZES.extraLarge * 4,
    height: SIZES.extraLarge * 4,
    opacity: 0.8,
    left: '38%',
    marginVertical: '50%', 
    ...SHADOWS.medium
  },

  img: {
    resizeMode: 'cover',
    width: '100%', 
    height: '100%'
  },

  info: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },

  error: {
    fontSize: SIZES.large,
    color: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  }
})
