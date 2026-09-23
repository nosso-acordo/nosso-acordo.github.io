/* Nosso Acordo — service worker */
const VERSAO = "nosso-acordo-v1";
const BASE = new URL("./", self.location).pathname;
const ESSENCIAIS = [
  BASE, BASE + "index.html", BASE + "manifest.json",
  BASE + "icons/icon-192.png", BASE + "icons/icon-512.png",
  BASE + "icons/icon-192-maskable.png", BASE + "icons/icon-512-maskable.png",
  BASE + "icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ESSENCIAIS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // navegação: rede primeiro, cache como reserva (funciona offline)
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(r => {
        const copia = r.clone();
        caches.open(VERSAO).then(c => c.put(BASE + "index.html", copia));
        return r;
      }).catch(() => caches.match(BASE + "index.html").then(r => r || caches.match(BASE)))
    );
    return;
  }

  // fontes do Google e demais assets: cache primeiro, revalidando em segundo plano
  if (url.origin === self.location.origin ||
      url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.match(req).then(cached => {
        const rede = fetch(req).then(r => {
          if (r && (r.ok || r.type === "opaque")) {
            const copia = r.clone();
            caches.open(VERSAO).then(c => c.put(req, copia));
          }
          return r;
        }).catch(() => cached);
        return cached || rede;
      })
    );
  }
});

self.addEventListener("message", e => { if (e.data === "skipWaiting") self.skipWaiting(); });
