import React from "react";
import "./styles.css";
import SearchIcon from "@mui/icons-material/Search";

function Search({ search, handleChange }) {
  return (
    <div className="search-container">
      <SearchIcon sx={{ color: "var(--grey)", fontSize: "1.2rem" }} />
      <input
        className="search-input-field"
        type="text"
        placeholder="Search coins..."
        value={search}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default Search;
