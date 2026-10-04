import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";
const root = resolve("out");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};
createServer(async (request, response) => {
  try {
    let file = resolve(
      root,
      "." +
        decodeURIComponent(new URL(request.url, "http://localhost").pathname),
    );
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const data = await readFile(file);
    const compress =
      /\.(html|css|js|svg|xml|txt|webmanifest)$/.test(file) &&
      request.headers["accept-encoding"]?.includes("gzip");
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      ...(compress
        ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" }
        : {}),
      ...(file.includes(`${sep}_next${sep}static${sep}`)
        ? { "Cache-Control": "public, max-age=31536000, immutable" }
        : {}),
    });
    response.end(compress ? gzipSync(data) : data);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(4173, "127.0.0.1", () =>
  console.log("Static export at http://127.0.0.1:4173"),
);
