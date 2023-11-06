import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function SignInView() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignIn = () => {
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Please enter a username.");
    }

    if (!password) {
      setPasswordError("Please enter a password.");
    }

    if (username && password) {
      navigate("/admin/user/foundItems");
    }
  };

  return (
    <div className=" pt-28  px-28">
      <div>
        <img src={logo} alt="" className="h-14 w-32" />
      </div>
      <div className="pt-20 ">
        <h1 className="font-bold text-4xl">Sign In</h1>
        <p className="text-grey font-bold pt-2">
          Sign in to the admin portal of Ilost
        </p>
      </div>
      <div className="mt-6 pt-2">
        <input
          type="text"
          placeholder="Enter username"
          className="w-full py-4 px-3 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <p className="text-red">{usernameError}</p>
      </div>
      <div className="mt-2">
        <input
          type="password"
          placeholder="Enter password"
          className="w-full py-4 px-3 border border-gray-300 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-red">{passwordError}</p>
      </div>
      <div className="mt-14">
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full bg-light-green  text-white font-bold py-4 rounded-md focus:outline-none focus:ring focus:light-green"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignInView;
