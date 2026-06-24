// Minimal Gemini image generator. Usage:
//   GEMINI_API_KEY=... PROMPT="..." MODEL=gemini-3.1-flash-image AR=1:1 node scripts/genimg.mjs <outfile>
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.MODEL || "gemini-3.1-flash-image";
const PROMPT = process.env.PROMPT;
const AR = process.env.AR || "1:1";
const OUT = process.argv[2];

if (!KEY || !PROMPT || !OUT) {
  console.error("Need GEMINI_API_KEY, PROMPT, and <outfile> arg");
  process.exit(2);
}

const body = {
  contents: [{ parts: [{ text: PROMPT }] }],
  generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: AR } },
};

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
  { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
);
const j = await res.json();
if (j.error) {
  console.error("API ERROR:", j.error.message);
  process.exit(1);
}
const parts = j.candidates?.[0]?.content?.parts || [];
const img = parts.find((p) => p.inlineData);
if (!img) {
  console.error("No image in response:", JSON.stringify(j).slice(0, 600));
  process.exit(1);
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, Buffer.from(img.inlineData.data, "base64"));
console.log("saved", OUT, fs.statSync(OUT).size, "bytes");
