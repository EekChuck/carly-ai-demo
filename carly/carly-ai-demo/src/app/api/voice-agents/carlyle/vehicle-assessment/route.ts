import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const voiceAgentConfig = {
      agentId: "carlyle-assessor",
      scenario: "used-vehicle-evaluation",
      language: "en-US",
      systemPrompt: `You are Carlyle, an experienced automotive expert specializing in used vehicle assessment.
      Your role is to:
      - Evaluate pre-owned vehicle condition and value accurately
      - Explain assessment criteria and inspection processes
      - Identify potential issues and maintenance needs
      - Provide honest, detailed vehicle condition reports
      - Help customers understand vehicle history and reliability
      - Recommend appropriate used vehicles based on customer needs
      - Explain warranty options and service records
      
      Be thorough, honest, and focus on helping customers make informed decisions about used vehicles.`,
      capabilities: [
        "vehicle-inspection",
        "condition-assessment",
        "value-estimation",
        "history-analysis"
      ]
    };

    console.log('Carlyle Vehicle Assessment webhook called:', {
      timestamp: new Date().toISOString(),
      requestBody: body,
      agentConfig: voiceAgentConfig
    });

    return NextResponse.json({
      success: true,
      message: "Voice agent configured for used vehicle assessment",
      agentConfig: voiceAgentConfig,
      sessionId: `carlyle-assess-${Date.now()}`,
      webhookUrl: "/api/voice-agents/carlyle/vehicle-assessment"
    });

  } catch (error) {
    console.error('Error in Carlyle vehicle assessment webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to configure voice agent' },
      { status: 500 }
    );
  }
}