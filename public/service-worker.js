importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

//garantindo que as rotas estejam disponíveis offline ao baixar o pwa
self.addEventListener('install', (event) => {
  const urls = ['/edicao-completa', '/autores', '/home', '/'];
  const cacheName = workbox.core.cacheNames.runtime;
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});

workbox.routing.registerRoute(
  new RegExp('/edicao-completa.*'),
  new workbox.strategies.StaleWhileRevalidate()
);

// Rota para a API de capítulos
workbox.routing.registerRoute(
  new RegExp('https://api-cartilha-teste.onrender.com/api/capitulos?populate=*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-capitulos-cache',
  })
);

// Rota para a API de autores
workbox.routing.registerRoute(
  new RegExp('https://api-cartilha-teste.onrender.com/api/autors?populate=*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-autores-cache',
  })
);

self.addEventListener('fetch', (event) => {
  // Tratamento genérico para todas as solicitações de rede
  const genericFetchHandler = fetch(event.request.clone())
    .catch(() => {
      // Registra um evento de sincronização para tentar novamente mais tarde
      return self.registration.sync.register('syncData');
    });

  // Espera pela conclusão da solicitação
  event.respondWith(genericFetchHandler);
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'syncData') {
    event.waitUntil(syncData());
  }
});

function syncData() {
  // Adicione lógica aqui para sincronizar dados pendentes, se necessário
  return workbox.precaching.cleanupOutdatedCaches()
    .then(() => {
      return workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
    });
}

// Rotas para arquivos estáticos
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|ico|css)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'static-cache',
  })
);

// Rota para o arquivo de manifest
workbox.routing.registerRoute(
  /manifest.json$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'manifest-cache',
  })
);

// Rota para outras rotas (página principal, etc.)
workbox.routing.registerRoute(
  ({ url }) => url.origin === self.location.origin,
  new workbox.strategies.StaleWhileRevalidate()
);