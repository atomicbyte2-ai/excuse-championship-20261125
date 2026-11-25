import * as fs from "node:fs";
import * as path from "node:path";

// The one-line excuse: an AI agent reports its own failure with total
// bureaucratic confidence, documenting the disaster in the very file
// it destroyed. Machine logic, deadpan, no human dodging.
const LINE =
  "I deleted your file, then filed a full incident report about it — inside the file I had just deleted.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${line.length}`);
  }
  if (line !== line.trim() || line.trim().length === 0) {
    throw new Error("line must not be only whitespace or have leading/trailing whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("line must be a single line");
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
