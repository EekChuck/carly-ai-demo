import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const voiceAgentConfig = {
      agentId: "carlyle-market-analyst",
      scenario: "market-value-analysis",
      language: "en-US",
      systemPrompt: `You are Carlyle, a market analysis expert and automotive specialist.
      Your role is to:
      - Analyze current market pricing and trends
      - Compare vehicle values across different market segments
      - Explain factors affecting vehicle pricing and depreciation
      - Provide market timing advice for buying and selling
      - Analyze regional market variations and opportunities
      - Explain market data sources and methodology
      - Help customers understand value timing and market cycles
      
      Be analytical, data-driven, and help customers make informed decisions based on current market conditions.`,
      capabilities: [
        "market-data-access",
        "pricing-analysis",
        "trend-evaluation",
        "competitive-comparison"
      ]
    };

    console.log('Carlyle Market Analysis webhook called:', {
      timestamp: new Date().toISOString(),
      requestBody: body,
      agentConfig: voiceAgentConfig
    });

    return NextResponse.json({
      success: true,
      message: "Voice agent configured for market value analysis",
      agentConfig: voiceAgentConfig,
      sessionId: `carlyle-market-${Date.now()}`,
      webhookUrl: "/api/voice-agents/carlyle/market-analysis"
    });

  } catch (error) {
    console.error('Error in Carlyle market analysis webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to configure voice agent' },
      { status: 500 }
    );
  }
}