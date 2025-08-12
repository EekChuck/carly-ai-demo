"use client";

import { useCallback, useEffect, useRef, useState } from "react";
// Temporarily comment out Vapi to fix the app
// import Vapi from "@vapi-ai/web";

export interface VapiState {
  connecting: boolean;
  connected: boolean;
  assistantIsSpeaking: boolean;
  volumeLevel: number;
  callStarted: boolean;
  conversation: any[];
}

export interface UseVapiConfig {
  apiKey: string;
  assistantId: string;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onVolumeLevel?: (volume: number) => void;
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
}

export const useVapi = (config: UseVapiConfig) => {
  // const vapiRef = useRef<Vapi | null>(null);
  const vapiRef = useRef<any>(null);
  
  const [state, setState] = useState<VapiState>({
    connecting: false,
    connected: false,
    assistantIsSpeaking: false,
    volumeLevel: 0,
    callStarted: false,
    conversation: [],
  });

  // Mock implementation - remove when Vapi is properly configured
  useEffect(() => {
    console.log("Vapi mock implementation - voice features disabled");
    console.log("To enable voice features, configure Vapi API keys in .env.local");
    
    // Simulate some activity for demo purposes
    if (config.apiKey === "demo") {
      setTimeout(() => {
        config.onCallStart?.();
        setState(prev => ({ ...prev, connected: true, callStarted: true }));
      }, 1000);
    }
  }, [config]);

  const start = useCallback(() => {
    console.log("Mock Vapi start - voice features disabled");
    setState(prev => ({ ...prev, connecting: true }));
    
    // Simulate connection for demo
    setTimeout(() => {
      setState(prev => ({ ...prev, connecting: false, connected: true, callStarted: true }));
      config.onCallStart?.();
    }, 500);
  }, [config.onCallStart]);

  const stop = useCallback(() => {
    console.log("Mock Vapi stop");
    setState(prev => ({ 
      ...prev, 
      connecting: false, 
      connected: false, 
      callStarted: false,
      assistantIsSpeaking: false,
      volumeLevel: 0
    }));
    config.onCallEnd?.();
  }, [config.onCallEnd]);

  const send = useCallback((message: string) => {
    console.log("Mock Vapi send:", message);
    // Simulate response
    setState(prev => ({ 
      ...prev, 
      conversation: [...prev.conversation, { role: "user", content: message }] 
    }));
  }, []);

  return {
    ...state,
    start,
    stop,
    send,
    vapi: vapiRef.current,
  };
};