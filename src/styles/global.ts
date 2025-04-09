import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#F4A6C2',  // Rosa suave
  secondary: '#B9A0D7',  // Lavanda
  accent: '#A8E6CF',  // Verde pastel
  highlight: '#F9E79F',  // Amarillo pastel
  background: '#FFFFFF',  // Blanco
  text: '#333333',  // Texto oscuro
  placeholder: '#D1D1D1',  // Texto de placeholder
  inputBackground: '#F9F9F9',  // Fondo claro para inputs
};

const globalStyles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },

  // Títulos
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },

  // Subtítulos
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },

  // Estilos de entrada (input)
  input: {
    height: 45,
    borderColor: Colors.primary,  // Rosa suave
    borderWidth: 1.5,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 20,
    width: '100%',
    backgroundColor: Colors.inputBackground,  // Fondo blanco para los inputs
  },

  // Botones
  button: {
    backgroundColor: Colors.secondary,  // Lavanda
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },

  // Texto del botón
  buttonText: {
    fontSize: 18,
    color: '#fff',  // Blanco
    fontWeight: 'bold',
  },

  // Estilos de la bienvenida
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 30,
    textAlign: 'center',
  },

  // Enlace de registro
  registerLink: {
    marginTop: 10,
    alignItems: 'center',
    paddingBottom: 30,
  },

  registerText: {
    fontSize: 16,
    color: Colors.primary,
  },

  // Avatar de usuario (imagen o silueta)
  avatarContainer: {
    backgroundColor: Colors.primary,  // Fondo rosa suave
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  avatarIcon: {
    color: '#fff',
    fontSize: 40,
  },
});

export default globalStyles;
