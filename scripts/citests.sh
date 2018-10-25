#!/bin/bash

set -eux

mkdir -p $CIRCLE_ARTIFACTS $CIRCLE_TEST_REPORTS

./scripts/deploystorybook.sh
git checkout $CIRCLE_SHA1

yarn --ignore-engines
yarn build
yarn test:size                          # Validate bundle gzipped size
yarn lint                               # Validate linting
yarn test --coverage                    # Validate unit tests
cat ./coverage/lcov.info | node_modules/.bin/codeclimate-test-reporter
cp -R coverage/* $CIRCLE_TEST_REPORTS   # Copy test coverage reports for CircleCI

yarn test:image                         # Run image comparison tests

# If there are no new images, continue with the build
if [ -z "$(git status --porcelain)" ]; then
  echo "No new images added 📸"
# otherwise commit, which will cancel this build and trigger a new one with these images
else
  git add -A
  git commit -m "fix(screenshots): $USER updated screenshot tests" --no-verify
  git push origin HEAD:$CIRCLE_BRANCH
fi
