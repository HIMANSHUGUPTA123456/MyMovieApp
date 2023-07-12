import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './screens/SearchScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./screens/background.jpeg')} style={styles.backgroundImage}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: 'transparent' },
              headerTitleStyle: { color: 'white' },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ title: 'Search Movies' }}
            />
            <Stack.Screen
              name="MovieDetail"
              component={MovieDetailScreen}
              options={{ title: 'Movie Details' }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{ title: 'Favorites' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default App;
