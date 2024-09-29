import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { RootState, set_model_to_destroy, set_model_upgrade_trigger, set_model_downgrade_trigger, set_model_tier_change, set_model_destroy_trigger, set_delete_object_mode, set_delete_object_mouse_trigger } from "../../Store.tsx"; // prettier-ignore
import { useSelector, useDispatch } from "react-redux";
import { Edges, Html } from "@react-three/drei";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp, faHammer, faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "./AudioPlayer.tsx";

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component Component that combines a common logic for imported 3D models, such as model interaction,
//Component default model mesh data, mesh standard material data, model annotation UI
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ModelComponentsCommonLogic() {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); // prettier-ignore
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state); // prettier-ignore
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); // prettier-ignore
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active); // prettier-ignore
  const model_upgrade_trigger = useSelector((state: RootState) => state.modelsData.model_upgrade_trigger); //prettier-ignore
  const model_downgrade_trigger = useSelector((state: RootState) => state.modelsData.model_downgrade_trigger); //prettier-ignore
  const delete_object_mouse_trigger = useSelector((state: RootState) => state.controlsInput.delete_object_mouse_trigger); //prettier-ignore
  const model_destroy_tigger = useSelector((state: RootState) => state.modelsData.model_destroy_trigger); // prettier-ignore

  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_selected, set_model_selected] = useState<boolean>(false);
  const [model_destroyed, set_model_destroyed] = useState<boolean>(false);

  const [annotation_upgrade_button_hover, set_annotation_upgrade_button_hover] = useState<boolean>(false);
  const [annotation_downgrade_button_hover, set_annotation_downgrade_button_hover] = useState<boolean>(false);
  const [annotation_delete_button_hover, set_annotation_delete_button_hover] = useState<boolean>(false);

  //[SectionNav] mesh interaction, mesh data
  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Model Interaction + Default mesh material data ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function ModelOnClick(model_name: string) {
    if (page_mode === "edit" && !model_creation_state) {
      set_model_selected(true);
      playSound("object_selecting_sound");
    } else if (page_mode === "raid") {
      set_model_selected(true);
      dispatch(set_model_to_destroy(model_name));
      set_model_destroyed(true);
      dispatch(set_model_destroy_trigger(model_destroy_tigger + 1));
      playSound("raid_sound");
    }
  }

  function ModelOnPointerOver() {
    if (!model_creation_state && page_mode !== "overview") {
      set_model_hover(true);
    }
  }

  function ModelOnPointerOut() {
    if (!model_creation_state && page_mode !== "overview") {
      set_model_hover(false);
    }
  }

  function ModelMissedClick() {
    if (!model_creation_state && page_mode !== "overview") {
      set_model_selected(false);
    }
  }

  const defaultMeshKey = useMemo(() => {
    return enable_model_textures && !model_hover && page_mode !== "edit" ? "textured" : "not-textured";
  }, [enable_model_textures, model_hover, page_mode]);

  function defaultMeshMaterial(model_material: THREE.Material) {
    if (enable_model_textures && page_mode === "overview") {
      return { material: model_material };
    }

    if (enable_model_textures && page_mode === "raid") {
      if (model_hover) {
        return { material: new THREE.MeshStandardMaterial({ color: "red" }) };
      } else if (!model_hover) {
        return { material: model_material };
      }
    }
  }

  //[SectionNav] mesh material
  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Mesh Standard Material ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function meshStandardMaterialColor(model_type: "stone" | "metal" | "armored") {
    const default_colors = {stone: "#bcb4a9", metal: "#edb587", armored: "#5c3d2e"}; //prettier-ignore
    const hover_colors = {stone: "#dedad4", metal: "#ffca9e", armored: "#aa7155"}; //prettier-ignore
    const select_colors = {stone: "#eeecec", metal: "#ffd5b3", armored: "#bc8b71"}; //prettier-ignore
    const raid_color = "#ff1c1c";

    if (page_mode === "edit") {
      return model_selected ? select_colors[model_type] : model_hover ? hover_colors[model_type] : default_colors[model_type]; //prettier-ignore
    }

    if (page_mode === "raid") {
      return model_hover ? raid_color : default_colors[model_type];
    }
  }

  const meshStandardMaterialWireframe = useMemo(() => {
    return models_xray_active ? true : false;
  }, [models_xray_active]);

  const meshEdgesVisibility = useMemo(() => {
    if (!models_xray_active) {
      // return <Edges linewidth={1} scale={1} threshold={25} color={"#2b2b2b"} />;
      return;
    }
  }, [model_selected, models_xray_active]);

  //[SectionNav] model annotation
  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Model annotation UI ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  //prettier-ignore
  function meshAnnotationVisibility(annotation_data: [string, string, string]) {
    if (!model_selected) return null;

    return (
      <Html position={[0, 1, 0]} distanceFactor={25}>
        <div
          className="main_annotation_container"
          onClick={(e) => {e.stopPropagation(), set_model_selected(true)}}
        >
          <div className="annotation_content_container">
            <div className="annotation_model_name">{annotation_data[0]}</div>
            <div className="annotation_buttons_container">

              <div onClick={() => upgradeSelectedModelTrigger(annotation_data[1] === "upgradeable")} className={annotation_data[1] === "upgradeable" ? "annotation_button" : "annotation_button annotation_button_disabled"} onMouseEnter={() => set_annotation_upgrade_button_hover(true)} onMouseLeave={() => set_annotation_upgrade_button_hover(false)}>
                  <div className="annotation_button_icons_container">
                    <FontAwesomeIcon icon={faHammer} style={{ width: "1vw", height: "2vh", color: annotation_data[1] === "upgradeable" ? annotation_upgrade_button_hover ? "#ffd5b3" : "#bbbbbb" : "#696969"}} />
                    <FontAwesomeIcon icon={faAnglesUp} style={{ width: "1vw", height: "2vh", color: annotation_data[1] === "upgradeable" ? annotation_upgrade_button_hover ? "#ffd5b3" : "#bbbbbb" : "#696969"}} />
                  </div>
                  <div className="annotation_button_description">upgrade</div>
                </div>

              <div onClick={() => downgradeSelectedModelTrigger(annotation_data[2] === "downgradeable")} className={annotation_data[2] === "downgradeable" ? "annotation_button" : "annotation_button annotation_button_disabled"} onMouseEnter={() => set_annotation_downgrade_button_hover(true)} onMouseLeave={() => set_annotation_downgrade_button_hover(false)}>
                  <div className="annotation_button_icons_container">
                    <FontAwesomeIcon icon={faHammer} style={{ width: "1vw", height: "2vh", color: annotation_data[2] === "downgradeable" ? annotation_downgrade_button_hover ? "#ffd5b3" : "#bbbbbb" : "#696969"}} />
                    <FontAwesomeIcon icon={faAnglesDown} style={{ width: "1vw", height: "2vh", color: annotation_data[2] === "downgradeable" ? annotation_downgrade_button_hover ? "#ffd5b3" : "#bbbbbb" : "#696969"}} />
                  </div>
                  <div className="annotation_button_description">d. grade</div>
                </div>

              <div className="annotation_button" onClick={() => deleteSelectedModelTrigger()} onMouseEnter={() => set_annotation_delete_button_hover(true)} onMouseLeave={() => set_annotation_delete_button_hover(false)}>
                  <div className="annotation_button_icons_container">
                    <FontAwesomeIcon icon={faTrashCanArrowUp} style={{ width: "1vw", height: "2vh", color: annotation_delete_button_hover ? "#ffd5b3" : "#bbbbbb"}} />
                  </div>
                  <div className="annotation_button_description">delete</div>
                </div>
            </div>
          </div>

          <div className="annotation_polyline_container">
            <svg className="annotation_line" viewBox="0 0 250 100" preserveAspectRatio="none" vectorEffect="non-scaling-stroke">
              <polyline points="30,90 77.5,10 250,10" stroke="#ffd5b3" strokeWidth="3" fill="none" />
            </svg>
          </div>
        </div>
      </Html>
    );
  }

  function upgradeSelectedModelTrigger(active: boolean) {
    if (active) {
      dispatch(set_model_tier_change("upgrade"));
      dispatch(set_model_upgrade_trigger(model_upgrade_trigger + 1));
    }
  }

  function downgradeSelectedModelTrigger(active: boolean) {
    if (active) {
      dispatch(set_model_tier_change("downgrade"));
      dispatch(set_model_downgrade_trigger(model_downgrade_trigger + 1));
    }
  }

  function deleteSelectedModelTrigger() {
    dispatch(set_delete_object_mode("delete_selected_object"));
    dispatch(set_delete_object_mouse_trigger(delete_object_mouse_trigger + 1));
  }

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  useEffect(() => {
    set_model_destroyed(false);
    set_model_hover(false);
    set_model_selected(false);
    set_model_hover(false);
  }, [reset_raid_models, page_mode, model_creation_state]);

  useEffect(() => {
    if (page_mode === "raid") {
      set_model_hover(false);
    }
  }, [model_destroy_tigger]);

  return {
    model_destroyed,
    defaultMeshKey,
    defaultMeshMaterial,
    ModelOnClick,
    ModelOnPointerOver,
    ModelOnPointerOut,
    ModelMissedClick,
    meshStandardMaterialColor,
    meshStandardMaterialWireframe,
    meshEdgesVisibility,
    meshAnnotationVisibility,
  };
}
