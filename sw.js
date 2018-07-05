var staticCacheName = "mws-restaurant-stage-1-003";


self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/',
       'restaurant.html',
       'restaurant.html?id=1',
       'restaurant.html?id=2',
       'restaurant.html?id=3',
       'restaurant.html?id=4',
       'restaurant.html?id=5',
       'restaurant.html?id=6',
       'restaurant.html?id=7',
       'restaurant.html?id=8',
       'restaurant.html?id=9',
       'restaurant.html?id=10',
       'css/styles.css',
       'css/responsive.css',
       'js/restaurant_info.js',
       'js/main.js',
       'js/dbhelper.js',
       'data/restaurants.json',
       'img/1.jpg',
       'img/2.jpg',
       'img/3.jpg',
       'img/4.jpg',
       'img/5.jpg',
       'img/6.jpg',
       'img/7.jpg',
       'img/8.jpg',
       'img/9.jpg',
       'img/10.jpg',
       'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
       'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
       'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1205/1539.jpg70?access_token=pk.eyJ1IjoiYWdhdGFsaSIsImEiOiJjamoxaDZzZ24wY2drM3Zsa2FzeWJ1c3hoIn0.OiSjpe0WP8olMgI5VbNAEA',
       'https://fonts.googleapis.com/css?family=Lato'
       ]);

})
   );
});



// Activate new cache and delete the old cache.

self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(staticCacheName) {
      return Promise.all(
        staticCacheName.filter(function(staticCacheName) {
          return staticCacheName.startsWith('mws-') && staticCacheName != staticCacheName;
        }).map(function(staticCacheName) {
          return cache.delete(staticCacheName);
        })
        );
    }).catch(function (error) {
            // Log this if there is no cache on first run.

            console.log('No old cache to delete');
            return
          })
    );
});


// Feth from the network.

self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
        return response ||  fetch(event.request);
    })
    );
});
