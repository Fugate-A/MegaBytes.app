import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


function SearchBar({ isPublic, onSearchSubmit, onClearSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {

        if(!searchQuery){
            onClearSearch();
            return;
        }
        
        try {

            if(isPublic){
                const response = await fetch('http://164.90.130.112:5000/api/getRecipes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
    
                    body: JSON.stringify({
                        search: searchQuery,
                        isPublic: true
                    }),
                });

                const data = await response.json();
                onSearchSubmit(data.results);
            } else{
                const response = await fetch('http://164.90.130.112:5000/api/getRecipes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
    
                    body: JSON.stringify({
                        userId: await AsyncStorage.getItem('userID'),
                        search: searchQuery,
                        isPublic: false
                    }),
                });

                const data = await response.json();
                onSearchSubmit(data.results);
            }


        } catch(error){
            console.error(error);
        }

        
    };

    return (
        
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                onSubmitEditing={handleSearch}
                
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <MaterialIcons name="search" size={24} color="black" />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 10,
        backgroundColor: '#FFE6C5',
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    searchButton: {
        padding: 10,
    },
});

export default SearchBar;