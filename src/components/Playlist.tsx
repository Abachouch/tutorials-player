import React from "react";
import Lecture from "../../common/modules/Lecture";
import Section from "../../common/modules/Section";
import SectionComponent from "./Section";
export default function PlaylistComponent({
  lectures,
  sections,
  onPlay,
}: {
  lectures: Lecture[];
  sections: Section[];
  onPlay(lecture: Lecture): void;
}) {
  return (
    <nav className="playlist">
      {sections.map((section: Section, key) => (
        <SectionComponent
          title={section.title}
          lectures={section.lectures}
          onPlay={onPlay}
          key={key}
        ></SectionComponent>
      ))}

      <div className="lectures">
        {lectures.map((lecture: Lecture, key) => (
          <div
            key={key}
            className="lecture"
            onClick={() => {
              onPlay(lecture);
            }}
          >
            <h2 className="lecture_heading">{lecture.title} </h2>
          </div>
        ))}
      </div>
    </nav>
  );
}
