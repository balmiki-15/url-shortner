const express = require("express");
const path = require("path");
const shortner = require("./shortner");
require("./db/conn");
const Url = require("./models/urlSchema");
// Express stuff
const port = process.env.PORT || 80;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for serving static files only
app.use("/static", express.static(path.join(__dirname, "public")));
// Set the template engine as pug
app.set("view engine", "pug");
// set the views directory
app.set("views", path.join(__dirname, "views"));



// +++++++++++++++++++++++++++++++++ FOR ENDPOINTS +++++++++++++++++++++++
app.get("/", (req, res) => {
  const param = {
    title: "URL Shortner | CK STUDIO",
    content: "URL Shortner with only 4 chars",
  };
  res.render("index.pug", param);
});

app.get("/:id", (req, res) => {
  const shortUrl = req.protocol + "://" + req.hostname + "/" + req.params.id;
  // console.log("shortUrl : => "+shortUrl);
  // let Url = urlmaps.find((u) => u.shortUrl === shortUrl);
  Url.findOne({ shortUrl: shortUrl }).then((results) => {
    // console.log(results.origUrl);
    res.redirect(results.origUrl);
  });
});

app.post("/", (req, res) => {
  const param = {
    title: "URL Shortner | CK STUDIO",
    content: "URL Shortner with only 4 chars",
    shortUrl: req.protocol + "://" + req.hostname + "/" + shortner.short(4),
  };
  // urlmaps.push();
  const url = new Url({
    shortUrl: param.shortUrl,
    origUrl: req.body.longUrl,
  });
  url
    .save()
    .then(() => {
      console.log("url added successully");
    })
    .catch((err) => {
      return err;
    });
  res.render("index.pug", param);
});

// +++++++ FOR LISTENING +++++++++++++++++++++++
app.listen(port, () => console.log(`Server is listening at port ${port}`));
