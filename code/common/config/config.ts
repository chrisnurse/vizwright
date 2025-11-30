/**
 * Config class provides centralized access to all project directories and file operations.
 * All file access should go through this class to ensure consistent paths and validation.
 */
export default class Config {
    // Project root from environment variable (set in devcontainer.json)
    private static readonly PROJECT_ROOT = Deno.env.get("PROJECT_ROOT") ??
        (() => { throw new Error("PROJECT_ROOT environment variable is not set"); })();

    // Directory names
    private static readonly ASSETS_DIR = "assets";
    private static readonly PROJECTS_DIR = "projects";
    private static readonly SAMPLE_APPS_DIR = "sample-apps";
    private static readonly TMP_DIR = "tmp";
    private static readonly CONFIG_DIR = "config";
    private static readonly LOGS_DIR = "tmp/vizwright-logs";
    private static readonly BE_LOGS_DIR = "tmp/be-logs";
    private static readonly FE_LOGS_DIR = "tmp/fe-logs";

    // ============================================
    // PATH GETTERS
    // ============================================

    /** Get the project root path */
    static get ProjectRoot(): string {
        return this.PROJECT_ROOT;
    }

    /** Get the assets directory path, optionally with a sub-path */
    static AssetsPath(subPath?: string): string {
        return this.buildPath(this.ASSETS_DIR, subPath);
    }

    /** Get the projects directory path, optionally with a sub-path */
    static ProjectsPath(subPath?: string): string {
        return this.buildPath(this.PROJECTS_DIR, subPath);
    }

    /** Get the sample-apps directory path, optionally with a sub-path */
    static SampleAppsPath(subPath?: string): string {
        return this.buildPath(this.SAMPLE_APPS_DIR, subPath);
    }

    /** Get the tmp directory path, optionally with a sub-path */
    static TmpPath(subPath?: string): string {
        return this.buildPath(this.TMP_DIR, subPath);
    }

    /** Get the config directory path, optionally with a sub-path */
    static ConfigPath(subPath?: string): string {
        return this.buildPath(this.CONFIG_DIR, subPath);
    }

    /** Get the logs directory path, optionally with a sub-path */
    static LogsPath(subPath?: string): string {
        return this.buildPath(this.LOGS_DIR, subPath);
    }

    /** Get the backend logs directory path, optionally with a sub-path */
    static BeLogsPath(subPath?: string): string {
        return this.buildPath(this.BE_LOGS_DIR, subPath);
    }

    /** Get the frontend logs directory path, optionally with a sub-path */
    static FeLogsPath(subPath?: string): string {
        return this.buildPath(this.FE_LOGS_DIR, subPath);
    }

    // ============================================
    // TMP DIRECTORY MANAGEMENT
    // ============================================

    /** Ensure all tmp subdirectories exist */
    static async EnsureTmpDirs(): Promise<void> {
        await Deno.mkdir(this.LogsPath(), { recursive: true });
        await Deno.mkdir(this.BeLogsPath(), { recursive: true });
        await Deno.mkdir(this.FeLogsPath(), { recursive: true });
    }

    /** Clear all log directories */
    static async ClearLogs(): Promise<void> {
        const dirs = [this.LogsPath(), this.BeLogsPath(), this.FeLogsPath()];
        for (const dir of dirs) {
            try {
                await Deno.remove(dir, { recursive: true });
            } catch {
                // Directory may not exist, that's fine
            }
        }
    }

    // ============================================
    // ASSETS OPERATIONS
    // ============================================

    /** Get the contents of an asset file */
    static async GetAsset(subPath: string): Promise<string> {
        const path = this.AssetsPath(subPath);
        return await Deno.readTextFile(path);
    }

    /** Save content to an asset file */
    static async SaveAsset(subPath: string, content: string): Promise<void> {
        const path = this.AssetsPath(subPath);
        await this.ensureDir(path);
        await Deno.writeTextFile(path, content);
    }

    /** Delete an asset file */
    static async DeleteAsset(subPath: string): Promise<void> {
        const path = this.AssetsPath(subPath);
        await Deno.remove(path);
    }

    // ============================================
    // PROJECTS OPERATIONS
    // ============================================

    /** Get the contents of a project file */
    static async GetProject(subPath: string): Promise<string> {
        const path = this.ProjectsPath(subPath);
        return await Deno.readTextFile(path);
    }

    /** Save content to a project file */
    static async SaveProject(subPath: string, content: string): Promise<void> {
        const path = this.ProjectsPath(subPath);
        await this.ensureDir(path);
        await Deno.writeTextFile(path, content);
    }

    /** Delete a project file */
    static async DeleteProject(subPath: string): Promise<void> {
        const path = this.ProjectsPath(subPath);
        await Deno.remove(path);
    }

    // ============================================
    // SAMPLE APPS OPERATIONS
    // ============================================

    /** Get the contents of a sample app file */
    static async GetSampleApp(subPath: string): Promise<string> {
        const path = this.SampleAppsPath(subPath);
        return await Deno.readTextFile(path);
    }

    /** Save content to a sample app file */
    static async SaveSampleApp(subPath: string, content: string): Promise<void> {
        const path = this.SampleAppsPath(subPath);
        await this.ensureDir(path);
        await Deno.writeTextFile(path, content);
    }

    /** Delete a sample app file */
    static async DeleteSampleApp(subPath: string): Promise<void> {
        const path = this.SampleAppsPath(subPath);
        await Deno.remove(path);
    }

    // ============================================
    // TMP OPERATIONS
    // ============================================

    /** Get the contents of a tmp file */
    static async GetTmp(subPath: string): Promise<string> {
        const path = this.TmpPath(subPath);
        return await Deno.readTextFile(path);
    }

    /** Save content to a tmp file */
    static async SaveTmp(subPath: string, content: string): Promise<void> {
        const path = this.TmpPath(subPath);
        await this.ensureDir(path);
        await Deno.writeTextFile(path, content);
    }

    /** Delete a tmp file */
    static async DeleteTmp(subPath: string): Promise<void> {
        const path = this.TmpPath(subPath);
        await Deno.remove(path);
    }

    // ============================================
    // CONFIG OPERATIONS
    // ============================================

    /** Get the contents of a config file */
    static async GetConfig(subPath: string): Promise<string> {
        const path = this.ConfigPath(subPath);
        return await Deno.readTextFile(path);
    }

    /** Save content to a config file */
    static async SaveConfig(subPath: string, content: string): Promise<void> {
        const path = this.ConfigPath(subPath);
        await this.ensureDir(path);
        await Deno.writeTextFile(path, content);
    }

    /** Delete a config file */
    static async DeleteConfig(subPath: string): Promise<void> {
        const path = this.ConfigPath(subPath);
        await Deno.remove(path);
    }

    // ============================================
    // JSON OPERATIONS (with TypeBox validation support)
    // ============================================

    /** Get and parse a JSON file */
    static async GetJson<T>(basePath: string, subPath: string): Promise<T> {
        const path = this.buildPath(basePath, subPath);
        const content = await Deno.readTextFile(path);
        return JSON.parse(content) as T;
    }

    /** Save an object as JSON */
    static async SaveJson<T>(basePath: string, subPath: string, data: T): Promise<void> {
        const path = this.buildPath(basePath, subPath);
        await this.ensureDir(path);
        await Deno.writeTextFile(path, JSON.stringify(data, null, 2));
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    /** Build a full path from base directory and optional sub-path */
    private static buildPath(baseDir: string, subPath?: string): string {
        const base = `${this.PROJECT_ROOT}/${baseDir}`;
        return subPath ? `${base}/${subPath}` : base;
    }

    /** Ensure the directory for a file path exists */
    private static async ensureDir(filePath: string): Promise<void> {
        const dir = filePath.substring(0, filePath.lastIndexOf("/"));
        await Deno.mkdir(dir, { recursive: true });
    }

    /** Check if a file exists */
    static async Exists(path: string): Promise<boolean> {
        try {
            await Deno.stat(path);
            return true;
        } catch {
            return false;
        }
    }

    /** List files in a directory */
    static async ListFiles(basePath: string, subPath?: string): Promise<string[]> {
        const path = this.buildPath(basePath, subPath ?? "");
        const files: string[] = [];
        for await (const entry of Deno.readDir(path)) {
            files.push(entry.name);
        }
        return files;
    }
}