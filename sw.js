// install service worker
self.addEventListener("install", (e) => {
  console.log("service worker has been installed");
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("service worker has been activated");
});

// fetch event
self.addEventListener("fetch", (e) => {
  //   console.log("fetch event", e);
});
