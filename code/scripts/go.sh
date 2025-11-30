#!/bin/bash
#
# go.sh - Start/restart frontend and backend dev servers
#

echo "🚀 Starting Vizwright dev environment..."

# Ensure log directories exist (via Config)
cd "${PROJECT_ROOT}"
deno run --allow-all code/scripts/ensure-tmp.ts

# Run code quality checks
echo "🔍 Running code quality checks..."
if ! ./code/scripts/audit-and-lint.sh; then
  echo "❌ Code quality checks failed. Please fix issues before starting dev servers."
  exit 1
fi
echo "✅ Code quality checks passed"
echo ""

# Kill any existing dev servers
echo "🔄 Checking for existing processes..."

# Get ports from environment variables
SERVER_PORT=${VIZWRIGHT_SERVER_PORT:-3000}
UI_PORT=${VIZWRIGHT_UI_PORT:-5173}

# Find and kill existing backend
BACKEND_PID=$(lsof -ti:${SERVER_PORT} 2>/dev/null)
if [ -n "$BACKEND_PID" ]; then
  echo "   Stopping backend on port ${SERVER_PORT} (PID: $BACKEND_PID)..."
  kill $BACKEND_PID 2>/dev/null
  sleep 1
fi

# Find and kill existing frontend
FRONTEND_PID=$(lsof -ti:${UI_PORT} 2>/dev/null)
if [ -n "$FRONTEND_PID" ]; then
  echo "   Stopping frontend on port ${UI_PORT} (PID: $FRONTEND_PID)..."
  kill $FRONTEND_PID 2>/dev/null
  sleep 1
fi

# Start backend in background
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 Starting backend on http://localhost:${SERVER_PORT}..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd "${PROJECT_ROOT}/code/backend"
deno task dev 2>&1 | tee "${PROJECT_ROOT}/tmp/be-logs/dev.log" &
BACKEND_PID=$!
echo "   Backend started (PID: $BACKEND_PID)"

# Start frontend in background
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎨 Starting frontend on http://localhost:${UI_PORT}..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd "${PROJECT_ROOT}/code/frontend"
deno task dev 2>&1 | tee "${PROJECT_ROOT}/tmp/fe-logs/dev.log" &
FRONTEND_PID=$!
echo "   Frontend started (PID: $FRONTEND_PID)"

# Wait a moment for servers to start
sleep 2

# Verify they're running
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Status:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if lsof -ti:${SERVER_PORT} > /dev/null 2>&1; then
  echo "   ✅ Backend running on http://localhost:${SERVER_PORT}"
else
  echo "   ❌ Backend failed to start (check ${PROJECT_ROOT}/tmp/be-logs/dev.log)"
fi

if lsof -ti:${UI_PORT} > /dev/null 2>&1; then
  echo "   ✅ Frontend running on http://localhost:${UI_PORT}"
else
  echo "   ❌ Frontend failed to start (check ${PROJECT_ROOT}/tmp/fe-logs/dev.log)"
fi

echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f ${PROJECT_ROOT}/tmp/be-logs/dev.log"
echo "   Frontend: tail -f ${PROJECT_ROOT}/tmp/fe-logs/dev.log"
echo ""
echo "🛑 To stop: kill \$(lsof -ti:${SERVER_PORT}) \$(lsof -ti:${UI_PORT})"
echo ""
echo "⏳ Dev servers running... Press Ctrl+C to stop."

# Wait for both processes to complete (or user interruption)
wait
