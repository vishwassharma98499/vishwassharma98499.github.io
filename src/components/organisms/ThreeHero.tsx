import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion, useTheme } from "@/hooks";

export function ThreeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const initScene = useCallback(async () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || reducedMotion) return;

    const THREE = await import("three");

    let width = canvas.clientWidth || container.clientWidth;
    let height = canvas.clientHeight || container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;
    camera.position.x = 1.5;

    const palettes = {
      dark: { primary: 0x7c6cf0, secondary: 0x5eead4 },
      light: { primary: 0x5b4dc7, secondary: 0x0d9488 },
    };

    const getPalette = () => palettes[themeRef.current];

    // Main wireframe icosahedron
    const icoMat = new THREE.MeshBasicMaterial({
      color: getPalette().primary, wireframe: true, transparent: true, opacity: 0.2,
    });
    const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 1), icoMat);
    scene.add(icosahedron);

    // Inner fill
    const innerMat = new THREE.MeshBasicMaterial({
      color: getPalette().primary, transparent: true, opacity: 0.02,
    });
    const innerMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(2.18, 1), innerMat);
    scene.add(innerMesh);

    // Torus rings
    const torusMat = new THREE.MeshBasicMaterial({
      color: getPalette().secondary, transparent: true, opacity: 0.18,
    });
    const torus = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.012, 16, 120), torusMat);
    torus.rotation.x = Math.PI / 2.5;
    scene.add(torus);

    const torus2Mat = new THREE.MeshBasicMaterial({
      color: getPalette().primary, transparent: true, opacity: 0.1,
    });
    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.008, 16, 100), torus2Mat);
    torus2.rotation.x = Math.PI / 1.8;
    torus2.rotation.y = Math.PI / 4;
    scene.add(torus2);

    const torus3Mat = new THREE.MeshBasicMaterial({
      color: getPalette().secondary, transparent: true, opacity: 0.08,
    });
    const torus3 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.006, 16, 80), torus3Mat);
    torus3.rotation.x = Math.PI / 3;
    torus3.rotation.z = Math.PI / 5;
    scene.add(torus3);

    // Orbiting dodecahedron
    const dodMat = new THREE.MeshBasicMaterial({
      color: getPalette().secondary, wireframe: true, transparent: true, opacity: 0.25,
    });
    const dodecahedron = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 0), dodMat);
    scene.add(dodecahedron);

    // Floating particles
    const pCount = 150;
    const positions = new Float32Array(pCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities.push({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.004,
      });
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: getPalette().secondary, size: 0.025, transparent: true, opacity: 0.6, sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", onMouseMove);

    // Animation
    let animId: number | null = null;
    let time = 0;

    function animate() {
      animId = requestAnimationFrame(animate);
      time += 0.01;

      targetX += (mouseX * 0.3 - targetX) * 0.05;
      targetY += (mouseY * 0.3 - targetY) * 0.05;

      icosahedron.rotation.x += 0.003 + targetY * 0.02;
      icosahedron.rotation.y += 0.005 + targetX * 0.02;
      innerMesh.rotation.copy(icosahedron.rotation);

      torus.rotation.z += 0.004;
      torus2.rotation.z -= 0.003;
      torus3.rotation.z += 0.002;
      torus3.rotation.x += 0.001;

      dodecahedron.position.x = Math.cos(time * 0.5) * 4;
      dodecahedron.position.y = Math.sin(time * 0.7) * 1.5;
      dodecahedron.position.z = Math.sin(time * 0.5) * 2;
      dodecahedron.rotation.x += 0.02;
      dodecahedron.rotation.y += 0.015;

      const posArr = pGeo.attributes.position?.array as Float32Array | undefined;
      if (posArr && posArr.length >= pCount * 3) {
        for (let i = 0; i < pCount; i++) {
          const v = velocities[i];
          if (!v) continue;
          const ix = i * 3;
          posArr[ix] = (posArr[ix] ?? 0) + v.x;
          posArr[ix + 1] = (posArr[ix + 1] ?? 0) + v.y;
          posArr[ix + 2] = (posArr[ix + 2] ?? 0) + v.z;

          const px = posArr[ix] ?? 0;
          const py = posArr[ix + 1] ?? 0;
          const pz = posArr[ix + 2] ?? 0;
          const dist = Math.sqrt(px ** 2 + py ** 2 + pz ** 2);
          if (dist > 5 || dist < 2) {
            v.x *= -1;
            v.y *= -1;
            v.z *= -1;
          }
        }
        pGeo.attributes.position!.needsUpdate = true;
      }

      // Update theme colors
      const p = getPalette();
      icoMat.color.setHex(p.primary);
      innerMat.color.setHex(p.primary);
      torusMat.color.setHex(p.secondary);
      torus2Mat.color.setHex(p.primary);
      torus3Mat.color.setHex(p.secondary);
      dodMat.color.setHex(p.secondary);
      pMat.color.setHex(p.secondary);

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    const onResize = () => {
      width = canvas.clientWidth || container.clientWidth;
      height = canvas.clientHeight || container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Visibility observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!animId) animate();
          } else {
            if (animId) cancelAnimationFrame(animId);
            animId = null;
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      renderer.dispose();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const cleanup = initScene();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [initScene]);

  if (reducedMotion) return null;

  return (
    <div ref={containerRef} className="absolute top-0 right-0 w-[55%] h-full z-0 pointer-events-none max-md:w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
