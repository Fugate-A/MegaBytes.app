import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function TagComponent({ name, emoji, color, isSelected }){
    return (
        <View style={[styles.tagContainer, {backgroundColor: color}, isSelected && styles.dimmedTagContainer]}>
            <Text style={styles.tagText}>{emoji} {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tagContainer: {
        marginTop: 10,
        width: 140,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderWidth: 0.5,
    },
    dimmedTagContainer: {
        opacity: 0.5,
    },
    tagText: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    },

});

export default TagComponent;