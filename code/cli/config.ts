/**
 * CLI Configuration
 * Reads from ~/.vizwrightrc or .vizwrightrc in current directory
 */

interface CliConfig {
    backendUrl: string;
}

const DEFAULT_CONFIG: CliConfig = {
    backendUrl: "http://localhost:3000",
};

export async function loadConfig(): Promise<CliConfig> {
    const configPaths = [
        `${Deno.env.get("HOME")}/.vizwrightrc`,
        ".vizwrightrc",
    ];

    for (const path of configPaths) {
        try {
            const content = await Deno.readTextFile(path);
            const config = JSON.parse(content) as Partial<CliConfig>;
            return { ...DEFAULT_CONFIG, ...config };
        } catch {
            // File doesn't exist or is invalid, continue to next path
        }
    }

    return DEFAULT_CONFIG;
}

export async function saveConfig(config: CliConfig): Promise<void> {
    const homePath = `${Deno.env.get("HOME")}/.vizwrightrc`;
    await Deno.writeTextFile(homePath, JSON.stringify(config, null, 2));
}

export function getDefaultConfig(): CliConfig {
    return { ...DEFAULT_CONFIG };
}
