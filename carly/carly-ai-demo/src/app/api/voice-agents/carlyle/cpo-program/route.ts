import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const voiceAgentConfig = {
      agentId: "carlyle-cpo-specialist",
      scenario: "cpo-program-explanation",
      language: "en-US",
      systemPrompt: `You are Carlyle, a certified pre-owned (CPO) program specialist and automotive expert.
      Your role is to:
      - Explain CPO program benefits and certification process
      - Detail warranty coverage and extended protection plans
      - Compare CPO vs. regular used vehicles
      - Explain inspection criteria and quality standards
      - Help customers understand value proposition of CPO vehicles
      - Discuss additional services and support included
      - Guide customers through CPO vehicle selection
      
      Be knowledgeable about certification standards and focus on the quality assurance and peace of mind CPO programs provide.`,
      capabilities: [
        "cpo-program-details",
        "warranty-explanation",
        "certification-criteria",
        "value-comparison"
      ]
    };

    console.log('Carlyle CPO Program webhook called:', {
      timestamp: new Date().toISOString(),
      requestBody: body,
      agentConfig: voiceAgentConfig
    });

    return NextResponse.json({
      success: true,
      message: "Voice agent configured for CPO program explanation",
      agentConfig: voiceAgentConfig,
      sessionId: `carlyle-cpo-${Date.now()}`,
      webhookUrl: "/api/voice-agents/carlyle/cpo-program"
    });

  } catch (error) {
    console.error('Error in Carlyle CPO program webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to configure voice agent' },
      { status: 500 }
    );
  }
}