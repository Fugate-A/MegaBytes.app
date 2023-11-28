import React, { useState } from 'react';

const AIRequestModal = ({ visible, onClose, handleAIInput }) => {
  const [foodInput, setFoodInput] = useState('');
  const [inputFrozen, setInputFrozen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetRecipeFromAI = async () => {
    try {
      setLoading(true);
      setInputFrozen(true);

      const response = await fetch('http://164.90.130.112:5000/api/gpt_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeName: foodInput,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const formattedIngredients = data.Ingredients.map((ingredient) => `- ${ingredient}`).join('\n');
        const formattedDirections = data.Directions.map((direction) => `- ${direction}`).join('\n');
        const combinedContent = `Ingredients\n${formattedIngredients}\n\nDirections\n${formattedDirections}`;

        handleAIInput(data.RecipeName, combinedContent);
      } else {
        console.error('Error getting recipe information');
      }
    } catch (error) {
      console.error('Error connecting to database', error);
    } finally {
      setLoading(false);
      setInputFrozen(false);
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${visible ? 'visible' : 'invisible'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-yellow-500 rounded-lg p-6 text-center z-10">
        <p className="text-gray-800 font-bold text-lg mb-4">Modal Content</p>
        <div className="mb-4">
          <input
            type="text"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            placeholder="Enter recipe name"
            className="p-2 border border-gray-300 rounded"
            disabled={inputFrozen}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleGetRecipeFromAI}
          disabled={inputFrozen || loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
        <button
          className="text-blue-500 underline text-sm cursor-pointer"
          onClick={onClose}
          disabled={inputFrozen || loading}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AIRequestModal;
