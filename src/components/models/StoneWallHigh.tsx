import * as THREE from "three";
import { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import { useSelector } from "react-redux";
import { set_model_pivot_axis } from "../../Store.tsx";
import { set_cursor_type } from "../../Store.tsx";

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
  const cursor_type = useSelector((state: RootState) => state.cursorType.cursor_type);
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active);
  const walls_active = useSelector((state: RootState) => state.modelsData.walls_active);

  const { nodes, materials } = useGLTF("./models/stone_wall_high_textured.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_selected, set_model_selected] = useState<boolean>(false);

  function ModelOnClick() {
    if (page_mode === "edit") {
      dispatch(set_model_pivot_axis("XYZ"));
      set_model_selected(true);
      dispatch(set_cursor_type("grab"));
    }
  }

  function ModelMissedClick() {
    set_model_selected(false);
    dispatch(set_cursor_type("default"));
  }

  function ModelOnPointerOver() {
    set_model_hover(true);
    dispatch(set_cursor_type("pointer"));
  }

  function ModelOnPointerOut() {
    set_model_hover(false);
    if (cursor_type === "pointer") {
      dispatch(set_cursor_type("default"));
    }
  }

  return (
    <group {...props} dispose={null}>
      {walls_active && (
        <mesh
          geometry={nodes.Cube002.geometry}
          // material={materials.Material}
          material={materials["Material.010"]}
          onClick={() => ModelOnClick()}
          onPointerOver={() => ModelOnPointerOver()}
          onPointerOut={() => ModelOnPointerOut()}
          onPointerMissed={() => ModelMissedClick()}
        >
          {page_mode === "edit" && (
            <meshStandardMaterial
              transparent={true}
              opacity={model_selected ? 1 : model_hover ? 0.8 : 1}
              color={model_selected  ? "#3672ff" : ( model_hover ? "lightblue" : "#bbbbbb")} //prettier-ignore
              wireframe={models_xray_active ? true : false}
            />
          )}
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("./models/stone_wall_high_textured.glb");

Model.displayName = "StoneWallHigh";
