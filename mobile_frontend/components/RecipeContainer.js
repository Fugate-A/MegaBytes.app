import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function RecipeContainer() {

    return (
        <View style={styles.container}>

            <Text>CONTAINER</Text>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        backgroundColor: 'red',
    },
});

export default RecipeContainer;