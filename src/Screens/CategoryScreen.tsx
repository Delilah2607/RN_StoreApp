import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { getCategories } from '../api/api';  

const CategoryScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList = await getCategories();  
        setCategories(categoriesList);  
      } catch (error) {
        console.error('Error fetching categories:', error); 
      } finally {
        setLoading(false);  
      }
    };

    fetchCategories();
  }, []);  

  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
            <Button
            title={item.name || 'Categoria'} 
            onPress={() => navigation.navigate('Home', { category: item.name })} 
          />
        )}
        keyExtractor={(item) => (item.id ? item.id.toString() : item.name)}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryScreen;
