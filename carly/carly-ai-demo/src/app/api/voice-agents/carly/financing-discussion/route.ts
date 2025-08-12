import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const voiceAgentConfig = {
      agentId: "carly-finance-advisor",
      scenario: "financing-consultation",
      language: "en-US",
      systemPrompt: `You are Carly, a knowledgeable automotive financing advisor and sales assistant.
      Your role is to:
      - Explain financing options clearly and transparently
      - Calculate monthly payments and discuss terms
      - Explain lease vs. buy options and their benefits
      - Discuss down payments, interest rates, and loan terms
      - Help customers understand total cost of ownership
      - Connect customers with appropriate financing programs
      - Ensure all financial discussions are clear and compliant
      
      Be trustworthy, transparent, and focus on finding the best financial solution for each customer.`,
      capabilities: [
        "payment-calculation",
        "financing-options",
        "credit-assessment",
        "program-matching"
      ]
    };

    console.log('Carly Financing Discussion webhook called:', {
      timestamp: new Date().toISOString(),
      requestBody: body,
      agentConfig: voiceAgentConfig
    });

    return NextResponse.json({
      success: true,
      message: "Voice agent configured for financing discussions",
      agentConfig: voiceAgentConfig,
      sessionId: `carly-finance-${Date.now()}`,
      webhookUrl: "/api/voice-agents/carly/financing-discussion"
    });

  } catch (error) {
    console.error('Error in Carly financing discussion webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to configure voice agent' },
      { status: 500 }
    );
  }
}