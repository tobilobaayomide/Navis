#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const registryDir = path.resolve(fileURLToPath(new URL("../packages/registry/components/", import.meta.url)));
const cwd = process.cwd();

const HELP_TEXT = `Navis UI

Usage:
  npx navisinit add <component-name>

Examples:
  npx navisinit add bottom-nav-fluid
  npx navisinit add fluid
  npx navisinit add BottomNavFluid

Options:
  --force   overwrite an existing file
  --help    show this message
`;

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

  // Dynamically load available components
  let availableFiles = [];
  try {
    availableFiles = fs.readdirSync(registryDir).filter(f => f.endsWith('.jsx'));
  } catch (err) {
    process.stderr.write(`Failed to read registry directory: ${err.message}\n`);
    return 1;
  }

  const registryFiles = {};
  const componentNames = [];

  for (const file of availableFiles) {
    const base = file.replace('.jsx', ''); // e.g. BottomNavFluid
    const lower = base.toLowerCase();
    
    registryFiles[lower] = file;
    componentNames.push(base);

    if (base.startsWith("BottomNav")) {
        const variant = base.substring(9).toLowerCase(); // e.g. fluid
        registryFiles[variant] = file;
        registryFiles[`bottom-nav-${variant}`] = file;
        registryFiles[`bottomnav${variant}`] = file;
    }
  }

  const slug = rawSlug.toLowerCase().replace(/[^a-z0-9-]/g, "");
  
  // Try to find a match
  const sourceFileName = registryFiles[slug] || registryFiles[rawSlug.toLowerCase()];

  if (!sourceFileName) {
    process.stderr.write(`Unknown component: ${rawSlug}\n`);
    process.stderr.write(`Available components:\n  ${componentNames.join(', ')}\n`);
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

  process.stdout.write(`✅ Added ${sourceFileName.replace('.jsx', '')} to ${path.relative(cwd, targetPath)}\n`);
  return 0;
}

process.exitCode = main(process.argv.slice(2));
