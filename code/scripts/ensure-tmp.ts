#!/usr/bin/env -S deno run --allow-all
/**
 * Ensure tmp directories exist
 */
import Config from "../common/config/config.ts";

await Config.EnsureTmpDirs();
console.log("✅ Tmp directories ready");
