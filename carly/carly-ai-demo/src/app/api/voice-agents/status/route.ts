import { NextResponse } from 'next/server';

export async function GET() {
  const webhookEndpoints = {
    carly: {
      "vehicle-exploration": "/api/voice-agents/carly/vehicle-exploration",
      "test-drive-scheduling": "/api/voice-agents/carly/test-drive-scheduling", 
      "feature-demonstration": "/api/voice-agents/carly/feature-demonstration",
      "financing-discussion": "/api/voice-agents/carly/financing-discussion"
    },
    carlyle: {
      "vehicle-assessment": "/api/voice-agents/carlyle/vehicle-assessment",
      "trade-in-evaluation": "/api/voice-agents/carlyle/trade-in-evaluation",
      "cpo-program": "/api/voice-agents/carlyle/cpo-program", 
      "market-analysis": "/api/voice-agents/carlyle/market-analysis"
    }
  };

  return NextResponse.json({
    status: "Active",
    message: "Voice agent webhooks are configured and ready",
    endpoints: webhookEndpoints,
    totalEndpoints: Object.keys(webhookEndpoints.carly).length + Object.keys(webhookEndpoints.carlyle).length,
    timestamp: new Date().toISOString()
  });
}