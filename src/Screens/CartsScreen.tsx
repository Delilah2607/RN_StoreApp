// src/Screens/CartsScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const CartsScreen = () => {
  const [cart, setCart] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/carts');
        const data = await response.json();
        console.log('API Response:', data); 
        if (data && data.carts) {
          setCart(data.carts); 
        } else {
          console.error('No carts found');
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="shopping-cart" size={30} color="#007BFF" style={styles.cartIcon} />
        <Text style={styles.title}>Your Cart</Text>
      </View>

      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={({ item }) => {
        
            return (
              <View style={styles.cartItem}>
                <Text style={styles.cartItemTitle}>Cart ID: {item.id}</Text>
                {item.products && item.products.length > 0 ? (
                  item.products.map((product: any, index: number) => (
                    <View key={index} style={styles.productContainer}>
                      <Text style={styles.productTitle}>Title: {product.title}</Text>
                      <Text style={styles.productPrice}>Price: ${product.price}</Text>
                      <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No products found in this cart.</Text>
                )}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <Button title="Proceed to Checkout" onPress={() => console.log('Proceed to checkout')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productContainer: {
    marginBottom: 15, // Espacio entre productos
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#007BFF',
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
});

export default CartsScreen;
