import React, { useReducer } from 'react'
import { ScreenContext } from './screenContext'
import { screenReducer } from './screenReducer'

export const screenState = ({children}) => {
  const [state, dispatch] = useReducer(screenReducer)

  return (
    <ScreenContext.Provider value={{}}>
      {children}
    </ScreenContext.Provider>
  )
}
