import React, { useState } from "react";
import axios from "axios";


const Forget = () => {
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("/api/forgot-password", { email });
  //     setMessage(response.data.message);
  //   } catch (error) {
  //     setMessage(error.response.data.message);
  //   }
  // };
  return (
    <>
      <div className="flex flex-col items-center justify-center font-bold  text-center ">
        <br />
        <p className="w-full min-h-[40px]   justify-center  text-center font-bold w-74 select-none  text-2xl">
          Reset your password <br />
        </p>
      </div>
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <input
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          placeholder="Username"
          name="Username"
          id=""
          className="border focus:border-2 focus:outline-none border-green-500  focus:border-green-400 h-9  w-full  mb-4  font-bold py-6 px-4 rounded text-xl"
        />
        <input
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="E-mail"
          name="email"
          id=""
          className="border focus:border-2 focus:outline-none border-green-500  focus:border-green-400 h-9  w-full  mb-4  font-bold py-6 px-4 rounded text-xl"
        />

        <br />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Continue
        </button>

        <br />
      </form>
    </>
  );
};

export default Forget;
