import React, { useState } from "react";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
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
