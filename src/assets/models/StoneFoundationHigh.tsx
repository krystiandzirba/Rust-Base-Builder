import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";

const StoneFoundationHigh: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "./src/assets/models/stone_foundation_high.glb");
  return <primitive object={gltf.scene} scale={1} />;
};

export default StoneFoundationHigh;
