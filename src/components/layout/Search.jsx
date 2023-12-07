import React, { useState } from "react";
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
      className="hero-search-form search-form-style-one"
    >
      <input
        type="text"
        placeholder="Search Your Products..."
        className="search-field bg-white border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="search-submit bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={searchHandler}
      >
        SEARCH
      </button>
    </form>
  );
};

export default Search;
