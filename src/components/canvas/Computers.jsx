import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile, isLarge }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const group = useRef();
  const timeRef = useRef(0);

  useFrame(() => {
    if (group.current) {
      timeRef.current += 0.008;
      group.current.rotation.y = Math.sin(timeRef.current) * 0.2;
    }
  });

  return (
    <mesh ref={group}>
      <directionalLight position={[0, 10, 0]} intensity={2} castShadow />
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.8}
      />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={
          isMobile
            ? [0, -3, -2.2]
            : isLarge
            ? [0, -3.25, -1.5]
            : [0, -3.8, -1.5]
        }
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia("(max-width: 500px)");
    const mediaQueryLarge = window.matchMedia("(min-width: 2560px)");

    setIsMobile(mediaQueryMobile.matches);
    setIsLarge(mediaQueryLarge.matches);

    const handleMobileChange = (event) => setIsMobile(event.matches);
    const handleLargeChange = (event) => setIsLarge(event.matches);

    mediaQueryMobile.addEventListener("change", handleMobileChange);
    mediaQueryLarge.addEventListener("change", handleLargeChange);

    return () => {
      mediaQueryMobile.removeEventListener("change", handleMobileChange);
      mediaQueryLarge.removeEventListener("change", handleLargeChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} isLarge={isLarge} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
