import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const [settings_button_click, set_settings_button_click] = useState<boolean>(false);
  const [settings_button_hover, set_settings_button_hover] = useState<boolean>(false);

  function SettingsButtonClick() {
    set_settings_button_click(!settings_button_click);
  }

  function SettingsButtonEnter() {
    set_settings_button_hover(true);
  }

  function SettingsButtonLeave() {
    set_settings_button_hover(false);
  }

  return (
    <>
      <div
        className={
          settings_button_click
            ? "settings_container settings_container_displayed"
            : "settings_container settings_container_hidden"
        }
      ></div>

      <div className="settings_button_container">
        <button
          className="settings_button"
          onClick={() => SettingsButtonClick()}
          onMouseEnter={() => SettingsButtonEnter()}
          onMouseLeave={() => SettingsButtonLeave()}
        >
          {!settings_button_hover && <FontAwesomeIcon icon={faGear} size="3x" style={{ color: "#a8a8a8" }} />}
          {
            settings_button_hover && <FontAwesomeIcon icon={faGear} spin size="3x" style={{ color: settings_button_hover ? "#d4d4d4" : "#a8a8a8", }}/> //prettier-ignore
          }
        </button>
      </div>
    </>
  );
};

export default Settings;
