import React, { createContext, useContext, useReducer, useState } from 'react';

const CommentContext = createContext();

const initialState = {
    comments: [],
};

const commentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload };
        default:
            return state;
    }
};

const CommentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commentReducer, initialState);
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const allComments = await Promise.all(
                recipe.CommentList.map(async (commentID) => {
                    const response = await fetch('http://164.90.130.112:5000/api/getCommentByID', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            commentID: commentID._id,
                        }),
                    });
                    const commentData = await response.json();

                    if(response.ok){
                        return commentData.results;
                    }else{
                        console.error('Failed to fetch comment details', commentData.error);
                        return null;
                    }
                })
            );
            setComments(allComments.filter(comment => comment != null));
        } catch(error){
            console.error('Error fetching comments', error);
        }
    }

    return (
        <CommentContext.Provider value={{ comments, fetchComments }}>
            {children}
        </CommentContext.Provider>
    );
};

const useCommentContext = () => {
    const context = useCommentContext(CommentContext);
    if(!context){
        throw new Error('useCommentContext must be used within a CommentProvider');
    }
    return context;
};

export { CommentProvider, useCommentContext };