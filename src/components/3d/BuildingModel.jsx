import { useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/models/scene.gltf');

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    scene.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) scene.scale.setScalar(8 / maxDim);
  }, [scene]);

  return <primitive object={scene} />;
}

export default function BuildingModel() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 2, 14], fov: 45, near: 0.1, far: 1000 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 8]} intensity={1.5} castShadow />
        <directionalLight position={[-8, 6, -5]} intensity={0.5} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" />
          <ContactShadows position={[0, -4, 0]} opacity={0.4} blur={3} far={20} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI * 0.65}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/scene.gltf');
