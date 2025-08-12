"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  onClick?: () => void;
  preview?: ReactNode;
  isActive?: boolean;
  variant?: "default" | "carly" | "carlyle";
}

export function GlassCard({
  children,
  className,
  icon,
  title,
  description,
  onClick,
  preview,
  isActive = false,
  variant = "default",
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    default: {
      borderColor: "rgba(255, 255, 255, 0.45)",
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%)",
      boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.15)",
    },
    carly: {
      borderColor: "rgba(34, 211, 238, 0.55)",
      background: "linear-gradient(135deg, rgba(34, 211, 238, 0.35) 0%, rgba(34, 211, 238, 0.25) 100%)",
      boxShadow: "0 4px 16px 0 rgba(34, 211, 238, 0.12)",
    },
    carlyle: {
      borderColor: "rgba(168, 85, 247, 0.55)",
      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.35) 0%, rgba(168, 85, 247, 0.25) 100%)",
      boxShadow: "0 4px 16px 0 rgba(168, 85, 247, 0.12)",
    },
  };

  const cardStyle = {
    ...variantStyles[variant],
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: `1px solid ${variantStyles[variant].borderColor}`,
    borderRadius: "16px",
    padding: "24px",
    position: "relative" as const,
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const hoverGlow = {
    default: "",
    carly: "0 0 4px rgba(34, 211, 238, 0.1)",
    carlyle: "0 0 4px rgba(168, 85, 247, 0.1)",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative group", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          if (variant !== "default") {
            e.currentTarget.style.boxShadow = hoverGlow[variant];
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow;
        }}
      >
        {/* Comet-like yellow tracer animation on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{ 
            borderRadius: "16px",
            transition: "opacity 0.3s ease",
          }}
        >
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              {/* Gradient for the comet tail - connected to the light */}
              <linearGradient id={`comet-gradient-${variant}`}>
                <stop offset="0%" stopColor="rgba(255, 234, 0, 0)" />
                <stop offset="70%" stopColor="rgba(255, 234, 0, 0.3)" />
                <stop offset="90%" stopColor="rgba(255, 255, 0, 0.8)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
              </linearGradient>
              {/* Glow filter */}
              <filter id={`comet-glow-${variant}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Single animated path with gradient */}
            <rect
              x="3"
              y="3"
              width="calc(100% - 6px)"
              height="calc(100% - 6px)"
              rx="13"
              ry="13"
              fill="none"
              stroke={`url(#comet-gradient-${variant})`}
              strokeWidth="2"
              strokeDasharray="80 320"
              filter={`url(#comet-glow-${variant})`}
              strokeLinecap="round"
              pathLength="400"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-400"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>

        {/* Background gradient overlay */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        
        {/* Shimmer effect on hover */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            pointerEvents: "none",
          }}
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Content */}
        <div style={{ 
          position: "relative", 
          zIndex: 10, 
          display: "flex", 
          flexDirection: "column", 
          height: "100%",
          justifyContent: "space-between"
        }}>
          <div>
            {(icon || title || description) && (
              <div style={{ marginBottom: "16px" }}>
                {icon && (
                  <div style={{ 
                    marginBottom: "12px", 
                    color: variant === "carly" ? "#22d3ee" : variant === "carlyle" ? "#a855f7" : "#00D4FF"
                  }}>
                    {icon}
                  </div>
                )}
                {title && (
                  <h3 style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}>
                    {title}
                  </h3>
                )}
                {description && (
                  <p style={{
                    color: "rgba(209, 213, 219, 0.9)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}>
                    {description}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>

          {/* Preview area - pushed to bottom */}
          {preview && (
            <motion.div
              style={{
                marginTop: "auto",
                padding: "12px",
                borderRadius: "8px",
                background: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {preview}
            </motion.div>
          )}
        </div>

        {/* Hover indicator bar */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: variant === "carly" 
              ? "linear-gradient(90deg, #22d3ee, #3b82f6)"
              : variant === "carlyle"
              ? "linear-gradient(90deg, #a855f7, #6366f1)"
              : "linear-gradient(90deg, #00D4FF, #8B5CF6)",
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}