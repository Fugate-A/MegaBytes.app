import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import TagComponent from './TagComponent';

function TagSelectionModal ({ visible, onClose, onUpdateRecipeTags, currentTags }){
    const [tags, setTags] = useState([]);
    const [recipeTags, setRecipeTags] = useState(currentTags);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://164.90.130.112:5000/api/tags');
                const data = await response.json();
      
                if (response.ok) {
                    setTags(data);
                } else {
                    console.error('Error retrieving tags from server');
                }
            } catch (error) {
                console.error('Error connecting to server', error);
            }
        };
      
        fetchTags();
    }, []);

    useEffect(() => {
        onUpdateRecipeTags(recipeTags);
    }, [recipeTags, onUpdateRecipeTags]);

    const toggleTagSelection = (tagIndex) => {

        if (recipeTags.includes(tagIndex)) {
            setRecipeTags(recipeTags.filter(index => index !== tagIndex));

        } else {
            setRecipeTags([...recipeTags, tagIndex]);
        }

        onUpdateRecipeTags(recipeTags);
    };

    const renderItem = ({ item, index }) => {
        const isSelected = recipeTags.includes(index);

        return (
            <TouchableOpacity
                style={[styles.tagItem]}
                onPress={() => toggleTagSelection(index)}
            >
                <TagComponent 
                    name={item.name}
                    emoji={item.emoji}
                    color={item.color}
                    isSelected={isSelected}
                />
            </TouchableOpacity>
        );
    };

    return (
        <Modal 
            transparent={true}
            animationType='slide'
            visible={visible}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.container}>
                    <View style={styles.tagContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text>X</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={tags}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            numColumns={2}
                        />
                    </View>
                    <Text >{JSON.stringify(recipeTags)}</Text>
                </View>    
            </TouchableWithoutFeedback>

            
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        width: '90%',
        maxHeight: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
});

export default TagSelectionModal;