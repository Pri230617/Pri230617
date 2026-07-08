// Chave pública VAPID — pode ficar no código (é pública).
// A chave PRIVADA correspondente fica só no Vercel (variável de ambiente).
export const VAPID_PUBLIC_KEY =
  'BDvrr3G5pEOEw2rvCk-1R_OMN1AjPEbGW6L2STLalntaW3ZgMX4se69QYWPbrjjZLl2qdhOP2iiD5bVS3YuJZdQ';

export const pushSupported =
  typeof navigator !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  'Notification' in window;

/** No iPhone, o push só funciona com o app adicionado à Tela de Início. */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

async function getRegistration(): Promise<ServiceWorkerRegistration> {
  const existing = await navigator.serviceWorker.getRegistration();
  return existing ?? navigator.serviceWorker.register('/sw.js');
}

export type PushResult = 'ok' | 'denied' | 'unsupported' | 'error';

/** Pede permissão, assina o push e salva no servidor com o horário escolhido. */
export async function enablePush(
  hour: number,
  dogName: string
): Promise<PushResult> {
  if (!pushSupported) return 'unsupported';
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return 'denied';

    const reg = await getRegistration();
    await navigator.serviceWorker.ready;

    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
      });
    }

    const tz =
      Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo';

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ subscription: sub, hour, tz, dogName }),
    });
    return res.ok ? 'ok' : 'error';
  } catch (e) {
    console.error('enablePush', e);
    return 'error';
  }
}

/** Atualiza o horário do lembrete (reusa enablePush). */
export async function updateReminderHour(hour: number, dogName: string) {
  return enablePush(hour, dogName);
}

/** Cancela a assinatura no aparelho e no servidor. */
export async function disablePush(): Promise<void> {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    const sub = await reg?.pushManager.getSubscription();
    if (sub) {
      await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ endpoint: sub.endpoint }),
      });
      await sub.unsubscribe();
    }
  } catch (e) {
    console.error('disablePush', e);
  }
}

export async function hasActiveSubscription(): Promise<boolean> {
  if (!pushSupported) return false;
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = await reg?.pushManager.getSubscription();
  return Boolean(sub);
}
