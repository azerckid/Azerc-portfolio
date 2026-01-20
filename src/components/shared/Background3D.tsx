"use client"

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function RotatingShapes() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[1, 64, 64]} position={[-3, 0, -2]}>
                    <MeshDistortMaterial
                        color="#00F2FF"
                        speed={3}
                        distort={0.4}
                        radius={1}
                    />
                </Sphere>
            </Float>

            <Float speed={3} rotationIntensity={2} floatIntensity={2}>
                <Sphere args={[1.5, 64, 64]} position={[4, 2, -5]}>
                    <MeshDistortMaterial
                        color="#7000FF"
                        speed={2}
                        distort={0.5}
                        radius={1}
                    />
                </Sphere>
            </Float>
        </group>
    );
}

export default function Background3D() {
    return (
        <div className="absolute inset-0 -z-20 opacity-30 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00F2FF" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000FF" />
                <RotatingShapes />
            </Canvas>
        </div>
    );
}
