import { useState } from "react";
import Body from "./layout/Body";
import Header from "./layout/Header";
import TextEditor from "./layout/TextEditor";
import Editor from "./layout/Editor";
import Terminal from "./layout/Terminal";
import Ss from "./layout/Ss";
export default function Ide() {
  const [code, setcode] = useState('#include<stdio.h>\n\nint main(){\n\tprintf("hello world");\n\treturn 0;\n}')
  return (
     <Body>
       <Header code={code}>
       </Header>
       <TextEditor>
         <Editor>
          <Ss code={code} setcode={setcode}/>
         </Editor>
         <Terminal />
       </TextEditor>
     </Body>
  );
}

