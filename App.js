import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import store from './src/app/store';
import AppStack from './src/navigation/AppStack';

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
