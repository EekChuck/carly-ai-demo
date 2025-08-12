"use client";

import React from "react";
import { motion } from "framer-motion";
import { useVapi } from "@/hooks/useVapi";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";

interface VoiceInterfaceProps {
  agent: "carly" | "carlyle" | null;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onVolumeLevel?: (volume: number) => void;
}

export function VoiceInterface({
  agent,
  onSpeechStart,
  onSpeechEnd,
  onVolumeLevel,
}: VoiceInterfaceProps) {
  const apiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const assistantId = agent === "carly" 
    ? process.env.NEXT_PUBLIC_CARLY_ASSISTANT_ID
    : process.env.NEXT_PUBLIC_CARLYLE_ASSISTANT_ID;

  const vapi = useVapi({
    apiKey: apiKey || "",
    assistantId: assistantId || "",
    onSpeechStart,
    onSpeechEnd,
    onVolumeLevel,
    onCallStart: () => {
      console.log(`${agent} call started`);
    },
    onCallEnd: () => {
      console.log(`${agent} call ended`);
    },
    onMessage: (message) => {
      console.log("Message:", message);
    },
    onError: (error) => {
      console.error("Vapi error:", error);
    },
  });

  if (!apiKey || !assistantId) {
    return (
      <div className="text-center p-4">
        <p className="text-red-400 text-sm mb-2">
          Voice functionality requires configuration
        </p>
        <p className="text-gray-400 text-xs">
          Please set up your Vapi API keys and assistant IDs in .env.local
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Voice Control Button */}
      <motion.button
        onClick={vapi.connected ? vapi.stop : vapi.start}
        disabled={vapi.connecting}
        className={`
          relative p-6 rounded-full transition-all duration-300 shadow-2xl
          ${vapi.connected 
            ? "bg-red-500/20 hover:bg-red-500/30 border-red-500/50" 
            : "bg-green-500/20 hover:bg-green-500/30 border-green-500/50"
          }
          ${vapi.connecting ? "opacity-50 cursor-not-allowed" : ""}
          border-2 backdrop-blur-sm
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {vapi.connecting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Mic className="w-8 h-8 text-gray-400" />
          </motion.div>
        ) : vapi.connected ? (
          <PhoneOff className="w-8 h-8 text-red-400" />
        ) : (
          <Phone className="w-8 h-8 text-green-400" />
        )}
        
        {/* Pulsing ring when connected */}
        {vapi.connected && (
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

      {/* Status Text */}
      <div className="text-center">
        {vapi.connecting && (
          <p className="text-blue-400 text-sm">Connecting to {agent}...</p>
        )}
        {vapi.connected && !vapi.assistantIsSpeaking && (
          <p className="text-green-400 text-sm">Listening...</p>
        )}
        {vapi.assistantIsSpeaking && (
          <p className="text-cyan-400 text-sm">{agent} is speaking</p>
        )}
        {!vapi.connected && !vapi.connecting && (
          <p className="text-gray-400 text-sm">
            Click to start conversation with {agent}
          </p>
        )}
      </div>

      {/* Volume Indicator */}
      {vapi.connected && vapi.volumeLevel > 0 && (
        <div className="flex items-center gap-1">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 bg-green-400 rounded-full ${
                i < vapi.volumeLevel * 10 ? "opacity-100" : "opacity-20"
              }`}
              style={{ height: `${4 + i * 2}px` }}
              animate={{
                height: i < vapi.volumeLevel * 10 ? `${4 + i * 2}px` : "4px",
              }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}