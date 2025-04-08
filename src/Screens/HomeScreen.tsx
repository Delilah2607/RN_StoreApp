import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import { getProducts, getProductsByCategory } from '../api/api'; 
import ProductCard from '../components/ProductsCard';


const HomeScreen = ({ route, navigation }: any) => {
  const { category } = route.params || {};  
  const [products, setProducts] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 

      try {
        
        if (category) {
          const productsList = await getProductsByCategory(category);
          setProducts(productsList);  
        } else {
     
          const productsList = await getProducts();
          setProducts(productsList);  
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchProducts();  
  }, [category]);  


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
   
      {category && <Text style={styles.categoryText}>Category: {category}</Text>}

      
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}  
      />

     
      {category && (
        <View style={styles.buttonContainer}>
          <Button
            title="Show All Products"
            onPress={() => navigation.navigate('Home', { category: null })}  
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',  // Asegura que el contenido esté alineado arriba
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,  // Puedes cambiarlo a 'left: 20' si quieres que esté a la izquierda
    width: 'auto',  // Ajusta el ancho del contenedor para que el botón se ajuste
    padding: 10,
  },
});

export default HomeScreen;
