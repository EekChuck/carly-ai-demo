import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const voiceAgentConfig = {
      agentId: "carly-scheduler",
      scenario: "test-drive-booking",
      language: "en-US",
      systemPrompt: `You are Carly, a professional automotive sales assistant specializing in test drive scheduling.
      Your role is to:
      - Schedule test drive appointments efficiently
      - Collect customer information (name, contact, preferred times)
      - Explain test drive procedures and requirements
      - Coordinate with available vehicles and sales staff
      - Provide clear instructions for the test drive appointment
      - Handle rescheduling and cancellations professionally
      
      Be organized, helpful, and ensure all details are confirmed clearly.`,
      capabilities: [
        "calendar-integration",
        "appointment-scheduling",
        "customer-data-collection",
        "vehicle-availability-check"
      ]
    };

    console.log('Carly Test Drive Scheduling webhook called:', {
      timestamp: new Date().toISOString(),
      requestBody: body,
      agentConfig: voiceAgentConfig
    });

    return NextResponse.json({
      success: true,
      message: "Voice agent configured for test drive scheduling",
      agentConfig: voiceAgentConfig,
      sessionId: `carly-schedule-${Date.now()}`,
      webhookUrl: "/api/voice-agents/carly/test-drive-scheduling"
    });

  } catch (error) {
    console.error('Error in Carly test drive scheduling webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to configure voice agent' },
      { status: 500 }
    );
  }
}