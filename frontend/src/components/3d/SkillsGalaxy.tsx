'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Html } from '@react-three/drei';

// Expanded list of Eswar's skills spread in 3D space
const skills = [
  { name: 'React.js', position: [-2, 1, -2] },
  { name: 'Next.js', position: [2, 2, -1] },
  { name: 'Node.js', position: [0, -1.5, 1] },
  { name: 'Python', position: [-1.5, -1, -3] },
  { name: 'TypeScript', position: [1.5, 0, 2] },
  { name: 'PostgreSQL', position: [-3, 0, 1] },
  { name: 'MongoDB', position: [3, -1, -2] },
  { name: 'OpenAI API', position: [0, 2.5, 0] },
  { name: 'Gemini API', position: [-1, 1.5, 2] },
  { name: 'Supabase', position: [1, -2, -1] },
  { name: 'AWS EC2', position: [-2, -2, 2] },
  { name: 'Docker', position: [2, 1, 3] },
];

export default function SkillsGalaxy() {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2; // Gentle vertical float
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {skills.map((skill, index) => (
        <SkillNode key={index} position={skill.position as [number, number, number]} name={skill.name} />
      ))}
    </group>
  );
}

function SkillNode({ position, name }: { position: [number, number, number], name: string }) {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      {/* Glow effect material */}
      <meshStandardMaterial color="#8a2be2" emissive="#00f0ff" emissiveIntensity={0.6} transparent opacity={0.8} />
      <Html distanceFactor={15} center>
        <div className="text-white font-mono text-sm bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neon-blue/40 whitespace-nowrap select-none pointer-events-none tracking-wider">
          {name}
        </div>
      </Html>
    </mesh>
  );
}
