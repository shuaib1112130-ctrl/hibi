import React, { useRef, useEffect, useState, useId, useMemo, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "../lib/utils";

export default function CurvedMarquee({
  children,
  className,
  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  baseVelocity = 5,
  direction = "normal",
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  repeat = 3,
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  grabCursor = false,
  enableRollingZIndex = true,
  zIndexBase = 1,
  zIndexRange = 10,
  responsive = false,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const dragVelocity = useRef(0);
  const dirMultiplier = useRef(direction === "normal" ? 1 : -1);
  const isVisible = useRef(true);

  // Current distance offset (0 - 100)
  const [distance, setDistance] = useState(0);
  const distanceRef = useRef(0);

  // Responsive scaling
  useEffect(() => {
    if (!responsive) return;
    const [, , vbW, vbH] = viewBox.split(" ").map(Number);
    const targetW = vbW || 100;
    const targetH = vbH || 100;

    const handleResize = () => {
      const container = containerRef.current;
      const svg = svgRef.current;
      if (!container || !svg) return;
      const cW = container.clientWidth;
      const cH = container.clientHeight;
      const scale = cW / targetW;
      svg.style.width = `${targetW}px`;
      svg.style.height = `${targetH}px`;
      svg.style.transform = `translate(0px, ${(cH - targetH * scale) / 2}px) scale(${scale})`;
      svg.style.transformOrigin = "top left";
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [responsive, viewBox]);

  // Visibility intersection
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animation frame loop
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isVisible.current) {
        if (isDragging.current) {
          // while dragging, position is set directly by pointer
        } else {
          // apply drag momentum decay
          if (Math.abs(dragVelocity.current) > 0.01) {
            distanceRef.current = (distanceRef.current + dragVelocity.current * dt) % 100;
            dragVelocity.current *= dragVelocityDecay;
          }

          let speed = baseVelocity;
          if (slowdownOnHover && isHovered.current) {
            speed *= slowDownFactor;
          }

          const delta = speed * dirMultiplier.current * dt;
          distanceRef.current = (distanceRef.current + delta) % 100;
          if (distanceRef.current < 0) distanceRef.current += 100;

          setDistance(distanceRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [baseVelocity, slowDownFactor, slowdownOnHover, dragVelocityDecay]);

  // Flatten repeated items
  const items = useMemo(() => {
    const childArr = React.Children.toArray(children);
    return childArr.flatMap((child, childIdx) =>
      Array.from({ length: repeat }, (_, repIdx) => {
        const itemIdx = repIdx * childArr.length + childIdx;
        const totalItems = childArr.length * repeat;
        const offsetPercent = (itemIdx / totalItems) * 100;
        return {
          child,
          childIdx,
          repIdx,
          key: `${childIdx}-${repIdx}`,
          offsetPercent,
        };
      })
    );
  }, [children, repeat]);

  const uniqueId = useId();
  const actualPathId = pathId || `marquee-path-${uniqueId.replace(/:/g, "")}`;

  // Pointer drag handlers
  const onPointerDown = (e) => {
    if (!draggable) return;
    isDragging.current = true;
    lastPointerX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragVelocity.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current || !draggable) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const dx = clientX - lastPointerX.current;
    lastPointerX.current = clientX;

    const deltaDist = dx * dragSensitivity;
    dragVelocity.current = deltaDist * 30; // momentum
    distanceRef.current = (distanceRef.current - deltaDist) % 100;
    if (distanceRef.current < 0) distanceRef.current += 100;
    setDistance(distanceRef.current);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full select-none overflow-hidden", className)}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
      <div ref={svgRef} className="relative w-full h-full" style={{ contain: "layout style" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          className="w-full h-full"
        >
          <path id={actualPathId} d={path} stroke={showPath ? "#ccc" : "none"} fill="none" />
        </svg>

        {items.map((item) => {
          const itemPos = (distance + item.offsetPercent) % 100;
          const zIndex = enableRollingZIndex
            ? Math.floor(zIndexBase + (itemPos / 100) * zIndexRange)
            : undefined;

          return (
            <div
              key={item.key}
              className={cn("absolute top-0 left-0", draggable && grabCursor && "cursor-grab active:cursor-grabbing")}
              style={{
                offsetPath: `path('${path}')`,
                offsetDistance: `${itemPos}%`,
                zIndex,
                willChange: "offset-distance",
                backfaceVisibility: "hidden",
              }}
              aria-hidden={item.repIdx > 0}
              onMouseEnter={() => {
                isHovered.current = true;
              }}
              onMouseLeave={() => {
                isHovered.current = false;
              }}
            >
              {item.child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
