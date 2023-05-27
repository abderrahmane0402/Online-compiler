// import CodeMirror from "@uiw/react-codemirror";
// import { StreamLanguage } from "@codemirror/language";
// import { c } from "@codemirror/legacy-modes/mode/clike";
// import { githubDark } from "@uiw/codemirror-theme-github"

import { useRef, useEffect } from "react";

// import { useState } from "react";
// function writeCode(ide, text) {
//   let l = "";
//   ide.current.innerHTML = "";
//   text.map((line) => {
//     ide.current.innerHTML += "<span>";
//     ide.current.innerText += line;
//     ide.current.innerHTML += "</span><br/>";
//   });
// }
// function dev(ide, text) {
//   let newtext = text.split("\n");
//   writeCode(ide, newtext);
// }
const Ss = (props) => {
  const editor = useRef(null);
  // useEffect(() => {
  //   dev(editor, props.code);
  // }, [props.code]);

  return (
    // <CodeMirror
    //   value={props.code}
    //   theme={githubDark}
    //   className="text-lg w-full h-full"
    //   readOnly={false}
    //   onChange={(value) => props.setcode(value)}
    //   height="100%"
    //   extensions={[StreamLanguage.define(c)]}
    // />
    <div className="flex w-full h-full">
      <div className="w-10 h-full border"></div>
      <div className="w-full h-full relative">
        <pre ><code ref={editor} className="text-lg font-mono">{props.code}</code></pre>
        <textarea
          onChange={(e) => {
            props.setcode(e.target.value);
          }}
          value={props.code}
          name="code"
          className="w-full h-full text-transparent text-lg font-mono bg-transparent caret-white absolute top-0 resize-none focus:outline-none"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
};
export default Ss;
