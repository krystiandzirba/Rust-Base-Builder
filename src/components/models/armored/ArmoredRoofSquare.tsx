import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RootState } from "../../../Store.tsx";
import { useSelector } from "react-redux";
import { ModelComponentsCommonLogic } from "../../script/ModelComponentsCommonLogic.tsx";

type GLTFResult = GLTF & {
  nodes: {Plane002: THREE.Mesh}; //prettier-ignore
  materials: {["Material.046"]: THREE.MeshStandardMaterial}}; //prettier-ignore

export function Model(props: JSX.IntrinsicElements["group"]) {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); // prettier-ignore
  const roofs_active = useSelector((state: RootState) => state.modelsData.roofs_active); // prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); // prettier-ignore

  const { nodes, materials } = useGLTF("./models/armored/armored_roof_square_textured.glb") as GLTFResult;
  const {defaultMeshKey, defaultMeshMaterial, ModelOnClick, ModelOnPointerOver, ModelOnPointerOut, ModelMissedClick, meshStandardMaterialColor, meshStandardMaterialWireframe, meshEdgesVisibility, meshAnnotationVisibility, model_destroyed } = ModelComponentsCommonLogic(); //prettier-ignore
  return (
    <>
      {roofs_active && !model_destroyed && (
        <group {...props} dispose={null}>
          <mesh
            key={defaultMeshKey}
            geometry={nodes.Plane002.geometry}
            {...defaultMeshMaterial(materials["Material.046"])}
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
                {meshAnnotationVisibility(["Armored roof (square)", "non-upgradeable", "downgradeable"])}
              </>
            )}
          </mesh>
        </group>
      )}
    </>
  );
}

useGLTF.preload("./models/armored/armored_roof_square_textured.glb");
Model.displayName = "ArmoredRoofSquare";
