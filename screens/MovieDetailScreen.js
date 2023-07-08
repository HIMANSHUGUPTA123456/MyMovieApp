// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const MovieDetailScreen = ({ route }) => {
//   const { movie } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{movie.title}</Text>
//       <Text style={styles.overview}>{movie.overview}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   overview: {
//     fontSize: 16,
//   },
// });

// export default MovieDetailScreen;
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
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
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={toggleFavorite}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
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
  overview: {
    fontSize: 16,
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MovieDetailScreen;
