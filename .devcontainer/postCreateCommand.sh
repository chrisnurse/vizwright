#!/bin/bash

echo "🚀 Running post create actions..."

echo "📦 Installing dependencies..."
"${PROJECT_ROOT}/code/scripts/install.sh"

echo "⚙️ Setting up CLI config..."
if [ ! -f ~/.vizwrightrc ]; then
  cp "${PROJECT_ROOT}/config/.vizwrightrc.sample" ~/.vizwrightrc
  echo "   Created ~/.vizwrightrc from sample"
else
  echo "   ~/.vizwrightrc already exists, skipping"
fi

echo "✅ Setup complete! Run 'vw help' to get started."
