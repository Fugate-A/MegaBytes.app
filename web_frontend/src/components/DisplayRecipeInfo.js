import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DisplayRecipe() {
	var bp = require('./Path.js');
	let [recipe, setRecipe] = useState('');
	const { recipeInfo } = useParams();

	const FindRecipe = async event => {
		let obj = { recipeID: recipeInfo };
		var js = JSON.stringify(obj);

		try {
			const response = await fetch(bp.buildPath('api/getRecipeByID'),
				{
					method: 'POST', body: js, headers: {
						'Content-Type':
							'application/json'
					}
				});

			var res = JSON.parse(await response.text());
			setRecipe(res.results);
			console.log(recipe)
		}
		catch (e) {
			alert(e.toString());
		}
	}

	useEffect(() => {
        FindRecipe();
    }, []);

	return (
		<div className='bg-page-background h-95 flex flex-1 flex-col items-center'>
			<div className='mt-2.5 w-5/12 rounded-md bg-orange-100 border-4 p-2 border-black'>
				<div className='w-full pl-2 pt-2 border-b-4 border-black text-4xl font-bold tracking-tight text-gray-900 pb-2'>
					{recipe.RecipeName}
				</div>
				<div className="flex flex-1 flex-col justify-center items-center">
					<div className=" mt-2 p-2 w-8/12 rounded-md border-4 border-black">
						<pre>
						{recipe.RecipeContents}
						</pre>
					</div>
					<div className="">
					</div>
				</div>
			</div>
		</div>
	)
};

export default DisplayRecipe;