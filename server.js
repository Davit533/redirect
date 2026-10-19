"use strict";

const http = require("node:http");

const destination = "https://chatschool.int.yt";
const port = process.env.PORT ? Number(process.env.PORT) : 10000;

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url || "/", "http://localhost").pathname;

  if (pathname === "/health") {
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(JSON.stringify({ ok: true }));
    return;
  }

  response.writeHead(302, {
    location: destination,
    "cache-control": "no-store",
  });
  response.end();
});

if (require.main === module) {
  server.listen(port, "0.0.0.0", () => {
    console.log(`ChatSchool redirect listening on port ${port}`);
  });
}

module.exports = server;
