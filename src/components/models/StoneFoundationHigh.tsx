import * as THREE from "three";
import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

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
  const { nodes, materials } = useGLTF("./stone_foundation_high.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_click, set_model_click] = useState<boolean>(false);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        onClick={() => set_model_click(!model_click)}
        onPointerOver={() => set_model_hover(true)}
        onPointerOut={() => set_model_hover(false)}
        // onPointerMissed={() => set_model_click(!model_click)}
      >
        <meshStandardMaterial color={model_hover ? "#ffffff" : "#bbbbbb"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("./stone_foundation_high.glb");

Model.displayName = "StoneFoundationHigh";
