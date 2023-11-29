import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Community() {
    var bp = require('./Path.js');
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var username = ud.username;
    let [recipes, setRecipes] = useState([]);
    const [tagList, setTagList] = useState([])
    const [usertags, setUserTags] = useState([])
    let [inputValue, setInputValue] = useState('');

    const FindRecipe = async event => {

        let obj = { search: inputValue, userId: userId, isPublic: false };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/getRecipes'),
                {
                    method: 'POST', body: js, headers: {
                        'Content-Type':
                            'application/json'
                    }
                });
            var res = JSON.parse(await response.text());
            setRecipes(res.results);

        }
        catch (e) {
            alert(e.toString());
        }
    }

    const Tags = async event => {
        try {
            const response = await fetch(bp.buildPath('api/tags'),
                {});
            setTagList(JSON.parse(await response.text()))

        }
        catch (e) {
            alert(e.toString());
        }
    }


    const handleChange = (event) => {
        setInputValue(event.target.value); // Update the state with the input value
    };

    useEffect(() => {
        Tags()
        FindRecipe();
    }, []);

    return (
        <div id="RecipeListDiv" className=' bg-page-background pt-20 min-h-screen'>

            <h1 className=" text-center text-2xl font-bold leading-9 tracking-tight text-neutral-950">
                Browse the Communities Recipe's!
            </h1>
            <div className="mt-2 mb-3 flex justify-center">
                <input
                    type="text"
                    id="loginInfo"
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
                    onClick={FindRecipe}
                    className="transition-all delay-75 rounded-md bg-orange-500 ml-1 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Search
                </button>
            </div>
            <div className="  mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-7xl border-neutral-950 rounded-lg">
                {recipes.length === 0 ? (
                    <div>No Recipes</div> // Display a loading message when recipes are empty         
                ) : (
                    <div role="grid" className="grid grid-cols-4 gap-3">
                        {recipes.map((recipe) => (
                            <Link to={`/dis/${recipe._id}`}>
                                <div key={recipe._id} className=" rounded shadow-lg px-1 border-3 border-black
                                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-orange-100">
                                    <div className="px-2">
                                        <div className="border-b-1 border-black">
                                            <div className="text-sm">u/{username}</div>
                                            <div className="font-bold text-xl">{recipe.RecipeName}</div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-2 mb-2 h-11 overflow-y-clip">
                                        <div className="font-bold text-sm">{recipe.RecipeContents}</div>
                                    </div>
                                    <div className="mt-2 pb-2">
                                        <div role="grid" className="grid grid-cols-3 gap-2">
                                            {recipe.TagList.map((val) => (
                                                <div className='inline-block' key={val}>
                                                    <p className=' text-sm rounded  text-center' style={{ backgroundColor: tagList[val].color }}>{tagList[val].name}{tagList[val].emoji}</p>
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
        </div >
    );
};

export default Community;