import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Pre-allocated scratch helpers outside render loop (zero GC)
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();
const _cyanColor = new THREE.Color(0x00e5ff);
const _magentaColor = new THREE.Color(0xff168b);

export default function Scene3DCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReduced = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReduced = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Software WebGL probe
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobileViewport = width < 768;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.032);

    const camera = new THREE.PerspectiveCamera(width < 640 ? 52 : 44, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 11);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl && !isMobileViewport,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    const maxDpr = isMobileViewport ? 1.5 : 2;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, maxDpr));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;

    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // Studio Lighting + Scroll-Reactive Cyan & Magenta Lights
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x050505, 0.55);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
    keyLight.position.set(4, 6, 7);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 11, 24, 1.4);
    cyanLight.position.set(3.8, 2.2, 4.5);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xff168b, 11, 24, 1.4);
    magentaLight.position.set(-3.8, -1.8, 4.5);
    scene.add(magentaLight);

    // Materials
    const matPureWhite = new THREE.MeshPhysicalMaterial({
      color: 0xf7f8fa,
      metalness: 0.25,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
    });
    const matObsidian = new THREE.MeshStandardMaterial({
      color: 0x0e1017,
      metalness: 0.8,
      roughness: 0.26,
    });
    const matBrushedSteel = new THREE.MeshStandardMaterial({
      color: 0xd4dae4,
      metalness: 0.9,
      roughness: 0.18,
    });
    const matCyan = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.55,
      metalness: 0.45,
      roughness: 0.18,
    });
    const matMagenta = new THREE.MeshStandardMaterial({
      color: 0xff168b,
      emissive: 0xff168b,
      emissiveIntensity: 0.55,
      metalness: 0.45,
      roughness: 0.18,
    });
    const matOpticalGlass = new THREE.MeshPhysicalMaterial({
      color: 0x0a1420,
      metalness: 0.05,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transmission: isSoftwareGl ? 0 : 0.78,
      transparent: true,
      opacity: isSoftwareGl ? 0.5 : 0.95,
      ior: 1.55,
      thickness: 0.8,
    });

    const disposableGeometries: THREE.BufferGeometry[] = [];
    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      disposableGeometries.push(g);
      return g;
    };

    // =========================================================================
    // 1. HERO CENTERPIECE: MASSIVE 3D ABSTRACT "F" LOGO SCULPTURE
    // Mirrors the attached F.CUTS logo: split diagonal cut + Cyan + Magenta offsets
    // =========================================================================
    const fLogoGroup = new THREE.Group();

    // Upper F segment (top bar + upper stem down to diagonal cut)
    const upperFShape = new THREE.Shape();
    upperFShape.moveTo(-1.05, -0.35);
    upperFShape.lineTo(-1.05, 1.45);
    upperFShape.lineTo(1.15, 1.45);
    upperFShape.lineTo(1.15, 0.92);
    upperFShape.lineTo(0.92, 0.72);
    upperFShape.lineTo(-0.32, 0.72);
    upperFShape.lineTo(-0.32, 0.34);
    upperFShape.lineTo(0.68, 0.34);
    upperFShape.lineTo(0.68, -0.18);
    upperFShape.lineTo(-0.08, -0.18);
    upperFShape.lineTo(-1.05, -0.35);

    const upperFGeo = trackGeo(
      new THREE.ExtrudeGeometry(upperFShape, {
        depth: 0.42,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.04,
        bevelSegments: 3,
      })
    );
    upperFGeo.translate(0, 0, -0.21);
    const upperFMesh = new THREE.Mesh(upperFGeo, matPureWhite);
    fLogoGroup.add(upperFMesh);

    // Lower F stem below diagonal cut
    const lowerFShape = new THREE.Shape();
    lowerFShape.moveTo(-1.05, -1.55);
    lowerFShape.lineTo(-0.32, -1.55);
    lowerFShape.lineTo(-0.32, -0.52);
    lowerFShape.lineTo(0.45, -0.22);
    lowerFShape.lineTo(-1.05, -0.58);
    lowerFShape.closePath();

    const lowerFGeo = trackGeo(
      new THREE.ExtrudeGeometry(lowerFShape, {
        depth: 0.42,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.04,
        bevelSegments: 3,
      })
    );
    lowerFGeo.translate(0, 0, -0.21);
    const lowerFMesh = new THREE.Mesh(lowerFGeo, matPureWhite);
    fLogoGroup.add(lowerFMesh);

    // Hot Magenta (#FF168B) Offset Layer behind upper-left
    const magentaFrameShape = new THREE.Shape();
    magentaFrameShape.moveTo(-1.18, -0.52);
    magentaFrameShape.lineTo(-1.18, 1.56);
    magentaFrameShape.lineTo(1.08, 1.56);
    magentaFrameShape.lineTo(1.08, 1.4);
    magentaFrameShape.lineTo(-1.02, 1.4);
    magentaFrameShape.lineTo(-1.02, -0.44);
    magentaFrameShape.closePath();

    const magentaGeo = trackGeo(
      new THREE.ExtrudeGeometry(magentaFrameShape, {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2,
      })
    );
    magentaGeo.translate(0, 0, -0.34);
    const magentaOffsetMesh = new THREE.Mesh(magentaGeo, matMagenta);
    fLogoGroup.add(magentaOffsetMesh);

    // Electric Cyan (#00E5FF) Diagonal Cut & Right Accent Blade
    const cyanSlashGeo = trackGeo(new THREE.BoxGeometry(1.42, 0.14, 0.48));
    const cyanSlashMesh = new THREE.Mesh(cyanSlashGeo, matCyan);
    cyanSlashMesh.position.set(-0.28, -0.36, 0.04);
    cyanSlashMesh.rotation.z = 0.46;
    fLogoGroup.add(cyanSlashMesh);

    const cyanRightBladeGeo = trackGeo(new THREE.BoxGeometry(0.14, 0.72, 0.36));
    const cyanRightBlade = new THREE.Mesh(cyanRightBladeGeo, matCyan);
    cyanRightBlade.position.set(1.22, 1.08, -0.05);
    fLogoGroup.add(cyanRightBlade);

    // Orbiting Optical Glass Halo around F Monument
    const haloRingGeo = trackGeo(new THREE.TorusGeometry(2.35, 0.025, 12, 72));
    const haloRing = new THREE.Mesh(haloRingGeo, matCyan);
    haloRing.rotation.x = Math.PI * 0.38;
    haloRing.rotation.y = -0.3;
    fLogoGroup.add(haloRing);

    const haloRingMagenta = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(2.65, 0.018, 12, 72)),
      matMagenta
    );
    haloRingMagenta.rotation.x = -Math.PI * 0.32;
    haloRingMagenta.rotation.y = 0.4;
    fLogoGroup.add(haloRingMagenta);

    fLogoGroup.scale.setScalar(1.18);
    fLogoGroup.position.set(0, 0.15, 0.5);
    scene.add(fLogoGroup);

    // =========================================================================
    // 2. 3D EDITING TIMELINE & PLAYHEAD RIG (Reveals during Services/AI)
    // =========================================================================
    const timelineGroup = new THREE.Group();

    const railBase = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(4.6, 0.14, 1.9)), matObsidian);
    timelineGroup.add(railBase);

    const clipSpecs = [
      { x: -1.4, y: 0.22, z: -0.45, w: 1.35, h: 0.2, d: 0.36, mat: matCyan },
      { x: 0.15, y: 0.22, z: -0.45, w: 1.4, h: 0.2, d: 0.36, mat: matPureWhite },
      { x: 1.55, y: 0.22, z: -0.45, w: 0.95, h: 0.2, d: 0.36, mat: matMagenta },
      { x: -0.9, y: 0.22, z: 0.1, w: 1.85, h: 0.2, d: 0.36, mat: matMagenta },
      { x: 1.15, y: 0.22, z: 0.1, w: 1.75, h: 0.2, d: 0.36, mat: matCyan },
      { x: 0.0, y: 0.22, z: 0.6, w: 3.6, h: 0.16, d: 0.28, mat: matBrushedSteel },
    ];
    clipSpecs.forEach((c) => {
      const m = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(c.w, c.h, c.d)), c.mat);
      m.position.set(c.x, c.y, c.z);
      timelineGroup.add(m);
    });

    const playheadGroup = new THREE.Group();
    const needle = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.05, 1.1, 1.95)), matPureWhite);
    needle.position.set(0, 0.4, 0);
    playheadGroup.add(needle);

    const cap = new THREE.Mesh(trackGeo(new THREE.ConeGeometry(0.16, 0.26, 4)), matCyan);
    cap.rotation.z = Math.PI;
    cap.rotation.y = Math.PI / 4;
    cap.position.set(0, 1.02, 0);
    playheadGroup.add(cap);
    timelineGroup.add(playheadGroup);

    timelineGroup.position.set(5.5, -1.2, -5.5);
    scene.add(timelineGroup);

    // =========================================================================
    // 3. CINEMA CAMERA & PRISM RIG (Reveals during AI Showcase / Portfolio)
    // =========================================================================
    const cameraRig = new THREE.Group();

    const camBody = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.7, 1.15, 1.35)), matObsidian);
    cameraRig.add(camBody);

    const handleBar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.2, 0.15, 1.05)), matBrushedSteel);
    handleBar.position.set(0, 0.85, 0);
    cameraRig.add(handleBar);

    const lensBarrel = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.48, 0.52, 0.85, 28)),
      matObsidian
    );
    lensBarrel.rotation.x = Math.PI / 2;
    lensBarrel.position.set(0, -0.02, 1.08);
    cameraRig.add(lensBarrel);

    const lensCyanRing = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(0.5, 0.032, 12, 32)), matCyan);
    lensCyanRing.position.set(0, -0.02, 0.96);
    cameraRig.add(lensCyanRing);

    const lensMagentaRing = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.48, 0.028, 12, 32)),
      matMagenta
    );
    lensMagentaRing.position.set(0, -0.02, 1.24);
    cameraRig.add(lensMagentaRing);

    const lensGlass = new THREE.Mesh(
      trackGeo(new THREE.SphereGeometry(0.42, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45)),
      matOpticalGlass
    );
    lensGlass.rotation.x = Math.PI / 2;
    lensGlass.position.set(0, -0.02, 1.36);
    cameraRig.add(lensGlass);

    const prismCore = new THREE.Mesh(trackGeo(new THREE.IcosahedronGeometry(0.55, 0)), matOpticalGlass);
    prismCore.position.set(-1.65, 0.35, 0.65);
    cameraRig.add(prismCore);

    const prismWireMat = new THREE.MeshBasicMaterial({
      color: 0xff168b,
      wireframe: true,
      transparent: true,
      opacity: 0.48,
    });
    const prismWire = new THREE.Mesh(trackGeo(new THREE.IcosahedronGeometry(0.64, 0)), prismWireMat);
    prismWire.position.copy(prismCore.position);
    cameraRig.add(prismWire);

    cameraRig.position.set(-5.8, -1.6, -6.0);
    scene.add(cameraRig);

    // =========================================================================
    // 4. INSTANCED CINEMATIC DEPTH PARTICLES (48 shards)
    // =========================================================================
    const shardCount = 48;
    const shardGeo = trackGeo(new THREE.OctahedronGeometry(0.075, 0));
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.65,
      roughness: 0.25,
    });
    const instancedShards = new THREE.InstancedMesh(shardGeo, shardMat, shardCount);
    instancedShards.frustumCulled = false;

    for (let i = 0; i < shardCount; i++) {
      const x = ((i * 41) % 100 - 50) * 0.28;
      const y = ((i * 67) % 100 - 50) * 0.18;
      const z = -1.5 - (i % 14) * 0.72;
      const scale = 0.55 + (i % 5) * 0.25;
      _dummy.position.set(x, y, z);
      _dummy.scale.setScalar(scale);
      _dummy.updateMatrix();
      instancedShards.setMatrixAt(i, _dummy.matrix);

      if (i % 3 === 0) _color.copy(_cyanColor);
      else if (i % 3 === 1) _color.copy(_magentaColor);
      else _color.setHex(0x3a4052);
      instancedShards.setColorAt(i, _color);
    }
    instancedShards.instanceMatrix.needsUpdate = true;
    if (instancedShards.instanceColor) instancedShards.instanceColor.needsUpdate = true;
    scene.add(instancedShards);

    // =========================================================================
    // SCROLL + POINTER TRACKING
    // =========================================================================
    let scrollTarget = 0;
    let scrollSmoothed = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerSmoothedX = 0;
    let pointerSmoothedY = 0;

    const updateScrollTarget = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
    };
    updateScrollTarget();

    const onPointerMove = (e: PointerEvent) => {
      if (prefersReduced) return;
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // =========================================================================
    // ANIMATION LOOP
    // =========================================================================
    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (disposed) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const damp = prefersReduced ? 18 : 4.5;
      const motionMul = prefersReduced ? 0 : 1;

      scrollSmoothed = THREE.MathUtils.damp(scrollSmoothed, scrollTarget, damp, dt);
      pointerSmoothedX = THREE.MathUtils.damp(pointerSmoothedX, pointerX * motionMul, 5.5, dt);
      pointerSmoothedY = THREE.MathUtils.damp(pointerSmoothedY, pointerY * motionMul, 5.5, dt);

      // Camera gentle drift + smooth 3D scroll tilt across sections
      camera.position.x = pointerSmoothedX * 0.45 + Math.sin(scrollSmoothed * Math.PI * 2) * 0.35;
      camera.position.y = 0.15 - scrollSmoothed * 0.95 + pointerSmoothedY * 0.28;
      camera.position.z = 11 - Math.sin(scrollSmoothed * Math.PI) * 1.45;
      camera.lookAt(0, -scrollSmoothed * 0.32, 0);

      // Dynamic lighting shifts across sections
      cyanLight.intensity = 10.5 + Math.sin(scrollSmoothed * Math.PI * 2.2) * 4.5;
      magentaLight.intensity = 10.5 + Math.cos(scrollSmoothed * Math.PI * 2.2) * 4.5;
      cyanLight.position.x = 3.9 * Math.cos(scrollSmoothed * Math.PI * 1.2);
      magentaLight.position.x = -3.9 * Math.cos(scrollSmoothed * Math.PI * 1.2);

      // 1. Centerpiece 3D F Monument
      const heroFade = THREE.MathUtils.smoothstep(scrollSmoothed, 0.0, 0.24);
      const deepReturn = THREE.MathUtils.smoothstep(scrollSmoothed, 0.76, 1.0);
      fLogoGroup.position.x = THREE.MathUtils.lerp(0, -4.2, heroFade) + deepReturn * 4.2;
      fLogoGroup.position.y =
        0.15 + Math.sin(elapsed * 0.85) * 0.14 * motionMul - heroFade * 0.38 + deepReturn * 0.36;
      fLogoGroup.position.z = 0.5 - heroFade * 3.6 + deepReturn * 2.5;
      const fScale = 1.18 - heroFade * 0.35 + deepReturn * 0.25;
      fLogoGroup.scale.setScalar(fScale);
      fLogoGroup.rotation.y =
        pointerSmoothedX * 0.44 + scrollSmoothed * Math.PI * 1.85 + Math.sin(elapsed * 0.45) * 0.08 * motionMul;
      fLogoGroup.rotation.x = pointerSmoothedY * 0.3 + Math.cos(elapsed * 0.4) * 0.05 * motionMul;
      fLogoGroup.rotation.z = Math.sin(scrollSmoothed * Math.PI) * 0.08;
      haloRing.rotation.z = elapsed * 0.38 * motionMul + scrollSmoothed * 1.5;
      haloRingMagenta.rotation.z = -elapsed * 0.3 * motionMul - scrollSmoothed * 1.5;

      // 2. 3D Editing Timeline Rig (Services -> Portfolio)
      const tlWave = Math.sin(THREE.MathUtils.clamp((scrollSmoothed - 0.12) / 0.52, 0, 1) * Math.PI);
      timelineGroup.position.x = 5.3 - tlWave * 2.3;
      timelineGroup.position.y = -0.2 + Math.cos(elapsed * 0.7) * 0.12 * motionMul - (scrollSmoothed - 0.35) * 1.5;
      timelineGroup.position.z = -5.2 + tlWave * 4.2;
      timelineGroup.rotation.y = -0.68 + scrollSmoothed * 1.05;
      timelineGroup.rotation.x = 0.34 - tlWave * 0.12;
      playheadGroup.position.x = Math.sin(elapsed * 0.95 * motionMul + scrollSmoothed * 7) * 1.58;

      // 3. Cinema Camera & Color Prism (Portfolio -> AI Showcase -> About)
      const camWave = Math.sin(THREE.MathUtils.clamp((scrollSmoothed - 0.34) / 0.56, 0, 1) * Math.PI);
      cameraRig.position.x = -5.5 + camWave * 2.4;
      cameraRig.position.y = 0.25 + Math.sin(elapsed * 0.6) * 0.14 * motionMul;
      cameraRig.position.z = -5.6 + camWave * 4.2;
      cameraRig.rotation.y = 0.55 - camWave * 0.38 + pointerSmoothedX * 0.18;
      cameraRig.rotation.x = 0.16 + Math.sin(scrollSmoothed * Math.PI) * 0.08;
      prismCore.rotation.y = elapsed * 0.52 * motionMul + scrollSmoothed * 3.8;
      prismCore.rotation.x = elapsed * 0.34 * motionMul;
      prismWire.rotation.copy(prismCore.rotation);

      // 4. Shards depth parallax
      instancedShards.rotation.y = scrollSmoothed * 0.45 + elapsed * 0.03 * motionMul;
      instancedShards.rotation.x = scrollSmoothed * 0.12;
      instancedShards.position.y = -scrollSmoothed * 1.45;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      disposableGeometries.forEach((g) => g.dispose());
      matPureWhite.dispose();
      matObsidian.dispose();
      matBrushedSteel.dispose();
      matCyan.dispose();
      matMagenta.dispose();
      matOpticalGlass.dispose();
      shardMat.dispose();
      prismWireMat.dispose();
      envTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
