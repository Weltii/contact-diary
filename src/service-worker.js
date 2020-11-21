self.__precacheManifest = [].concat(self.__precacheManifest || []);

const version = "1";
const versionName = `contact-diary-cache-${version}`;

self.addEventListener("install", function(event) {
  const arr = self.__precacheManifest.map(obj => {
    return obj.url;
  });
  event.waitUntil(
    caches
      .open(versionName)
      .then(function(cache) {
        return cache.addAll(arr);
      })
      .then(() => {
        console.log("Worker installed succesfully!");
      })
      .catch(err => {
        console.log("Error: ", err);
      })
  );
});

self.addEventListener("fetch", event => {
  event.responseWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(response => {
          return caches.open(versionName).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => {
        return Promise.all(
          keys
            .filter(key => {
              return key.search(version) == -1;
            })
            .map(key => {
              caches.delete(key);
            })
        );
      })
      .then(() => {
        console.log("Remove unused keys!");
      })
  );
});