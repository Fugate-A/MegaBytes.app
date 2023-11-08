import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function GlutenFreeTag() {


    return (
        <View style={styles.tagContainer}>
            <Text style={styles.tagText}>Gluten-Free</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tagContainer: {
        backgroundColor: '#4CAF50',

        width: 110,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
    },
    tagText: {
        color: 'white',
        fontSize: 14,
    }, 
})

export default GlutenFreeTag;