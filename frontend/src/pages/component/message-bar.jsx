import React, { useState } from 'react';

const Comment = ({ comment, onDelete }) => {
  return (
    <div className="comment">
      <img src={comment.avatar} alt="avatar" className="avatar" />
      <div className="content">
        <p>{comment.text}</p>
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      </div>
    </div>
  );
};

const CommentForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newComment = {
      id: Date.now(),
      text,
      avatar: 'https://via.placeholder.com/50', // Placeholder avatar URL
    };
    onAdd(newComment);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your comment"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

const message_bar = () => {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="App">
      <h1>Comment Board</h1>
      <div className="comments">
        {comments.map((comment) =>
          <Comment key={comment.id} comment={comment} onDelete={deleteComment} />
        ))}
      </div>
      <CommentForm onAdd={addComment} />
    </div>
  );
};

export default App;
