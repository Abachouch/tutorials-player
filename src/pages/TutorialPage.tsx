import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lecture from "../../common/modules/Lecture";
import Section from "../../common/modules/Section";
import Tutorial from "../../common/modules/Tutorial";
import PlayingNowComponent from "../components/PlayingNow";
import PlaylistComponent from "../components/Playlist";

export default function PlaylistPage() {
  let { id } = useParams();
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [prevLecture, setPrevLecture] = useState<Lecture | null>(null);
  const [nextLecture, setNextLecture] = useState<Lecture | null>(null);

  const [tutorial, setTutorial] = useState<Tutorial>();
  useEffect(() => {
    window.api
      .getTutorial(id as string)
      .then((tut) => {
        setTutorial(tut);
      })
      .catch((err) => {
        console.error("err");
      });
  }, [id]);

  function playLecture(lecture: Lecture) {
    setCurrentLecture(lecture);
    if (tutorial) {
      let allLectures = [
        ...tutorial.lectures,
        ...tutorial.sections.map((s) => [s.lectures]),
      ].flat(2);

      const currentLecturePosition = allLectures.findIndex(
        (l) => l.fullpath === lecture.fullpath
      );

      setNextLecture(
        currentLecturePosition < allLectures.length - 1
          ? allLectures[currentLecturePosition + 1]
          : null
      );

      setPrevLecture(
        currentLecturePosition === 0
          ? null
          : allLectures[currentLecturePosition - 1]
      );
    }
  }

  const navigator = useNavigate();

  return (
    <section className="player">
      <nav className="player_nav">
        <button
          className="player_nav_return"
          onClick={() => {
            navigator("/");
          }}
        >
          <svg
            width="34"
            height="22"
            viewBox="0 0 34 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9567 3L2.99999 11M2.99999 11L10.9567 19M2.99999 11H30.8486"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="player_nav_title">
          {tutorial ? (tutorial as Tutorial).title : ""}
        </h1>
        <div className="player_nav_controls">
          <button className="player_nav_remouve">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 2V0H5V2H0V4H2V19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H17C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V4H20V2H15ZM16 4V18H4V4H16ZM13 7H11V15H13V7ZM9 7H7V15H9V7Z" />
            </svg>
          </button>
        </div>
      </nav>

      {tutorial ? (
        <aside className="player_aside">
          {currentLecture ? (
            <PlayingNowComponent
              currentLecture={currentLecture}
              prevLecture={prevLecture}
              nextLecture={nextLecture}
              onPlay={(lecture) => {
                playLecture(lecture);
              }}
            ></PlayingNowComponent>
          ) : (
            ""
          )}

          <PlaylistComponent
            lectures={tutorial.lectures as Lecture[]}
            sections={tutorial.sections as Section[]}
            onPlay={(lecture) => {
              playLecture(lecture);
            }}
          />
        </aside>
      ) : (
        ""
      )}

      <video
        className="player_video"
        controls
        onEnded={() => {
          if (nextLecture) playLecture(nextLecture);
        }}
        src={currentLecture ? `atom://${currentLecture?.fullpath}` : ""}
      ></video>
    </section>
  );
}
