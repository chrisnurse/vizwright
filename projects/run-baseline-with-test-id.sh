#!/bin/bash

# Serve the dashboard sample app with test IDs enabled
# Runs in background and then runs Playwright tests against it
/workspaces/vizwright/sample-apps/serve.sh dashboard &

cd "${PROJECT_ROOT}/projects/pw-baseline/with-test-id"
npx playwright test --reporter=dot 2>&1

# Kill the server
PID=$!
kill -9 $PID 2>/dev/null
