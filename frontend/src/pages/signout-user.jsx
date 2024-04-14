import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import services from "../services";

function SignOutPage({ signedUser, setSignedUser }) {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleSignOut = () => {
    // 使用 services.user.signOut 來執行登出，並清除 token
    const loggedOut = services.user.signOut(signedUser.token);
    
    if (loggedOut) {
      // 登出成功後，設置狀態為已登出，並導航到首頁
      const initalUser = {
        id: 123,
        name: "",
        avatar:"",
        state: false,
      };
      setIsLoggedOut(true);
      // 清除本地存儲的登入資訊
      setSignedUser(initalUser); // 將 signedUser 清空

      //clear cookie and jwt
      navigate('/'); // 導航到首頁
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
          <h1>Sign Out</h1>
          <p>Are you sure you want to sign out?</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default SignOutPage;
