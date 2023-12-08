import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form
      method="post"
      id="search_form-one"
      onSubmit={searchHandler}
      className="flex items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Buscar productos..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        outline="true"
        size="lg"
        className="gap-2 text-white focus:!border-white rounded-full text-center font-sans"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Button
        type="filled"
        size="lg"
        onClick={searchHandler}
        className="bg-blue-gray-600 hover:bg-blue-gray-400 transition-colors duration-300 p-4 rounded-full"
      >
        buscar
      </Button>
    </form>
  );
};

export default Search;
