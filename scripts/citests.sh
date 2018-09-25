#!/bin/bash

set -e

#
# Splits test stage tasks between different CircleCI Nodes to improve performance.
#

echo "Running node $CIRCLE_NODE_INDEX"

if [ "$CIRCLE_NODE_INDEX" -eq "0" ]; then
  yarn test:size                          # Validate bundle gzipped size
  yarn lint                               # Validate linting
  yarn test:cover                         # Validate unit tests
  cat ./coverage/lcov.info | node_modules/.bin/codeclimate-test-reporter
  cp -R coverage/* $CIRCLE_TEST_REPORTS   # Copy test coverage reports for CircleCI
else
  # Run image comparison tests
  yarn test:image

  # If there are no new images, continue with the build
  if [ -z "$(git status --porcelain)" ]; then
    echo "No new images added 📸"
  # otherwise commit, which will cancel this build and trigger a new one with these images
  else
    git add -A
    git commit -m "fix(screenshots): $USER updated screenshot tests" --no-verify
    git push origin HEAD:$CIRCLE_BRANCH
  fi
fi
