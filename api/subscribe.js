import { kv } from '@vercel/kv';

function idFromEndpoint(endpoint) {
  let h = 0;
  for (let i = 0; i < endpoint.length; i++) h = (h * 31 + endpoint.charCodeAt(i)) | 0;
  return 'sub_' + (h >>> 0).toString(36) + '_' + endpoint.length;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  try {
    const { subscription, hour, tz, dogName } = req.body || {};
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'no subscription' });
    }
    const id = idFromEndpoint(subscription.endpoint);
    const record = {
      subscription,
      hour: Number.isInteger(Number(hour)) ? Number(hour) : 18,
      tz: tz || 'America/Sao_Paulo',
      dogName: dogName || 'seu cão',
    };
    await kv.set('adestra:sub:' + id, record);
    await kv.sadd('adestra:subs', id);
    return res.status(200).json({ ok: true, id });
  } catch (e) {
    console.error('subscribe', e);
    return res.status(500).json({ error: 'kv' });
  }
}
