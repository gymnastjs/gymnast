#!/usr/bin/env bash

set -e

# Ensure all required variables are defined
DEFAULT_BRANCH='default'
BASE_URL='https://xflex.github.io/xflex'
BRANCH=${CIRCLE_BRANCH:-$DEFAULT_BRANCH}

if [ "$CIRCLE_BRANCH" = 'master' ]; then
  echo $BASE_URL
else
  echo "$BASE_URL/branch/$BRANCH"
fi
