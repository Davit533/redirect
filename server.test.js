"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const server = require("./server");

function request(path) {
  const result = { status: undefined, headers: {}, body: "" };
  const response = {
    writeHead(status, headers) { result.status = status; result.headers = headers; },
    end(body = "") { result.body = body; },
  };
  server.listeners("request")[0]({ url: path }, response);
  return result;
}

test("health endpoint returns JSON for Render checks", () => {
  const response = request("/health");
  assert.equal(response.status, 200);
  assert.equal(response.headers["content-type"], "application/json; charset=utf-8");
  assert.deepEqual(JSON.parse(response.body), { ok: true });
});

test("all visitor paths redirect to the fixed ChatSchool destination", () => {
  const response = request("/some/page?from=legacy");
  assert.equal(response.status, 302);
  assert.equal(response.headers.location, "https://chatschool.int.yt");
  assert.equal(response.headers["cache-control"], "no-store");
});
