import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";

const StoneFoundationMid: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "./stone_foundation_mid.glb");
  return <primitive object={gltf.scene} scale={1} />;
};

export default StoneFoundationMid;
