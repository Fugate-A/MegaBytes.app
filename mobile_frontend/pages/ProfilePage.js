import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NavigationBar from "../components/NavigationBar";
import Header from "../components/Header";

function ProfilePage({ navigation }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const fetchUser = async () => {
        try {
            const response = await fetch('http://164.90.130.112:5000/api/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: await AsyncStorage.getItem('userID')
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setUsername(data.results.Username);
                setEmail(data.results.Email);
            } else {
                console.error('Error retrieving user');
            }
        } catch (error) {
            console.error('Error connecting to the database', error);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.replace('Auth');
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <View style={styles.container}>

            <View>
                <Header title='Megabytes' style={{ marginTop: -150 }} />
            </View>
            
            <View style={styles.card}>

                <MaterialCommunityIcons name='account' size={64} style={styles.avatar} />

                <Text style={styles.username}>Username: {username}</Text>

                <Text>Email: {email}</Text>

            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <NavigationBar />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF0DC',
        paddingTop: 40,
    },
    card: {
        backgroundColor: '#FFE6C5',
        height: '30%',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    avatar: {
        marginBottom: 16,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    logoutButton: {
        marginTop: 15,
        backgroundColor: '#E79B11', 
        padding: 10, 
        borderRadius: 10, 
    },
    logoutButtonText: {
        fontSize: 16,
        fontFamily: 'Tilt-Neon',
        fontWeight: 'bold',
        textAlign: 'center', 
    },
});

export default ProfilePage;
