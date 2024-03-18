import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

//? ----------------------------------------------------------------------------------------------------

//? GitHub icon and link

//? ----------------------------------------------------------------------------------------------------

export default function Github() {
  const [github_hovered, set_github_hovered] = useState<boolean>(false);

  function GithubMouseEnter() {
    set_github_hovered(true);
  }

  function GithubMouseLeave() {
    set_github_hovered(false);
  }

  function GithubMouseClick() {
    window.open("https://github.com/krystiandzirba/Rust-Base-Builder", "_blank");
  }

  return (
    <div className="github" onMouseEnter={GithubMouseEnter} onMouseLeave={GithubMouseLeave} onClick={GithubMouseClick}>
      <FontAwesomeIcon icon={faGithub} size="xl" style={{ color: github_hovered ? "#ffd5b3" : "#bbbbbb" }} />
      <div className="github_text">info</div>
    </div>
  );
}
