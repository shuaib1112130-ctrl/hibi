import React, { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";

const cardImages = [
  "girl3.jpg",
  "girl4.jpg",
  "girl5.jpg",
  "girl6.jpg",
  "girl7.jpg",
  "girl8.jpg",
  "girl9.jpg",
  "girl10.jpg",
  "girl11.jpg",
];

const cardCaptions = [
  "Cutie 🥹",
  "Baddie 😎",
  "Pretty ✨",
  "My Love 🤍",
  "Sunshine ☀️",
  "Angel 🪽",
  "Beautiful 🌸",
  "Dream Girl 💫",
  "Queen 👑",
];

const cardPositions = [
  "top-[8%] left-[8%] rotate-[-8deg]",
  "top-[15%] left-[35%] rotate-[6deg]",
  "top-[10%] right-[10%] rotate-[-5deg]",
  "top-[45%] left-[12%] rotate-[7deg]",
  "top-[50%] left-[40%] rotate-[-6deg]",
  "top-[40%] right-[12%] rotate-[10deg]",
  "bottom-[10%] left-[18%] rotate-[-10deg]",
  "bottom-[12%] left-[45%] rotate-[5deg]",
  "bottom-[8%] right-[15%] rotate-[-7deg]",
];

function TiltCard({ image, caption, positionClass }) {
  const cardRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: offset.x,
      initialY: offset.y,
    };
  };

  const handlePointerMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      setOffset({
        x: dragStartRef.current.initialX + dx,
        y: dragStartRef.current.initialY + dy,
      });
    }

    // 3D tilt calculation relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);
    setRotate({
      x: -normY * 15,
      y: normX * 15,
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      setRotate({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "absolute bg-white rounded-xl shadow-2xl p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 transition-transform duration-100 ease-out hover:scale-[1.03]",
        positionClass
      )}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0px) perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative overflow-visible">
        <img
          src={`/ref/${image}`}
          alt={image}
          draggable={false}
          className="h-56 w-56 rounded-lg object-cover pointer-events-none select-none shadow-sm"
        />
        <div className="absolute -top-7 -right-7 text-5xl z-50 pointer-events-none drop-shadow-md">
          ❤️
        </div>
        <p className="mt-3 text-center text-neutral-700 text-3xl font-semibold font-caveat pointer-events-none">
          {caption}
        </p>
      </div>
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl bg-white select-none mix-blend-overlay transition-opacity duration-200"
        style={{
          opacity: Math.min(0.2, (Math.abs(rotate.x) + Math.abs(rotate.y)) / 100),
        }}
      />
    </div>
  );
}

export default function MadeForYou() {
  return (
    <div className="[perspective:3000px] w-full h-full relative min-h-screen overflow-visible bg-[#d9d3c7] before:absolute before:inset-0 before:pointer-events-none before:bg-[linear-gradient(rgba(120,110,90,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(120,110,90,0.12)_1px,transparent_1px)] before:bg-[size:40px_40px] after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.08))]">
      {cardImages.map((img, i) => (
        <TiltCard
          key={img}
          image={img}
          caption={cardCaptions[i]}
          positionClass={cardPositions[i]}
        />
      ))}

      {/* Decorative symbols */}
      <div className="absolute top-20 left-20 text-5xl opacity-30 pointer-events-none">
        ✿
      </div>
      <div className="absolute bottom-20 right-20 text-5xl opacity-30 pointer-events-none">
        ♡
      </div>
      <div className="absolute top-[45%] right-[5%] text-4xl opacity-30 pointer-events-none">
        ✨
      </div>
    </div>
  );
}
