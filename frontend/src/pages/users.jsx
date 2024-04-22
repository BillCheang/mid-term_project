import React, { useState, useEffect } from 'react';
import service from './../services';

const Comment = ({ username, message, avatar, onDelete, isCurrentUser }) => {
  return (
    <div className="flex items-start py-4 px-6 border-t border-gray-200">
      <div className="flex-shrink-0 mr-4">
        <img
          className="h-10 w-10 rounded-full"
          src={avatar}
          alt={username}
        />
      </div>
      <div>
        <div className="font-medium text-lg">{username}</div>
        <p className="text-gray-800">{message}</p>
        {isCurrentUser && (
          <button
            className="text-red-500 hover:text-red-700 mt-2"
            onClick={onDelete}
          >
            删除
          </button>
        )}
      </div>
    </div>
  );
};

const MessageBoard = ({ signedUser }) => {
  const [messages, setMessages] = useState([
    // 添加更多留言
  ]);
  const [newUsername, setNewUsername] = useState('');
  const [newMessage, setNewMessage]=  useState('');
  
  useEffect(() => {
    // 副作用函数
    getAllmsg();
   
  }, []);
  
  async function getAllmsg() {
    try {
      const data = await service.msg.getAll();
      setMessages(data)
     
    } catch (error) {
      console.error("Error :", error);
    }
  }

 
  const addMessage = async () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = { msg: newMessage };
      try {
        const data = await service.msg.createOne(newMessageObj);
        if (data.state) {
          getAllmsg();
        } else {
          console.error("Error submit");
        }
      } catch (error) {
        console.error("Error submit:", error);
      }
      setNewUsername('');
      setNewMessage('');
    } else {
      console.error("message is empty.");
    }
  };

  const deleteMessage = async (id) => {
    try {
      const data = await service.msg.deleteOne(id);
      if (data.state) {
        getAllmsg();
      } else {
        console.error("Error submit");
      }
    } catch (error) {
      console.error("Error submit:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {signedUser.state &&
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
      }
      {messages.map((message) => (
        <div key={message.id}>
          <Comment
            username={message.username}
            message={message.msg}
            avatar={message.avatar}
            onDelete={() => deleteMessage(message.id)}
            isCurrentUser={signedUser && signedUser.id === message.user_id}
          />
        </div>
      ))}
    </div>
  );
};

function UserPage({ signedUser }) {
  return (
    <div className="max-w-3xl mx-auto">
      <MessageBoard signedUser={signedUser} />
    </div>
  );
};

export default UserPage;
