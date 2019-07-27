import fetch from "node-fetch";
import express = require("express");
import bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const server = app.listen(port, () => {
  console.log(`listen to port:${port}`);
});

app.get("/", (req, res) => {
  res.send("app work!");
});

app.post("/post/image", async (req, res, next) => {
  const url: string | undefined = req.query.url;
  const title: string | undefined = req.query.title;

  if (url) {
    const imageUrl = decodeURIComponent(url);

    const postData = {
      response_type: "in_channel",
      text: "",
      attachments: [
        {
          fields: [
            {
              title: title ? decodeURIComponent(title) : "image"
            }
          ],
          image_url: imageUrl
        }
      ]
    };
    res.status(200);
    res.json(postData);
  }
});
