import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('favorites');
      if (value !== null) {
        const parsedFavorites = JSON.parse(value);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Here is the list of your favourite movies!!</Text>
      {favorites.length === 0 ? (
        <Text>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieItem}
              onPress={() => handleMoviePress(item)}
            >
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieItem: {
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 16,
  },
});

export default FavoritesScreen;
