import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RootState } from "../../../Store.tsx";
import { useSelector } from "react-redux";
import { ModelComponentsCommonLogic } from "../../script/ModelComponentsCommonLogic.tsx";

type GLTFResult = GLTF & {
  nodes: {Cube: THREE.Mesh}; //prettier-ignore
  materials: {["Material.042"]: THREE.MeshStandardMaterial}}; //prettier-ignore

export function Model(props: JSX.IntrinsicElements["group"]) {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); // prettier-ignore
  const floors_active = useSelector((state: RootState) => state.modelsData.floors_active); // prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); // prettier-ignore

  const { nodes, materials } = useGLTF("./models/armored/armored_floor_square_textured.glb") as GLTFResult;
  const {defaultMeshKey, defaultMeshMaterial, ModelOnClick, ModelOnPointerOver, ModelOnPointerOut, ModelMissedClick, meshStandardMaterialColor, meshStandardMaterialWireframe, meshEdgesVisibility, meshAnnotationVisibility, model_destroyed } = ModelComponentsCommonLogic(); //prettier-ignore
  return (
    <>
      {floors_active && !model_destroyed && (
        <group {...props} dispose={null}>
          <mesh
            key={defaultMeshKey}
            geometry={nodes.Cube.geometry}
            {...defaultMeshMaterial(materials["Material.042"])}
            onClick={() => ModelOnClick(Model.displayName)}
            onPointerOver={(e) => {e.stopPropagation(), ModelOnPointerOver()}} //prettier-ignore
            onPointerOut={() => ModelOnPointerOut()}
            onPointerMissed={() => ModelMissedClick()}
          >
            {(!enable_model_textures || page_mode === "edit") && (
              <>
                <meshStandardMaterial
                  transparent={true}
                  color={meshStandardMaterialColor("armored")}
                  wireframe={meshStandardMaterialWireframe}
                />
                {meshEdgesVisibility}
                {meshAnnotationVisibility(["Armored floor (square)", "non-upgradeable", "downgradeable"])}
              </>
            )}
          </mesh>
        </group>
      )}
    </>
  );
}

useGLTF.preload("./models/armored/armored_floor_square_textured.glb");
Model.displayName = "ArmoredFloorSquare";
