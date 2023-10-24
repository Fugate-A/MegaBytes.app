import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';

export default function LoginScreen({ navigation }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [debugMessage, setDebugMessage] = useState('');

    const handleLogin = async () => {


        // Check if login information is correct, if so, proceed to HomePage
        try {
            const response = await fetch('http://164.90.130.112:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });
            
            const data = await response.json();
            if(data.id >= 0){
                navigation.navigate('Home');
            }else{
                console.log("Invalid username or password\n");
            }
        } catch(error){
            console.error("ERROR CONNECTING TO DATABASE\n");
        }
        
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.screen}>
            <Header title="Megabytes"/>
            <Text style={styles.loginText}>Login</Text>
            <View style={styles.loginBox}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                />
                <Button title="Login" onPress={handleLogin} />
            </View>

            <View style={styles.registerLink}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={navigateToRegister}>
                    <Text style={styles.registerText}>Register here!</Text>
                </TouchableOpacity>
            </View>


        </View>
      );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fde6c6', 
    },
    loginText: {
        fontSize: 32,
        color: '#E57451',
        marginTop: 100,
        marginLeft: 40,
    },
    loginBox: {
        alignSelf: 'center',

        alignItems: 'center',
        width: '80%',
        padding: 20,
        backgroundColor: '#fcdfb5',
        borderRadius: 10,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    input: {
        width: '80%',
        height: 40,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 8
    },
    messageText: {
        marginTop: 10,
        color: '#34B7F1',
    },
    registerLink: {
        marginBottom: 250,
        marginTop: 15,
        alignItems: 'center',
    },
    registerText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },

});