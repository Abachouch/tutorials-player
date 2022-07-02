import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlaylistComponent from "../components/Playlist";
export default function PlaylistPage() {
  let { id } = useParams();
  const navigator = useNavigate();
  return (
    <>
      <nav className="playlist_nav">
        <button
          className="playlist_nav_return"
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
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <h1 className="playlist_nav_title"></h1>
        <div className="playlist_nav_controls">
          <button className="playlist_nav_remouve">
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
      <div className="playlist_content">
        <PlaylistComponent id={id || ""} />
        <aside className="playlist_aside"></aside>
        <div className="playlist_video--wraper">
          <video className="playlist_video" controls></video>
        </div>
      </div>
    </>
  );
}
