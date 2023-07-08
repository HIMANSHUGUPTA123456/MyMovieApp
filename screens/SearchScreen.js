
import React, { useState } from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FavoritesScreen from './FavoritesScreen'; // Import the FavoritesScreen component

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=0cde4d4ea9a49180e1e9e8e22f9f1ef9&query=${query}`);
      const results = response.data.results;
      navigation.navigate('MovieDetail', { movie: results[0] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoritesPress = () => {
    navigation.navigate('Favorites'); // Navigate to the 'Favorites' screen
  };

  return (
    <View style={styles.container}>
      <Image source={{width: 350 , height: 350, uri:"https://w7.pngwing.com/pngs/400/350/png-transparent-colorflow-film-computer-icons-directory-mymovies-it-movies-miscellaneous-text-trademark.png"}} />

      <TextInput
        style={styles.input}
        placeholder="Enter movie name"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFavoritesPress}>
        <Text style={styles.buttonText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          input: {
            width: '80%',
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
          button: {
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            margin: 5,
          },
          buttonText: {
            color: 'white',
            fontWeight: 'bold',
          },
});

export default SearchScreen;
