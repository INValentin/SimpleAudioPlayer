const playerCache = "player-cache-v0.1"

const assets = [
  "/16x16.png",
  "/24x24.png",
  "/32x32.png",
  "/64x64.png",
  "/192x192.png",
  "/512x52.png",
  "/maskable_icon.png"
]

const reactAssets = JSON.parse(`{
  "files": {
    "main.css": "/static/css/main.cf6e0af7.css",
    "main.js": "/static/js/main.a3aa420f.js",
    "index.html": "/index.html",
    "main.cf6e0af7.css.map": "/static/css/main.cf6e0af7.css.map",
    "main.a3aa420f.js.map": "/static/js/main.a3aa420f.js.map"
  },
  "entrypoints": [
    "static/css/main.cf6e0af7.css",
    "static/js/main.a3aa420f.js"
  ]
}`)
const files = Object.values(reactAssets.files)
assets.concat(
  ...files
)

console.log(files)



self.addEventListener("install", e => {
  console.log("Installing a service worker!")
  e.waitUntil((async () => {
    const cache = caches.open(playerCache).then(cache => cache.addAll(assets))
  }))
})

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
