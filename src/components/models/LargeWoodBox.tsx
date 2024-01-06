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
    Cube004: THREE.Mesh;
  };
  materials: {
    ["Material.003"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active);
  const miscs_active = useSelector((state: RootState) => state.modelsData.miscs_active);

  const model_creation_state = useSelector((state: RootState) => state.modelTypeToCreate.model_creation_state);

  const { nodes, materials } = useGLTF("./models/large_wood_box_textured.glb") as GLTFResult;
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

  return (
    <group {...props} dispose={null}>
      {miscs_active && (
        <mesh
          geometry={nodes.Cube004.geometry}
          material={materials["Material.003"]}
          onClick={() => ModelOnClick()}
          onPointerOver={() => ModelOnPointerOver()}
          onPointerOut={() => ModelOnPointerOut()}
          onPointerMissed={() => ModelMissedClick()}
        >
          {page_mode === "edit" && (
            <meshStandardMaterial
              transparent={true}
              opacity={model_selected ? 1 : model_hover ? 0.6 : 1}
              color={model_selected ? "#f5b784" : model_hover ? "#ffdaba" : "#bbbbbb"}
              wireframe={models_xray_active ? true : false}
            />
          )}
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("./models/large_wood_box_textured.glb");

Model.displayName = "LargeWoodBox";
