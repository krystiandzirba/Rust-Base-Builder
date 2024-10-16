import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component GitHub icon and link,
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function Github() {
  function GithubMouseClick() {
    window.open("https://github.com/krystiandzirba/Rust-Base-Builder", "_blank");
  }

  return (
    <div className="github" onClick={GithubMouseClick}>
      <FontAwesomeIcon icon={faGithub} style={{ width: "50%", height: "50%" }} />
      <span className="github_text">
        Tutorial
        <br /> More info
      </span>
    </div>
  );
}
