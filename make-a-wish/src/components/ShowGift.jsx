import React, { Suspense , useRef} from 'react';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import '../Home.css';
import { useFrame, useThree } from '@react-three/fiber';

function Model(props) {
    const group = useRef();
    useFrame(() => {
        if (group.current) {
          group.current.rotation.y += props.rotationSpeed;
        }
      });
    const { scene } = useGLTF("gift2.gltf.gltf")
    return <primitive object={scene}  ref={group}  scale={0.06} position={[0, -0.05, 0]} />
}


export function ShowGift(props) {

    return (
        <div className = "gift-border" style={{ height: "100% ", width: "100%"}}>
            <Canvas camera={{ position: [10,25,65], fov: 0.2 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.3} />
                <Suspense fallback={null}>
                    <Model rotationSpeed={0.01}/>
                </Suspense>
                <OrbitControls/>
            </Canvas>
        </div>
    );
}

export default ShowGift