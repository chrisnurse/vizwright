#!/bin/bash

echo "🚀 Running post create actions..."

echo "📦 Installing dependencies..."
cd "${PROJECT_ROOT}"
deno task install

echo "🔨 Building CLI..."
cd "${PROJECT_ROOT}/code/cli"
deno task build

echo "⚙️ Setting up CLI config..."
if [ ! -f ~/.vizwrightrc ]; then
  cp "${PROJECT_ROOT}/config/.vizwrightrc.sample" ~/.vizwrightrc
  echo "   Created ~/.vizwrightrc from sample"
else
  echo "   ~/.vizwrightrc already exists, skipping"
fi

echo "✅ Setup complete! Run 'vw help' to get started."
