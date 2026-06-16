'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Avatar from './Avatar';
import { Suspense } from 'react';

export default function HeroScene() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Avatar />
        </Suspense>
      </Canvas>
    </div>
  );
}
