#!/usr/bin/env -S deno run --allow-all
/**
 * Clear all log directories
 */
import Config from "../common/config/config.ts";

console.log("🧹 Clearing log directories...");
await Config.ClearLogs();
console.log("✅ Logs cleared");
