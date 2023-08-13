/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  CompositeScreenProps,
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useMemo } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { HomeNavigator, HomeTabParamList } from "./HomeTabNavigation" // @demo remove-current-line
import { colors } from "../theme/colors"
import { SignInScreen } from "../screens/auth/sign_in/SignIn"
import { Routes } from "./routes"
import { navigationRef } from "./utilities"
import { useAppSelector } from "../redux/hook"
import { usersState } from "../redux/slices/users"
import { SplashScreen } from "../screens/splash/SplashScreen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Demo: NavigatorScreenParams<HomeTabParamList>
  Home: undefined
  Splash: undefined
  ProductList: { categoryId: string }
}



/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()
const AppStack = () => {
  const { users: user } = useAppSelector(usersState);
  const getAppRouters = useMemo(() => {
    return <>
      <Stack.Screen name={"Home"} component={HomeNavigator} />
    </>

  }, [user])
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={Routes.splash_screen as keyof AppStackParamList} // @demo remove-current-line
    >
      <>
        {/* <Stack.Screen name={Routes.splash_screen as keyof AppStackParamList} component={SplashScreen} /> */}
        {getAppRouters}
      </>

    </Stack.Navigator >
  )
}

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: any) => {
  return (
    <NavigationContainer
      ref={navigationRef}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}