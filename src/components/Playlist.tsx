import React from "react";

export default function PlaylistComponent({ id }: { id: string }) {
  return (
    <aside className="playlist">
      <div className="section">
        <h2 className="section_heading">Playlist heading</h2>
        <div className="lectures">
          <div className="lecture">
            <h2 className="lecture_heading">Lecture 1</h2>
          </div>
        </div>
      </div>
      <div className="lectures">
        <div className="lecture">
          <h2 className="lecture_heading">Lecture 1</h2>
        </div>
        <div className="lecture">
          <h2 className="lecture_heading">Lecture 1</h2>
        </div>
        <div className="lecture">
          <h2 className="lecture_heading">Lecture 1</h2>
        </div>
        <div className="lecture">
          <h2 className="lecture_heading">Lecture 1</h2>
        </div>
      </div>
    </aside>
  );
}
