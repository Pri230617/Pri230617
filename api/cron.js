import { createClient } from '@vercel/kv';
import webpush from 'web-push';

// Chave pública padrão (a mesma do cliente). Só a PRIVADA precisa vir do ambiente.
const DEFAULT_PUBLIC =
  'BDvrr3G5pEOEw2rvCk-1R_OMN1AjPEbGW6L2STLalntaW3ZgMX4se69QYWPbrjjZLl2qdhOP2iiD5bVS3YuJZdQ';

const MESSAGES = [
  { title: 'Hora de treinar! 🐾', body: 'Que tal 5 minutinhos de treino com {dog} agora?' },
  { title: 'Bora praticar? 🦴', body: 'Um treininho curto por dia faz o {dog} evoluir rápido!' },
  { title: 'Sessão do dia 🐶', body: 'Pegue os petiscos e chame o {dog} pro treino!' },
  { title: 'Mantenha a ofensiva 🔥', body: 'Não deixe a sequência cair — treine com o {dog} hoje.' },
];

function getKv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return createClient({ url, token });
}

function hourIn(tz) {
  try {
    return Number(
      new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        hourCycle: 'h23',
      }).format(new Date())
    );
  } catch {
    return new Date().getUTCHours();
  }
}

export default async function handler(req, res) {
  try {
    const query = req.query || {};

    // Diagnóstico: mostra o que está configurado (sem revelar segredos).
    if (query.diag === '1') {
      return res.status(200).json({
        ok: true,
        kv_configurado: Boolean(getKv()),
        vapid_private: Boolean(process.env.VAPID_PRIVATE_KEY),
        cron_secret: Boolean(process.env.CRON_SECRET),
        vapid_subject: process.env.VAPID_SUBJECT || '(padrão)',
      });
    }

    // Autenticação: a Vercel Cron envia "Authorization: Bearer <CRON_SECRET>".
    // Também aceitamos ?key=<CRON_SECRET> para testes manuais.
    const secret = process.env.CRON_SECRET;
    const auth = req.headers.authorization || '';
    const key = query.key || '';
    if (secret && auth !== `Bearer ${secret}` && key !== secret) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const priv = process.env.VAPID_PRIVATE_KEY;
    if (!priv) {
      return res.status(503).json({ error: 'faltou VAPID_PRIVATE_KEY nas variáveis do Vercel' });
    }
    const kv = getKv();
    if (!kv) {
      return res.status(503).json({ error: 'banco KV não configurado no Vercel' });
    }

    const pub = process.env.VAPID_PUBLIC_KEY || DEFAULT_PUBLIC;
    const subject = process.env.VAPID_SUBJECT || 'mailto:prialmeida.souza@gmail.com';
    webpush.setVapidDetails(subject, pub, priv);

    const force = query.test === '1'; // dispara sem checar horário
    const ids = (await kv.smembers('adestra:subs')) || [];
    let sent = 0,
      skipped = 0,
      removed = 0;

    for (const id of ids) {
      const rec = await kv.get('adestra:sub:' + id);
      if (!rec || !rec.subscription) {
        await kv.srem('adestra:subs', id);
        removed++;
        continue;
      }
      if (!force && hourIn(rec.tz) !== rec.hour) {
        skipped++;
        continue;
      }
      const msg = MESSAGES[Math.floor(Date.now() / 86400000) % MESSAGES.length];
      const payload = JSON.stringify({
        title: msg.title,
        body: msg.body.replace('{dog}', rec.dogName || 'seu cão'),
        url: '/',
      });
      try {
        await webpush.sendNotification(rec.subscription, payload);
        sent++;
      } catch (err) {
        const code = err && err.statusCode;
        if (code === 404 || code === 410) {
          await kv.del('adestra:sub:' + id);
          await kv.srem('adestra:subs', id);
          removed++;
        } else {
          console.error('send error', code, err && err.body);
        }
      }
    }

    return res.status(200).json({ ok: true, total: ids.length, sent, skipped, removed });
  } catch (e) {
    console.error('cron', e);
    return res.status(500).json({ error: 'server', message: String(e && e.message) });
  }
}
