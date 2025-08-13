"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Dynamic import to avoid SSR issues
let Vapi: any = null;
if (typeof window !== "undefined") {
  import("@vapi-ai/web").then((module) => {
    Vapi = module.default;
  });
}

export interface VapiState {
  connecting: boolean;
  connected: boolean;
  assistantIsSpeaking: boolean;
  volumeLevel: number;
  callStarted: boolean;
  conversation: any[];
  isLoaded: boolean;
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
  const vapiRef = useRef<any>(null);
  const [vapiLoaded, setVapiLoaded] = useState(false);
  
  const [state, setState] = useState<VapiState>({
    connecting: false,
    connected: false,
    assistantIsSpeaking: false,
    volumeLevel: 0,
    callStarted: false,
    conversation: [],
    isLoaded: false,
  });

  // Load Vapi SDK dynamically
  useEffect(() => {
    if (typeof window !== "undefined" && !vapiLoaded) {
      import("@vapi-ai/web").then((module) => {
        Vapi = module.default;
        console.log("Vapi SDK loaded successfully:", Vapi);
        setVapiLoaded(true);
        setState(prev => ({ ...prev, isLoaded: true }));
      }).catch((error) => {
        console.error("Failed to load Vapi SDK:", error);
        setState(prev => ({ ...prev, isLoaded: false }));
      });
    }
  }, [vapiLoaded]);

  useEffect(() => {
    if (!config.apiKey || config.apiKey === "demo" || config.apiKey === "your_vapi_public_key_here") {
      console.log("Vapi API key not configured - voice features disabled");
      return;
    }

    // Wait for Vapi to be loaded
    if (!vapiLoaded || !Vapi) {
      console.log("Waiting for Vapi SDK to load...");
      return;
    }

    // Only initialize if not already initialized
    if (vapiRef.current) {
      return;
    }

    try {
      console.log("Initializing Vapi with:", {
        apiKeyFormat: config.apiKey?.substring(0, 8) + '...',
        assistantId: config.assistantId,
        vapiLoaded
      });
      
      // Initialize Vapi
      const vapi = new Vapi(config.apiKey);
      vapiRef.current = vapi;

      // Set up event listeners
      const handleCallStart = () => {
        setState(prev => ({ ...prev, connected: true, callStarted: true, connecting: false }));
        config.onCallStart?.();
      };

      const handleCallEnd = () => {
        setState(prev => ({ 
          ...prev, 
          connected: false, 
          callStarted: false, 
          assistantIsSpeaking: false,
          volumeLevel: 0,
          connecting: false
        }));
        config.onCallEnd?.();
      };

      const handleSpeechStart = () => {
        setState(prev => ({ ...prev, assistantIsSpeaking: true }));
        config.onSpeechStart?.();
      };

      const handleSpeechEnd = () => {
        setState(prev => ({ ...prev, assistantIsSpeaking: false }));
        config.onSpeechEnd?.();
      };

      const handleVolumeLevel = (volume: number) => {
        setState(prev => ({ ...prev, volumeLevel: volume }));
        config.onVolumeLevel?.(volume);
      };

      const handleMessage = (message: any) => {
        setState(prev => ({ 
          ...prev, 
          conversation: [...prev.conversation, message] 
        }));
        config.onMessage?.(message);
      };

      const handleError = (error: any) => {
        console.error("Vapi error details:", {
          error,
          errorType: typeof error,
          errorKeys: Object.keys(error || {}),
          errorMessage: error?.message,
          errorCode: error?.code,
          apiKey: config.apiKey ? `${config.apiKey.substring(0, 8)}...` : 'missing',
          assistantId: config.assistantId
        });
        setState(prev => ({ 
          ...prev, 
          connecting: false, 
          connected: false, 
          callStarted: false 
        }));
        config.onError?.(error);
      };

      vapi.on("call-start", handleCallStart);
      vapi.on("call-end", handleCallEnd);
      vapi.on("speech-start", handleSpeechStart);
      vapi.on("speech-end", handleSpeechEnd);
      vapi.on("volume-level", handleVolumeLevel);
      vapi.on("message", handleMessage);
      vapi.on("error", handleError);

      return () => {
        try {
          if (vapiRef.current) {
            vapi.off("call-start", handleCallStart);
            vapi.off("call-end", handleCallEnd);
            vapi.off("speech-start", handleSpeechStart);
            vapi.off("speech-end", handleSpeechEnd);
            vapi.off("volume-level", handleVolumeLevel);
            vapi.off("message", handleMessage);
            vapi.off("error", handleError);
            vapi.stop();
            vapiRef.current = null;
          }
        } catch (error) {
          console.error("Error cleaning up Vapi:", error);
        }
      };
    } catch (error) {
      console.error("Error initializing Vapi:", error);
      config.onError?.(error);
    }
  }, [config.apiKey, config.assistantId, vapiLoaded]);

  const start = useCallback(() => {
    if (!vapiRef.current) {
      console.error("Vapi not initialized");
      return;
    }

    if (!config.assistantId) {
      console.error("Assistant ID not provided");
      return;
    }

    setState(prev => ({ ...prev, connecting: true }));
    
    try {
      console.log("Starting Vapi call with:", {
        assistantId: config.assistantId,
        apiKey: config.apiKey.substring(0, 8) + '...'
      });
      
      // Try passing assistantId as string parameter instead of object
      vapiRef.current.start(config.assistantId);
    } catch (error) {
      console.error("Error starting Vapi call:", error);
      setState(prev => ({ ...prev, connecting: false }));
      config.onError?.(error);
    }
  }, [config.assistantId, config.onError]);

  const stop = useCallback(() => {
    if (!vapiRef.current) {
      console.error("Vapi not initialized");
      return;
    }

    vapiRef.current.stop();
  }, []);

  const send = useCallback((message: string) => {
    if (!vapiRef.current) {
      console.error("Vapi not initialized");
      return;
    }

    vapiRef.current.send({
      type: "add-message",
      message: {
        role: "user",
        content: message,
      },
    });
  }, []);

  return {
    ...state,
    start,
    stop,
    send,
    vapi: vapiRef.current,
  };
};