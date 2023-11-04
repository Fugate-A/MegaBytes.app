import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AddRecipePage from './pages/AddRecipePage';

const Stack = createNativeStackNavigator();

export default function App() {
	let [fontsLoaded] = useFonts({
		'Tilt-Neon': require('./assets/fonts/TiltNeon-Regular-VariableFont.ttf')
	});

  useEffect(() => {
	async function prepare() {
		await SplashScreen.preventAutoHideAsync();
	}
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }else{
    SplashScreen.hideAsync();
  }

  return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName="Auth">
			<Stack.Screen name="Auth" component={AuthPage} />
			<Stack.Screen name="Home" component={HomePage} />
			<Stack.Screen name="AddRecipe" component={AddRecipePage} />
		</Stack.Navigator>
</NavigationContainer>
  );
}