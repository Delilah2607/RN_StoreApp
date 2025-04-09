import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import CategoryScreen from '../Screens/CategoryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import CartsScreen from '../Screens/CartsScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos los iconos

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
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#F4A6C2',  // Color lavanda claro en el encabezado
          elevation: 0,  // Elimina sombra si no la quieres
        },
        headerTitleStyle: {
          color: '#fff', // Titulo blanco para mayor visibilidad
        },
        drawerStyle: { 
          backgroundColor: '#F9E79F', // Color suave para el fondo del Drawer
        },
        drawerInactiveTintColor: '#555', // Color de los íconos inactivos
        drawerActiveTintColor: '#000', // Color de los íconos activos
        drawerLabelStyle: { marginLeft: 10 }, // Ajuste de la etiqueta para separar íconos y texto
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} style={{ marginRight: 10 }} /> // Ícono de Home con separación
          ),
        }}
      />
      <Drawer.Screen 
        name="Categories" 
        component={CategoryScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="th-list" size={20} color={color} style={{ marginRight: 10 }} /> // Ícono de Categorías con separación
          ),
        }}
      />
      <Drawer.Screen 
        name="Carts" 
        component={CartsScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="shopping-cart" size={20} color={color} style={{ marginRight: 10 }} /> // Ícono del Carrito con separación
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerLabel: 'Cerrar sesión', 
          drawerIcon: ({ color }) => (
            <Icon name="sign-out" size={20} color={color} style={{ marginRight: 10 }} /> // Ícono de Logout con separación
          ),
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
