import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos el ícono

const LoginScreen = ({ navigation }: any) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    if (!user || !pass) {
      Alert.alert('Error', 'Por favor, ingrese los datos correctamente');
      return;
    }

    try {
      const users = (await AsyncStorage.getItem('users')) ?? '[]';
      const usersData = JSON.parse(users);

      const foundUser = usersData.find(
        (u: any) => u.userName === user && u.password === pass
      );

      if (foundUser) {
        await AsyncStorage.setItem('user', JSON.stringify(foundUser)); // Guardamos el usuario logueado
        navigation.replace('Welcome'); // Navegamos a la pantalla de bienvenida
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'Algo salió mal');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Icono de usuario dentro de un círculo */}
      <View style={styles.iconContainer}>
        <Icon name="user" size={80} color="#fff" />
      </View>

      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={pass}
        onChangeText={setPass}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9E79F', // Fondo amarillo pastel
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: '#1E3A8A', // Título en azul oscuro
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    borderColor: '#B9A0D7', // Lavanda pastel para bordes
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#A8E6CF', // Botón verde pastel
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#1E3A8A', // Texto del botón en azul oscuro
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#F4A6C2', // Rosa pastel para el enlace
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B9A0D7', // Fondo lavanda pastel para el círculo
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf:"center"
  },
});

export default LoginScreen;
