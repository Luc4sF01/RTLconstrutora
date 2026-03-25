import { useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Calcula o offset e escala sem nunca mutar a cena (StrictMode-safe)
function Model() {
  const { scene } = useGLTF('/models/scene.gltf');

  const { position, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? 5 / maxDim : 1;
    // world_pos = group_pos + local_center * scale = 0  =>  group_pos = -center * s
    return {
      position: [-center.x * s, -center.y * s, -center.z * s],
      scale: s,
    };
  }, [scene]);

  return (
    <group position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

function Fallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 4, 2]} />
      <meshStandardMaterial color="#1a1a1a" wireframe />
    </mesh>
  );
}

export default function BuildingModel() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        {/* Câmera posicionada para ver o prédio centralizado */}
        <PerspectiveCamera makeDefault position={[5, 2, 14]} fov={40} near={0.1} far={500} />

        {/* Iluminação */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 14, 8]} intensity={1.3} />
        <directionalLight position={[-8, 4, -6]} intensity={0.3} color="#c8a070" />
        <pointLight position={[0, 6, 8]} intensity={0.2} color="#ff9944" />

        <Suspense fallback={<Fallback />}>
          <Model />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            blur={2.5}
            far={12}
            scale={18}
          />
        </Suspense>

        <OrbitControls
          target={[0, 0, 0]}
          autoRotate
          autoRotateSpeed={0.6}
          enableZoom
          enablePan={false}
          zoomSpeed={0.6}
          minDistance={6}
          maxDistance={40}
          minPolarAngle={Math.PI / 10}
          maxPolarAngle={Math.PI * 0.58}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/scene.gltf');
