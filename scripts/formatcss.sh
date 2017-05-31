#!/bin/bash

set -e

os="$(uname -s)"

if [[ $os == *"_NT"* ]]; then
  # on windows
  .\node_modules\.bin\perfectionist.cmd --indentSize 2 --cascade false --colorCase upper $1 $1
else
  # everything else
  ./node_modules/.bin/perfectionist --indentSize 2 --cascade false --colorCase upper $1 $1
fi
