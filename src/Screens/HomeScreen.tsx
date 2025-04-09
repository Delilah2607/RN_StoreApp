import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput } from 'react-native';
import { getProducts, getProductsByCategory, searchProducts } from '../api/api'; 
import ProductCard from '../components/ProductsCard';
import { Colors } from '../styles/global';  // Asegúrate de tener los colores globales correctamente

const HomeScreen = ({ route, navigation }: any) => {
  const { category } = route.params || {};  
  const [products, setProducts] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda

  // Lógica para buscar o mostrar todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 

      try {
        if (category) {
          const productsList = await getProductsByCategory(category);
          setProducts(productsList);  
        } else if (searchTerm) {
          const productsList = await searchProducts(searchTerm);  // Buscar productos por término
          setProducts(productsList);
        } else {
          const productsList = await getProducts();  // Mostrar todos los productos
          setProducts(productsList);  
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchProducts();  
  }, [category, searchTerm]);  // Dependencias: vuelve a ejecutar cuando cambie la categoría o el término de búsqueda

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {category && <Text style={styles.categoryText}>Category: {category}</Text>}

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)} // Actualiza el estado con el término de búsqueda
      />

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productCardContainer}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('DetailsProduct', { productId: item.id })} 
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.columnWrapper}  
        contentContainerStyle={styles.flatListContent}
      />

      {category && (
        <View style={styles.buttonContainer}>
          <Text 
            style={styles.showAllText}
            onPress={() => navigation.navigate('Home', { category: null })}  
          >
            Show All Products
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: Colors.secondary, // Color de fondo
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.primary,  
    fontSize: 18,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text,  
  },
  searchInput: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 'auto',
    padding: 10,
  },
  showAllText: {
    color: Colors.accent,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  productCardContainer: {
    flex: 1,
    marginBottom: 16,
    paddingHorizontal: 8,  
    paddingVertical: 8, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  columnWrapper: {
    justifyContent: 'space-between',  
  },
  flatListContent: {
    paddingBottom: 50, 
  },
});

export default HomeScreen;
