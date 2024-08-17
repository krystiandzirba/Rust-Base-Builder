import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { RootState, set_model_to_destroy, set_model_destroy_trigger } from "../../Store.tsx";
import { useSelector, useDispatch } from "react-redux";
import { AudioPlayer } from "./AudioPlayer.tsx";
import object_selecting_sound from "../../audio/object_selecting_sound.mp3";
import raid_sound from "../../audio/raid_sound.mp3";

export function ModelComponentsCommonLogic() {
  const dispatch = useDispatch();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); // prettier-ignore
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state); // prettier-ignore
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); // prettier-ignore
  const enable_model_material = useSelector((state: RootState) => state.pageSettings.enable_model_material); // prettier-ignore
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active); // prettier-ignore
  const model_destroy_tigger = useSelector((state: RootState) => state.modelsData.model_destroy_trigger); // prettier-ignore
  const audio = useSelector((state: RootState) => state.pageSettings.audio); // prettier-ignore

  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_selected, set_model_selected] = useState<boolean>(false);
  const [model_destroyed, set_model_destroyed] = useState<boolean>(false);

  //* ------------------------- ↓ Default Mesh Interaction & Data ↓ -------------------------

  const defaultMeshKey = useMemo(() => {
    return enable_model_textures && !model_hover && page_mode !== "edit" ? "textured" : "not-textured";
  }, [enable_model_textures, model_hover, page_mode]);

  function defaultMeshMaterial(model_material: THREE.Material) {
    if (enable_model_textures && !model_hover && page_mode !== "edit") {
      return { material: model_material };
    } else if (model_hover && page_mode === "raid") {
      return { material: new THREE.MeshStandardMaterial({ color: "red" }) };
    } else {
      return {};
    }
  }

  function ModelOnClick(model_name: string) {
    if (page_mode === "edit" && !model_creation_state) {
      set_model_selected(true);
      if (audio) {
        AudioPlayer(object_selecting_sound);
      }
    } else if (page_mode === "raid") {
      set_model_selected(true);
      dispatch(set_model_to_destroy(model_name));
      set_model_destroyed(true);
      dispatch(set_model_destroy_trigger(model_destroy_tigger + 1));
      if (audio) {
        AudioPlayer(raid_sound);
      }
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

  //* ------------------------- ↑ Default Mesh Interaction & Data ↑ -------------------------

  //* ------------------------- ↓ Mesh Standard Material ↓ -------------------------

  const meshStandardMaterialOpacity = useMemo(() => {
    if (!model_creation_state && enable_model_material) {
      return model_selected ? 1 : model_hover ? 0.6 : 1;
    } else return 1;
  }, [model_creation_state, enable_model_material, model_selected, model_hover]);

  function meshStandardMaterialColor(model_type: "stone" | "metal" | "armored") {
    const default_colors = {stone: "#bbbbbb", metal: "#7d3823", armored: "#401f16"}; //prettier-ignore
    const hover_colors = {stone: "#ffdaba", metal: "#ff845e", armored: "#5c3227"}; //prettier-ignore
    const select_colors = {stone: "#f5b784", metal: "#f5b784", armored: "#5c3227"}; //prettier-ignore
    const base_color = default_colors[model_type] || "#bbbbbb";
    const raid_color = "#ff1c1c";

    if (!model_creation_state) {
      if (enable_model_material) {
        if (page_mode === "edit") {
          return model_selected ? select_colors[model_type] : model_hover ? hover_colors[model_type] : base_color;
        } else if (page_mode === "raid") {
          return model_hover ? raid_color : base_color;
        }
      } else {
        return model_selected ? select_colors[model_type] : base_color;
      }
    }

    return base_color;
  }

  const meshStandardMaterialWireframe = useMemo(() => {
    return models_xray_active ? true : false;
  }, [models_xray_active]);

  //* ------------------------- ↑ Mesh Standard Material ↑ -------------------------

  useEffect(() => {
    set_model_destroyed(false);
    set_model_hover(false);
    set_model_selected(false);
  }, [reset_raid_models, page_mode, model_creation_state]);

  return {
    defaultMeshKey,
    defaultMeshMaterial,
    ModelOnClick,
    ModelOnPointerOver,
    ModelOnPointerOut,
    ModelMissedClick,
    meshStandardMaterialOpacity,
    meshStandardMaterialColor,
    meshStandardMaterialWireframe,
    model_destroyed,
  };
}
