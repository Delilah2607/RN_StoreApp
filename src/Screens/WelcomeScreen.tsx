import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para el ícono de corazón
import { Colors } from '../styles/global'; // Colores pastel desde el archivo global

const WelcomeScreen = ({ navigation }: any) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
   
      <Image 
        source={{ uri: 'https://images.seeklogo.com/logo-png/8/2/louis-vuitton-logo-png_seeklogo-85805.png' }} 
        style={styles.welcomeImage}
      />
      
   
      <Icon name="heart" size={100} color="#F4A6C2" style={styles.iconHeart} />
      
      <Text style={styles.welcomeText}>¡Bienvenida a nuestra Tienda Online!</Text>
      <Text style={styles.subText}>Estamos emocionadas de tenerte con nosotras. 💖</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.highlight, 
    padding: 20,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 30,
    borderColor: Colors.primary,  
    borderWidth: 5,
  },
  iconHeart: {
    marginBottom: 20,
    opacity: 0.8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary, 
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Pacifico',
  },
  subText: {
    fontSize: 18,
    color: Colors.secondary, 
    textAlign: 'center',
    fontFamily: 'Lobster',
  },
});

export default WelcomeScreen;
