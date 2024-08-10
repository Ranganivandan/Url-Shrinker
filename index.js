const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const shorturl = require("./mongoose"); // Assuming this is your Mongoose model
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

// Middleware to generate and store a shortId in req
function genrateshortid(req, res, next) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    // Generate a 6-character ID
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  req.shortId = result; // Attach the generated shortId to req
  next(); // Move to the next middleware or route handler
}

app.post("/shorturl", genrateshortid, async (req, res) => {
  const shortId = req.shortId;

  await shorturl.create({
    full: req.body.url,
    shortid: shortId,
  });

  res.redirect(`/`);
});

// Route to handle redirection from short URL to full URL
app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const urlEntry = await shorturl.findOne({ shortid: shortId });
  console.log(urlEntry);
  if (urlEntry) {
    res.redirect(urlEntry.full);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(4500, () => {
  console.log("Server is running on port 4500");
});
