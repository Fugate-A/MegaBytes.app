import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

function CommentBox ( {comment} ) {

    const [author, setAuthor] = useState('');

    const fetchUser = async () => {
        try {
            const response = await fetch('http://164.90.130.112:5000/api/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    userId: comment.UserID,
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
    
    fetchUser();


    return (
        <View>
            <Text>u/{author}</Text>
            <Text style={styles.commentContentText}>{comment.CommentContents}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        padding: 15,
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 10,
    },
    commentContentText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    }
});
export default CommentBox;
