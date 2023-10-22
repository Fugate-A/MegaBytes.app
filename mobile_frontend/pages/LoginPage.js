import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [debugMessage, setDebugMessage] = useState('');

    const handleLogin = () => {

        // Check if login information is correct, if so, proceed to HomePage

        setDebugMessage(true);
        
    };

    return (
        <View style={styles.container}>
          <Text>Login</Text>
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

          {debugMessage && (
            <>
                <Text style={styles.messageText}>Login Successful!</Text>
                <Text>Username = {email}</Text>
                <Text>Password = {password}</Text>
            </>
          )}
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 8
    },
    messageText: {
        marginTop: 10,
        color: 'green',
    },
});