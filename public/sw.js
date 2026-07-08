// Service worker do Adestra — recebe os pushes e mostra a notificação
// na tela de bloqueio, mesmo com o app fechado.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'Adestra', body: event.data ? event.data.text() : '' };
  }
  const title = data.title || 'Hora de treinar! 🐾';
  const options = {
    body: data.body || 'Bora fazer uma sessãozinha com o Kazuki?',
    icon: '/paw.svg',
    badge: '/paw.svg',
    tag: 'adestra-lembrete',
    renotify: true,
    data: { url: data.url || '/' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ('focus' in client) return client.focus();
      }
      return self.clients.openWindow(url);
    })
  );
});
