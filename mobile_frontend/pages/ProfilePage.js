import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfilePage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                const storedEmail = await AsyncStorage.getItem('email');

                setUsername(storedUsername);
                setEmail(storedEmail);
            } catch(error){
                console.error('Error fetching user data from cache', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <MaterialCommunityIcons name="account-circle" size={120} color="#2196F3" style={styles.avatar} />

                <Text style={styles.username}>{username}</Text>

                <Text>Email: {email}</Text>

                <View style={styles.editButton}>
                    <MaterialCommunityIcons name="pencil" size={24} color="#2196F3" onPress={() => console.log('Edit pressed')} />
                </View>
                
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
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
  });

export default ProfilePage;