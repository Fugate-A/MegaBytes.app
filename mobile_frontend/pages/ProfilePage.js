import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NavigationBar from "../components/NavigationBar";

function ProfilePage() {

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


            if(response.ok) {
                setUsername(data.results.Username);
                setEmail(data.results.Email);
            } else{
                console.error('Error retrieving user');
            }
        } catch(error){
            console.error('Error connecting to database', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.card}>

                <MaterialCommunityIcons name='account' size={64} style={styles.avatar}/>

                <Text style={styles.username}>Username: {username}</Text>

                <Text>Email: {email}</Text>
                
            </View>

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
    },
    card: {
        backgroundColor: '#FFE6C5',
        marginTop: -250,
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
    editButton: {
        marginTop: 16,
    },
    image: {
        width: 250,
        height: 250,
    },
  });

export default ProfilePage;