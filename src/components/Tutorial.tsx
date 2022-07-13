import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function TutorialComponent({
  title,
  path,
  id,
}: {
  title: string;
  path: string;
  id: string;
}) {
  const [thumbnail, setThumbnail] = useState<string>();
  useEffect(() => {
    window.api.getThumbnail(path).then((thumb: string) => {
      if (thumb) setThumbnail("atom://" + thumb);
      console.log(thumb);
    });
  }, [path]);

  const navigator = useNavigate();

  return (
    <article
      className="tutorial"
      onClick={() => {
        console.log(id);
        navigator(`/tutorial/${id}`);
      }}
    >
      <header className="tutorial_header">
        {thumbnail ? (
          <img className="tutorial_img" alt="thumbnail" src={thumbnail} />
        ) : (
          <svg
            className="tutorial_icon"
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
        )}
      </header>

      <div className="tutorial_body">
        <h2 className="tutorial_title">{title}</h2>
        <span className="tutorial_path"> {path} </span>
      </div>
    </article>
  );
}
