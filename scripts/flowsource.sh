#!/bin/bash

set -e

#
# Copy the flow types to the "dist" folder
#

# Remove any previous flow files
rm -f dist/{,**/}*.flow

# Generate flow source for all files
./node_modules/.bin/flow-copy-source -v src dist

# Remove spec files
rm -f dist/{,**/}*.spec.js.flow
