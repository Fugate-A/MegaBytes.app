import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DisplayRecipe() {
	var bp = require('./Path.js');
	const [recipe, setRecipe] = useState('');
	const { recipeInfo } = useParams();
	const [tagList, setTagList] = useState([])
	const [usertags, setUserTags] = useState([])
	const tagStringColor = []


	const FindRecipe = async event => {

		try {
			const response = await fetch(bp.buildPath('api/tags'),
				{});
			setTagList(JSON.parse(await response.text()))
			for (let i = 0; i < tagList.length; i++) {
				console.log(tagList[i].color)
			}
			
		}
		catch (e) {
			alert(e.toString());
		}

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
			setRecipe(res.results)
			setUserTags(res.results.TagList)
		}
		catch (e) {
			alert(e.toString());
		}
	}

	useEffect(() => {
		FindRecipe();
	}, []);

	return (
		<div className='flex flex-1 flex-col items-center bg-page-background pt-16 min-h-screen'>
			<div className='mt-2.5  bg-orange-100 border-4 p-2 border-black'>
				<div className='pl-2 pt-2 border-b-4 border-black text-4xl font-bold tracking-tight text-gray-900 pb-2'>
					{recipe.RecipeName}
				</div>
				<div className="mt-2 pb-2">
					<div role="grid" className="grid grid-cols-3 gap-2">
						{usertags.map((val) => (
							<div className='inline-block' key={val}>
								<p className='px-1 rounded  text-center' style={{backgroundColor: tagList[val].color}}>{tagList[val].name}{tagList[val].emoji}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='mt-2.5 w-4/12 rounded-md bg-orange-100 border-4 p-2 border-black'>
				<div className="flex flex-1 flex-col justify-center items-center">
					<div className=" mt-2 p-2 rounded-md border-4 border-black">
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