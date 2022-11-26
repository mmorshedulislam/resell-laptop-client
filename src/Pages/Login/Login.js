import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const { signInEmailPassword, googleSignIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const { register, handleSubmit } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;
    signInEmailPassword(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginError("");
      })
      .catch((err) => {
        setLoginError(err.message || err.code);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div className="w-full px-5 lg:w-1/2 lg:mx-auto my-10">
      <h2 className="text-3xl mb-5">Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="my-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Your Email"
            {...register("email", { required: true })}
          />
        </div>
        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            {...register("password", { required: true })}
          />
        </div>
        <p className="text-red-400 mb-2">{loginError}</p>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
      <div className="flex justify-between">
        <div className="flex items-start my-6">
          <label
            for="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <button>
              You don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-700">
                Sign Up
              </Link>
            </button>
          </label>
        </div>
        <div className="flex items-start my-6">
          <label
            for="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <button className="text-blue-700">Forgotten Password?</button>
          </label>
        </div>
      </div>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
