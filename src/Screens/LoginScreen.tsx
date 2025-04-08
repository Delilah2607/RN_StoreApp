// src/screens/LoginScreen.tsx

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
    backgroundColor: '#1E3A8A',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});

export default LoginScreen;
