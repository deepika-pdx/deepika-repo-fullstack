/** @format */

const http = require("http");
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    "/attributes?hello=world&lorem=ipsum",
    "/items?first=1&second=2&third=3&fourth=4",
    "/characters?spongebob=squarepants&patrick=star&sandy=cheeks",
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = "";

    routes.forEach((elem) => (result += `<li><a href="${elem}">${elem}</a></li>`));

    return result;
  };

  if (req.url === "/") {
    let routeResults = getRoutes();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  } else {
    let tableContent = `<table border="1">`;
    let params = url.search;
    let paramsArray = params.substring(1, params.length).split("&");
    paramsArray.forEach((parameter) => {
      tableContent = tableContent.concat(`<tr>`);
      tableContent = tableContent.concat(`<td border="1">`).concat(parameter.split("=")[0]).concat(`</td>`);
      tableContent = tableContent.concat(`<td border="1">`).concat(parameter.split("=")[1]).concat(`</td>`);
      tableContent = tableContent.concat(`</tr>`);
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`${tableContent}`);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
