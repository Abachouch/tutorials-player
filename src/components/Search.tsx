import { clear } from "console";
import React, { useState } from "react";
import Tutorial from "../../common/modules/Tutorial";
import TutorialComponent from "./Tutorial";

export default function SearchComponent() {
  const [result, setResult] = useState<Tutorial[]>([]);

  function searchTutorialByName(e: any) {
    const queryText = (e.target as HTMLInputElement).value;
    console.log(queryText);
    if (queryText.trim() === "") {
      clearResults();
    } else
      window.api.findTutorialsByName(queryText).then((res: Tutorial[]) => {
        if (res) setResult(res);
      });
  }

  function clearResults() {
    setResult([]);
  }

  return (
    <div className="search">
      <input
        className="search_input"
        id="searchInput"
        placeholder="search"
        type="search"
        onChange={(e) => searchTutorialByName(e)}
      />
      <div className={`search_result ${result.length > 0 ? "is-open" : ""}`}>
        <h2 className="search_heading">Tutorials List</h2>
        <div className="search_tutorials">
          {result.map((tutorial: Tutorial) => (
            <TutorialComponent
              key={tutorial._id}
              id={tutorial._id}
              path={tutorial.fullPath}
              title={tutorial.title}
            ></TutorialComponent>
          ))}
        </div>
      </div>
    </div>
  );
}
