import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useDispatch } from "react-redux";
import { RootState } from "../../../Store.tsx";
import { useSelector } from "react-redux";
import { set_model_to_destroy, set_model_destroy_trigger } from "../../../Store.tsx";
import { AudioPlayer } from "../../script/AudioPlayer.tsx";
import object_selecting_sound from "../../../audio/object_selecting_sound.mp3";
import raid_sound from "../../../audio/raid_sound.mp3";

type GLTFResult = GLTF & {
  nodes: {
    Cube003: THREE.Mesh;
  };
  materials: {
    ["Material.063"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const dispatch = useDispatch();

  const {
    page_mode,
    models_xray_active,
    miscs_active,
    model_creation_state,
    enable_model_textures,
    enable_model_material,
    model_destroy_tigger,
    reset_raid_models,
    audio,
  } = useSelector((state: RootState) => ({
    page_mode: state.pageMode.page_mode,
    models_xray_active: state.modelsData.models_xray_active,
    miscs_active: state.modelsData.miscs_active,
    model_creation_state: state.modelsData.model_creation_state,
    enable_model_textures: state.pageSettings.enable_model_textures,
    enable_model_material: state.pageSettings.enable_model_material,
    model_destroy_tigger: state.modelsData.model_destroy_trigger,
    reset_raid_models: state.modelsData.reset_raid_models,
    audio: state.pageSettings.audio,
  }));

  const { nodes, materials } = useGLTF("./models/misc/tool_cupboard_textured.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_selected, set_model_selected] = useState<boolean>(false);
  const [model_destroyed, set_model_destroyed] = useState<boolean>(false);

  const meshKey = useMemo(() => {
    return enable_model_textures && !model_hover && page_mode !== "edit" ? "textured" : "not-textured";
  }, [enable_model_textures, model_hover, page_mode]);

  const meshMaterial = useMemo(() => {
    if (enable_model_textures && !model_hover && page_mode !== "edit") {
      return materials["Material.063"];
    } else if (model_hover && page_mode === "raid") {
      return new THREE.MeshStandardMaterial({ color: "red" });
    }
  }, [enable_model_textures, model_hover, page_mode, materials]);

  function ModelOnClick() {
    if (page_mode === "edit" && !model_creation_state) {
      set_model_selected(true);
      if (audio) {
        AudioPlayer(object_selecting_sound);
      }
    } else if (page_mode === "raid") {
      set_model_selected(true);
      dispatch(set_model_to_destroy(Model.displayName));
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

  const ModelMaterialOpacity = useMemo(() => {
    if (!model_creation_state && enable_model_material) {
      return model_selected ? 1 : model_hover ? 0.6 : 1;
    } else return 1;
  }, [model_creation_state, enable_model_material, model_selected, model_hover]);

  const ModelMaterialColor = useMemo(() => {
    if (!model_creation_state) {
      if (enable_model_material) {
        if (page_mode === "edit") {
          return model_selected ? "#f5b784" : model_hover ? "#ffdaba" : "#bbbbbb";
        } else if (page_mode === "raid") {
          return model_hover ? "red" : "#bbbbbb";
        }
      } else {
        return model_selected ? "#f5b784" : "#bbbbbb";
      }
    }
    return "#bbbbbb";
  }, [model_creation_state, enable_model_material, page_mode, model_selected, model_hover]);

  const ModelMaterialWireframe = useMemo(() => {
    return models_xray_active ? true : false;
  }, [models_xray_active]);

  useEffect(() => {
    set_model_destroyed(false);
    set_model_hover(false);
    set_model_selected(false);
  }, [reset_raid_models]);

  useEffect(() => {
    set_model_hover(false);
    set_model_selected(false);
  }, [page_mode, model_creation_state]);

  return (
    <>
      {miscs_active && !model_destroyed && (
        <group {...props} dispose={null}>
          <mesh
            key={meshKey}
            geometry={nodes.Cube003.geometry}
            material={meshMaterial}
            onClick={() => ModelOnClick()}
            onPointerOver={(e) => {
              e.stopPropagation(), ModelOnPointerOver();
            }}
            onPointerOut={() => ModelOnPointerOut()}
            onPointerMissed={() => ModelMissedClick()}
          >
            {enable_model_textures && page_mode === "edit" && (
              <meshStandardMaterial
                transparent={true}
                opacity={ModelMaterialOpacity}
                color={ModelMaterialColor}
                wireframe={ModelMaterialWireframe}
              />
            )}
          </mesh>
        </group>
      )}
    </>
  );
}

useGLTF.preload("./models/misc/tool_cupboard_textured.glb");
Model.displayName = "ToolCupboard";
