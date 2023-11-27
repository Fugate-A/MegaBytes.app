import React, { useState, useEffect } from 'react';
import ErrorMessageModal from '../components/ErrorMessageModal';
import TagSelectionModal from '../components/TagSelectionModal';
function AddRecipe() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recipeTags, setRecipeTags] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showTagSelectionModal, setShowTagSelectionModal] = useState(false);


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

  const handleAddRecipe = async event => {
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
        window.location.href = '/rec';
      } else {
        console.error('Error adding Recipe');

        setErrorMessage('Error adding Recipe');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('\tERROR CONNECTING TO DATABASE\n', error);
    }
  };

  const handleUpdateRecipeTags = (updatedTags) => {
    setRecipeTags(updatedTags);
  }

  const closeErrorModal = () => {
    setShowErrorModal(false);
  }

  const openTagSelectionModal = () => {
    setShowTagSelectionModal(true);
  }

  const toggleVisibility = () => {
    setVisibility(!visibility);
  }

  return (
    <div className="container mx-auto p-4">
      <button onClick={handleAddRecipe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>

      <div className="mt-4 p-4 bg-white shadow-md rounded-md">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 p-2 mb-4 border-b-2 border-black"
        />

        <textarea
          placeholder="Ingredients and Directions"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 p-2 mb-4 border-2 border-gray-400 rounded"
          rows="4"
        />

        <button
          onClick={openTagSelectionModal}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Add Tags
        </button>

        {showTagSelectionModal && (
          <TagSelectionModal
            visible={true}
            onUpdateRecipeTags={handleUpdateRecipeTags}
            onClose={() => setShowTagSelectionModal(false)}
            currentTags={recipeTags}
          />
        )}

        <div className="flex items-center mt-4">
          <span className="mr-2 font-bold">Visibility:</span>
          <button onClick={toggleVisibility} className="flex items-center">
            <div className={`w-4 h-4 rounded-full border border-black mr-2 ${visibility ? 'bg-green-500' : 'bg-white'}`} />
            <span>{visibility ? 'Public' : 'Private'}</span>
          </button>
        </div>
      </div>

      <ErrorMessageModal visible={showErrorModal} message={errorMessage} onClose={closeErrorModal} />
    </div>
  );
};
export default AddRecipe;