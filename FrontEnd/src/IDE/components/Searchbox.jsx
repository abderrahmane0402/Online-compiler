import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import axios from "axios";

const Searchbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/files/search?search=${searchTerm}`);
      setResults(response.data); // Use response.data directly
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group flex items-center w-11/12 h-10 box-border bg-[#5c1f41] rounded-lg hover:shadow-md hover:shadow-slate-900 hover:bg-[#82345f] focus-within:border-2 focus-within:border-white cursor-pointer">
      <Search className="ml-2 text-white" />
      <input
        type="text"
        placeholder="Search"
        className="h-3/5 w-4/5 bg-[#5c1f41] text-white placeholder:text-zinc-300 focus:outline-none group-hover:bg-[#82345f] cursor-pointer ml-2 tracking-wide placeholder:tracking-wider"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.file_id}>
              <a href={`files/${result.filename}`}>{result.filename}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbox;
