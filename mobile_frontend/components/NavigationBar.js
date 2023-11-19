import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function NavigationBar() {
    const navigation = useNavigation();

    const navigateToScreen = async (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('Home')}>
                <Entypo name='home' size={30} color='black' />
                <Text style={styles.iconText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('Explore')} >
                <Entypo name='compass' size={30} color='black' />
                <Text style={styles.iconText}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('AddRecipe')}>
                <Entypo name='plus' size={30} color='black' />
                <Text style={styles.iconText}>Add Recipe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer}>
                <Entypo name='user' size={30} color='black' />
                <Text style={styles.iconText}>Profile</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#DD9510',
        height: 100,
        //borderTopWidth: 3,
        //borderTopColor: '#0EBA28',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    iconContainer: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 16,
        fontFamily: 'Tilt-Neon',
    },
});

export default NavigationBar;