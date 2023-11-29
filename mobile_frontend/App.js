import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import AddRecipePage from './pages/AddRecipePage';
import RecipePage from './pages/RecipePage';
import ProfilePage from './pages/ProfilePage';

const Stack = createNativeStackNavigator();

export default function App() {
	let [fontsLoaded] = useFonts({
		'Tilt-Neon': require('./assets/fonts/TiltNeon-Regular-VariableFont.ttf')
	});

	StatusBar.setBarStyle('dark-content');

	useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
		}
		prepare();
	}, []);

	if (!fontsLoaded) {
		return undefined;
	} else {
		SplashScreen.hideAsync();
	}

	return (
		<NavigationContainer>



			<Stack.Navigator initialRouteName="Auth">
				<Stack.Screen name="Auth" component={AuthPage} options={{ headerShown: false }} />
				<Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
				<Stack.Screen name="Explore" component={ExplorePage} options={{ headerShown: false }} />
				<Stack.Screen name="AddRecipe" component={AddRecipePage} options={{ headerShown: false }} />
				<Stack.Screen name="RecipePage" component={RecipePage} options={{ headerShown: false }} />
				<Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// REACT_NATIVE_PACKAGER_HOSTNAME='100.74.230.134' npm start