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
const rootIcons = [
  "apple-touch-icon.png",
  "favicon-96x96.png",
  "site.webmanifest",
  "web-app-manifest-192x192.png",
  "web-app-manifest-512x512.png",
  "favicon.ico",
  "favicon.svg",
];

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

// Place root favicon and manifest assets under public/ properly
try {
  for (const name of rootIcons) {
    const src = path.resolve(process.cwd(), name);
    if (fs.existsSync(src)) {
      const dest = path.resolve(process.cwd(), "public", name);
      fs.copyFileSync(src, dest);
    }
  }
  // Clean old ones if any mismatched
  const publicDir = path.resolve(process.cwd(), "public");
  for (const entry of fs.readdirSync(publicDir)) {
    if (
      /^(favicon|apple-touch-icon|web-app-manifest|site\.webmanifest)/.test(
        entry
      )
    ) {
      const onRootList =
        rootIcons.includes(entry) || entry === "site.webmanifest";
      // If not in provided root list nor expected, remove
      if (!onRootList) {
        try {
          fs.unlinkSync(path.join(publicDir, entry));
        } catch {}
      }
    }
  }
  // Ensure we have an apple-touch-icon for iOS: if missing, derive from icon-192x192
  try {
    const appleIcon = path.resolve(
      process.cwd(),
      "public",
      "apple-touch-icon.png"
    );
    if (!fs.existsSync(appleIcon)) {
      const candidate = path.resolve(
        process.cwd(),
        "public",
        "icon-192x192.png"
      );
      if (fs.existsSync(candidate)) {
        fs.copyFileSync(candidate, appleIcon);
      }
    }
  } catch {}
  console.log("Favicons/manifests synced -> public/");
} catch {}
