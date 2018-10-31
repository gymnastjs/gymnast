#!/bin/bash

set -eux

yarn upgrade --latest
yarn flow-typed update-cache
yarn flow-typed install --overwrite
