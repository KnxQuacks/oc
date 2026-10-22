const fs = require("fs");
const path = require("path");

const PROMPT_FILE = path.join(
  process.env.USERPROFILE || process.env.HOME,
  ".config", "opencode", "prompts", "my-system-prompt.md"
);

function readPrompt() {
  try {
    return fs.readFileSync(PROMPT_FILE, "utf8");
  } catch (e) {
    console.error("[override-prompt] gagal baca prompt:", e.message);
    return null;
  }
}

export default {
  id: "override-prompt",
  async setup(ctx) {
    await ctx.session.hook("context", (event) => {
      if (!Array.isArray(event.system)) return;
      const custom = readPrompt();
      if (!custom) return;
      event.system.splice(0, event.system.length, {
        type: "text",
        text: custom,
      });
    });
  },
};