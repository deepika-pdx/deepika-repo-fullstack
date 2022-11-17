/** @format */

const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static("public"));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post("/submit", (req, res) => {
  let formData = "";
  res.status(200);

  formData = formData.concat("<b>Name: </b>").concat(`${req.body.username}`).concat(`<br>`);
  formData = formData.concat("<b>Email: </b>").concat(`${req.body.email}`).concat(`<br>`);
  const comments = req.body.comments !== "" ? req.body.comments : "n/a";
  formData = formData.concat("<b>Comments: </b>").concat(`${comments}`).concat(`<br>`);
  const newsletterCheck = req.body.newsletterCheck === "" ? "Yes, sign me up for the newsletter." : "No, thank you.";
  formData = formData.concat("<b>Newsletter: </b>").concat(`${newsletterCheck}`);

  res.set({ "Content-Type": "text/html" });
  res.send(`${formData}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
