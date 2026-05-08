import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  // CORS 헤더 설정
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const { sourceImage, targetImage } = await req.json();

    if (!sourceImage || !targetImage) {
      return NextResponse.json(
        { error: 'sourceImage and targetImage are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Segmind Faceswap v5 API 호출
    const response = await fetch('https://api.segmind.com/v1/faceswap-v5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.SEGMIND_API_KEY || '',
      },
      body: JSON.stringify({
        source_image: sourceImage,
        target_image: targetImage,
        image_format: 'png',
        quality: 95,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Segmind API error: ${errorText}` },
        { status: response.status, headers: corsHeaders }
      );
    }

    const result = await response.json();

    // Base64 이미지 반환
    return NextResponse.json(
      { image: result.image },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
