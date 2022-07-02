import React from "react";
import TutorialComponent from "../components/Tutorial";

export default function HomePage() {
  return (
    <>
      <nav className="win_nav">
        <div className="new" id="newBtn">
          <span className="new_icon">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.9584 7.25004H13.2917L10.8751 4.83337H4.83341C3.50425 4.83337 2.41675 5.92087 2.41675 7.25004V21.75C2.41675 23.0792 3.50425 24.1667 4.83341 24.1667H23.5626C24.5897 24.1667 25.3751 23.3813 25.3751 22.3542V9.66671C25.3751 8.33754 24.2876 7.25004 22.9584 7.25004Z"
                fill="#FFA000"
              ></path>
              <path
                d="M25.4958 10.875H9.24367C8.09575 10.875 7.06867 11.7208 6.88742 12.8687L4.83325 24.1667H23.9853C25.1333 24.1667 26.1603 23.3208 26.3416 22.1729L27.852 13.7146C28.1541 12.2646 27.0062 10.875 25.4958 10.875Z"
                fill="#FFCA28"
              ></path>
            </svg>
          </span>
          <h3 className="new_heading">Add New Tutorial</h3>
          <h4 className="new_description">
            add tutorial folder from your hard drive
          </h4>
        </div>
      </nav>

      <div className="tutorials">
        <TutorialComponent
          title="Somme tutorial name"
          path="some great path"
          id="someId"
        ></TutorialComponent>
      </div>
    </>
  );
}
