/** @format */

const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const server = http.createServer((req, res) => {
  if (req.url === "/form") {
    const postHTML = `<html><body>
    <form method="post">
    <label for="username">Username: </label>
    <input name="username" /><br /><br />
    <label for="email">Email: </label>
    <input type="email" name="email" /><br /><br />
    <input type="submit" value="Submit" /></form>
    </body></html>`;

    req.on("data", (formDetails) => {
      console.log(formDetails);
      res.writeHead(302, { Location: "/submit", "Set-Cookie": `formData=${formDetails}` });
      res.end();
    });

    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(postHTML);
    });
  } else if (req.url === "/submit") {
    let formDetails = "";
    let allCookiesArray = req.headers.cookie.split(";");
    allCookiesArray.forEach((cookie) => {
      if (cookie.includes("formData")) {
        let cookieArray = cookie.split("=");
        let uName = "Name";
        let uNameValue = cookieArray[2].split("&")[0];
        let uEmail = "Email";
        let uEmailValue = cookieArray[3].replace("%40", "@");
        formDetails = formDetails.concat(`<b>${uName}: `).concat(`${uNameValue}`).concat(`<br><br>`);
        formDetails = formDetails.concat(`<b>${uEmail}: `).concat(`${uEmailValue}`);
      }
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`${formDetails}`);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
