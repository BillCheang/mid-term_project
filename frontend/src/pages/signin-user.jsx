import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import services from "../services";
import { useNavigate } from 'react-router-dom';

function SingnInPage({setSignedUser}) {
  const [formData, setFormData] = useState({ username: "", password: ""});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleTextInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Attempt to sign in
      const data = await services.user.signIn(formData);
      setSignedUser(data);
      if (data.state) {
        navigate('/');
        // You may also update state or perform any necessary actions upon successful sign-in
        setSignedUser(data); // Assuming you have a function to update the signed-in user state
      } 
      else {
        // If sign-in failed, display a warning message
        setMessage("Invalid username or password. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occur during sign-in
      console.error("Error signing in:", error);
      setMessage("An error occurred during sign-in. Please try again later.");
    }

    // Reset form fields
    setFormData({ username: "", password: "" });
  }; 

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign In
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  autoComplete="username"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleTextInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <pre>{message}</pre>
    </>
  );
}

export default SingnInPage;
