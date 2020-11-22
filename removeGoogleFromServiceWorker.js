const fs = require("fs");

const serviceWorkerPath = "./dist/service-worker.js";
const files = fs.readdirSync("./dist");
let manifestPath;

files.forEach(path => {
  if (path.search("precache-manifest") == 0) {
    manifestPath = `./${path}`;
  }
});

const file = fs.readFileSync(serviceWorkerPath, "UTF-8");
const lines = file.split(/\r?\n/);
lines[0] = `importScripts("${manifestPath}");`;
let newContent = "";

lines.forEach(line => {
  newContent += `${line}\n`;
});

fs.writeFileSync(serviceWorkerPath, newContent, "UTF-8");
