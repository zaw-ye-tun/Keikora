import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

// Read-only verification. No files are written in either repository.
const source = path.resolve("../puhdasfix-scheduler");
const baseline = JSON.parse(
  await readFile("source-audit-baseline.json", "utf8"),
);
const ignored = new Set(["node_modules", ".next", ".git", ".vercel", "dist"]);
async function inventory(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const relative = prefix + entry.name;
    if (entry.isDirectory())
      files.push(
        ...(await inventory(path.join(directory, entry.name), relative + "/")),
      );
    else if (entry.isFile()) files.push(relative);
  }
  return files;
}
const normalized = Object.fromEntries(
  Object.entries(baseline).map(([name, hash]) => [
    name.replaceAll("\\", "/"),
    hash,
  ]),
);
const current = await inventory(source);
let changed = 0;
let deleted = 0;
for (const [name, expected] of Object.entries(normalized)) {
  try {
    const bytes = await readFile(path.join(source, name));
    const hash = createHash("sha256").update(bytes).digest("hex");
    if (hash.toLowerCase() !== String(expected).toLowerCase()) changed++;
  } catch (error) {
    if (error.code === "ENOENT") deleted++;
    else throw error;
  }
}
const added = current.filter((name) => !(name in normalized)).length;
console.log({
  baselineFiles: Object.keys(normalized).length,
  changed,
  deleted,
  added,
});
if (changed || deleted || added) process.exitCode = 1;
