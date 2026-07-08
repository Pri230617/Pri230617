import { createClient } from '@vercel/kv';

function getKv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return createClient({ url, token });
}

function idFromEndpoint(endpoint) {
  let h = 0;
  for (let i = 0; i < endpoint.length; i++) h = (h * 31 + endpoint.charCodeAt(i)) | 0;
  return 'sub_' + (h >>> 0).toString(36) + '_' + endpoint.length;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  try {
    const kv = getKv();
    if (!kv) return res.status(200).json({ ok: true, note: 'kv off' });
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    const { endpoint } = body || {};
    if (!endpoint) return res.status(400).json({ error: 'no endpoint' });
    const id = idFromEndpoint(endpoint);
    await kv.del('adestra:sub:' + id);
    await kv.srem('adestra:subs', id);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('unsubscribe', e);
    return res.status(500).json({ error: 'server', message: String(e && e.message) });
  }
}
