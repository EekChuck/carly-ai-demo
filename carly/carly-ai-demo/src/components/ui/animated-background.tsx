"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface AnimatedBackgroundProps {
  isDemoMode?: boolean;
  isSpeaking?: boolean;
  agent?: "carly" | "carlyle" | null;
  audioLevel?: number; // 0-1 for audio responsiveness
}

export function AnimatedBackground({ 
  isDemoMode = false, 
  isSpeaking = false, 
  agent = null,
  audioLevel = 0 
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 }); // More responsive for main view
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDemoMode) { // Only track mouse when not in demo mode
        mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
        mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY, isDemoMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear existing particles when switching modes
    particlesRef.current = [];

    // Fixed particle count - no accumulation
    const particleCount = isDemoMode ? 150 : 100;

    // Initialize particles - different systems for demo vs main page
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = isDemoMode ? 300 : 300;
      
      if (isDemoMode) {
        // Simplified neural network nodes
        particlesRef.current.push({
          baseX: radius * Math.sin(phi) * Math.cos(theta),
          baseY: radius * Math.sin(phi) * Math.sin(theta),
          baseZ: radius * Math.cos(phi),
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
          brightness: 0.5 + Math.random() * 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          sparkTimer: Math.random() * 100,
          visible: true,
          prevX: 0,
          prevY: 0,
        });
      } else {
        // Original particle system for main page
        particlesRef.current.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
          prevX: 0,
          prevY: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          pulsePhase: Math.random() * Math.PI * 2,
          brightness: 0.5 + Math.random() * 0.5,
          sparkTimer: Math.random() * 100,
          visible: true,
        });
      }
    }

    let rotation = 0;
    let frame = 0;
    let turbulence = 0;
    let targetTurbulence = 0;

    const animate = () => {
      // Clear canvas completely each frame for performance
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle background gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      bgGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2 + (!isDemoMode ? springX.get() * 50 : 0);
      const scrollOffset = isDemoMode ? 0 : -scrollY * 0.8;
      const centerY = (canvas.height / 2) + (isDemoMode ? 0 : 500) + scrollOffset + (!isDemoMode ? springY.get() * 50 : 0);

      // Rotation speed - make demo mode visible but still slow
      const baseRotationSpeed = isDemoMode ? 0.001 : 0.005;
      const mouseInfluence = !isDemoMode ? springX.get() * 0.01 : 0;
      const audioInfluence = isDemoMode && isSpeaking ? audioLevel * 0.0001 : 0;
      rotation += baseRotationSpeed + mouseInfluence + audioInfluence;
      frame++;

      // Turbulence for main page
      if (!isDemoMode) {
        targetTurbulence = 5 + Math.abs(springX.get() + springY.get()) * 10;
        turbulence += (targetTurbulence - turbulence) * 0.03;
      }

      // Color system
      const particleColor = agent === "carly" ? [34, 211, 238] : agent === "carlyle" ? [168, 85, 247] : [34, 211, 238];

      if (isDemoMode) {
        // DEMO MODE: SAFE, SLOW, MEDITATIVE VERSION
        
        particlesRef.current.forEach((particle, i) => {
          // NO BLINKING - fixed brightness
          particle.brightness = 0.6 + (isSpeaking ? audioLevel * 0.2 : 0); // Stable brightness, gentle audio response only
          
          // Apply the SAME slow rotation as main page
          const cosRot = Math.cos(rotation);
          const sinRot = Math.sin(rotation);
          const rotatedX = particle.baseX * cosRot - particle.baseZ * sinRot;
          const rotatedZ = particle.baseX * sinRot + particle.baseZ * cosRot;
          
          // Update position smoothly
          particle.x = rotatedX;
          particle.y = particle.baseY;
          particle.z = rotatedZ;

          // Project to 2D with same parameters as main page
          const perspective = 600;
          const scale = perspective / (perspective + particle.z);
          const x2d = rotatedX * scale + centerX;
          const y2d = particle.y * scale + centerY;

          // Draw connections - same logic as main page but slightly denser
          particlesRef.current.forEach((otherParticle, j) => {
            if (i >= j) return;
            
            const otherScale = perspective / (perspective + otherParticle.z);
            const otherX2d = otherParticle.x * otherScale + centerX;
            const otherY2d = otherParticle.y * otherScale + centerY;
            
            const distance = Math.sqrt(Math.pow(x2d - otherX2d, 2) + Math.pow(y2d - otherY2d, 2));
            
            if (distance < 90) { // Slightly denser network
              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(otherX2d, otherY2d);
              
              const distanceFactor = 1 - (distance / 90);
              const depthFactor = (scale + otherScale) / 2;
              const opacity = distanceFactor * distanceFactor * depthFactor * 0.2; // Gentle opacity
              
              ctx.strokeStyle = `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${opacity})`;
              ctx.lineWidth = depthFactor * 0.5;
              ctx.stroke();
            }
          });

          // Draw particle with gentle glow - NO violent changes
          const nodeSize = scale * 1.5 * Math.max(0.5, particle.brightness); // Ensure minimum size
          
          // Gentle outer glow
          const glowGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, nodeSize * 4);
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${0.6 * particle.brightness})`);
          glowGradient.addColorStop(0.3, `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${0.4 * particle.brightness})`);
          glowGradient.addColorStop(0.7, `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${0.1 * particle.brightness})`);
          glowGradient.addColorStop(1, `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, 0)`);
          
          ctx.beginPath();
          ctx.arc(x2d, y2d, nodeSize * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
          
          // Stable core
          ctx.beginPath();
          ctx.arc(x2d, y2d, nodeSize * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * particle.brightness})`;
          ctx.fill();
          
          particle.prevX = x2d;
          particle.prevY = y2d;
        });

      } else {
        // MAIN PAGE: Original particle system
        
        particlesRef.current.forEach((particle, i) => {
          // Update spark timer
          particle.sparkTimer--;
          if (particle.sparkTimer <= 0) {
            particle.sparkTimer = 100 + Math.random() * 200;
            particle.brightness = 0.7;
          } else {
            particle.brightness *= 0.995;
            if (particle.brightness < 0.5) particle.brightness = 0.5;
          }

          // Apply rotation
          const cosRot = Math.cos(rotation);
          const sinRot = Math.sin(rotation);
          const rotatedX = particle.x * cosRot - particle.z * sinRot;
          const rotatedZ = particle.x * sinRot + particle.z * cosRot;
          
          const verticalRotation = springY.get() * 0.3;
          const cosVert = Math.cos(verticalRotation);
          const sinVert = Math.sin(verticalRotation);
          const finalY = particle.y * cosVert - rotatedZ * sinVert;
          const finalZ = particle.y * sinVert + rotatedZ * cosVert;

          // Project to 2D
          const perspective = 600;
          const scale = perspective / (perspective + finalZ);
          const x2d = rotatedX * scale + centerX;
          const y2d = finalY * scale + centerY;

          // Draw connections to nearby particles
          particlesRef.current.forEach((otherParticle, j) => {
            if (i >= j) return;
            
            const otherRotatedX = otherParticle.x * cosRot - otherParticle.z * sinRot;
            const otherRotatedZ = otherParticle.x * sinRot + otherParticle.z * cosRot;
            const otherFinalY = otherParticle.y * cosVert - otherRotatedZ * sinVert;
            const otherFinalZ = otherParticle.y * sinVert + otherRotatedZ * cosVert;
            
            const otherScale = perspective / (perspective + otherFinalZ);
            const otherX2d = otherRotatedX * otherScale + centerX;
            const otherY2d = otherFinalY * otherScale + centerY;
            
            const distance = Math.sqrt(Math.pow(x2d - otherX2d, 2) + Math.pow(y2d - otherY2d, 2));
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(otherX2d, otherY2d);
              
              const distanceFactor = 1 - (distance / 100);
              const depthFactor = (scale + otherScale) / 2;
              const opacity = distanceFactor * distanceFactor * depthFactor * 0.15;
              
              ctx.strokeStyle = `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${opacity})`;
              ctx.lineWidth = depthFactor * 0.5;
              ctx.stroke();
            }
          });

          // Draw particle
          const nodeSize = scale * 1.5 * particle.brightness;
          
          const glowGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, nodeSize * 6);
          const pulseIntensity = particle.brightness;
          
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * pulseIntensity})`);
          glowGradient.addColorStop(0.1, `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${0.8 * pulseIntensity})`);
          glowGradient.addColorStop(0.3, `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${0.4 * pulseIntensity})`);
          glowGradient.addColorStop(0.6, `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${0.1 * pulseIntensity})`);
          glowGradient.addColorStop(1, `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, 0)`);
          
          ctx.beginPath();
          ctx.arc(x2d, y2d, nodeSize * 6, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(x2d, y2d, nodeSize * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * pulseIntensity})`;
          ctx.fill();
          
          particle.prevX = x2d;
          particle.prevY = y2d;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [springX, springY, isDemoMode, isSpeaking, agent, audioLevel, scrollY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: isDemoMode ? 0.9 : 0.6,
          zIndex: isDemoMode ? 10 : 1,
        }}
      />
      
      {/* Circuit pattern overlay - hidden in demo mode */}
      {!isDemoMode && (
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.05, zIndex: 2 }}
        >
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5" cy="5" r="1" fill="#22d3ee" />
              <circle cx="95" cy="5" r="1" fill="#22d3ee" />
              <circle cx="95" cy="95" r="1" fill="#22d3ee" />
              <circle cx="5" cy="95" r="1" fill="#22d3ee" />
              <circle cx="50" cy="50" r="1.5" fill="#a855f7" />
              
              <line x1="5" y1="5" x2="50" y2="50" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
              <line x1="95" y1="5" x2="50" y2="50" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
              <line x1="95" y1="95" x2="50" y2="50" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
              <line x1="5" y1="95" x2="50" y2="50" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      )}

      {/* Gradient overlays for depth */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: isDemoMode ? 11 : 3 }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-30" />
      </div>
    </>
  );
}