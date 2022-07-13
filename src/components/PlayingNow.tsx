import React from "react";
import Lecture from "../../common/modules/Lecture";

export default function PlayingNowComponent({
  currentLecture,
  prevLecture,
  nextLecture,
  onPlay,
}: {
  currentLecture: Lecture;
  prevLecture: Lecture | null;
  nextLecture: Lecture | null;
  onPlay(lecture: Lecture): void;
}) {
  return (
    <div className="playing">
      <h2 className="playing_heading">PLAYING NOW</h2>
      <p className="playing_title">{currentLecture.title}</p>

      <div className="playing_controls">
        <button
          disabled={prevLecture === null}
          className={`playing_prev `}
          onClick={() => {
            if (prevLecture) onPlay(prevLecture);
          }}
        >
          &lt;
        </button>
        <button
          disabled={nextLecture === null}
          className={`playing_next `}
          onClick={() => {
            if (nextLecture) onPlay(nextLecture);
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
