import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../components/Header';
import ErrorMessageModal from '../components/ErrorMessageModal';

function AuthPage( { navigation }){
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

	const [showPassword, setShowPassword] = useState(false);
    const [passwordText, setPasswordText] = useState('');

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

	const handleSignIn = async () => {
		// Check if login information is correct, if so, proceed to HomePage

		const login = email;

		if(login.size == 0 || passwordText.size == 0){
			setErrorMessage('Please fill in the required fields');
			setShowErrorModal(true);
			return;
		}

		try {
			const response = await fetch('http://164.90.130.112:5000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},

				body: JSON.stringify({
					username: login,
					password: passwordText,
				}),
			});
			
			console.log('\tLogging User in:');
			console.log(`\n\tUsername: ${login}\nPassword: ${passwordText}`);

			const data = await response.json();

			if(response.ok){
				console.log('\tSuccess!');

				await AsyncStorage.setItem('userID', data.id);

				navigation.navigate('Home');
			}else{
				setErrorMessage('Invalid Username or Password');
				setShowErrorModal(true);
			}
		} catch(error){
			console.error("\tERROR CONNECTING TO DATABASE\n", error);
		}
	};

	const handleSignUp = async () => {
		// Check if register information is correct, if so, proceed to LoginPage

		//TODO Send email verification before adding credentials into database

		if(email.size == 0 || passwordText.size == 0 || username.size == 0){
			setErrorMessage('Please fill in the required fields');
			setShowErrorModal(true);
			return;
		}
		try {
			const response = await fetch('http://164.90.130.112:5000/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: 999,
					fname: "DUMMY",
					lname: "DUMMY 2",
					username: username,
					password: passwordText,
					email: email,
				}),
			});
			
			console.log('\tAdding new User:');
			console.log(`\n\tEmail: ${email}\tUsername: ${username}\tPassword: ${passwordText}`);
			const data = await response.json();
			if(response.ok){
				console.log('\tSuccess');
				
				await AsyncStorage.setItem('userID', data.id);

				setIsSignIn(true);
			}else{
				console.error("\tError\n");
			}
		} catch(error){
			console.error("\tERROR CONNECTING TO DATABASE\n");
		}
	};

	const toggleShowPassword = () => { 
		setShowPassword(!showPassword); 
	}; 

	const closeErrorModal = () => {
		setShowErrorModal(false);
	};
  
    return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : null}
			style={styles.container}
		>

			<Header title='Megabytes' />

			<View style={styles.topOptions}> 
				<TouchableOpacity
					style={[
					styles.optionButton,
					isSignIn ? styles.activeOptionButton : null,
					]}
					onPress={() => setIsSignIn(true)}
					activeOpacity={0.5}
				>
					<Text style={isSignIn ? styles.activeOptionText : styles.optionText}>
					Sign In
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
					styles.optionButton,
					!isSignIn ? styles.activeOptionButton : null,
					]}
					onPress={() => setIsSignIn(false)}
					activeOpacity={0.5}
				>
					<Text style={!isSignIn ? styles.activeOptionText : styles.optionText}>
					Sign Up
					</Text>
				</TouchableOpacity>
			</View>

			<ErrorMessageModal
				visible={showErrorModal}
				message={errorMessage}
				onClose={closeErrorModal}
			/>

			<View style={styles.authContainer}>
				<Text style={styles.inputLabel}>E-mail Address</Text>
				<TextInput
					style={styles.input}
					placeholder="john.doe@email.com"
					onChangeText={(text) => setEmail(text)}
				/>
				{!isSignIn && (
					<>
						<Text style={styles.inputLabel}>Username</Text>
						<TextInput
							style={styles.input}
							placeholder="Username"
							onChangeText={(text) => setUsername(text)}
						/>
					</>
				)}

				<Text style={styles.inputLabel}>Password</Text>
				<View style={styles.passwordInputContainer}>
					<TextInput
						style={styles.passwordInput}
						placeholder="Password"
						value={passwordText}
						onChangeText={text => setPasswordText(text)}
						secureTextEntry={!showPassword}   
					/>
					<MaterialCommunityIcons 
						name={showPassword ? 'eye-off' : 'eye'} 
						size={24} 
						color="#aaa"
						style={styles.passwordVisibilityIcon}
						onPress={toggleShowPassword} 
					/> 
				</View>
			
				<TouchableHighlight
					style={styles.submitButton}
					underlayColor="#FFC266" 
					onPress={isSignIn ? handleSignIn : handleSignUp}
				>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableHighlight>

			</View>
		</KeyboardAvoidingView>
    );
}
  
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignContent: 'center',
			backgroundColor: '#FFF0DC',
			padding: 15,
		},
		topOptions: {
			alignSelf: 'center',
			flexDirection: 'row',
			justifyContent: 'center',
			marginBottom: 20,
		},
		optionButton: {
			marginLeft: 5,
			marginRight: 5,
			padding: 10,
		},
		optionText: {
			fontSize: 28,
			color: '#DD9510',
			fontFamily: 'Tilt-Neon',
			opacity: 0.5,
		},
		activeOptionButton: {
			borderBottomWidth: 5,
			borderBottomColor: '#DD9510',
			borderRadius: 5,
		},
		activeOptionText: {
			fontSize: 28,
			color: '#DD9510',
			fontFamily: 'Tilt-Neon',
			fontWeight: 'bold',
		},
		authContainer: {
			marginTop: 25,
			alignSelf: 'center',
			alignItems: 'center',
			width: '90%',
			height: '20%',
			marginBottom: 300,
		},
		inputLabel: {
			alignSelf: 'flex-start',
			fontSize: 16,
			fontFamily: 'Tilt-Neon',
			fontWeight: 'bold',
		},
		input: {
			width: '100%',
			height: 40,
			borderColor: '#777',
			borderWidth: 1,
			borderRadius: 10,
			marginVertical: 10,
			padding: 8,
		},
		passwordInputContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		passwordInput: {
			flex: 1,
			height: 40,
			borderColor: '#777',
			borderWidth: 1,
			borderRadius: 10,
			marginVertical: 10,
			padding: 8,
		},
		passwordVisibilityIcon: {
			position: 'absolute',
			right: 10,
			top: 10,
			padding: 8,
		},
		submitButton: {
			backgroundColor: '#E79B11', 
			padding: 10, 
			borderRadius: 10, 
		},
		submitButtonText: {
			fontSize: 16,
			fontFamily: 'Tilt-Neon',
			fontWeight: 'bold',
			textAlign: 'center', 
		},
	});

export default AuthPage;