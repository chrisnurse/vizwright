#!/bin/bash
cd "${PROJECT_ROOT}/projects/pw-baseline/with-test-id"
npx playwright test --reporter=dot 2>&1
