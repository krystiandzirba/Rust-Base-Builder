import * as THREE from "three";
import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
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

  const { nodes, materials } = useGLTF("./stone_foundation_square_mid.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_selected, set_model_selected] = useState<boolean>(false);

  const page_mode = useSelector((state: RootState) => state.PageMode.page_mode);

  function ModelOnClick() {
    dispatch(set_transform_model_axis("XZ"));
    set_model_selected(true);
  }

  function ModelMissedClick() {
    set_model_selected(false);
  }

  function ModelOnPointerOver() {
    set_model_hover(true);
  }

  function ModelOnPointerOut() {
    set_model_hover(false);
  }

  function ModelColorChange(): THREE.MeshStandardMaterialParameters {
    const base_color = page_mode === "edit" && model_hover ? "lightblue" : "#bbbbbb";
    const opacity = page_mode === "edit" && model_hover ? 0.8 : 1;

    return {
      transparent: true,
      opacity: model_selected ? 1 : opacity,
      color: model_selected ? "#3672ff" : base_color,
    };
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        onClick={() => ModelOnClick()}
        onPointerOver={() => ModelOnPointerOver()}
        onPointerOut={() => ModelOnPointerOut()}
        onPointerMissed={() => ModelMissedClick()}
      >
        <meshStandardMaterial {...ModelColorChange()} />
      </mesh>
    </group>
  );
}

useGLTF.preload("./stone_foundation_square_mid.glb");

Model.displayName = "StoneFoundationSquareMid";
