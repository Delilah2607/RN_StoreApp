import axios from 'axios';

// Crear una instancia de axios para usar en nuestras peticiones
const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Obtener productos de la API
export const getProducts = async () => {
  try {
    const response = await api.get('products');
    return response.data.products; // Devuelve todos los productos
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Obtener categorías de productos
export const getCategories = async () => {
  try {
    const response = await api.get('products/categories');
    return response.data; // Devuelve todas las categorías
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category: string) => {
  try {
    // Aquí se obtiene la lista de productos filtrados por la categoría proporcionada
    const response = await api.get(`products/category/${category}`);
    return response.data.products; // Devuelve los productos específicos de la categoría
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Iniciar sesión
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Registrar usuario
export const registerUser = async (username: string, password: string) => {
  try {
    const response = await api.post('auth/register', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export default api;
