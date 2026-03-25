import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
    camera.position.set(0, 2, 18);

    const objects = [];

    // ─── Floating wireframe boxes (building blocks) ─────────────────────
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const edgesGeo = new THREE.EdgesGeometry(boxGeo);
    boxGeo.dispose();

    for (let i = 0; i < 14; i++) {
      const mat = new THREE.LineBasicMaterial({
        color: 0xcc5500,
        transparent: true,
        opacity: 0.04 + Math.random() * 0.09,
      });
      const mesh = new THREE.LineSegments(edgesGeo, mat);
      const s = 0.6 + Math.random() * 2.4;
      mesh.scale.set(s, s * (1 + Math.random()), s);
      mesh.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 8 - 2
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI * 0.3
      );
      scene.add(mesh);
      objects.push({
        mesh,
        ry: (Math.random() - 0.5) * 0.004,
        rx: (Math.random() - 0.5) * 0.002,
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatAmp: 0.015 + Math.random() * 0.025,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ─── Construction floor grid ─────────────────────────────────────────
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x331100,
      transparent: true,
      opacity: 0.18,
    });
    const gridSize = 40;
    const gridDivisions = 20;
    const step = gridSize / gridDivisions;
    const gridPoints = [];
    for (let i = 0; i <= gridDivisions; i++) {
      const v = -gridSize / 2 + i * step;
      gridPoints.push(new THREE.Vector3(v, 0, -gridSize / 2));
      gridPoints.push(new THREE.Vector3(v, 0, gridSize / 2));
      gridPoints.push(new THREE.Vector3(-gridSize / 2, 0, v));
      gridPoints.push(new THREE.Vector3(gridSize / 2, 0, v));
    }
    const gridGeo = new THREE.BufferGeometry().setFromPoints(gridPoints);
    const grid = new THREE.LineSegments(gridGeo, gridMat);
    grid.position.y = -6;
    grid.rotation.x = 0;
    scene.add(grid);

    // ─── Animate ──────────────────────────────────────────────────────────
    let frame;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      objects.forEach(({ mesh, ry, rx, floatSpeed, floatAmp, phase }) => {
        mesh.rotation.y += ry;
        mesh.rotation.x += rx;
        mesh.position.y += Math.sin(t * floatSpeed + phase) * floatAmp * 0.05;
      });

      grid.rotation.y += 0.0006;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const W2 = mount.clientWidth;
      const H2 = mount.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
