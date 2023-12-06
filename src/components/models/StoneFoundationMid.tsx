import * as THREE from "three";
import React, { useRef } from "react";
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
  const { nodes, materials } = useGLTF("./stone_foundation_mid.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
    </group>
  );
}

useGLTF.preload("./stone_foundation_mid.glb");

Model.displayName = "StoneFoundationMid";
