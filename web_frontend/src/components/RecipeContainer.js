import React, { useState, useEffect } from 'react';

function RecipeContainer( {recipe} ) {

    const [author, setAuthor] = useState('');

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
        fetchUser();
    }, []);

    return (
        <div style={{
            width: '100%',
            height: 150,
            padding: 10,
            borderWidth: 2,
            borderRadius: 15,
            marginBottom: 10,
            backgroundColor: '#FFE6C5',
            borderColor: 'black',
            overflow: 'hidden',
        }}>

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
                maxHeight: '80%',
            }}>
                <pre style={{
                     fontSize: 14,
                }}>
                    {recipe.RecipeContents}
                </pre>
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