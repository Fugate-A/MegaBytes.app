import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'; // Remove React Native-specific components
import ErrorMessageModal from '../components/ErrorMessageModal';
import TagSelectionModal from '../components/TagSelectionModal';

function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recipeTags, setRecipeTags] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showTagSelectionModal, setShowTagSelectionModal] = useState(false);

  // AsyncStorage is not available in web, you may need to use alternatives like localStorage
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUserID = localStorage.getItem('userID');
        setUserID(storedUserID);
      } catch (error) {
        console.error('Error retrieving userID from cache', error);
      }
    };

    fetchUserID();
  }, []);

  const handleAddRecipe = async () => {
    try {
      const response = await fetch('http://164.90.130.112:5000/api/addRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userID,
          recipeName: title,
          recipeContents: content,
          tagList: recipeTags || [],
          likeList: [],
          isPublic: visibility,
        }),
      });

      console.log('Adding Recipe');
      const data = await response.json();

      if (response.ok) {
        console.log('Success');
        // For web, you may use react-router or any other routing library
        // to navigate to the Home page.
      } else {
        console.error('Error adding Recipe');

        setErrorMessage('Error adding Recipe');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('\tERROR CONNECTING TO DATABASE\n', error);
    }
  };

  const handleUpdateRecipeTags = (updatedTages) => {
    setRecipeTags(updatedTages);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const openTagSelectionModal = () => {
    setShowTagSelectionModal(true);
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleAddRecipe} style={styles.submittButton}>
        <Text>Submit</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.titleInput}
        />
        <TextInput
          placeholder="Ingredients and Directions"
          value={content}
          onChangeText={(text) => setContent(text)}
          style={styles.contentInput}
          multiline
        />

        <TouchableOpacity
          onPress={openTagSelectionModal}
          style={styles.addTagsButton}
        >
          <Text>Add Tags</Text>
        </TouchableOpacity>

        {showTagSelectionModal && (
          <TagSelectionModal
            visible={true}
            onUpdateRecipeTags={handleUpdateRecipeTags}
            onClose={() => setShowTagSelectionModal(false)}
            currentTags={recipeTags}
          />
        )}

        <View style={styles.visibilityContainer}>
          <Text style={styles.visibilityLabel}>Visibility:</Text>
          <TouchableOpacity onPress={toggleVisibility} style={styles.visibilityButton}>
            <View style={[styles.radioCircle, { backgroundColor: visibility ? 'green' : 'white' }]} />
          </TouchableOpacity>
          <Text>{visibility ? 'Public' : 'Private'}</Text>
        </View>
      </View>

      <ErrorMessageModal
        visible={showErrorModal}
        message={errorMessage}
        onClose={closeErrorModal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#FFF0DC',
    padding: 10,
  },
  inputContainer: {
    padding: 10,
  },
  titleInput: {
    width: '100%',
    height: 80,
    marginVertical: 10,
    padding: 8,
    fontSize: 30,
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  contentInput: {
    width: '100%',
    height: '65%',
    marginVertical: 10,
    padding: 8,
    borderLeftColor: 'grey',
    borderRightColor: 'grey',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 15,
  },
  submittButton: {
    alignSelf: 'flex-end',
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  addTagsButton: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  visibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  visibilityLabel: {
    marginRight: 10,
  },
  visibilityButton: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 5,
  },
});

export default AddRecipePage;
