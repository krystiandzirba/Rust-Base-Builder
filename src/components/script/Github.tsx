import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

//? ----------------------------------------------------------------------------------------------------

//? GitHub icon and link

//? ----------------------------------------------------------------------------------------------------

export default function Github() {
  function GithubMouseClick() {
    window.open("https://github.com/krystiandzirba/Rust-Base-Builder", "_blank");
  }

  return (
    <div className="github" onClick={GithubMouseClick}>
      <FontAwesomeIcon icon={faGithub} size="xl" />
      <span className="github_text">about</span>
    </div>
  );
}
