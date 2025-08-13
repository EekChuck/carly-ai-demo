"use client";

import React from "react";
import { motion } from "framer-motion";
import { useVapiCall } from "@vapi-ai/client-sdk-react";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";

interface VoiceInterfaceProps {
  agent: "carly" | "carlyle" | null;
  taskId?: string;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onVolumeLevel?: (volume: number) => void;
  onCallEnd?: () => void;
}

export function VoiceInterface({
  agent,
  taskId,
  onSpeechStart,
  onSpeechEnd,
  onVolumeLevel,
  onCallEnd,
}: VoiceInterfaceProps) {
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
    } else if (agent === "carlyle") {
      switch (taskId) {
        case "used-vehicle-assessment":
          return process.env.NEXT_PUBLIC_CARLYLE_USED_VEHICLE_ASSISTANT_ID;
        case "trade-in-evaluation":
          return process.env.NEXT_PUBLIC_CARLYLE_TRADE_IN_ASSISTANT_ID;
        case "cpo-program":
          return process.env.NEXT_PUBLIC_CARLYLE_CPO_ASSISTANT_ID;
        case "market-analysis":
          return process.env.NEXT_PUBLIC_CARLYLE_MARKET_ANALYSIS_ASSISTANT_ID;
        default:
          return process.env.NEXT_PUBLIC_CARLYLE_USED_VEHICLE_ASSISTANT_ID;
      }
    }
    return "";
  };
  
  const assistantId = getAssistantId();

  // Use the official Vapi React SDK
  const { volumeLevel, isCallActive, isSpeaking, connectionStatus, startCall, endCall, toggleCall } = useVapiCall({
    publicKey: apiKey || "",
    callOptions: {
      assistantId: assistantId || "",
    },
    onCallStart: () => {
      console.log(`${agent} call started`);
    },
    onCallEnd: () => {
      console.log(`${agent} call ended`);
      onCallEnd?.();
    },
    onMessage: (message) => {
      console.log("Message:", message);
    },
    onError: (error) => {
      console.error("Vapi error:", error);
    },
    onTranscript: (transcript) => {
      console.log("Transcript:", transcript);
    },
  });

  // Handle speech events
  React.useEffect(() => {
    if (isSpeaking) {
      onSpeechStart?.();
    } else {
      onSpeechEnd?.();
    }
  }, [isSpeaking, onSpeechStart, onSpeechEnd]);

  // Update volume level
  React.useEffect(() => {
    if (volumeLevel && onVolumeLevel) {
      onVolumeLevel(volumeLevel);
    }
  }, [volumeLevel, onVolumeLevel]);

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
        onClick={toggleCall}
        disabled={false}
        className={`
          relative p-6 rounded-full transition-all duration-300 shadow-2xl
          ${isCallActive 
            ? "bg-red-500/20 hover:bg-red-500/30 border-red-500/50" 
            : "bg-green-500/20 hover:bg-green-500/30 border-green-500/50"
          }
          border-2 backdrop-blur-sm
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCallActive ? (
          <PhoneOff className="w-8 h-8 text-red-400" />
        ) : (
          <Phone className="w-8 h-8 text-green-400" />
        )}
        
        {/* Pulsing ring when connected */}
        {isCallActive && (
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
        {connectionStatus === 'connecting' && (
          <p className="text-blue-400 text-sm">Connecting to {agent}...</p>
        )}
        {isCallActive && connectionStatus === 'connected' && !isSpeaking && (
          <p className="text-green-400 text-sm">Listening...</p>
        )}
        {isSpeaking && (
          <p className="text-cyan-400 text-sm">{agent} is speaking</p>
        )}
        {!isCallActive && connectionStatus === 'disconnected' && (
          <p className="text-gray-400 text-sm">
            Click to start conversation with {agent}
          </p>
        )}
      </div>

      {/* Volume Indicator */}
      {isCallActive && volumeLevel && volumeLevel > 0 && (
        <div className="flex items-center gap-1">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 bg-green-400 rounded-full ${
                i < volumeLevel * 10 ? "opacity-100" : "opacity-20"
              }`}
              style={{ height: `${4 + i * 2}px` }}
              animate={{
                height: i < volumeLevel * 10 ? `${4 + i * 2}px` : "4px",
              }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}