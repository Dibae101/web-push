const express = require("express");
const webpush = require("web-push");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

//set static path
app.use(express.static(path.join(__dirname, `client`)));

app.use(bodyParser.json());
const publicVapidKey =
  "BOPkPak3Nht8IbsY6F2bRjTJmmse4fo9LgRdlld7oUJnhJFoyVdpL7AG9KIFcJZHYom4QdHTpFrOe8dB9w5H-MM";
const privateVapidKey = "QBziUT8FO49X6eVHhlsIINwzVMEZIBuvWi5zybRkhnM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//sub route
app.post("subscribe", (req, res) => {
  //Get push sub obj
  const subscription = req.body;

  //send status - 201
  res.status(201).json({});

  //payload
  const payload = JSON.stringify({ title: "Push Test" });

  //pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(errr));
});

const port = 5000;
app.listen(port, () => console.log(`Server started at ${port}`));
