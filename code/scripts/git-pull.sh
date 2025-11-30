#!/bin/bash
#
# git-pull.sh - Pull latest changes from git
#

cd "${PROJECT_ROOT}"

echo "🔄 Pulling latest changes from git..."
git pull

if [ $? -eq 0 ]; then
  echo "✅ Git pull successful"
else
  echo "⚠️  Git pull failed or no changes to pull"
fi
