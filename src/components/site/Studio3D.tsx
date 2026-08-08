import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";

function Camera3D() {
  return (
    <group rotation={[0.2, -0.6, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.5, 0.95, 0.9]} />
        <meshStandardMaterial color="#1f2937" roughness={0.35} metalness={0.5} />
      </mesh>
      <mesh position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.34, 0.4, 0.7, 40]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[1.33, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.06, 40]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.25, 0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.14, 40]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>
      <mesh position={[0.45, 0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.14, 40]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function Studio3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 4.6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <spotLight position={[-4, 3, 2]} angle={0.4} intensity={2} color="#ffb84d" />
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
        <Camera3D />
      </Float>
      <Environment preset="city" />
    </Canvas>
  );
}