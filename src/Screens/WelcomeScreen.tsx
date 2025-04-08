// src/screens/WelcomeScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../styles/global';
 // Importamos los estilos globales

const WelcomeScreen = ({ navigation }:any) => {

  useEffect(() => {
    // Redirigir automáticamente a la pantalla principal después de 2 segundos
    const timer = setTimeout(() => {
      navigation.replace('Main'); // Redirige a DrawerNavigator
    }, 2000);

    return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.welcomeText}>¡Bienvenido a nuestra aplicación!</Text>
      <Text style={globalStyles.subText}>Estamos encantados de tenerte con nosotros.</Text>
    </View>
  );
};

export default WelcomeScreen;
