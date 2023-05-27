import React, { useState } from "react";

const Terminal = () => {
  const [result, setResult] = useState("Hello world !!!\nprogram exit with 0 in status");
  return (
    <div className="border h-full w-2/5 bg-[#501F3A] rounded-xl flex flex-col">
      <header className="w-full min-h-[40px] border-b-2 flex items-center justify-center text-white font-semibold text-xl">
        console
      </header>
      <div className="w-full h-full"></div>
    </div>
  );
};

export default Terminal;
