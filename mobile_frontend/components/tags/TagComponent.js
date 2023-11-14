import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function TagComponent({ name, emoji, color }){
    return (
        <View style={[styles.tagContainer, {backgroundColor: color}]}>
            <Text style={styles.tagText}>{emoji} {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tagContainer: {
        width: 140,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
    },
    tagText: {
        color: 'white',
        fontSize: 14,
    },
});

export default TagComponent;