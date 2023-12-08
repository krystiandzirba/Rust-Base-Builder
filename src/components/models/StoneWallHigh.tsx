import * as THREE from "three";
import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { set_transform_model_axis } from "../../Store.tsx";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>>;

export function Model(props: JSX.IntrinsicElements["group"]) {
  const dispatch = useDispatch();

  const { nodes, materials } = useGLTF("./stone_wall_high.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);

  const page_mode = useSelector((state: RootState) => state.PageMode.page_mode);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        onClick={() => dispatch(set_transform_model_axis("XYZ"))}
        onPointerOver={() => set_model_hover(true)}
        onPointerOut={() => set_model_hover(false)}
      >
        <meshStandardMaterial
          transparent
          opacity={page_mode === "edit" && model_hover ? 0.8 : 1}
          color={page_mode === "edit" && model_hover ? "lightblue" : "#bbbbbb"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./stone_wall_high.glb");

Model.displayName = "StoneWallHigh";
