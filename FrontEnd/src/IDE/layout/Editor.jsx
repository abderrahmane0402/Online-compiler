import React from "react";
const Editor = ({ children }) => {
  return (
    <div className="border h-full w-7/12 bg-[#501F3A] rounded-xl flex flex-col justify-between">
      <header className="w-full min-h-[40px] border-b-2"></header>
      <div className="w-full h-full">
        {children}
      </div>
      <footer className="w-full h-11 border-t-2"></footer>
    </div>
  );
};

export default Editor;
