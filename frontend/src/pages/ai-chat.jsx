import React, { useState, useEffect } from 'react';
import Ai from '../assets/avatar.png'
import services from './../services';
const Comment = ({message, avatar,}) => {
  return (
    <div className="flex items-start py-4 px-6 border-t border-gray-200">
      <div className="flex-shrink-0 mr-4">
        <img
          className="h-10 w-10 rounded-full"
          src={avatar}
          alt={"AI"}
        />
      </div>
      <div>
        <div className="font-medium text-lg">AI</div>
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

const MessageBoard = () => {
  const [newMessage, setNewMessage]=  useState('');
  const [Res,setRes]=useState('')

  const addMessage = async () => {
   if(newMessage!=="" && newMessage!==null){
    const data=await services.user.aiChat(newMessage);
    console.log(data);
    setRes(data);
   }

  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <div className="w-100">
          <textarea
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="请输入問題内容"
          ></textarea>
        </div>
        <button
          onClick={addMessage}
          className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          提交留言
        </button>
      </div>
        <div>
          <Comment
            message={Res}
            avatar={Ai}
          />
        </div>
    </div>
  );
};

function AichatPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <MessageBoard  />
    </div>
  );
};

export default AichatPage;
