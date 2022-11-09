/** @format */

const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5001;

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: "usersessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400,
    },
  })
);

app.get("/*", (req, res) => {
  let currentUrl = req.url;
  res.status(200);
  res.set({ "Content-Type": "text/html" });

  if (currentUrl !== "/favicon.ico" && req.session.userSession === undefined) {
    req.session.userSession = [];
    req.session.userSession.push(currentUrl);
    res.write(`<b>Currently on route: ${currentUrl}</b>`);
    res.write(`<br>`);
    res.write(`<br>`);
    res.write(`<b>Welcome to http://localhost:${port}</b>`);
    res.end();
  } else if (currentUrl !== "/favicon.ico") {
    req.session.userSession.push(currentUrl);
    res.write(`<b>Currently on route: ${currentUrl}</b>`);
    res.write(`<br>`);
    res.write(`<br>`);
    res.write(`<b>Previously visited: <b>`);
    res.write(`<br>`);
    res.write(req.session.userSession.join(`<br>`));
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
