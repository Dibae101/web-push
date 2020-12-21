//var { send } = require("process");
import process from 'process';

const publicVapidKey =
  "BOPkPak3Nht8IbsY6F2bRjTJmmse4fo9LgRdlld7oUJnhJFoyVdpL7AG9KIFcJZHYom4QdHTpFrOe8dB9w5H-MM";

//check for service worker
if ("serviceWorker" in navigator) {
 send().catch((err = console.error(err)));
}

//register service worker, register push, send push
async function send() {
  //register service worker
  console.log("Registering service worker..");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });
  console.log("Service worker registered...");

  //register push
  console.log("Registering push..");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  console.log("Push register");

  //send push notification
  console.log("sending push..");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("push sent..");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

