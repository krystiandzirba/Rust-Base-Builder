import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { RootState, set_model_to_destroy, set_model_destroy_trigger } from "../../Store.tsx";
import { useSelector, useDispatch } from "react-redux";
import { AudioPlayer } from "./AudioPlayer.tsx";
import object_selecting_sound from "../../audio/object_selecting_sound.mp3";
import raid_sound from "../../audio/raid_sound.mp3";
import { Edges } from "@react-three/drei";

export function ModelComponentsCommonLogic() {
  const dispatch = useDispatch();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); // prettier-ignore
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state); // prettier-ignore
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); // prettier-ignore
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
    if (page_mode === "overview") {
      return { material: model_material };
    }
    if (page_mode === "edit") {
      return {};
    }
    if (page_mode === "raid") {
      if (model_hover) {
        return { material: new THREE.MeshStandardMaterial({ color: "red" }) };
      } else if (!model_hover) {
        return { material: model_material };
      }
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
    if (!model_creation_state) {
      return model_selected ? 1 : model_hover ? 1 : 1;
    } else return 1;
  }, [model_creation_state, model_selected, model_hover]);

  function meshStandardMaterialColor(model_type: "stone" | "metal" | "armored") {
    const default_colors = {stone: "#bcb4a9", metal: "#bb7e5d", armored: "#5c3d2e"}; //prettier-ignore
    const hover_colors = {stone: "#dedad4", metal: "#febd9a", armored: "#aa7155"}; //prettier-ignore
    const select_colors = {stone: "#eeecec", metal: "#feceb3", armored: "#bc8b71"}; //prettier-ignore

    const base_color = default_colors[model_type] || "#bbbbbb";
    const raid_color = "#ff1c1c";

    if (page_mode === "edit") {
      return model_selected ? select_colors[model_type] : model_hover ? hover_colors[model_type] : base_color;
    } else if (page_mode === "raid") {
      return model_hover ? raid_color : base_color;
    } else return base_color;
  }

  const meshStandardMaterialWireframe = useMemo(() => {
    return models_xray_active ? true : false;
  }, [models_xray_active]);

  const meshEdgesVisibility = useMemo(() => {
    return <Edges linewidth={1} scale={1} threshold={25} color={"#2b2b2b"} />;
  }, [model_selected]);

  //* ------------------------- ↑ Mesh Standard Material ↑ -------------------------

  useEffect(() => {
    set_model_destroyed(false);
    set_model_hover(false);
    set_model_selected(false);
  }, [reset_raid_models, page_mode, model_creation_state]);

  useEffect(() => {
    if (page_mode === "raid") {
      set_model_hover(false);
    }
  }, [model_destroy_tigger]);

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
    meshEdgesVisibility,
    model_destroyed,
  };
}
