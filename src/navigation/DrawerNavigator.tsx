// src/navigation/DrawerNavigator.tsx
import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import CategoryScreen from '../Screens/CategoryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }: any) => {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); 
      navigation.replace('Login'); 
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Categories" component={CategoryScreen} />
      {/* Opción de cerrar sesión */}
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerLabel: 'Cerrar sesión', 
        }}
        listeners={{
          focus: () => handleLogout(), 
        }}
      />
    </Drawer.Navigator>
  );
};


const LogoutScreen = () => {
  return (
    <View style={styles.logoutContainer}>
      <Text>Cerrando sesión...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerNavigator;
