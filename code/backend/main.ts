import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import Config from "../common/config/config.ts";
import api from "./api/index.ts";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());

// Mount API routes
app.route("/api", api);

// ============================================
// START SERVER
// ============================================

const port = 3000;
console.log(`🚀 Vizwright API starting on http://localhost:${port}`);
console.log(`📁 Project root: ${Config.ProjectRoot}`);

Deno.serve({ port }, app.fetch);
