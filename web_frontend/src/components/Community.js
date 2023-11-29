import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Community() {
    var bp = require('./Path.js');
    let [recipes, setRecipes] = useState([]);
    const [tagList, setTagList] = useState([]);
    let [inputValue, setInputValue] = useState('');

    // Function to fetch public recipes
    const FetchPublicRecipes = async () => {
        //const getRecipes = async () => {

            try {
                const response = await fetch('http://164.90.130.112:5000/api/getPublicRecipes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                const data = await response.json();
                if(response.ok){
                    const detailedRecipes = await Promise.all(
                        data.results.map(async (recipeID) => {
                            const recipeResponse = await fetch('http://164.90.130.112:5000/api/getRecipeByID', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    recipeID: recipeID,
                                }),
                            });
                            const recipeData = await recipeResponse.json();
    
                            if(recipeResponse.ok){
                                return recipeData.results;
                            }else{
                                console.error('\tFailed to fetch recipe details', recipeData.error);
                                return null;
                            }
                        })
                    );
                    setRecipes(detailedRecipes.filter(recipe => recipe != null));
                }else{
                    console.error('Failed to fetch recipes', data.error);
                }
            } catch(error){
                console.error('Error fetching recipes', error);
            }
    
        }

    const Tags = async () => {
        try {
            const response = await fetch(bp.buildPath('api/tags'), {});
            setTagList(JSON.parse(await response.text()));
        }
        catch (e) {
            alert(e.toString());
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value); // Update the state with the input value
    };

    useEffect(() => {
        Tags();
        FetchPublicRecipes(); // Fetch public recipes on component mount
    }, []);

    return (
        <div id="CommunityDiv" className='bg-page-background pt-20 min-h-screen'>
            <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
                Community Recipes
            </h1>
            <div className="mt-2 mb-3 flex justify-center">
                <input
                    type="text"
                    id="searchInfo"
                    placeholder="Search"
                    value={inputValue}
                    onChange={handleChange}
                    required
                    className="pl-2 block w-full sm:max-w-md rounded-md py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                />
                <button
                    type="submit"
                    id="searchBtn"
                    className="transition-all delay-75 rounded-md bg-orange-500 ml-1 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={FetchPublicRecipes}
                >
                    Search
                </button>
            </div>
            <div className="mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-7xl border-neutral-950 rounded-lg">
                {recipes.length === 0 ? (
                    <div>No Recipes Found</div>
                ) : (
                    <div role="grid" className="grid grid-cols-4 gap-3">
                        {recipes.map((recipe, index) => (
                            <Link to={`/dis/${recipe._id}`} key={index}>
                                <div className="rounded shadow-lg px-1 border-3 border-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-orange-100">
                                    <div className="px-2">
                                        <div className="border-b-1 border-black">
                                            <div className="text-sm">Community Recipe</div>
                                            <div className="font-bold text-xl">{recipe.RecipeName}</div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-2 mb-2 h-11 overflow-y-clip">
                                        <div className="font-bold text-sm">{recipe.RecipeContents}</div>
                                    </div>
                                    <div className="mt-2 pb-2">
                                        <div role="grid" className="grid grid-cols-3 gap-2">
                                            {recipe.TagList && recipe.TagList.map((val, index) => (
                                                <div className='inline-block' key={index}>
                                                    {tagList[val] && (
                                                        <p className='text-sm rounded text-center' style={{ backgroundColor: tagList[val].color }}>
                                                            {tagList[val].name}{tagList[val].emoji}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Community;
