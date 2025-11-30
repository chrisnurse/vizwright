import { loadConfig } from "../config.ts";

interface HealthStatus {
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

export async function checkCommand(): Promise<void> {
    const config = await loadConfig();
    const url = `${config.backendUrl}/api/health`;

    console.log(`🔍 Checking connection to ${config.backendUrl}...`);
    console.log();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`❌ Server returned ${response.status}`);
            Deno.exit(1);
        }

        const health = await response.json() as HealthStatus;

        // Status
        const statusIcon = health.status === "healthy" ? "✅" : "❌";
        console.log(`${statusIcon} Server Status: ${health.status.toUpperCase()}`);
        console.log();

        // Environment
        console.log("📋 Environment:");
        console.log(`   Version:      ${health.version}`);
        console.log(`   Deno:         ${health.environment.deno}`);
        console.log(`   Project Root: ${health.environment.projectRoot}`);
        console.log();

        // Checks
        console.log("🔎 Health Checks:");
        for (const check of health.checks) {
            const icon = check.status === "pass" ? "✓" : "✗";
            const color = check.status === "pass" ? "\x1b[32m" : "\x1b[31m";
            const reset = "\x1b[0m";
            console.log(`   ${color}${icon}${reset} ${check.name}`);
        }
        console.log();

        // Summary
        const passCount = health.checks.filter(c => c.status === "pass").length;
        const totalCount = health.checks.length;
        console.log(`📊 ${passCount}/${totalCount} checks passing`);

        if (health.status !== "healthy") {
            Deno.exit(1);
        }
    } catch (error) {
        console.error(`❌ Failed to connect to server at ${config.backendUrl}`);
        console.error();
        if (error instanceof Error) {
            console.error(`   Error: ${error.message}`);
        }
        console.error();
        console.error("💡 Make sure the backend is running:");
        console.error("   deno task dev:backend");
        Deno.exit(1);
    }
}
