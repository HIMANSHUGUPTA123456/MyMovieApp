import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    checkFavoriteStatus();
    fetchMovieDetails();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites !== null) {
        const parsedFavorites = JSON.parse(favorites);
        const isMovieFavorite = parsedFavorites.some((favMovie) => favMovie.id === movie.id);
        setIsFavorite(isMovieFavorite);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=0cde4d4ea9a49180e1e9e8e22f9f1ef9&append_to_response=credits`
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let updatedFavorites = [];

      if (favorites !== null) {
        updatedFavorites = JSON.parse(favorites);
      }

      if (isFavorite) {
        // Remove movie from favorites
        const index = updatedFavorites.findIndex((favMovie) => favMovie.id === movie.id);
        if (index > -1) {
          updatedFavorites.splice(index, 1);
        }
        setIsFavorite(false);
      } else {
        // Add movie to favorites
        updatedFavorites.push(movie);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.movieContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.moviePoster}
          resizeMode="cover"
        />
      </View>
      {movieDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview}>{movieDetails.overview}</Text>
          <Text style={styles.rating}>Rating: {movieDetails.vote_average}</Text>
          <Text style={styles.castTitle}>Cast:</Text>
          <FlatList
            data={movieDetails.credits.cast}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.castContainer}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
                  style={styles.castImage}
                />
                <Text style={styles.castName}>{item.name}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  moviePoster: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  castTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  castContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  castName: {
    marginTop: 5,
    textAlign: 'center',
  },
  favoriteButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:5,
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MovieDetailScreen;
