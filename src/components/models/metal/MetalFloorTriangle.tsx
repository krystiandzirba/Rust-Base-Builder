import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RootState } from "../../../Store.tsx";
import { useSelector } from "react-redux";
import { ModelComponentsCommonLogic } from "../../script/ModelComponentsCommonLogic.tsx";

type GLTFResult = GLTF & {
  nodes: {Circle001: THREE.Mesh}; //prettier-ignore
  materials: {["Material.017"]: THREE.MeshStandardMaterial}}; //prettier-ignore

export function Model(props: JSX.IntrinsicElements["group"]) {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); // prettier-ignore
  const floors_active = useSelector((state: RootState) => state.modelsData.floors_active); // prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); // prettier-ignore

  const { nodes, materials } = useGLTF("./models/metal/metal_floor_triangle_textured.glb") as GLTFResult;
  const {defaultMeshKey, defaultMeshMaterial, ModelOnClick, ModelOnPointerOver, ModelOnPointerOut, ModelMissedClick, meshStandardMaterialColor, meshStandardMaterialWireframe, meshEdgesVisibility, model_destroyed } = ModelComponentsCommonLogic(); //prettier-ignore
  return (
    <>
      {floors_active && !model_destroyed && (
        <group {...props} dispose={null}>
          <mesh
            key={defaultMeshKey}
            geometry={nodes.Circle001.geometry}
            {...defaultMeshMaterial(materials["Material.017"])}
            onClick={() => ModelOnClick(Model.displayName)}
            onPointerOver={(e) => {
              e.stopPropagation(), ModelOnPointerOver();
            }}
            onPointerOut={() => ModelOnPointerOut()}
            onPointerMissed={() => ModelMissedClick()}
          >
            {enable_model_textures && page_mode === "edit" && (
              <>
                <meshStandardMaterial
                  transparent={true}
                  color={meshStandardMaterialColor("metal")}
                  wireframe={meshStandardMaterialWireframe}
                />
                {meshEdgesVisibility}
              </>
            )}
          </mesh>
        </group>
      )}
    </>
  );
}

useGLTF.preload("./models/metal/metal_floor_triangle_textured.glb");
Model.displayName = "MetalFloorTriangle";