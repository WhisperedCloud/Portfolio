'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

export default function Avatar() {
  const meshRef = useRef<Mesh>(null);
  const { mouse, viewport } = useThree();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smoothly rotate the avatar to face the mouse
    const target = new Vector3((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 5);
    meshRef.current.lookAt(target);

    // Add subtle floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Abstract geometric placeholder for the avatar */}
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#00f0ff' : '#8a2be2'} 
        wireframe={true} 
        emissive={hovered ? '#00f0ff' : '#000000'}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
