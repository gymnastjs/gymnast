#!/bin/bash

set -eu

#
# Generates flow type definitions based on TypeScript types
#

# Remove any previous flow files
rm -f dist/{,**/}*.flow

# Generate flow global type definitions
yarn flowgen src/types.d.ts -o dist/flowTypes.js --add-flow-header

# Copy flow exports
cp src/flow.js dist/gymnast.js.flow
