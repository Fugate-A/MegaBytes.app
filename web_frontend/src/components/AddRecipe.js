import React, { useState, useEffect } from 'react';
import ErrorMessageModal from './ErrorMessageModal';
import TagSelectionModal from './TagSelectionModal';
import AIRequestModal from './AIRequestModal';

function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recipeTags, setRecipeTags] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [AIgenerated, setAIgenerated] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showTagSelectionModal, setShowTagSelectionModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUser = localStorage.getItem('user_data');

        if (storedUser) {
          const userObject = JSON.parse(storedUser);
          const userId = userObject.id;
          setUserID(userId);
        }
      } catch (error) {
        console.error('Error retrieving userID from cache', error);
      }
    };

    fetchUserID();
  }, []);

  const handleAddRecipe = async () => {
    try {
      const response = await fetch('https://megabytes.app/api/addRecipe', {
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
          ai_generated: AIgenerated,
        }),
      });

      console.log('Adding Recipe');

      if (response.ok) {
        window.location.href = '/rec';
      } else {
        console.error('Error adding Recipe');

        setErrorMessage('Error adding Reicpe');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('ERROR CONNECTING TO DATABASE', error);
    }
  };

  const handleUpdateRecipeTags = (updatedTags) => {
    setRecipeTags(updatedTags);
  };

  const handleAIInput = (updatedTitle, updatedContent) => {
    setTitle(updatedTitle);
    setContent(updatedContent);
    setAIgenerated(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const closeAIModal = () => {
    setShowAIModal(false);
  };

  const openAIModal = () => {
    setShowAIModal(true);
  };

  const openTagSelectionModal = () => {
    setShowTagSelectionModal(true);
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleGoHome = () => {
    window.location.href = 'rec'; 
  };

  return (
    
    <div style={{ backgroundColor: '#FFF0DC', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 90, paddingBottom: 50 }}>
      <h1 style={{ fontSize: '32px', fontFamily: 'Tilt-Neon', marginBottom: '20px' }}>Create a recipe</h1>
      <div style={{ position: 'relative', width: '60%', padding: '20px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
          <p onClick={handleGoHome} style={{ fontSize: 24, fontFamily: 'Tilt-Neon', color: '#FF0000', margin: 0 }}>X</p>
        </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <button
                onClick={openAIModal}
                style={{ flex: '1', marginRight: '15px', padding: '10px', backgroundColor: '#51E4E5', borderRadius: '15px', borderWidth: 1, borderColor: 'black' }}
            >
                <p style={{ fontSize: 24, fontFamily: 'Tilt-Neon', margin: 0 }}>Generate with AI 🤖</p>
            </button>

            {showAIModal && <AIRequestModal visible={showAIModal} onClose={closeAIModal} handleAIInput={handleAIInput} />}

            
            </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            backgroundColor: '#FFE6C5',
            borderRadius: '15px',
            width: '100%',
            height: '80px',
            marginBottom: '10px',
            padding: '8px',
            fontSize: '30px',
            fontFamily: 'Tilt-Neon',
            fontWeight: 'bold',
            
            borderRightWidth: 2,
            borderRightColor: 'gray', 

            borderLeftWidth: 2,
            borderLeftColor: 'gray', 
          }}
        />

        <div style={{ 
            backgroundColor: '#FFE6C5', 
            height: '80%', 
            borderRadius: '15px',
            borderRightWidth: 2,
            borderRightColor: 'gray', 

            borderLeftWidth: 2,
            borderLeftColor: 'gray', 
        }}>
            <textarea
                placeholder="Ingredients and Directions"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ 
                    width: '100%', 
                    height: 150,
                    margin: '10px 0', 
                    padding: '8px', 
                    fontFamily: 'Tilt-Neon', 
                    fontSize: '16px', 
                    backgroundColor: '#FFE6C5' 
                }}
            />
        </div>

        <button
          onClick={openTagSelectionModal}
          style={{
            display: 'flex',
            backgroundColor: '#FFE6C5',
            borderWidth: 1,
            borderRadius: '15px',
            borderColor: 'black',
            padding: '10px',
            marginTop: '10px',
            width: '15%',
            cursor: 'pointer',
          }}
        >
          <p style={{ fontSize: '20px', fontFamily: 'Tilt-Neon', marginLeft: '10px', color: 'black' }}>Add Tags</p>
        </button>

        {showTagSelectionModal && (
          <TagSelectionModal visible={true} onUpdateRecipeTags={handleUpdateRecipeTags} onClose={() => setShowTagSelectionModal(false)} currentTags={recipeTags} />
        )}
        <div style={{
					display: 'flex',
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: 'black'
			}}>

            <div style={{ backgroundColor: '#FFE6C5', display: 'flex', alignItems: 'center', marginTop: 10,marginBottom: 10,  padding: '10px', borderRadius: '15px', borderWidth: 1, width: '30%', borderColor: 'black', }}>
                <p style={{ fontSize: '24px', marginRight: '10px', fontFamily: 'Tilt-Neon' }}>Privacy:</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={toggleVisibility} className="flex items-center" style={{ cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }}>
                    <div
                        className={`w-4 h-4 px-4 py-4 rounded-full border border-black mr-2 ${visibility ? 'bg-green-500' : 'bg-white'}`}
                        style={{ cursor: 'pointer' }}
                    />
                    <span className="text-2xl">{visibility ? 'Public' : 'Private'}</span>
                    </button>

                </div>
                    
            </div>

            <button
                onClick={handleAddRecipe}
                style={{
                    padding: '10px',
                    backgroundColor: '#51E564',
                    borderRadius: '15px',
                    borderWidth: 1,
                    borderColor: 'black',
                    width: '25%',
                    height: 50,
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',  // Center the text horizontally
                }}
            >
                <p style={{ fontSize: 24, fontFamily: 'Tilt-Neon', padding: 5, margin: 0 }}>Submit</p>
            </button>

        </div>

       
      </div>

      <ErrorMessageModal visible={showErrorModal} message={errorMessage} onClose={closeErrorModal} />
    </div>
  );
}

export default AddRecipePage;
