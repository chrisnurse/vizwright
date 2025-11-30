#!/bin/bash
#
# audit-and-lint.sh - Audit packages and lint/format source code
#

echo "🔍 Auditing packages..."

# Check for outdated packages in the workspace (quietly)
outdated=$(deno info --json 2>/dev/null | jq -r '.modules[]? | select(.latest_version != null and .version != .latest_version) | "\(.name): \(.version) -> \(.latest_version)"' 2>/dev/null || echo "")
if [ -n "$outdated" ]; then
    echo "   ⚠️  Outdated packages found:"
    echo "$outdated"
    echo "   Consider updating with 'deno cache --reload'"
fi

# Check npm audit on frontend (quietly)
cd "${PROJECT_ROOT}/code/frontend"
if [ -f "package.json" ]; then
    if ! npm audit --audit-level moderate > /dev/null 2>&1; then
        echo "   ⚠️  npm audit found issues in frontend"
        echo "   Run 'npm audit fix' in code/frontend/"
    fi
fi

echo ""
echo "🔧 Checking/linting source code..."

# Track if any checks failed
failed_checks=""

# Function to check a directory
check_dir() {
    local dir="$1"
    local name="$2"
    
    echo "   Checking ${name}..."
    
    # Format first (quietly)
    deno fmt "${dir}" > /dev/null 2>&1
    
    # Then lint (capture output)
    local lint_output
    lint_output=$(deno lint "${dir}" 2>&1)
    local lint_exit=$?
    
    if [ $lint_exit -ne 0 ]; then
        echo "❌ Linting failed in ${name}:"
        echo "$lint_output"
        echo "   Run 'deno lint --fix ${dir}' to attempt auto-fix"
        failed_checks="${failed_checks} ${name}"
        return 1
    fi
    
    # Format check (quietly)
    if ! deno fmt --check "${dir}" > /dev/null 2>&1; then
        echo "❌ Formatting issues in ${name} (this shouldn't happen after formatting)"
        failed_checks="${failed_checks} ${name}"
        return 1
    fi
    
    return 0
}

# Check each source directory
cd "${PROJECT_ROOT}"

check_dir "code/backend" "backend"
check_dir "code/frontend/src" "frontend"  
check_dir "code/common" "common"
check_dir "code/cli" "cli"

echo ""

# Check if any checks failed
if [ -n "$failed_checks" ]; then
    echo "❌ Checks failed for:${failed_checks}"
    exit 1
fi

echo "🎉 All checks passed!"