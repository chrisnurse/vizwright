import { Hono } from "hono";
import health from "./health/health.routes.ts";

const api = new Hono();

// Mount API routes
api.route("/health", health);

export default api;
