import { useSelector } from "react-redux";
import { RootState } from "../../Store";

import buttons_sound from "../../audio/buttons_sound.mp3";
import controls_sound from "../../audio/controls_sound.mp3";
import menu_sound from "../../audio/menu_sound.mp3";
import object_hover_sound from "../../audio/object_hover_sound.mp3";
import object_selecting_sound from "../../audio/object_selecting_sound.mp3";

import build_sound from "../../audio/build_sound.mp3";
import rotation_sound from "../../audio/rotation_sound.mp3";
import delete_sound from "../../audio/delete_sound.mp3";

import raid_sound from "../../audio/raid_sound.mp3";
import charge_sound from "../../audio/charge_sound.mp3";
import rocket_sound from "../../audio/rocket_sound.mp3";
import ammo_sound from "../../audio/ammo_sound.mp3";
import satchel_sound from "../../audio/satchel_sound.mp3";

const sounds: { [key: string]: string } = {
  buttons_sound,
  controls_sound,
  menu_sound,
  object_hover_sound,
  object_selecting_sound,
  build_sound,
  rotation_sound,
  delete_sound,
  raid_sound,
  charge_sound,
  rocket_sound,
  ammo_sound,
  satchel_sound,
};

export const useAudioPlayer = () => {
  const enable_audio = useSelector((state: RootState) => state.pageSettings.audio);

  const playSound = (soundName: string) => {
    if (enable_audio) {
      const audio = new Audio(sounds[soundName]);
      audio.volume = 0.08;
      audio.play();
    }
  };

  return playSound;
};
