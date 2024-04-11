import React, { useState } from "react";
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

const App = () => {
  const [signedUser, setSignedUser] = useState({
    id: null,
    name: "",
    avatar: "",
    token: ""
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
      ],
    },
  ]);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);