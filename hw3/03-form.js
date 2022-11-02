/** @format */

const http = require("http");
const static = require("node-static");
const querystring = require("node:querystring");
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const file = new static.Server("./public");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/form") {
    file.serveFile("/form.html", 200, {}, req, res);
  } else if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let formDetails = "";
      let userData = querystring.parse(body);
      console.log(body);
      console.log(userData);
      const { username, email } = userData;
      formDetails = formDetails.concat(`<b>Name: `).concat(`${username}`).concat(`<br><br>`);
      formDetails = formDetails.concat(`<b>Email: `).concat(`${email}`);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`${formDetails}`);
      res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
