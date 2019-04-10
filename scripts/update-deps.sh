#!/bin/bash

set -eux

# Update dependencies
yarn upgrade --latest

# Lock dependencies
yarn add --dev --exact picturebook@alpha nightwatch@0.9.21

# Update TS definitions
yarn typesync
