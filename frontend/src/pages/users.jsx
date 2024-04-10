import React, { useState } from 'react';

const Comment = ({ postID, userID, username, message, onDelete, isCurrentUser }) => {
  return (
    <div className="flex items-start py-4 px-6 border-t border-gray-200">
      <div className="flex-shrink-0 mr-4">
        <img
          className="h-10 w-10 rounded-full"
          src={`https://i.pravatar.cc/150?u=${username}`}
          alt={username}
        />
      </div>
      <div>
        <div className="font-medium text-lg">{username}</div>
        <p className="text-gray-800">{message}</p>
        {isCurrentUser && (
          <button
            className="text-red-500 hover:text-red-700 mt-2"
            onClick={() => onDelete(postID)}
          >
            删除
          </button>
        )}
      </div>
    </div>
  );
};

const MessageBoard = ({ userID }) => {
  const [messages, setMessages] = useState([
    { postID: 1, userID: 123, username: 'User1', message: '这是用户1的留言。' },
    { postID: 2, userID: 456, username: 'User2', message: '这是用户2的留言。' },
    // 添加更多留言
  ]);
  const [newUsername, setNewUsername] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const addMessage = () => {
    if (newUsername && newMessage) {
      const newPostID = messages.length + 1;
      const newMessageObj = { postID: newPostID, userID, username: newUsername, message: newMessage };
      setMessages([...messages, newMessageObj]);
      setNewUsername('');
      setNewMessage('');
    }
  };

  const deleteMessage = (postID) => {
    const updatedMessages = messages.filter(message => message.postID !== postID);
    setMessages(updatedMessages);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {userID !== 0 && (
        <div className="mb-4">
          <div className="w-100">
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="请输入留言内容"
            ></textarea>
          </div>
          <button
            onClick={addMessage}
            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            提交留言
          </button>
        </div>
      )}
      {messages.map((message) => (
        <div key={message.postID}>
          <Comment
            postID={message.postID}
            userID={message.userID}
            username={message.username}
            message={message.message}
            onDelete={deleteMessage}
            isCurrentUser={userID !== 0 && userID === message.userID}
          />
        </div>
      ))}
    </div>
  );
};

function UserPage() {
  // 假设您有某种用户认证机制
  // currentUser 表示已登录用户
  const currentUser = { userID: 123, username: 'User1' }; // 示例用户

  return (
    <div className="max-w-3xl mx-auto">
      <MessageBoard userID={currentUser.userID} />
    </div>
  );
};

export default UserPage;
