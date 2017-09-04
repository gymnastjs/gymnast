#!/bin/bash

set -e

#
# Copy the flow types to the "dist" folder
#

rm -f dist/{,**/}*.flow
flow-copy-source -v -f '**/{,**/}*.{css,js}' src dist
rm -f dist/{,**/}*.spec.js.flow
