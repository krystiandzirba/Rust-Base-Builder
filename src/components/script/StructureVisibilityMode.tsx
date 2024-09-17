import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import {
  set_models_xray_active,
  set_foundations_active,
  set_walls_active,
  set_floors_active,
  set_stairs_active,
  set_doors_active,
  set_frames_active,
  set_roofs_active,
  set_miscs_active,
} from "../../Store.tsx";

import { AudioPlayer } from "./AudioPlayer.tsx";
import buttons_sound from "../../audio/buttons_sound.mp3";
import { useEffect, useState } from "react";

//? ----------------------------------------------------------------------------------------------------

//? This component allows users to change the visibility of specific object types.
//? including enabling/disabling the X-Ray mode.

//? ----------------------------------------------------------------------------------------------------

export default function StructureVisibilityMode() {
  const dispatch = useDispatch();
  const canvas_models_array = useSelector((state: RootState) => state.canvasModelsArray.canvas_models_array as string[]); //prettier-ignore
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active);
  const foundations_active = useSelector((state: RootState) => state.modelsData.foundations_active);
  const walls_active = useSelector((state: RootState) => state.modelsData.walls_active);
  const floors_active = useSelector((state: RootState) => state.modelsData.floors_active);
  const stairs_active = useSelector((state: RootState) => state.modelsData.stairs_active);
  const doors_active = useSelector((state: RootState) => state.modelsData.doors_active);
  const frames_active = useSelector((state: RootState) => state.modelsData.frames_active);
  const roofs_active = useSelector((state: RootState) => state.modelsData.roofs_active);
  const miscs_active = useSelector((state: RootState) => state.modelsData.miscs_active);
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const [models_count, set_models_count] = useState({
    foundations_count: 0,
    walls_count: 0,
    floors_count: 0,
    doors_count: 0,
    frames_count: 0,
    stairs_count: 0,
    roofs_count: 0,
    miscs_count: 0,
  });

  function toggleSpecificModels(set_specific_models: (arg0: boolean) => any, specific_models: boolean) {
    dispatch(set_specific_models(!specific_models));
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  useEffect(() => {
    const countModels = () => {
      let foundations_count = 0;
      let walls_count = 0;
      let floors_count = 0;
      let doors_count = 0;
      let frames_count = 0;
      let stairs_count = 0;
      let roofs_count = 0;
      let miscs_count = 0;

      canvas_models_array.forEach((model) => {
        if (model.includes("Foundation")) foundations_count++;
        if ((model.includes("Wall") || model.includes("Strenghtened") || model.includes("Embrasure")) && !model.includes("Frame")) walls_count++; //prettier-ignore
        if (model.includes("Floor") && model.includes("Frame")) floors_count++;
        if (model.includes("Door") && !model.includes("Doorway")) doors_count++;
        if (model.includes("Frame")) frames_count++;
        if (model.includes("Stairs")) stairs_count++;
        if (model.includes("Roof")) roofs_count++;
        if (model.includes("Cupboard") || model.includes("Box") || model.includes("Furnace") || model.includes("Workbench") || model.includes("Sleeping")) miscs_count++; //prettier-ignore
      });

      set_models_count({foundations_count, walls_count, floors_count, doors_count, frames_count, stairs_count, roofs_count, miscs_count}); //prettier-ignore
    };

    countModels();
  }, [canvas_models_array]);

  return (
    <>
      {/* prettier-ignore */}
      <div className={`structure_visibility_main_container ${page_mode === "overview" ? "structure_visibility_main_container_overview_position" : page_mode === "edit" ? "structure_visibility_main_container_edit_position" : "structure_visibility_main_container_raid_position"}`}>
        <div className="structure_visibility_description">3D Objects visibility</div>
        <div className="structure_visibility_buttons_container">
          <div className="structure_visibility_buttons_column">
            <div 
            className={!models_xray_active && page_mode === "edit" ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"}
            onClick={() => toggleSpecificModels(set_models_xray_active, models_xray_active)}>
              xray ({canvas_models_array.length})
            </div>
          </div>
          <div className="structure_visibility_buttons_column">
            <div 
              className={foundations_active ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"} 
              onClick={() => toggleSpecificModels(set_foundations_active, foundations_active)}>
                found. ({models_count.foundations_count})
              </div>
            <div 
              className={walls_active ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"}
              onClick={() => toggleSpecificModels(set_walls_active, walls_active)}>
                walls ({models_count.walls_count})
              </div>
          </div>
          <div className="structure_visibility_buttons_column">
            <div 
              className={floors_active ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"}
              onClick={() => toggleSpecificModels(set_floors_active, floors_active)}>
                floors ({models_count.floors_count})
              </div>
            <div 
              className={doors_active ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"}
              onClick={() => toggleSpecificModels(set_doors_active, doors_active)}>
                doors ({models_count.doors_count})
              </div>
          </div>
          <div className="structure_visibility_buttons_column">
            <div 
              className={frames_active ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"}
              onClick={() => toggleSpecificModels(set_frames_active, frames_active)}>
                frames ({models_count.frames_count})
              </div>
            <div 
              className={stairs_active ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"} 
              onClick={() => toggleSpecificModels(set_stairs_active, stairs_active)}>
                stairs ({models_count.stairs_count})
              </div>
          </div>
          <div className="structure_visibility_buttons_column">
            <div 
              className={roofs_active ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"}
              onClick={() => toggleSpecificModels(set_roofs_active, roofs_active)}>
                roofs ({models_count.roofs_count})
                </div>
            <div 
              className={miscs_active ? "structure_visibility_button structure_visibility_button_enabled" : "structure_visibility_button structure_visibility_button_disabled"}
              onClick={() => toggleSpecificModels(set_miscs_active, miscs_active)}>
                miscs ({models_count.miscs_count})
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
