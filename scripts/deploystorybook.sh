
#!/usr/bin/env bash

set -e

# Deploy the built story book bundles when running on CI
#
# When on the master branch the deployment is at `/`, any other branches and forks use:
#   `/branch/[branch-name]`
# To prevent your feature branch from being overwritten by other forks with the same name, you can
# use the format:
#   `[username]/[feature]`
#

# Skip if not on CI

if [ "$CI" != true ] || [ "$CIRCLE_NODE_INDEX" -gt "0" ] ; then
  echo "This script is only meant to run on CI. Set 'CI' global to true to override."
  exit 1
fi

# Ensure all required variables are defined
DEFAULT_USERNAME='[unknown user]'
DEFAULT_BRANCH='default'
USER=${CIRCLE_USERNAME:-$DEFAULT_USERNAME}
BRANCH=${CIRCLE_BRANCH:-$DEFAULT_BRANCH}
TEMP_PATH="$PWD/../temp"

if [ "$CIRCLE_BRANCH" = 'master' ]; then
  TARGET_PATH='.'
else
  TARGET_PATH="./branch/$BRANCH"
fi

TARGET_URL=$(./scripts/getTargetUrl.sh)

# Set git user
git config user.email "$USER@reflex.ci" && git config user.name "Reflex CI ($BRANCH)"

# Build StoryBook in the `../temp` folder
yarn
yarn build
./node_modules/.bin/build-storybook -c storybook/config -s ./storybook/static -o $TEMP_PATH

# Copy circle.yml to ensure last config is used
cp circle.yml $TEMP_PATH
# Copy .gitignore to avoid commiting unnecessary files
cp .gitignore $TEMP_PATH

# Switch to gh-pages branch
git reset --hard HEAD
git fetch origin gh-pages
git checkout gh-pages
git reset --hard origin/gh-pages
git clean -xdfq

# Remove current content (except for branch folders)
if [ "$CIRCLE_BRANCH" = 'master' ]; then
  mv branch $TEMP_PATH
  rm -rf *
else
  rm -rf $TARGET_PATH
  mkdir -p $TARGET_PATH
fi

# Copy prior content to a folder with the current branch name
mv ../temp/* $TARGET_PATH

# Cleanup temp folder
rm -rf $TEMP_PATH

# Commit changes
if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to commit, everything is clean ✨"
else
  git add -A -f
  git commit -m "docs(storybook): $USER updated '$TARGET_URL'" --no-verify
  git fetch origin gh-pages
  git rebase origin/gh-pages
  git push -f origin gh-pages
fi
