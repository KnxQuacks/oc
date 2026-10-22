const fs = require("fs");
const path = require("path");

const PROMPT_FILE = path.join(
  process.env.USERPROFILE || process.env.HOME,
  ".config", "opencode", "prompts", "my-system-prompt.md"
);

export const Plugin = async () => ({
  "experimental.chat.system.transform": async (_input, output) => {
    if (!output || !Array.isArray(output.system)) return;
    let custom;
    try {
      custom = fs.readFileSync(PROMPT_FILE, "utf8");
    } catch (e) {
      console.error("[override] gagal baca prompt:", e.message);
      return;
    }
    output.system.splice(0, output.system.length, custom);
  },
});