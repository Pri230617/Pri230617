import { kv } from '@vercel/kv';

function idFromEndpoint(endpoint) {
  let h = 0;
  for (let i = 0; i < endpoint.length; i++) h = (h * 31 + endpoint.charCodeAt(i)) | 0;
  return 'sub_' + (h >>> 0).toString(36) + '_' + endpoint.length;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  try {
    const { endpoint } = req.body || {};
    if (!endpoint) return res.status(400).json({ error: 'no endpoint' });
    const id = idFromEndpoint(endpoint);
    await kv.del('adestra:sub:' + id);
    await kv.srem('adestra:subs', id);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('unsubscribe', e);
    return res.status(500).json({ error: 'kv' });
  }
}
