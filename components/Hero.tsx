'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader, ThreeElements } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from '@react-three/drei'
import styles from '../styles/Hero.module.css'
import * as THREE from 'three'

// This component loads your .glb file
function Model(props: ThreeElements['primitive']) {
  const modelRef = useRef<THREE.Group>(null!)
  
  // This tells the component to find your file in the /public folder
  const { scene } = useLoader(GLTFLoader, '/orange_hero.glb')

  // This hook runs on every frame, creating the animation
  useFrame(({ clock, mouse }) => {
    // This makes it spin gently
    modelRef.current.rotation.y = clock.getElapsedTime() / 2;

    // This makes it react to the mouse hover
    modelRef.current.rotation.x = (mouse.y * Math.PI) / 4;
    modelRef.current.rotation.z = (mouse.x * Math.PI) / 4;
  })

  return <primitive ref={modelRef} object={scene} {...props} />
}

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>The Trump Files</h1>
        <p className={styles.heroSubtitle}>
          An interactive, data-driven thermal encyclopedia of a presidency.
          This is not a summary. This is the complete catalog.
        </p>
      </div>
      <div className={styles.hero3D}>
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Suspense fallback={null}>
            <Model scale={1.5} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  )
}

export default Hero