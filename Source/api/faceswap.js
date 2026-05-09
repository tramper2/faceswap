module.exports = async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sourceImage, targetImage } = req.body;

    if (!sourceImage || !targetImage) {
      return res.status(400).json({ error: 'sourceImage and targetImage are required' });
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
      return res.status(response.status).json({ error: `Segmind API error: ${errorText}` });
    }

    const result = await response.json();

    // Base64 이미지 반환
    return res.status(200).json({ image: result.image });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
};
