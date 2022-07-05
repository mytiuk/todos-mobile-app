import React, { useContext } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { TodoContext } from '../context/todo/todoContext';
import { Navbar } from '../components/Navbar';
import { Home } from '../screens/Home';
import { Todo } from '../screens/Todo';
import { image } from '../styles/index';

export const Layout = ({ layoutView }) => {
  const { todoId } = useContext(TodoContext)

  return (  
    <ImageBackground 
    source={image.background}
    resizeMethod='auto' 
    onLayout={layoutView} 
    style={styles.background}>
    <Navbar title='Todo app'/>
    <View style={styles.screen}>
      { !todoId ? <Home/> : <Todo/> }
    </View>
    <StatusBar style='auto' />
  </ImageBackground> 
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  }, 

  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
