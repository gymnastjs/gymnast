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
rm -f $BUILD_PATH/{,**/}*.flow
rm -f $BUILD_PATH/{,**/}*.d.ts
rm -rf $TEMP_PATH

yarn tsc --outDir $TEMP_PATH --emitDeclarationOnly
rm -f $TEMP_PATH/src/{,**/}*.spec.d.ts
rm -rf $TEMP_PATH/storybook
rm -rf $TEMP_PATH/test

# Generate flow global type definitions
for file in `find $TEMP_PATH -type f -name "*.d.ts"`; do
  flowFile=${file/.d.ts/.js.flow}
  echo " $file -> $flowFile"
  yarn flowgen $file -o $flowFile --add-flow-header
done

# Move generated types to build folder
mv $TEMP_PATH/src/* $BUILD_PATH/

# Copy source types
cp ./src/types.d.ts $BUILD_PATH/types.d.ts
yarn flowgen src/types.d.ts -o $BUILD_PATH/types.flow.js --add-flow-header

# Cleanup
rm -rf $TEMP_PATH

