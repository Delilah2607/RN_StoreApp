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

const RegisterScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      Alert.alert('Error', 'Por favor, ingrese los datos correctamente');
      return;
    }

    try {
      const users = (await AsyncStorage.getItem('users')) ?? '[]';
      const usersData = JSON.parse(users);

      const emailExists = usersData.some((user: any) => user.email === email);
      if (emailExists) {
        Alert.alert('Error', 'El correo ya está registrado');
        return;
      }

      usersData.push({ userName, email, password });
      await AsyncStorage.setItem('users', JSON.stringify(usersData));

      Alert.alert('Registro exitoso', '¡Ya puedes iniciar sesión!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al registrar el usuario');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Icono de usuario dentro de un círculo */}
      <View style={styles.iconContainer}>
        <Icon name="user" size={80} color="#fff" />
      </View>

      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        placeholder="Correo electrónico"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
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

export default RegisterScreen;
