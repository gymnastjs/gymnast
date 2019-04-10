#!/bin/bash

set -eux

# Update dependencies
yarn upgrade --latest

# Update TS definitions
yarn typesync
