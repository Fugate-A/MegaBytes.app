import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

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
		<Stack.Navigator initialRouteName="login">
			<Stack.Screen name="Auth" component={AuthPage} />
			<Stack.Screen name="Login" component={LoginPage} />
			<Stack.Screen name="Register" component={RegisterPage} />
			<Stack.Screen name="Home" component={HomePage} />
		</Stack.Navigator>
	</NavigationContainer>
  );
}