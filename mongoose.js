const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/urlshortner")
  .then(() => {
    console.log("connection succesfull");
  })
  .catch((err) => {
    console.log(`${err}`);
  });

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  shortid: {
    type: String,
    default: "",
    // required: true,
  },
  clicks: {
    type: Number,
    // required: true,
  },
});
module.exports = mongoose.model("shrinker", urlSchema);
