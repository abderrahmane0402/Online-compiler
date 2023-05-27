import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/authentication/signup", {
        username,
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      // setError(error.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center font-bold  text-center ">
        <br />
        <p className="w-full min-h-[40px]   justify-center  text-center font-bold w-74 select-none  text-2xl">
          Create your account codeX{" "}
        </p>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center justify-center"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          name="email"
          className="border focus:border-2 focus:outline-none border-[#501F3A]  focus:border-[#501F3A] h-9  w-full  mb-4  font-bold py-6 px-4 rounded text-xl"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          name="username"
          className="border focus:border-2 focus:outline-none border-[#501F3A]  focus:border-[#501F3A] h-9  w-full  mb-4  font-bold py-6 px-4 rounded text-xl"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          name="password"
          className="border focus:border-2 focus:outline-none border-[#501F3A]  focus:border-[#501F3A] h-9  w-full  mb-4  font-bold py-6 px-4 rounded text-xl"
        />
        <br />
        <button
          type="submit"
          className="bg-[#501F3A] hover:bg-[#501F3A] active:bg-[#501F3A] text-white font-bold py-2 px-4 rounded w-full text-2xl"
        >
          Save
        </button>
        <br />
      </form>
    </>
  );
};
export default SignUp;
