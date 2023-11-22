import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

function CommentBox ( {comment} ) {

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState(comment.CommentText || 'Error');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://164.90.130.112:5000/api/getUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
    
                    body: JSON.stringify({
                        userId: comment.UserId,
                    }),
                });
                const data = await response.json();
                //console.log('USERID IS: ', comment.UserId);
    
                if(response.ok) {
                    setAuthor(data.results.Username);
                } else{
                    console.error('Error retrieving user', data.error);
                }
            } catch(error){
                console.error('Error connecting to database', error);
            }
        };
        fetchUser();
    }, []);


    return (
        <View style={styles.container}>

            <View style={styles.commentAuthorContainer}>
                <Text style={styles.commentAuthorText}>u/{author}</Text>
            </View>

            <Text style={styles.commentContentText}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        padding: 15,
        borderWidth: 2,
        borderColor:' gray',
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#FFE6C5',
    },
    commentAuthorContainer: {
        borderBottomWidth: 1,
        width: '50%',
    },
    commentAuthorText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    },
    commentContentText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    }
});
export default CommentBox;
