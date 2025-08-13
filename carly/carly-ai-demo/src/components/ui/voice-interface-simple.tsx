"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff } from "lucide-react";

interface VoiceInterfaceSimpleProps {
  agent: "carly" | "carlyle" | null;
  taskId?: string;
  onCallEnd?: () => void;
}

export function VoiceInterfaceSimple({
  agent,
  taskId,
  onCallEnd,
}: VoiceInterfaceSimpleProps) {
  const [isActive, setIsActive] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  
  const apiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  
  // Map task IDs to specific assistant IDs
  const getAssistantId = () => {
    if (agent === "carly") {
      switch (taskId) {
        case "new-vehicle-exploration":
          return process.env.NEXT_PUBLIC_CARLY_NEW_VEHICLE_ASSISTANT_ID;
        case "test-drive-scheduling":
          return process.env.NEXT_PUBLIC_CARLY_TEST_DRIVE_ASSISTANT_ID;
        case "feature-demonstration":
          return process.env.NEXT_PUBLIC_CARLY_FEATURES_ASSISTANT_ID;
        case "financing-discussion":
          return process.env.NEXT_PUBLIC_CARLY_FINANCING_ASSISTANT_ID;
        default:
          return process.env.NEXT_PUBLIC_CARLY_NEW_VEHICLE_ASSISTANT_ID;
      }
    }
    // Add Carlyle assistants when configured
    return process.env.NEXT_PUBLIC_CARLY_NEW_VEHICLE_ASSISTANT_ID;
  };
  
  const assistantId = getAssistantId();

  useEffect(() => {
    // Only load Vapi on client side
    if (typeof window !== 'undefined' && apiKey && assistantId) {
      // Load Vapi dynamically
      import('@vapi-ai/web').then((VapiModule) => {
        const Vapi = VapiModule.default;
        const vapi = new Vapi(apiKey);
        
        vapi.on('call-start', () => {
          console.log('Call started');
          setIsActive(true);
        });
        
        vapi.on('call-end', () => {
          console.log('Call ended');
          setIsActive(false);
          // Small delay before callback to allow Daily.co to clean up
          setTimeout(() => {
            onCallEnd?.();
          }, 100);
        });
        
        vapi.on('error', (error: any) => {
          // Filter out expected Daily.co cleanup errors
          if (error?.message?.includes('Meeting ended') || 
              error?.message?.includes('Meeting has ended') ||
              error?.message?.includes('ejection')) {
            console.log('Call ended normally');
          } else {
            console.error('Vapi error:', error);
          }
          setIsActive(false);
        });
        
        setVapiInstance(vapi);
      }).catch((error) => {
        console.error('Failed to load Vapi:', error);
      });
    }
    
    // Cleanup function
    return () => {
      if (vapiInstance && isActive) {
        try {
          vapiInstance.stop();
        } catch (error) {
          // Ignore cleanup errors
          console.log('Cleanup on unmount');
        }
      }
    };
  }, [apiKey, assistantId, onCallEnd]);

  const handleToggle = () => {
    if (!vapiInstance) {
      console.error('Vapi not loaded');
      return;
    }

    if (isActive) {
      vapiInstance.stop();
    } else {
      // Use the simpler string format that worked in testing
      vapiInstance.start(assistantId);
    }
  };

  if (!apiKey || !assistantId) {
    return (
      <div className="text-center p-4">
        <p className="text-red-400 text-sm mb-2">
          Voice functionality requires configuration
        </p>
        <p className="text-gray-400 text-xs">
          Please set up your Vapi API keys in .env.local
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={handleToggle}
        className={`
          relative p-6 rounded-full transition-all duration-300 shadow-2xl
          ${isActive 
            ? "bg-red-500/20 hover:bg-red-500/30 border-red-500/50" 
            : "bg-green-500/20 hover:bg-green-500/30 border-green-500/50"
          }
          border-2 backdrop-blur-sm
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isActive ? (
          <PhoneOff className="w-8 h-8 text-red-400" />
        ) : (
          <Phone className="w-8 h-8 text-green-400" />
        )}
        
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>

      <div className="text-center">
        <p className="text-gray-400 text-sm">
          {isActive ? `Connected to ${agent}` : `Click to start conversation with ${agent}`}
        </p>
      </div>
    </div>
  );
}