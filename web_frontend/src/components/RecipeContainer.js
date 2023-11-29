import React, { useState, useEffect } from 'react';

function RecipeContainer( {recipe} ) {

    const [author, setAuthor] = useState('');
    const [allTags, setAllTags] = useState([]);

    const [loading, setLoading] = useState(true);

    console.log(recipe);
    
    const fetchTags = async () => {
        try {
            const response = await fetch('https://megabytes.app/api/tags');
            const data = await response.json();
    
            if (response.ok) {
                setAllTags(data);
            } else {
                console.error('Error retrieving tags from server');
            }
        } catch (error) {
            console.error('Error connecting to server', error);
        } finally{
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetch('https://megabytes.app/api/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    userId: recipe.UserId,
                }),
            });
            const data = await response.json();

            if(response.ok) {
                setAuthor(data.results.Username);
            } else{
                console.error('Error retrieving user');
            }
        } catch(error){
            console.error('Error connecting to database', error);
        } 
    };

    useEffect(() => {
        fetchTags();
        fetchUser();
    }, []);

    if(loading){
        return null;
    }

    return (
        <div style={{
            width: '100%',
            height: 250,
            padding: 10,
            borderWidth: 2,
            borderRadius: 15,
            marginBottom: 10,
            backgroundColor: '#FFE6C5',
            borderColor: 'black',
            overflow: 'hidden',
        }} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>

            <div style={{
                 borderBottomWidth: 1,
                 borderBottomColor: 'gray',
            }}>
                <p style={{
                    fontSize: 12,
                }}>
                    u/{author}
                </p>
                <p style={{
                    fontSize: 20,
                }}>{recipe.RecipeName}</p>
            </div>

            <div style={{
                maxHeight: '60%',
                overflow: 'hidden',
            }}>
                <pre style={{
                     fontSize: 14,
                }}>
                    {recipe.RecipeContents}
                </pre>
            </div>

            <div style={{
                borderTopWidth: 1,
                borderColor: 'black',
            }}>
                {allTags && recipe.TagList && recipe.TagList.length > 0 && (

                recipe.TagList.slice(0, 3).map((val) => (
                        <div 
                            className='inline-block' key={val}
                            style={{
                                marginRight: 3,
                            }
                        }>
                        <p className='text-sm rounded text-center' style={{ backgroundColor: allTags[val].color, marginLeft: 5, fontSize: 24, padding: 5, marginTop: 5, }}>{allTags[val].name}{allTags[val].emoji}</p>
                        </div>
                    ))
                )}
            </div>

            <div style={{
                position: 'absolute',
                flexDirection: 'row',
                top: 5,
                right: 5,
            }}>
                {recipe.AI_Generated && (
                    <p style={{
                        fontSize: 15,
                    }}>
                        🤖
                    </p>
                )}
                {recipe.IsPublic && (
                    <p style={{
                        fontSize: 15,
                    }}>
                        🌍
                    </p>
                )}
            </div>

        </div>
    )


}

export default RecipeContainer;