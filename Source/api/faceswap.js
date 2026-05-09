export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { source_image, target_image } = req.body;

    if (!source_image || !target_image) {
      return res.status(400).json({ error: 'source_image and target_image are required' });
    }

    // Segmind Faceswap v5 API 호출
    const response = await fetch('https://api.segmind.com/v1/faceswap-v5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.SEGMIND_API_KEY || '',
      },
      body: JSON.stringify({
        source_image,
        target_image,
        image_format: 'png',
        quality: 95,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `Segmind API error: ${errorText}` });
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const result = await response.json();
      return res.status(200).json(result);
    } else {
      // 이미지 바이너리 데이터인 경우
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      res.setHeader('Content-Type', contentType);
      return res.status(200).send(buffer);
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
}
