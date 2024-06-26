import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import services from "../services";
import { useNavigate } from 'react-router-dom';

function CreateUserPage() {
  const navigate = useNavigate(); // Move the hook call outside the component
  const [formData, setFormData] = useState({ username: "", profilePicture: null });
  const [message, setMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const handleTextInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png"];

    if (file && !allowedFormats.includes(file.type)) {
      setFileError("Please upload a valid image file (JPEG/PNG)");
      setFormData((prev) => ({
        ...prev,
        profilePicture: null,
      }));
    } else {
      setFileError("");
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
     
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!fileError) {
      const userData = new FormData();
      userData.append("username", formData.username);
      userData.append("file", formData.profilePicture);
      try {
        // Attempt to create user
        const data = await services.user.createOne(userData);
        if (data.state) {
          // Show alert with password
          alert("Password:"+ data.password);
          // Navigate to signin page
          navigate("/signin-user");
          // Clear form data
          setFormData({ username: "", profilePicture: null });
        } else {

          setMessage("An Username signed");
          console.error("Error submit");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        setMessage("An error occurred during user creation. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
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
              </div>
              <div>
                <label htmlFor="profilePicture" className="sr-only">
                  Profile Picture
                </label>
                <input
                  name="profilePicture"
                  id="profilePicture"
                  type="file"
                  accept=".jpg, .png"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleFileInputChange}
                />
                {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <pre>{message}</pre>
    </>
  );
}

export default CreateUserPage;
