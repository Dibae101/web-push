console.log('Service worker started');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push received..');

    self.registration.showNotification(data.title, {
        body: 'Notified by Dibae'
    });
});