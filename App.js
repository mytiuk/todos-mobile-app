import { useState, useEffect, useCallback, useContext } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { Layout } from './src/Layout/Layout';
import { TodoState } from './src/context/todo/TodoState';

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function loadedFonts() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({
          PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
          PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
          PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf')
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setIsReady(true)
      }
    }
    loadedFonts()
  }, [])

  const onLayoutView = useCallback(async() => {
    if(isReady) {
      await SplashScreen.hideAsync()
    }
  }, [isReady])

  if(!isReady) return null

  return (
    <TodoState>
      <Layout layoutView={onLayoutView}/>
    </TodoState>

  )
}
