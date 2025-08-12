"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedBackground } from "@/components/ui/animated-background";
// Temporarily disabled: import { VoiceInterface } from "@/components/ui/voice-interface";
import {
  Car,
  Calendar,
  FileText,
  DollarSign,
  MessageSquare,
  Wrench,
  Users,
  Sparkles,
  Volume2,
  VolumeX,
  Globe2,
  Headphones,
} from "lucide-react";

type Agent = "carly" | "carlyle" | null;
type Task = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  agent: Agent;
  preview?: React.ReactNode;
};

const tasks: Task[] = [
  {
    id: "new-vehicle-exploration",
    title: "New Vehicle Exploration",
    description: "Guide customers through latest models and features",
    icon: <Car className="w-6 h-6" />,
    agent: "carly",
    preview: (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Ready to explore</span>
      </div>
    ),
  },
  {
    id: "test-drive-scheduling",
    title: "Test Drive Scheduling",
    description: "Book and manage test drive appointments",
    icon: <Calendar className="w-6 h-6" />,
    agent: "carly",
    preview: (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Calendar synced</span>
      </div>
    ),
  },
  {
    id: "feature-demonstration",
    title: "Feature Demonstrations",
    description: "Showcase vehicle technology and capabilities",
    icon: <Sparkles className="w-6 h-6" />,
    agent: "carly",
    preview: (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Interactive demo ready</span>
      </div>
    ),
  },
  {
    id: "financing-discussion",
    title: "Financing Discussions",
    description: "Explain financing options and monthly payments",
    icon: <DollarSign className="w-6 h-6" />,
    agent: "carly",
    preview: (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Calculator ready</span>
      </div>
    ),
  },
  {
    id: "used-vehicle-assessment",
    title: "Used Vehicle Assessment",
    description: "Evaluate pre-owned vehicle condition and value",
    icon: <FileText className="w-6 h-6" />,
    agent: "carlyle",
    preview: (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Inspection ready</span>
      </div>
    ),
  },
  {
    id: "trade-in-evaluation",
    title: "Trade-in Evaluation",
    description: "Assess trade-in value and process",
    icon: <Users className="w-6 h-6" />,
    agent: "carlyle",
    preview: (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Valuation tools ready</span>
      </div>
    ),
  },
  {
    id: "cpo-program",
    title: "CPO Program Explanation",
    description: "Certified Pre-Owned benefits and warranty",
    icon: <Wrench className="w-6 h-6" />,
    agent: "carlyle",
    preview: (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Certification details</span>
      </div>
    ),
  },
  {
    id: "market-value-analysis",
    title: "Market Value Analysis",
    description: "Compare pricing and market trends",
    icon: <MessageSquare className="w-6 h-6" />,
    agent: "carlyle",
    preview: (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Market data loaded</span>
      </div>
    ),
  },
];

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState<"agent" | "customer" | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [carouselRotation, setCarouselRotation] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleTaskSelect = async (taskId: string, agent: Agent) => {
    // Simplified version without webhook calls
    setSelectedTask(taskId);
    setSelectedAgent(agent);
    setIsListening(true);
    setIsSpeaking("agent");
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      <AnimatedBackground 
        isDemoMode={isListening}
        isSpeaking={isSpeaking === "agent" || isVoiceActive}
        agent={selectedAgent}
        audioLevel={audioLevel}
      />

      <div className="relative z-20 min-h-screen flex flex-col">
        <header className="bg-black/40 backdrop-blur-lg border-b border-white/20 shadow-lg">
          <div className="container mx-auto px-8 py-8">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-xl">
                  <Car className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Carly AI Platform
                  </h1>
                  <p className="text-lg text-gray-300 mt-2 font-medium">
                    Advanced Automotive Intelligence Solutions
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:shadow-lg"
                >
                  {audioEnabled ? (
                    <Volume2 className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {isListening && (
                  <button
                    onClick={() => {
                      setIsListening(false);
                      setSelectedAgent(null);
                      setSelectedTask(null);
                      setIsSpeaking(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 transition-all text-sm font-medium"
                  >
                    End Session
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </header>

        <div className="flex-grow flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-7xl">
            {!isListening ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Transform Your Dealership with
                    <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Intelligent Voice AI
                    </span>
                  </h2>
                  
                  <p className="text-gray-300 text-xl max-w-5xl mx-auto leading-relaxed mb-8">
                    Experience the power of conversational AI with our multilingual voice assistants.
                    Available in both male and female voices, 24/7 to engage customers and drive sales.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                      <Globe2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-gray-300">30+ Languages</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                      <Headphones className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">Natural Voice Interaction</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">Context-Aware Responses</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-8"
                >
                  <h3 className="text-3xl font-semibold text-white mb-4">
                    Select a Demo Scenario
                  </h3>
                  <div className="bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-cyan-400/10 border border-cyan-400/20 rounded-2xl p-6 max-w-3xl mx-auto mb-6">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                      <h4 className="text-xl font-semibold text-cyan-400">Ready to Start?</h4>
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      <strong>Click any card below</strong> to launch an interactive voice demo. 
                      Each agent specializes in different dealership scenarios.
                    </p>
                  </div>
                </motion.div>

                <div 
                  className="relative h-[700px] w-full flex items-center justify-center" 
                  style={{ perspective: "1200px" }}
                  onMouseEnter={() => setIsCarouselHovered(true)}
                  onMouseLeave={() => setIsCarouselHovered(false)}
                  onMouseDown={(e) => setDragStartX(e.clientX)}
                  onMouseMove={(e) => {
                    if (e.buttons === 1 && isCarouselHovered) {
                      const deltaX = e.clientX - dragStartX;
                      setCarouselRotation(prev => prev + deltaX * 0.5);
                      setDragStartX(e.clientX);
                    }
                  }}
                >
                  <motion.div
                    className="absolute pointer-events-none flex items-center justify-center"
                    animate={{ 
                      rotateY: isCarouselHovered ? carouselRotation : carouselRotation + 360 
                    }}
                    transition={{
                      duration: isCarouselHovered ? 0.5 : 40,
                      repeat: isCarouselHovered ? 0 : Infinity,
                      ease: isCarouselHovered ? "easeOut" : "linear"
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {tasks.map((task, index) => {
                      const totalTasks = tasks.length;
                      const angle = (360 / totalTasks) * index;
                      const radius = 380;
                      
                      return (
                        <div
                          key={task.id}
                          className="absolute pointer-events-auto"
                          style={{
                            width: "280px",
                            height: "340px",
                            left: "50%",
                            top: "50%",
                            transform: `
                              translateX(-50%)
                              translateY(-50%)
                              rotateY(${angle}deg)
                              translateZ(${radius}px)
                            `,
                            transformStyle: "preserve-3d",
                            zIndex: 100
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: index * 0.1, 
                              duration: 0.5,
                              type: "spring",
                              stiffness: 100
                            }}
                            className="w-full h-full pointer-events-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div 
                              onClick={() => handleTaskSelect(task.id, task.agent)}
                              className="w-full h-full cursor-pointer"
                              style={{ height: "340px" }}
                            >
                              <GlassCard
                                icon={task.icon}
                                title={task.title}
                                description={task.description}
                                preview={task.preview}
                                variant={task.agent}
                                className="pointer-events-auto"
                                style={{ height: "340px", minHeight: "340px" }}
                              />
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="relative h-full w-full flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center z-30 max-w-2xl mb-16"
                >
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {tasks.find(t => t.id === selectedTask)?.title}
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {tasks.find(t => t.id === selectedTask)?.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center z-30 mt-16 space-y-6"
                >
                  <motion.p 
                    className="text-2xl text-white font-light tracking-wide"
                  >
                    Voice Demo Ready (Vapi Integration Disabled)
                  </motion.p>
                  
                  <div className="flex justify-center items-end gap-1.5">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1.5 rounded-full ${
                          selectedAgent === "carly" ? "bg-cyan-400" : "bg-purple-400"
                        }`}
                        animate={{
                          height: [4, 25 + Math.random() * 15, 4],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1 + Math.random() * 0.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Demo Mode • Vapi Integration Coming Soon</span>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}