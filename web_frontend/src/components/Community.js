import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Community() {
    var bp = require('./Path.js');
    let [recipes, setRecipes] = useState([]);
    let [inputValue, setInputValue] = useState('');

    // Function to fetch public recipes
    const FetchPublicRecipes = async () => {
        try {
            const response = await fetch(bp.buildPath('api/getPublicRecipes'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            var res = JSON.parse(await response.text());
            setRecipes(res.results);
        } catch (e) {
            alert(e.toString());
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value); // Update the state with the input value
    };

    useEffect(() => {
        FetchPublicRecipes();
    }, []);

    return (
        <div id="CommunityDiv" className=' bg-page-background pt-20 min-h-screen'>
            <h1 className=" text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
                Community Recipes
            </h1>
            <div className="mt-2 mb-3 flex justify-center">
                <input
                    type="text"
                    id="searchInfo"
                    placeholder=" Search"
                    value={inputValue}
                    onChange={handleChange}
                    required
                    className="pl-2 block w-full sm:max-w-md rounded-md py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm  sm:leading-6"
                />
                <button
                    type="submit"
                    id="searchBtn"
                    class="buttons" value="Search"
                    onClick={FetchPublicRecipes}
                    className="transition-all delay-75 rounded-md bg-orange-500 ml-1 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Search
                </button>
            </div>
            <div className="  mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-7xl border-neutral-950 rounded-lg">
                {recipes.length === 0 ? (
                    <div>No Recipes</div>
                ) : (
                    <div role="grid" className="grid grid-cols-4 gap-3">
                        {recipes.map((recipe) => (
                            <Link to={`/dis/${recipe._id}`}>
                                <div key={recipe._id} className=" rounded shadow-lg px-1 border-3 border-black
                                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-orange-100">
                                    <div className="px-2">
                                        <div className="border-b-1 border-black">
                                            <div className="text-sm">Recipe by Community</div>
                                            <div className="font-bold text-xl">{recipe.RecipeName}</div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-2 mb-2 h-11 overflow-y-clip">
                                        <div className="font-bold text-sm">{recipe.RecipeContents}</div>
                                    </div>
                                    {/* Tags and other recipe details can go here */}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Community;
