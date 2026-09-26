import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { Download, Heart, X } from "lucide-react";

const cards = [
  { id: "2", imageUrl: "/ref/girl.jpg", alt: "Baddie", title: "Baddie" },
  { id: "3", imageUrl: "/ref/girl2.jpg", alt: "Angel", title: "Angel" },
  { id: "4", imageUrl: "/ref/girl3.jpg", alt: "Dreamgirl", title: "Dreamgirl" },
  { id: "5", imageUrl: "/ref/girl4.jpg", alt: "Sweetheart", title: "Sweetheart" },
  { id: "6", imageUrl: "/ref/girl5.jpg", alt: "Icon", title: "Icon" },
  { id: "7", imageUrl: "/ref/girl6.jpg", alt: "Stunner", title: "Stunner" },
  { id: "8", imageUrl: "/ref/girl7.jpg", alt: "Babe", title: "Babe" },
  { id: "9", imageUrl: "/ref/girl8.jpg", alt: "Darling", title: "Darling" },
  { id: "10", imageUrl: "/ref/girl9.jpg", alt: "Sunshine", title: "Sunshine" },
  { id: "11", imageUrl: "/ref/girl10.jpg", alt: "Queen", title: "Queen" },
  { id: "12", imageUrl: "/ref/girl11.jpg", alt: "Heartbreaker", title: "Heartbreaker" },
];

export default function MemorySphere() {
  const containerRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [liked, setLiked] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const cardModalRef = useRef(null);

  // Fibonacci sphere calculations
  const spherePositions = useMemo(() => {
    const list = [];
    const count = cards.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const radius = 14 + (i % 3) * 3;
      list.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
      });
    }
    return list;
  }, []);

  // Three.js interactive 3D scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer, starMesh, wireframeSpheres = [];
    let animationFrameId;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 24;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 2000;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      sizeAttenuation: true,
    });
    starMesh = new THREE.Points(starGeometry, starMaterial);
    scene.add(starMesh);

    // Wireframe Spheres
    const sphereRadii = [
      { r: 2, color: 0x1a1a2e, opacity: 0.15 },
      { r: 12, color: 0x31b8c6, opacity: 0.05 },
      { r: 16, color: 0x31b8c6, opacity: 0.03 },
      { r: 20, color: 0x31b8c6, opacity: 0.02 },
    ];
    sphereRadii.forEach(({ r, color, opacity }) => {
      const geo = new THREE.SphereGeometry(r, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      wireframeSpheres.push(mesh);
      scene.add(mesh);
    });

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    // Interactive Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.0005, y: 0.001 };
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      sphereGroup.rotation.y += deltaX * 0.005;
      sphereGroup.rotation.x += deltaY * 0.005;

      rotationVelocity = { x: deltaY * 0.0005, y: deltaX * 0.0005 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        sphereGroup.rotation.y += rotationVelocity.y;
        sphereGroup.rotation.x += rotationVelocity.x;
        rotationVelocity.x *= 0.98;
        rotationVelocity.y = rotationVelocity.y * 0.98 + 0.0005 * 0.02; // idle drift
      }

      starMesh.rotation.y += 0.0001;
      starMesh.rotation.x += 0.00005;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Modal tilt handler
  const handleModalMouseMove = (e) => {
    if (!cardModalRef.current) return;
    const rect = cardModalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    cardModalRef.current.style.transform = `perspective(1000px) rotateX(${
      (y - centerY) / 15
    }deg) rotateY(${(centerX - x) / 15}deg)`;
  };

  const handleModalMouseLeave = () => {
    if (cardModalRef.current) {
      cardModalRef.current.style.transition = "transform 0.5s ease-out";
      cardModalRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black select-none">
      {/* 3D Canvas Background */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{
          background: "radial-gradient(ellipse at center, #0d0d2b 0%, #000000 100%)",
        }}
      />

      {/* Floating 3D Cards overlay (Arranged along spherical 3D perspective) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center pointer-events-auto">
          {cards.map((card, idx) => {
            const pos = spherePositions[idx];
            // Calculate screen space projection
            const fov = 600;
            const zDist = pos.z + 30;
            const scale = fov / (fov + zDist * 15);
            const screenX = pos.x * 22;
            const screenY = pos.y * 18;
            const isHovered = hoveredCardId === card.id;

            return (
              <div
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(card);
                }}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                style={{
                  transform: `translate3d(${screenX}px, ${screenY}px, 0px) scale(${
                    isHovered ? scale * 1.15 : scale
                  })`,
                  zIndex: Math.floor(100 + pos.z * 5),
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  boxShadow: isHovered
                    ? "0 25px 50px rgba(49, 184, 198, 0.5), 0 0 30px rgba(49, 184, 198, 0.3)"
                    : "0 15px 30px rgba(0, 0, 0, 0.6)",
                  border: isHovered
                    ? "2px solid rgba(49, 184, 198, 0.5)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                }}
                className="absolute w-40 h-52 rounded-lg overflow-hidden shadow-2xl bg-[#1F2121] p-3 cursor-pointer select-none"
              >
                <img
                  src={card.imageUrl}
                  alt={card.alt}
                  className="w-full h-40 object-cover rounded-md pointer-events-none"
                  draggable={false}
                  loading="lazy"
                />
                <div className="mt-1 text-center">
                  <p className="text-white text-xs font-medium truncate">{card.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCard(null);
          }}
        >
          <div className="relative max-w-md w-full mx-4">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <div style={{ perspective: "1000px" }} className="w-full">
              <div
                ref={cardModalRef}
                className="relative cursor-pointer rounded-[16px] bg-[#1F2121] p-4 transition-all duration-500 ease-out w-full"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
                }}
                onMouseMove={handleModalMouseMove}
                onMouseLeave={handleModalMouseLeave}
              >
                <div className="relative w-full mb-4" style={{ aspectRatio: "3 / 4" }}>
                  <img
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
                    alt={selectedCard.alt}
                    src={selectedCard.imageUrl}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                    }}
                  />
                </div>
                <h3 className="text-white text-lg font-semibold mb-4 text-center">
                  {selectedCard.title}
                </h3>
                <div className="flex gap-2">
                  <a
                    href={selectedCard.imageUrl}
                    download={`${selectedCard.title}.jpg`}
                    className="inline-flex h-9 flex-1 items-center justify-center rounded-lg text-base font-medium text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                    style={{ backgroundColor: "#31b8c6" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Download className="h-4 w-4" strokeWidth={1.8} />
                      <span>Download</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => setLiked((prev) => !prev)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                    style={{ backgroundColor: "#31b8c6" }}
                  >
                    <Heart
                      className="h-4 w-4"
                      strokeWidth={1.8}
                      fill={liked ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
