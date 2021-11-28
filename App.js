import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './store/reducers';

import Onboarding from './src/screens/Onboarding/index';
import Splash from './src/components/Splash';
import MainScreen from './src/screens/Main';
import CityWeather from './src/screens/CityWeather/index2';
import ChapterScreen from './src/screens/ChaptersPage';

const persistConfig = {
  key: 'persistedReducer',
  storage: AsyncStorage
}

const persitedReducer = persistReducer(persistConfig, rootReducer);
const createDefaultStore = createStore(persitedReducer);
let persistor = persistStore(createDefaultStore);

const AppStack = createStackNavigator();

const App = () => {
  return (
    <Provider store={createDefaultStore}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppStack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <AppStack.Screen name="splash" component={Splash} />
            <AppStack.Screen name="onboarding" component={Onboarding} />
            <AppStack.Screen name="mainScreen" component={MainScreen}/>
            <AppStack.Screen name="cityWeather" component={CityWeather}/>
            <AppStack.Screen name="chapterScreen" component={ChapterScreen}/>
          </AppStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
