#!/bin/bash
#
# go.sh - Start/restart frontend and backend dev servers
#

echo "🚀 Starting Vizwright dev environment..."

# Ensure log directories exist (via Config)
cd "${PROJECT_ROOT}"
deno run --allow-all code/scripts/ensure-tmp.ts

# Kill any existing dev servers
echo "🔄 Checking for existing processes..."

# Find and kill existing backend (port 3000)
BACKEND_PID=$(lsof -ti:3000 2>/dev/null)
if [ -n "$BACKEND_PID" ]; then
  echo "   Stopping backend (PID: $BACKEND_PID)..."
  kill $BACKEND_PID 2>/dev/null
  sleep 1
fi

# Find and kill existing frontend (port 5173)
FRONTEND_PID=$(lsof -ti:5173 2>/dev/null)
if [ -n "$FRONTEND_PID" ]; then
  echo "   Stopping frontend (PID: $FRONTEND_PID)..."
  kill $FRONTEND_PID 2>/dev/null
  sleep 1
fi

# Start backend in background
echo "🔧 Starting backend on http://localhost:3000..."
cd "${PROJECT_ROOT}/code/backend"
deno task dev 2>&1 | tee "${PROJECT_ROOT}/tmp/be-logs/dev.log" &
BACKEND_PID=$!
echo "   Backend started (PID: $BACKEND_PID)"

# Start frontend in background
echo "🎨 Starting frontend on http://localhost:5173..."
cd "${PROJECT_ROOT}/code/frontend"
deno task dev 2>&1 | tee "${PROJECT_ROOT}/tmp/fe-logs/dev.log" &
FRONTEND_PID=$!
echo "   Frontend started (PID: $FRONTEND_PID)"

# Wait a moment for servers to start
sleep 2

# Verify they're running
echo ""
echo "📊 Status:"
if lsof -ti:3000 > /dev/null 2>&1; then
  echo "   ✅ Backend running on http://localhost:3000"
else
  echo "   ❌ Backend failed to start (check /tmp/backend.log)"
fi

if lsof -ti:5173 > /dev/null 2>&1; then
  echo "   ✅ Frontend running on http://localhost:5173"
else
  echo "   ❌ Frontend failed to start (check /tmp/frontend.log)"
fi

echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f ${PROJECT_ROOT}/tmp/be-logs/dev.log"
echo "   Frontend: tail -f ${PROJECT_ROOT}/tmp/fe-logs/dev.log"
echo ""
echo "🛑 To stop: kill \$(lsof -ti:3000) \$(lsof -ti:5173)"
