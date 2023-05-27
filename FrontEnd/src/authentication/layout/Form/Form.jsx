import { useState } from "react";
import Forget from "./Forget";
import Login from "./Login";
import SignUp from "./SignUp";
const Form = () => {
  const [activeComponent, setActiveComponent] = useState("login");

  const handleLoginClick = () => setActiveComponent("login");

  const handleForgetClick = () => setActiveComponent("forget");

  const handleSignUpClick = () => setActiveComponent("signup");

  return (
    <div className="h-auto w-[500px] bg-[#F6F2F2] rounded-3xl  py-2 px-2 text-1xl flex flex-col">
      <p className="   text-center font-bold  m-5 text-3xl">Welcome back</p>
      <header className="w-full min-h-[40px]   justify-center text-white  text-center font-bold w-74 select-none  text-3xl ">
        <button
          type="submit"
          className="bg-[#0F292F] hover:bg-light active:bg-light text-white font-bold py-2 px-4  w-1/2"
          onClick={handleSignUpClick}
        >
          Sign up
        </button>
        <button
          type="submit"
          className="bg-[#501F3A] hover:bg-light active:bg-light text-white font-bold py-2 px-4  w-1/2"
          onClick={handleLoginClick}
        >
          Log in
        </button>
      </header>
      {activeComponent == "login" && <Login click={handleForgetClick} />}
      {activeComponent == "forget" && <Forget />}
      {activeComponent == "signup" && <SignUp />}
    </div>
  );
};

export default Form;
