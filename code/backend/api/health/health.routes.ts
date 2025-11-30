import { Hono } from "hono";
import Config from "../../../common/config/config.ts";

export interface HealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  version: string;
  environment: {
    projectRoot: string;
    deno: string;
  };
  checks: {
    name: string;
    status: "pass" | "fail";
    message?: string;
  }[];
}

const health = new Hono();

health.get("/", async (c) => {
  const checks: HealthStatus["checks"] = [];

  // Check PROJECT_ROOT is set
  try {
    const projectRoot = Config.ProjectRoot;
    checks.push({
      name: "PROJECT_ROOT",
      status: projectRoot ? "pass" : "fail",
      message: projectRoot ? `Set to: ${projectRoot}` : "Not set",
    });
  } catch (error) {
    checks.push({
      name: "PROJECT_ROOT",
      status: "fail",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Check critical directories exist
  const directories = [
    { name: "assets", path: Config.AssetsPath() },
    { name: "projects", path: Config.ProjectsPath() },
    { name: "sample-apps", path: Config.SampleAppsPath() },
    { name: "config", path: Config.ConfigPath() },
    { name: "tmp", path: Config.TmpPath() },
  ];

  for (const dir of directories) {
    const exists = await Config.Exists(dir.path);
    checks.push({
      name: `Directory: ${dir.name}`,
      status: exists ? "pass" : "fail",
      message: exists ? dir.path : `Missing: ${dir.path}`,
    });
  }

  const allPassing = checks.every((check) => check.status === "pass");

  const health: HealthStatus = {
    status: allPassing ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    version: "0.1.0",
    environment: {
      projectRoot: Config.ProjectRoot,
      deno: Deno.version.deno,
    },
    checks,
  };

  return c.json(health, allPassing ? 200 : 503);
});

export default health;
