import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

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

  return (
    <group {...props}>
      <mesh geometry={nodes.Plane.geometry}>
        <meshStandardMaterial color={"rgb(255, 206, 166)"} emissive={"rgb(255, 206, 166)"} emissiveIntensity={5} />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/arrow_prop.glb");

Model.displayName = "Arrow";
