import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login({ click }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [store, setStore] = useState(false);
  useEffect(() => {
    if (store) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      navigate("/ide");
    }
    return setStore(false);
  }, [store]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/authentication/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        setStore(true);
        console.log("success");
        //
        //window.location.href = '/ShortUser';
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center font-bold  text-center ">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br />
        <p className="w-full min-h-[40px]   justify-center  text-center font-bold w-74 select-none  text-2xl">
          Log in with your codeX <br />
          account to continue
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
          id=""
          className="border focus:border-2 focus:outline-none border-[#501F3A]  focus:border-[#501F3A] h-9  w-full  mb-4  font-bold py-6 px-4 rounded text-xl"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          name="password"
          id=""
          className="border focus:border-2 focus:outline-none border-[#501F3A]  focus:border-[#501F3A] h-9  w-full  mb-4  font-bold py-6 px-4 rounded text-xl"
        />
        {/* <p className="text-center  font-semibold text-10xl mb-8">
          <div onClick={click} className="cursor-pointer">
            Forget your password ?
          </div>
        </p> */}
        <button
          type="submit"
          className="bg-[#501F3A] hover:bg-light active:bg-light text-white font-bold py-2 px-4 rounded w-full"
        >
          Log in
        </button>
        <br />
        <br />
      </form>
    </>
  );
}
