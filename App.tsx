/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("./src/devtools/ReactotronConfig.ts")
}
import "./src/utils/ignoreWarning";
import React, { useEffect } from 'react';
import Config from "./src/config";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as storage from "./src/utils/storage";
import { ErrorBoundary } from "./src/screens/ErrorScreen/ErrorScreen";
import { AppNavigator } from "./src/navigators/AppNavigation";
import { useNavigationPersistence } from "./src/navigators/utilities";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const App = () => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <ErrorBoundary catchErrors={Config.catchErrors}>
          <AppNavigator
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </ErrorBoundary>
      </Provider>
    </SafeAreaProvider>
  );
}
export default App;
