import React, {useState, useRef} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';

function AuthPage( { navigation }){
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
              activeOpacity={0.5}
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
              activeOpacity={0.5}
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
                <Text style={styles.inputLabel}>E-mail Address</Text>
                <TextInput
                  style={styles.input}
                  
                  placeholder="john.doe@email.com"
                  onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Foodlover123"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
                <Button title="Sign In" onPress={handleSignIn} />
              </>
            ) : (
              <>
                <Text style={styles.inputLabel}>E-mail Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={(text) => setUsername(text)}
                />
                <Text style={styles.inputLabel}>Password</Text>
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
        backgroundColor: '#EBEBEB',
        padding: 20,
      },
      topOptions: {
        position: 'absolute',
        top: 100,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      optionButton: {
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
      },
      optionText: {
        fontSize: 28,
        color: '#E79B11',
        fontFamily: 'Tilt-Neon',
      },
      activeOptionButton: {
        borderBottomWidth: 5,
        borderBottomColor: '#E79B11',
      },
      activeOptionText: {
        fontSize: 28,
        color: '#E79B11',
        fontFamily: 'Tilt-Neon',
        fontWeight: 'bold',
      },
      authContainer: {
        marginTop: -200,
        alignSelf: 'center',
        alignItems: 'center',
        width: '90%',
        height: '20%',
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
        margin: 10,
        padding: 8,
      },
    });
    
    export default AuthPage;