import React from "react";

export default function SearchComponent() {
  return (
    <div className="search">
      <input
        className="search_input"
        id="searchInput"
        placeholder="search"
        type="search"
      />
      <div className="search_result" id="searchResult">
        <section className="search_main">
          <h2 className="search_heading">Tutorials List</h2>
          <div className="search_tutorials" id="searchTutorials"></div>
        </section>
      </div>
    </div>
  );
}
