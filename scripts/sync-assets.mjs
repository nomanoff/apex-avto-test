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
// Replace public favicon/icon files with the ones from repo root
try {
  const publicDir = path.resolve(process.cwd(), "public");
  ensureDir(publicDir);
  const rootIcons = [
    "apple-touch-icon.png",
    "favicon-96x96.png",
    "web-app-manifest-192x192.png",
    "web-app-manifest-512x512.png",
    "favicon.ico",
    "favicon.svg",
  ];
  for (const name of rootIcons) {
    const src = path.resolve(process.cwd(), name);
    const dst = path.join(publicDir, name);
    if (fs.existsSync(dst)) fs.rmSync(dst, { force: true });
    if (fs.existsSync(src)) fs.copyFileSync(src, dst);
  }
  const webmanifestPath = path.join(publicDir, "sete.webmanifest");
  if (!fs.existsSync(webmanifestPath)) {
    const manifest = {
      name: "Apex Avto Test",
      short_name: "ApexAvto",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#1e3a8a",
      icons: [
        {
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        { src: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        {
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
          purpose: "apple-touch-icon",
        },
      ],
    };
    fs.writeFileSync(
      webmanifestPath,
      JSON.stringify(manifest, null, 2),
      "utf-8"
    );
  }
} catch (e) {
  console.warn("Favicon/webmanifest sync warning:", e?.message || e);
}
console.log(
  "Assets synced -> public/test-images, public/placeholder.jpg, public/assets, public favicons & sete.webmanifest"
);
