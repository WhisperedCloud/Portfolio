'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
    
    if (groupRef.current) {
      // Gentle vertical float
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
        <meshBasicMaterial 
          color="#000000" 
          wireframe={true} 
          transparent 
          opacity={0.15} 
        />
      </mesh>
    </group>
  );
}

export default function Hero3DElement() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <RotatingShape />
      </Canvas>
    </div>
  );
}
