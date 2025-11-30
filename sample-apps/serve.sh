#!/bin/bash
#
# serve.sh - Serve a sample app on the configured port
#
# Usage: ./serve.sh [app-name] [--notest]
# Example: ./serve.sh dashboard
#          ./serve.sh dashboard --notest
#
# Port is determined by VIZWRIGHT_SAMPLE_APP_PORT environment variable (default: 8080)
#

SAMPLE_APP=${1:-dashboard}
PORT=${VIZWRIGHT_SAMPLE_APP_PORT:-8080}
NO_TEST_IDS=false

# Check for --notest flag
if [[ "$2" == "--notest" ]]; then
  NO_TEST_IDS=true
fi

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
if [ "$NO_TEST_IDS" = true ]; then
  echo "🔒 Mode: WITHOUT data-testid attributes (hard mode)"
else
  echo "🏷️  Mode: WITH data-testid attributes (easy mode)"
fi
echo ""

# Kill any process using the target port
echo "🔍 Checking for processes on port ${PORT}..."
PID=$(lsof -ti:${PORT} 2>/dev/null)
if [ ! -z "$PID" ]; then
  echo "⚠️  Found process ${PID} on port ${PORT}, stopping it..."
  kill -9 $PID 2>/dev/null
  sleep 1
fi

echo "Press Ctrl+C to stop"
echo ""

# Clean up any existing cleaned directory first
CLEAN_DIR="${SAMPLE_DIR}/cleaned"
rm -rf "$CLEAN_DIR"

# Create cleaned version if needed
if [ "$NO_TEST_IDS" = true ]; then
  mkdir -p "$CLEAN_DIR"
  
  # Copy all files to cleaned directory
  cp -r "$SAMPLE_DIR"/* "$CLEAN_DIR/" 2>/dev/null || true
  
  # Remove the cleaned directory from itself (if it got copied)
  rm -rf "$CLEAN_DIR/cleaned"
  
  # Strip data-testid from HTML files
  find "$CLEAN_DIR" -name "*.html" -type f -exec sed -i 's/ data-testid="[^"]*"//g' {} \;
  
  # Serve from cleaned directory
  cd "$CLEAN_DIR"
  
  # Cleanup on exit
  trap "rm -rf '$CLEAN_DIR'" EXIT
else
  # Serve from original directory
  cd "$SAMPLE_DIR"
fi

# Can not use --watch here as it doesn't watch the served content, it watches the module(s) that form the server itself
deno run --allow-net --allow-read jsr:@std/http@1/file-server --port ${PORT}
