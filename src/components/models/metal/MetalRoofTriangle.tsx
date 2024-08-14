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
    Plane001: THREE.Mesh;
  };
  materials: {
    ["Material.023"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const dispatch = useDispatch();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); //prettier-ignore
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active); //prettier-ignore
  const roofs_active = useSelector((state: RootState) => state.modelsData.roofs_active); //prettier-ignore
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state); //prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); //prettier-ignore
  const enable_model_material= useSelector((state: RootState) => state.pageSettings.enable_model_material); //prettier-ignore
  const model_destroy_tigger = useSelector((state: RootState) => state.modelsData.model_destroy_trigger); //prettier-ignore
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const { nodes, materials } = useGLTF("./models/metal/metal_roof_triangle_textured.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_selected, set_model_selected] = useState<boolean>(false);
  const [model_destroyed, set_model_destroyed] = useState<boolean>(false);

  const meshKey = useMemo(() => {
    return enable_model_textures && !model_hover && page_mode !== "edit" ? "textured" : "not-textured";
  }, [enable_model_textures, model_hover, page_mode]);

  const meshMaterial = useMemo(() => {
    if (enable_model_textures && !model_hover && page_mode !== "edit") {
      return materials["Material.023"];
    } else if (model_hover && page_mode === "raid") {
      return new THREE.MeshStandardMaterial({ color: "red" });
    } else {
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
          return model_selected ? "#f5b784" : model_hover ? "#ff845e" : "#7d3823";
        } else if (page_mode === "raid") {
          return model_hover ? "red" : "#7d3823";
        }
      } else {
        return model_selected ? "#f5b784" : "#7d3823";
      }
    }
    return "#7d3823";
  }, [model_creation_state, enable_model_material, page_mode, model_selected, model_hover]);

  const ModelMaterialWireframe = useMemo(() => {
    return models_xray_active ? true : false;
  }, [models_xray_active]);

  useEffect(() => {
    set_model_destroyed(false);
    set_model_hover(false);
    set_model_selected(false);
  }, [reset_raid_models, page_mode, model_creation_state]);

  return (
    <>
      {roofs_active && !model_destroyed && (
        <group {...props} dispose={null}>
          <mesh
            key={meshKey}
            geometry={nodes.Plane001.geometry}
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

useGLTF.preload("./models/metal/metal_roof_triangle_textured.glb");
Model.displayName = "MetalRoofTriangle";
