import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RootState } from "../../../Store.tsx";
import { useSelector } from "react-redux";
import { ModelComponentsCommonLogic } from "../../script/ModelComponentsCommonLogic.tsx";

type GLTFResult = GLTF & {
  nodes: {Circle: THREE.Mesh}; //prettier-ignore
  materials: {["Material.055"]: THREE.MeshStandardMaterial}}; //prettier-ignore

export function Model(props: JSX.IntrinsicElements["group"]) {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); // prettier-ignore
  const doors_active = useSelector((state: RootState) => state.modelsData.doors_active); // prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); // prettier-ignore

  const { nodes, materials } = useGLTF("./models/doors/garage_door_textured.glb") as GLTFResult;
  const {defaultMeshKey, defaultMeshMaterial, ModelOnClick, ModelOnPointerOver, ModelOnPointerOut, ModelMissedClick, meshStandardMaterialOpacity, meshStandardMaterialColor, meshStandardMaterialWireframe, model_destroyed } = ModelComponentsCommonLogic(); //prettier-ignore

  return (
    <>
      {doors_active && !model_destroyed && (
        <group {...props} dispose={null}>
          <mesh
            key={defaultMeshKey}
            geometry={nodes.Circle.geometry}
            {...defaultMeshMaterial(materials["Material.055"])}
            onClick={() => ModelOnClick(Model.displayName)}
            onPointerOver={(e) => {
              e.stopPropagation(), ModelOnPointerOver();
            }}
            onPointerOut={() => ModelOnPointerOut()}
            onPointerMissed={() => ModelMissedClick()}
          >
            {enable_model_textures && page_mode === "edit" && (
              <meshStandardMaterial
                transparent={true}
                opacity={meshStandardMaterialOpacity}
                color={meshStandardMaterialColor("metal")}
                wireframe={meshStandardMaterialWireframe}
              />
            )}
          </mesh>
        </group>
      )}
    </>
  );
}

useGLTF.preload("./models/doors/garage_door_textured.glb");
Model.displayName = "GarageDoor";
