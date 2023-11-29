import React, { useEffect, useState } from 'react';
import './CommentContainer.css';
import './styles.css';
function CommentBox({ comment }) {
	const [author, setAuthor] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch('https://megabytes.app/api/getUser', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},

					body: JSON.stringify({
						userId: comment.UserId,
					}),
				});

				const data = await response.json();

				if (response.ok) {
					setAuthor(data.results.Username);
				} else {
					console.error('Error retrieving user', data.error);
				}
			} catch (error) {
				console.error('Error connecting to database', error);
			}
		};
		fetchUser();
		setContent(comment.CommentText);
	}, [comment.UserId]);

	return (
		<div className="comment-container">
			<div className="comment-author-container">
				<p className="comment-author-text">u/{author}</p>
			</div>

			<pre className="comment-content-text">{content}</pre>
		</div>
	);
}

export default CommentBox;