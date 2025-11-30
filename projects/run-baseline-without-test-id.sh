#!/bin/bash


# Serve the dashboard sample app without test IDs
# Runs in background and then runs Playwright tests against it
/workspaces/vizwright/sample-apps/serve.sh dashboard --notest &

cd "${PROJECT_ROOT}/projects/pw-baseline/without-test-id"
npx playwright test --reporter=dot 2>&1

# Kill the server
PID=$!
kill -9 $PID 2>/dev/null