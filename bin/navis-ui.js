#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const registryDir = path.resolve(fileURLToPath(new URL("../packages/registry/components/", import.meta.url)));
const cwd = process.cwd();

const HELP_TEXT = `Navis UI

Usage:
  npx navisinit add bottom-nav-minimal

Options:
  --force   overwrite an existing file
  --help    show this message
`;

const registryFiles = {
  "bottom-nav-minimal": "bottom-nav-minimal.jsx",
  minimal: "bottom-nav-minimal.jsx",
  "bottom-nav-floating": "bottom-nav-floating.jsx",
  floating: "bottom-nav-floating.jsx"
};

function printHelp() {
  process.stdout.write(`${HELP_TEXT}\n`);
}

function resolveTargetPath(fileName) {
  return path.join(cwd, "src", "components", "ui", fileName);
}

function main(argv) {
  const [command, rawSlug, ...rest] = argv;
  const force = rest.includes("--force");

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return 0;
  }

  if (command !== "add") {
    process.stderr.write(`Unknown command: ${command}\n\n`);
    printHelp();
    return 1;
  }

  if (!rawSlug || rawSlug === "--help" || rawSlug === "-h") {
    process.stderr.write("Missing component name.\n\n");
    printHelp();
    return 1;
  }

  const slug = rawSlug.toLowerCase();
  const sourceFileName = registryFiles[slug];

  if (!sourceFileName) {
    process.stderr.write(`Unknown component: ${rawSlug}\n`);
    process.stderr.write("Available components: bottom-nav-minimal, bottom-nav-floating\n");
    return 1;
  }

  const sourcePath = path.join(registryDir, sourceFileName);
  const targetPath = resolveTargetPath(sourceFileName);

  if (!fs.existsSync(sourcePath)) {
    process.stderr.write(`Registry file not found: ${sourceFileName}\n`);
    return 1;
  }

  if (fs.existsSync(targetPath) && !force) {
    process.stderr.write(`File already exists: ${path.relative(cwd, targetPath)}\n`);
    process.stderr.write("Use --force to overwrite it.\n");
    return 1;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);

  process.stdout.write(`Added ${rawSlug} to ${path.relative(cwd, targetPath)}\n`);
  return 0;
}

process.exitCode = main(process.argv.slice(2));
