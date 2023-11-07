import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';



function RecipePage() {
    const route = useRoute();
    const { recipe } = route.params;


    return (
        <ScrollView style={styles.container}>
        
            <Text>Recipe Page for {recipe.title}</Text>

        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default RecipePage;