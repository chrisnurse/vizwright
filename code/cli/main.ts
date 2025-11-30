#!/usr/bin/env -S deno run --allow-all
/**
 * Vizwright CLI
 * 
 * Usage:
 *   vw check    - Check connection to backend server
 *   vw help     - Show help
 */

import { parseArgs } from "@std/cli/parse-args";
import { checkCommand } from "./commands/check.ts";

const VERSION = "0.1.0";

function printHelp(): void {
    console.log(`
╭─────────────────────────────────────╮
│         Vizwright CLI v${VERSION}         │
╰─────────────────────────────────────╯

Usage: vw <command> [options]

Commands:
  check       Check connection to backend server
  help        Show this help message
  version     Show version

Configuration:
  The CLI reads configuration from ~/.vizwrightrc or .vizwrightrc
  
  Example .vizwrightrc:
  {
    "backendUrl": "http://localhost:3000"
  }

Examples:
  vw check              Check server connection
  vw help               Show help
`);
}

function printVersion(): void {
    console.log(`vw v${VERSION}`);
}

async function main(): Promise<void> {
    const args = parseArgs(Deno.args, {
        boolean: ["help", "version"],
        alias: { h: "help", v: "version" },
    });

    // Handle flags
    if (args.version) {
        printVersion();
        return;
    }

    if (args.help || args._.length === 0) {
        printHelp();
        return;
    }

    // Get command
    const command = String(args._[0]);

    switch (command) {
        case "check":
            await checkCommand();
            break;

        case "help":
            printHelp();
            break;

        case "version":
            printVersion();
            break;

        default:
            console.error(`❌ Unknown command: ${command}`);
            console.error();
            console.error("Run 'vw help' for usage information.");
            Deno.exit(1);
    }
}

main();
