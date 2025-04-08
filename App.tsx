// src/App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
 // Importamos el StackNavigator
import { StatusBar } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      {/* Agregamos la barra de estado para una mejor apariencia */}
      <StatusBar barStyle="dark-content" />
      {/* Configuramos la navegación usando StackNavigator */}
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
