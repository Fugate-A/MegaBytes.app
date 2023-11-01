import React, {useState, useRef} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';

function RegisterPage( { navigation }){
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Create refs for the input fields
    const emailInputRef = useRef();
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();

    const handleRegister = async () => {

        // Check if register information is correct, if so, proceed to LoginPage
        try {
            const response = await fetch('http://164.90.130.112:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 999,
                    fname: firstName,
                    lname: lastName,
                    username: username,
                    password: password,
                    email: email,
                }),
            });
            
            const data = await response.json();
            if(response.ok){
                navigation.navigate('Login');
            }else{
                console.error("Invalid username or password\n");
            }
        } catch(error){
            console.error("ERROR CONNECTING TO DATABASE\n");
        }
        
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    }

    const handleSignIn = async () => {
        // Implement sign-in logic
    };
    
    const handleSignUp = async () => {
    // Implement sign-up logic
    };

    return (
        <View style={styles.container}>
          <View style={styles.topOptions}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isSignIn ? styles.activeOptionButton : null,
              ]}
              onPress={() => setIsSignIn(true)}
            >
              <Text
                style={
                  isSignIn ? styles.activeOptionText : styles.optionText
                }
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                !isSignIn ? styles.activeOptionButton : null,
              ]}
              onPress={() => setIsSignIn(false)}
            >
              <Text
                style={
                  !isSignIn ? styles.activeOptionText : styles.optionText
                }
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.authContainer}
          >
            {isSignIn ? (
              <>
                <Text style={styles.title}>Sign In</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
                <Button title="Sign In" onPress={handleSignIn} />
              </>
            ) : (
              <>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
                <Button title="Sign Up" onPress={handleSignUp} />
              </>
            )}
          </KeyboardAvoidingView>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#FFF',
        padding: 20,
      },
      topOptions: {
        position: 'absolute',
        top: 100,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
      },
      optionButton: {
        marginRight: 20,
        padding: 10,
      },
      optionText: {
        fontSize: 18,
        color: 'orange',
      },
      activeOptionButton: {
        
      },
      activeOptionText: {
        fontSize: 18,
        color: 'orange',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: 'orange', // Add this line
      },
      authContainer: {
        alignItems: 'center',
        width: '80%',
      },
      title: {
        fontSize: 32,
        color: '#333',
        marginBottom: 20,
      },
      input: {
        width: '100%',
        height: 40,
        borderColor: '#777',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 8,
      },
    });
    
    export default RegisterPage;