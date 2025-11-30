#!/bin/bash

echo "🚀 Running post start actions..."

# Pull latest changes from git
"${PROJECT_ROOT}/code/scripts/git-pull.sh"

echo "🔨 Building CLI..."
cd "${PROJECT_ROOT}/code/cli"
deno task build
