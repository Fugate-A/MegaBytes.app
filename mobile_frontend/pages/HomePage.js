import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationBar from '../components/NavigationBar';
import RecipeContainer from '../components/RecipeContainer';
import SearchBar from '../components/SearchBar';

function HomePage({ route }){
    const navigation = useNavigation();
    const [searchRecipes, setSearcRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const getRecipes = async () => {

        try {
            const response = await fetch('http://164.90.130.112:5000/api/getUserRecipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    userID: await AsyncStorage.getItem('userID')
                }),
            });

            const data = await response.json();
            if(response.ok){
                const detailedRecipes = await Promise.all(
                    data.results.map(async (recipeID) => {
                        const recipeResponse = await fetch('http://164.90.130.112:5000/api/getRecipeByID', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                recipeID: recipeID,
                            }),
                        });
                        const recipeData = await recipeResponse.json();

                        if(recipeResponse.ok){
                            return recipeData.results;
                        }else{
                            console.error('Failed to fetch recipe details', recipeData.error);
                            return null;
                        }
                    })
                );
                setRecipes(detailedRecipes.filter(recipe => recipe != null));
            }else{
                console.error('\tFailed to fetch recipes', data.error);
            }
        } catch(error){
            console.error('\tError fetching recipes', error);
        }

    }

    useFocusEffect(
        React.useCallback(() => {
            
            getRecipes();
        }, [])
    );

    const handleClearSearch = () => {
        getRecipes();
    };

    return (
        <View style={styles.container}>

            <SearchBar 
                isPublic={false}
                onSearchSubmit={setRecipes}
                onClearSearch={handleClearSearch}
            />

            <Text style={styles.homePageText}>Your Recipes</Text>

            <ScrollView style={styles.scrollViewContainer}>
                {(recipes.length != 0) ? (
                        recipes.map((recipe) => (
                            <TouchableOpacity
                                key={recipe._id}
                                onPress={() => navigation.navigate('RecipePage', {recipe})}>
        
                                <RecipeContainer recipe={recipe}/>
        
                            </TouchableOpacity>
        
                        ))
                    ) : (
                        <Text>No recipes available</Text>
                )} 
            </ScrollView>

            <NavigationBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF0DC',
        alignItems: 'flex-start',
        width: '100%',
        justifyContent: 'space-between',
        borderWidth: 3,
        paddingTop: 40,
    },
    homePageText: {
        fontSize: 24,
        fontFamily: 'Tilt-Neon',
        marginBottom: 10,
        marginLeft: 10,
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        padding: 5, 
        marginBottom: 100,
    }
});

export default HomePage;