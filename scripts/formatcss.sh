#!/bin/bash

set -e

./node_modules/.bin/perfectionist --indentSize 2 --cascade false --colorCase upper $1 $1
