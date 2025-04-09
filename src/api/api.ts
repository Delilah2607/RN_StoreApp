import axios from 'axios';


const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getProducts = async () => {
  try {
    const response = await api.get('products');
    return response.data.products; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('products/categories');
    return response.data; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const getProductsByCategory = async (category: string) => {
  try {
    
    const response = await api.get(`products/category/${category}`);
    return response.data.products; 
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Buscar productos por término
export const searchProducts = async (query: string) => {
  try {
    const response = await api.get(`products/search?q=${query}`);
    return response.data.products;
  } catch (error) {
    console.error('Error searching products:', error);
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
