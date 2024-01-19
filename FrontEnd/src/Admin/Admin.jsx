import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";

export default function Admin() {
  return (
      <div className='App'>

        <Header />
        <Home />
      </div>
  );
}

