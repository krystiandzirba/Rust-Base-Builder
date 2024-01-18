import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Circle001: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./models/triangle_prop.glb") as GLTFResult;

  return (
    <group {...props}>
      <mesh geometry={nodes.Circle001.geometry}>
        <meshStandardMaterial color={"rgb(255, 206, 166)"} emissive={"rgb(255, 206, 166)"} emissiveIntensity={5} />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/triangle_prop.glb");

Model.displayName = "Trriangle";
