#!/bin/bash

set -e

#
# Splits test stage tasks between different CircleCI Nodes to improve performance.
#

echo "Running node $CIRCLE_NODE_INDEX"

if [ "$CIRCLE_NODE_INDEX" -eq "0" ]; then
  yarn lint       # Run linting tasks
  yarn test:unit  # Run unit tests
else
  yarn test:image # Run image comparison tests
fi
