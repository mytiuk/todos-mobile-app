import { ADD_TODO, REMOVE_TODO, OPEN_TODO,
         CHANGE_TODO, ADD_MARK, SHOW_LOADER, 
         SHOW_ERROR, FETCH_TODOS, HIDE_LOADER, CLEAR_ERROR } from "./actionTypes"

 const handlers = {
  [ADD_TODO]: (state, {todo}) => ({...state, todos: [...state.todos, todo]}),
  [REMOVE_TODO]: (state, {id}) => ({...state, todos: state.todos.filter(item => item.id !== id), todoId: null}),
  [OPEN_TODO]: (state, {id}) => ({...state, todoId: state.todos.find(item => item.id === id)}),
  [CHANGE_TODO]: (state, {text, id}) => ({...state, todos: state.todos.map(item => {
        if(item.id === id) {
          item.text = text
        }
        return item
      })  
    }),
  [ADD_MARK]: (state, {id, name}) => ({...state, todos: state.todos.map(item => {
        if(item.id === id) {
          item.mark = name
        }
        return item
      })
    }),
        //--------Fetch------------//
  [SHOW_LOADER]: (state) => ({...state, loading: true}),
  [HIDE_LOADER]: (state) => ({...state, loading: false}),
  [SHOW_ERROR]: (state, {error}) => ({...state, error}),
  [CLEAR_ERROR]: (state) => ({...state, error: null}),
  [FETCH_TODOS]: (state, {data}) => ({...state, todos: data}),
  DEFALUT: state => state
 }

 export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFALUT
  return handler(state, action)
 }