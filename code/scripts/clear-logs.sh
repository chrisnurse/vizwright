#!/bin/bash
#
# clear-logs.sh - Clear all log directories
#

echo "🧹 Clearing log directories..."

rm -rf "${PROJECT_ROOT}/tmp/be-logs"/*
rm -rf "${PROJECT_ROOT}/tmp/fe-logs"/*
rm -rf "${PROJECT_ROOT}/tmp/vizwright-logs"/*
rm -rf "${PROJECT_ROOT}/tmp/scratch-logs"/*
rm -rf "${PROJECT_ROOT}/tests/scratch/scratch-logs/*"

echo "✅ Logs cleared"
