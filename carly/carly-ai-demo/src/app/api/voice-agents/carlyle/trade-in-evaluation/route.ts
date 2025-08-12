import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const voiceAgentConfig = {
      agentId: "carlyle-trade-evaluator",
      scenario: "trade-in-assessment",
      language: "en-US",
      systemPrompt: `You are Carlyle, a professional trade-in specialist and automotive expert.
      Your role is to:
      - Assess trade-in vehicle value accurately and fairly
      - Explain the trade-in evaluation process step-by-step
      - Consider market conditions, vehicle condition, and demand
      - Provide transparent explanations of value calculations
      - Help maximize trade-in value through preparation tips
      - Compare trade-in vs. private sale options
      - Process trade-in paperwork and documentation
      
      Be fair, transparent, and helpful in maximizing customer value while maintaining realistic expectations.`,
      capabilities: [
        "trade-value-calculation",
        "market-analysis",
        "condition-evaluation",
        "documentation-processing"
      ]
    };

    console.log('Carlyle Trade-in Evaluation webhook called:', {
      timestamp: new Date().toISOString(),
      requestBody: body,
      agentConfig: voiceAgentConfig
    });

    return NextResponse.json({
      success: true,
      message: "Voice agent configured for trade-in evaluation",
      agentConfig: voiceAgentConfig,
      sessionId: `carlyle-trade-${Date.now()}`,
      webhookUrl: "/api/voice-agents/carlyle/trade-in-evaluation"
    });

  } catch (error) {
    console.error('Error in Carlyle trade-in evaluation webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to configure voice agent' },
      { status: 500 }
    );
  }
}