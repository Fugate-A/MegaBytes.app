import React from 'react';
import { View, Text,StyleSheet, ScrollView } from 'react-native';

import NavigationBar from '../components/NavigationBar';
import RecipeContainer from '../components/RecipeContainer';

const recipes = [
    {
        id: 1,
        title: 'Delicious Pasta Carbonara',
        author: 'u/ChefJohn',
        content: 'Here\'s the recipe for a mouthwatering pasta carbonara...',
        image: 'your_image_url_1',
        upvotes: 350,
        comments: 25,
    },
    {
        id: 2,
        title: 'Awesome Chocolate Cake',
        author: 'u/BakerJane',
        content: 'Indulge in this amazing chocolate cake recipe...',
        image: 'your_image_url_2',
        upvotes: 200,
        comments: 15,
    },
    // Add more recipe objects as needed
];

function HomePage(){
    return (
        <View style={styles.container}>
            <Text>HomePage</Text>

            <ScrollView>
                {recipes.map((recipe) => (
                    <RecipeContainer />
                ))}
            </ScrollView>

            <NavigationBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF0DC',
    }
});

export default HomePage;