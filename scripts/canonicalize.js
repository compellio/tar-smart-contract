#! /usr/bin/env node
const fs = require("fs");
const canonicalize = require('canonicalize');

try {
    const input = fs.readFileSync(0).toString();
    const json = JSON.parse(input);
    const canonical = canonicalize(json);

    console.log(canonical);

} catch (e) {
    console.error("An error occurred")
    console.error(e)
}
