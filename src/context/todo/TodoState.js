import React, { useReducer } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { Http } from "../../http";
import { ADD_TODO, REMOVE_TODO, 
         OPEN_TODO, CHANGE_TODO, ADD_MARK, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from "./actionTypes";

export const TodoState = ({children}) => {

  const url = 'https://note-mobile-app-2de13-default-rtdb.europe-west1.firebasedatabase.app/todos'

  const initialState = {
    todos: [],
    todoId: null,
    loading: false,
    error: null
  }

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const showError = (error) => dispatch({type: SHOW_ERROR, error})

  const clearError = () => dispatch({type: CLEAR_ERROR})

  const addTodo = async(text) => {
    clearError()

    try {
      const data = await Http.post(`${url}.json`, {text})
      dispatch({type: ADD_TODO, todo: {text, id: data.name}})

    } catch (error) {
      showError('Somethig went wrong...')
      console.log(error)
    }
     
  }

  const removeTodo = async(id) => {
    clearError()
    Alert.alert('Delete Note', '',
      [
        {text: 'Cencel', style: 'cancel'},
        {text: 'OK', 
          onPress: async() => {
            clearError()

            try {
              await Http.delete(`${url}/${id}.json`)
              dispatch({type: REMOVE_TODO, id})
              
            } catch (error) {
              showError('Somethig went wrong...')
              console.log(error)
            }
          } 
        }
      ]
    )
  }

  const openTodo = (id) => dispatch({type: OPEN_TODO, id})

  const changeTodo = async(text, id) => {
    clearError()

    try {
      dispatch({type: CHANGE_TODO, text, id})
      await Http.patch(`${url}/${id}.json`, {text})

    } catch (error) {
      showError('Somethig went wrong...')
      console.log(error)
    }
  }

  const addMark = async(id, name) => {
    clearError()

    try {
      dispatch({type: ADD_MARK, id, name })
      await Http.patch(`${url}/${id}.json`, {mark: name})

    } catch (error) {
      showError('Somethig went wrong...')
      console.log(error)
    }
  } 

  const showLoader = () => dispatch({type: SHOW_LOADER})
  
  const hideLoader = () => dispatch({type: HIDE_LOADER})

  const fetchTodos = async() => {
    showLoader()
    clearError()

    try {
      const data = await Http.get(`${url}.json`)
      if(data) {
        const todos = Object.keys(data).map(key => {
          return {...data[key], id: key}
        })
        dispatch({type: FETCH_TODOS, data: todos})
      }
  
    } catch(error) {
        showError('Somethig went wrong...')
        console.log(error)
    } finally {
        hideLoader()
    }
  }
   
  return (
    <TodoContext.Provider 
      value={{
        todos: state.todos,
        todoId: state.todoId,
        mark: state.mark,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        openTodo,
        changeTodo,
        addMark,
        fetchTodos
    }}>
      {children}
    </TodoContext.Provider>
  )
}



