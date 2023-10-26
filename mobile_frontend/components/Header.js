import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({ title, style }) => {
    return (
        <View style={[styles.header, style]}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: -50,
        padding: 15,
        alignItems: 'center',
        marginBottom: 50,
    },
    title: {
        fontSize: 30,
        fontStyle: 'italic',
        fontFamily: 'Tilt-Neon',
    },
});

export default Header;