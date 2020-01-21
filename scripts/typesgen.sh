#!/bin/bash

set -eu

#
# Generates flow type and TypeScript definitions
#

TEMP_PATH="./temp-types"
BUILD_PATH="./dist"

# Creates the build folder if it doesn't exist
mkdir -p $BUILD_PATH

# Remove any previous flow and TS definition files and temp folder
rm -rf $TEMP_PATH

yarn tsc --outDir $TEMP_PATH

# Move generated types to build folder
mv $TEMP_PATH/src/* $BUILD_PATH/

# Copy source types
cp ./src/types.d.ts $BUILD_PATH/types.d.ts

# Cleanup
rm -rf $TEMP_PATH
