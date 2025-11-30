#!/bin/bash
#
# serve.sh - Serve a sample app on a local port
#
# Usage: ./serve.sh [app-name] [port]
# Example: ./serve.sh login 8080
#

SAMPLE_APP=${1:-login}
PORT=${2:-8080}
SAMPLE_DIR="${PROJECT_ROOT}/sample-apps/${SAMPLE_APP}"

# Check if sample app exists
if [ ! -d "$SAMPLE_DIR" ]; then
  echo "❌ Sample app '${SAMPLE_APP}' not found in sample-apps/"
  echo ""
  echo "Available sample apps:"
  ls -1 "${PROJECT_ROOT}/sample-apps" | grep -v "readme.md" | grep -v "serve.sh"
  exit 1
fi

echo "🚀 Starting sample app: ${SAMPLE_APP}"
echo "📁 Directory: ${SAMPLE_DIR}"
echo "🌐 URL: http://localhost:${PORT}"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Serve using Deno's file server
cd "$SAMPLE_DIR"
deno run --allow-net --allow-read jsr:@std/http@1/file-server --port ${PORT}
