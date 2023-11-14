import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const TagSelectionModal = ({ allTags, selectedTags, visible }) => {
    const availableTags = allTags.filter(tag => !selectedTags.includes(tag));

    const [showTagPopup, setShowTagPopup] = useState(false);

    const openTagPopup = () => {
        setShowTagPopup(true);
        const allTags = ['Vegetarian', 'Vegan', 'Dessert', 'Easy', 'Quick'];
        setTags(allTags);
    };

    const selectTag = (selectedTag) => {
        setTags([...tags, selectedTag]);
        setShowTagPopup(false);
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <Modal 
            transparent={true}
            animationType='slide'
            visible={visible}
        >
            
            <View style={styles.tagContainer}>
                <FlatList
                    data={availableTags}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onRemove(item)}>
                            <Text style={styles.selectedTagItem}>{item}</Text>
                        </TouchableOpacity>
                    )}
                >
                </FlatList>
            </View>    
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    tagContainer: {

    },
    selectedTagItem: {
        fontSize: 16,
        marginVertical: 5, 
        color: 'red',
    },

});

export default TagSelectionModal;