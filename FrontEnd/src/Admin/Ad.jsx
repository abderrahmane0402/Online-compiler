import { useState } from "react";
import Hea from "./components/Hea";
import AddEdit from "./pages/AddEdit";

export default function Ad() {
  return (
      <div className='App'>

        <Hea />
        <AddEdit />
      </div>
  );
}