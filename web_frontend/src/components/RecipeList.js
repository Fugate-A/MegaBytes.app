import React from 'react';
function RecipeList() {
var loginInfo;
    return (
        <div id="RecipeListDiv">
            <div className="mt-4 p-3 sm:mx-auto sm:w-full sm:max-w-sm bg-orange-100 border-4 border-neutral-950 rounded-lg">
                <div>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="loginInfo"
                            placeholder=" Username/Email"
                            ref={(c) => loginInfo = c}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                        />
                        <button>
                            Search 
                        </button>
                        <button>
                            New Recipe 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeList;