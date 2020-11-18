let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEGv16XC-OqM6PKaX_PqbFIJKbecR4svz5wOXBmQf57yNOo7KaAYvBNP6UF7YVvYsdDl_WjU7ffxApudFm4OiB0",
   "privateKey": "164aQPGOMfsYwjhRcDSxP3BO1lwi92M35r9cBBP4OiQ"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dPcoUGqoaac:APA91bHS7FqNvNE14rf5pfGPqX4yPCiffZOtMBRQ1kyodAygMls1JUS0wKsMSP_rXtkX9e1Cj_Lb1NRlgWWoV2txyjm8VamlqU4O9nMWj9CGI69Fn0MU58M6Y2WEY0aIAhszEwj5ZWpm",
   "keys": {
       "p256dh": "BCiQv5TZjFiVs+kYjYxdIc0p4ye6dzS8sPeKdFlTnH55Jr4HTIvZwUhTIg9qRW/1lvBzCVTE0e0PM/0A4WSi+cE=",
       "auth": "BMT410N5ksdBM4DWv24iMQ=="
   }
};
let payload = 'Selamat! Aplikasi Sepak Bola ini sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '777601140108',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);