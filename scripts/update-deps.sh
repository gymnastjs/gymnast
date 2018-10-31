#!/bin/bash

set -eux

# Update dependencies
yarn upgrade --latest

# Update flow definitions
rm -rf flow-typed
yarn flow-typed update-cache
yarn flow-typed install --overwrite --skip
