import * as THREE from "three";
import { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import { useSelector } from "react-redux";
import { set_model_pivot_axis } from "../../Store.tsx";

type GLTFResult = GLTF & {
  nodes: {
    Cube002: THREE.Mesh;
  };
  materials: {
    ["Material.010"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active);
  const walls_active = useSelector((state: RootState) => state.modelsData.walls_active);

  const model_creation_state = useSelector((state: RootState) => state.modelTypeToCreate.model_creation_state);

  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures);
  const enable_model_material= useSelector((state: RootState) => state.pageSettings.enable_model_material); //prettier-ignore

  const { nodes, materials } = useGLTF("./models/metal_doorway_textured.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_selected, set_model_selected] = useState<boolean>(false);

  function ModelOnClick() {
    if (page_mode === "edit" && !model_creation_state) {
      dispatch(set_model_pivot_axis("XYZ"));
      set_model_selected(true);
    }
  }

  function ModelMissedClick() {
    if (!model_creation_state) {
      set_model_selected(false);
    }
  }

  function ModelOnPointerOver() {
    if (!model_creation_state) {
      set_model_hover(true);
    }
  }

  function ModelOnPointerOut() {
    if (!model_creation_state) {
      set_model_hover(false);
    }
  }

  const ModelMaterialOpacity = () => {
    if (enable_model_material) {
      return model_selected ? 1 : model_hover ? 0.6 : 1;
    } else return 1;
  };

  const ModelMaterialColor = () => {
    if (enable_model_material) {
      return model_selected ? "#f5b784" : model_hover ? "#ffdaba" : "#bbbbbb";
    } else if (model_selected) {
      return "#f5b784";
    } else if (!model_selected) {
      return "#bbbbbb";
    }
  };

  const ModelMaterialWireframe = () => {
    return models_xray_active ? true : false;
  };

  return (
    <>
      {walls_active && (
        <group {...props} dispose={null}>
          {page_mode !== "edit" && enable_model_textures ? (
            <mesh
              key="textured"
              geometry={nodes.Cube002.geometry}
              material={materials["Material.010"]}
              onClick={() => ModelOnClick()}
              onPointerOver={(e) => {
                e.stopPropagation(), ModelOnPointerOver();
              }}
              onPointerOut={() => ModelOnPointerOut()}
              onPointerMissed={() => ModelMissedClick()}
            ></mesh>
          ) : (
            <mesh
              key="not-textured"
              geometry={nodes.Cube002.geometry}
              onClick={() => ModelOnClick()}
              onPointerOver={(e) => {
                e.stopPropagation(), ModelOnPointerOver();
              }}
              onPointerOut={() => ModelOnPointerOut()}
              onPointerMissed={() => ModelMissedClick()}
            >
              <meshStandardMaterial
                transparent={true}
                opacity={ModelMaterialOpacity()}
                color={ModelMaterialColor()}
                wireframe={ModelMaterialWireframe()}
              />
            </mesh>
          )}
        </group>
      )}
    </>
  );
}

useGLTF.preload("./models/metal_doorway_textured.glb");

Model.displayName = "MetalDoorway";
