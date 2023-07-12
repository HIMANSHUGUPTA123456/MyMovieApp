import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPopularMovies();
    fetchTopMovies();
    fetchLatestMovies();
    fetchUpcomingMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=0cde4d4ea9a49180e1e9e8e22f9f1ef9`
      );
      const results = response.data.results;
      setPopularMovies(results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=0cde4d4ea9a49180e1e9e8e22f9f1ef9`
      );
      const results = response.data.results;
      setTopMovies(results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLatestMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=0cde4d4ea9a49180e1e9e8e22f9f1ef9`
      );
      const results = response.data.results;
      setLatestMovies(results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=0cde4d4ea9a49180e1e9e8e22f9f1ef9`
      );
      const results = response.data.results;
      setUpcomingMovies(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=0cde4d4ea9a49180e1e9e8e22f9f1ef9&query=${query}`
      );
      const results = response.data.results;
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };

  const handleFavoritesPress = () => {
    navigation.navigate('Favorites');
  };

  const handleBack = () => {
    setSearchResults([]);
  };

  return (
    <ImageBackground source={require('./background.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search for a movie"
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {searchResults.length > 0 ? (
          <ScrollView>
            <View style={styles.sectionContainer}>
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.movieContainer}
                    onPress={() => handleMoviePress(item)}
                  >
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                      style={styles.moviePoster}
                    />
                  </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        ) : (
          <>
            <ScrollView>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Popular Movies</Text>
                <FlatList
                  data={popularMovies}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.movieContainer}
                      onPress={() => handleMoviePress(item)}
                    >
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        style={styles.moviePoster}
                      />
                    </TouchableOpacity>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Top Movies</Text>
                <FlatList
                  data={topMovies}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.movieContainer}
                      onPress={() => handleMoviePress(item)}
                    >
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        style={styles.moviePoster}
                      />
                    </TouchableOpacity>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Latest Movies</Text>
                <FlatList
                  data={latestMovies}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.movieContainer}
                      onPress={() => handleMoviePress(item)}
                    >
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        style={styles.moviePoster}
                      />
                    </TouchableOpacity>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Upcoming Movies</Text>
                <FlatList
                  data={upcomingMovies}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.movieContainer}
                      onPress={() => handleMoviePress(item)}
                   
                      >
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        style={styles.moviePoster}
                      />
                    </TouchableOpacity>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </>
        )}
        <TouchableOpacity style={styles.favoritesButton} onPress={handleFavoritesPress}>
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  searchButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
  favoritesButton: {
    marginTop:5,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  movieContainer: {
    marginRight: 10,
  },
  moviePoster: {
    width: 150,
    height: 225,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default SearchScreen;
