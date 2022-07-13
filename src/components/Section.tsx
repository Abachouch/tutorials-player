import React from "react";
import Lecture from "../../common/modules/Lecture";

export default function SectionComponent({
  lectures,
  title,
  onPlay,
}: {
  lectures: Lecture[];
  title: string;
  onPlay(lecture: Lecture): void;
}) {
  return (
    <div className="section">
      <h2
        className="section_heading"
        onClick={(event) => {
          event.currentTarget.parentElement?.classList.toggle("is-open");
        }}
      >
        {title}
      </h2>
      <div className="lectures">
        {lectures.map((lecture: Lecture, key: number) => (
          <div
            key={key}
            className="lecture"
            onClick={() => {
              onPlay(lecture);
            }}
          >
            <h2 className="lecture_heading"> {lecture.title} </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
