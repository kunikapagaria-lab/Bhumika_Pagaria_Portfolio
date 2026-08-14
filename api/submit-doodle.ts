import { createClient } from '@sanity/client';

// Server-side only — SANITY_WRITE_TOKEN never reaches the browser bundle since this file
// runs as a Vercel serverless function, not part of the Vite client build.
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '5vq8pnxl',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!process.env.SANITY_WRITE_TOKEN) {
    res.status(500).json({ error: 'Doodle submissions are not configured yet.' });
    return;
  }

  const { image, name } = req.body || {};
  if (typeof image !== 'string' || !image.startsWith('data:image/')) {
    res.status(400).json({ error: 'Missing or invalid image data.' });
    return;
  }

  try {
    const base64Data = image.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    const asset = await client.assets.upload('image', buffer, {
      filename: `doodle-${Date.now()}.png`,
      contentType: 'image/png',
    });

    await client.create({
      _type: 'doodleSubmission',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
      senderName: typeof name === 'string' && name.trim() ? name.trim() : 'Anonymous',
      submittedAt: new Date().toISOString(),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Doodle submission failed:', err);
    res.status(500).json({ error: 'Failed to save doodle.' });
  }
}
