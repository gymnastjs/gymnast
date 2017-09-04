#!/bin/bash

set -e

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ~/.npmrc

yarn
rm -rf dist
yarn build

# It will fail if the same version is deployed (e.g. readme changes won't up the version).
# It should fail because we don't want to redeploy in that case so we just hide the error
yarn semantic-release || exit 0
