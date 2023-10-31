import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

import NavigationBar from '../components/NavigationBar';

function HomePage(){
    return (
        <View style={styles.container}>
            <Text>HomePage</Text>

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