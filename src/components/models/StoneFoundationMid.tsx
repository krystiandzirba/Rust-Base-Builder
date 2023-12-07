import * as THREE from "three";
import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { RootState } from "../../Store";
import { useSelector } from "react-redux";

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
  const { nodes, materials } = useGLTF("./stone_foundation_mid.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);
  // const [model_click, set_model_click] = useState<boolean>(false);

  const page_mode = useSelector((state: RootState) => state.PageMode.page_mode);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        // onClick={() => set_model_click(!model_click)}
        onPointerOver={() => set_model_hover(true)}
        onPointerOut={() => set_model_hover(false)}
        // onPointerMissed={() => set_model_click(!model_click)}
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

useGLTF.preload("./stone_foundation_mid.glb");

Model.displayName = "StoneFoundationMid";
