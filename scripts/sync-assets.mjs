import fs from "fs";
import path from "path";

const srcDir = path.resolve(process.cwd(), "src/assets/test-images");
const dstDir = path.resolve(process.cwd(), "public/test-images");
const placeholderSrc = path.resolve(
  process.cwd(),
  "src/assets/placeholder.jpg"
);
const placeholderDst = path.resolve(process.cwd(), "public/placeholder.jpg");
const assetsSrc = path.resolve(process.cwd(), "src/assets");
const assetsDst = path.resolve(process.cwd(), "public/assets");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyDir(src, dst) {
  ensureDir(dst);
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dst, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

copyDir(srcDir, dstDir);
try {
  fs.copyFileSync(placeholderSrc, placeholderDst);
} catch {}
// Copy general assets (backgrounds, logos) into public/assets
try {
  ensureDir(assetsDst);
  for (const entry of fs.readdirSync(assetsSrc)) {
    // Skip the heavy test-images folder (already copied above)
    if (entry === "test-images") continue;
    const s = path.join(assetsSrc, entry);
    const d = path.join(assetsDst, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
} catch {}
console.log(
  "Assets synced -> public/test-images, public/placeholder.jpg, public/assets"
);
