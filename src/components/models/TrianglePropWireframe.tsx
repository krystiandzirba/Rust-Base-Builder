import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

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

  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore

  return (
    <group {...props}>
      <mesh geometry={nodes.Circle001.geometry}>
        <meshStandardMaterial
          color={"#ffa463"}
          emissive={"rgb(255, 206, 166)"}
          emissiveIntensity={bloom_state ? 3 : 0}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/triangle_prop.glb");
