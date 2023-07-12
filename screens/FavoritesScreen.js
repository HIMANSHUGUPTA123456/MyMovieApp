import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
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
    <ImageBackground source={require('./background.jpeg')} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Here is the list of your favourite movies!!</Text>
        {favorites.length === 0 ? (
          <Text style={styles.movieTitle}>No favorites yet</Text>
        ) : (
          <View style={styles.moviesContainer}>
            {favorites.map((movie) => (
              <TouchableOpacity
                style={styles.movieItem}
                onPress={() => handleMoviePress(movie)}
                key={movie.id.toString()}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                  style={styles.moviePoster}
                  resizeMode="contain"
                />
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'lightyellow',
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  movieItem: {
    marginBottom: 10,
    width: '48%',
  },
  moviePoster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color:'lightblue',
  },
});

export default FavoritesScreen;
