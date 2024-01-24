import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./models/arrow_prop.glb") as GLTFResult;

  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore

  return (
    <group {...props}>
      <mesh geometry={nodes.Plane.geometry}>
        <meshStandardMaterial
          color={"#ffa463"}
          emissive={"rgb(255, 206, 166)"}
          emissiveIntensity={bloom_state ? 3 : 0}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/arrow_prop.glb");

Model.displayName = "Arrow";
