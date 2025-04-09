import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { getCategories } from '../api/api';  
import { Colors } from '../styles/global';  // Asegúrate de que esté importado correctamente

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
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              title={item.name || 'Categoria'} 
              onPress={() => navigation.navigate('Home', { category: item.name })}
              color={Colors.secondary}  // Usar el color secundario (lavanda) para los botones
            />
          </View>
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
    backgroundColor: Colors.highlight,  // Fondo amarillo pastel para un ambiente suave
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.primary,  // El texto "Cargando..." usa el color rosa suave
    fontSize: 18,
  },
  buttonContainer: {
    marginVertical: 10,  // Espacio entre los botones
    borderRadius: 10,  // Bordes redondeados para los botones
    overflow: 'hidden',  // Para que el botón tenga bordes redondeados
    shadowColor: '#000',  // Sombra para darle profundidad
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,  // Sombra en Android
    backgroundColor: Colors.accent,  // Fondo verde pastel para los contenedores de los botones
  },
});

export default CategoryScreen;
