import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, { RootIndex } from "./pages";
import About from "./pages/about";
import "./index.css";
import UserPage from "./pages/users";
import CreateUserPage from "./pages/create-user";
import ErrorPage from "./pages/error-page";
import SignInPage from "./pages/signin-user";
import SignOutPage from "./pages/signout-user";
import AichatPage from "./pages/ai-chat";
import services from "./services";
const App = () => {
  const [signedUser, setSignedUser] = useState({
    id: null,
    name: "",
    avatar:"",
    state: false,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout signedUser={signedUser} />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <RootIndex /> },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/users",
          element: <UserPage signedUser={signedUser} />,
        },
        {
          path: "/create-user",
          element: <CreateUserPage />,
        },
        {
          path: "/signin-user",
          element: <SignInPage setSignedUser={setSignedUser} />,
        },
        {
          path: "/signout-user",
          element: <SignOutPage signedUser={signedUser} setSignedUser={setSignedUser} />,
        },
        {
          path: "/ai-chat",
          element: <AichatPage />,
        },
      ],
    },
  ]);
  const handleSignOut = async () => {
    try {
      // 执行退出操作
      const data = await services.user.signOut();
      if (data.state) {
        // 清除本地存储的登录信息
        const initialUser = {
          id: null,
          name: "",
          avatar: "",
          state: false,
        };
        setSignedUser(initialUser);
        // 导航到首页
        navigate('/');
      } else {
        console.error('Sign out failed: Logout unsuccessful');
      }
    } catch (error) {
      console.error("Error signout:", error);
    }
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 阻止浏览器默认的关闭行为
      event.preventDefault();
      // 执行退出操作
      handleSignOut();
      // 返回一个提示信息，浏览器会显示给用户
      event.returnValue = 'Are you sure you want to leave?';
    };

    // 添加事件监听器
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 清除事件监听器
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleSignOut]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);