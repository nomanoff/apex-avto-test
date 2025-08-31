// Merge rus.json, uzkiril.json, uzlotin.json into unified dataset
// Output: public/dataset.json
import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd(), "src/data");
const out = path.resolve(process.cwd(), "public/dataset.json");

const langs = [
  { file: "uzlotin.json", key: "uz-Latn" },
  { file: "uzkiril.json", key: "uz-Cyrl" },
  { file: "rus.json", key: "ru" },
];

function readLang(file) {
  const p = path.join(root, file);
  const raw = fs.readFileSync(p, "utf-8");
  return JSON.parse(raw);
}

function normalizeEntry(src, langKey) {
  return {
    id: src.id,
    question: { [langKey]: src.question },
    choices: src.choises.map((c, idx) => ({
      id: String.fromCharCode(65 + idx),
      text: { [langKey]: c.text },
      isCorrect: Boolean(c.answer),
    })),
    media: src.media || { exist: false },
    description: src.description ? { [langKey]: src.description } : {},
  };
}

function mergeById(maps) {
  const merged = new Map();
  for (const { items, key } of maps) {
    for (const item of items) {
      const norm = normalizeEntry(item, key);
      if (!merged.has(norm.id)) {
        merged.set(norm.id, norm);
      } else {
        const prev = merged.get(norm.id);
        // Merge deep
        prev.question[key] = norm.question[key];
        prev.description[key] = norm.description[key];
        prev.choices = prev.choices.map((ch, i) => ({
          ...ch,
          text: { ...ch.text, ...norm.choices[i]?.text },
          // isCorrect should be consistent; keep existing
        }));
        merged.set(norm.id, prev);
      }
    }
  }
  return Array.from(merged.values()).sort((a, b) => a.id - b.id);
}

function main() {
  const maps = langs.map(({ file, key }) => ({ items: readLang(file), key }));
  const merged = mergeById(maps);
  fs.writeFileSync(out, JSON.stringify(merged, null, 2));
  console.log(
    `Merged ${merged.length} items -> ${path.relative(process.cwd(), out)}`
  );
}

main();
