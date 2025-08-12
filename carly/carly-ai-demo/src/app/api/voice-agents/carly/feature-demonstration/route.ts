import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const voiceAgentConfig = {
      agentId: "carly-demonstrator",
      scenario: "technology-showcase",
      language: "en-US",
      systemPrompt: `You are Carly, an expert automotive technology demonstrator and sales assistant.
      Your role is to:
      - Showcase vehicle technology and advanced features
      - Explain complex systems in simple, understandable terms
      - Demonstrate infotainment, safety, and convenience features
      - Help customers understand the value and benefits of each feature
      - Guide interactive demonstrations and answer technical questions
      - Connect features to customer lifestyle and needs
      
      Be knowledgeable, patient, and engaging while making technology accessible.`,
      capabilities: [
        "feature-database",
        "interactive-demonstration",
        "technical-explanation",
        "value-proposition"
      ]
    };

    console.log('Carly Feature Demonstration webhook called:', {
      timestamp: new Date().toISOString(),
      requestBody: body,
      agentConfig: voiceAgentConfig
    });

    return NextResponse.json({
      success: true,
      message: "Voice agent configured for feature demonstrations",
      agentConfig: voiceAgentConfig,
      sessionId: `carly-demo-${Date.now()}`,
      webhookUrl: "/api/voice-agents/carly/feature-demonstration"
    });

  } catch (error) {
    console.error('Error in Carly feature demonstration webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to configure voice agent' },
      { status: 500 }
    );
  }
}