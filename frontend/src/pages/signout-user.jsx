import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import services from "../services";

function SignOutPage({ signedUser, setSignedUser }) {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleSignOut = async () => {
    // 使用 services.user.signOut 來執行登出，並清除 token
    let data = '';
    navigate('/');
    try{
      data = await services.user.signOut();

    }catch (error) {
      console.error("Error signout:", error);
    }
    if (data.state) {
      // 登出成功後，設置狀態為已登出，並導航到首頁
      const initalUser = {
        id: null,
        name: "",
        avatar:"",
        state: false,
      };
      setIsLoggedOut(true);
      // 清除本地存儲的登入資訊
      setSignedUser(initalUser); // 將 signedUser 清空
      //clear cookie and jwt 
    } else {
      console.error('Sign out failed: Logout unsuccessful');
    }
  };

  return (
    <div>
      {isLoggedOut ? (
        <p>Successfully logged out. Redirecting...</p>
      ) : (
        <div>
          <h1 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            Sign Out</h1>
          <p className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            Are you sure you want to sign out?</p>
          <button className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default SignOutPage;
