
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
if [ "$CI" != true ] ; then
  echo "This script is only meant to run on CI. Set 'CI' global to true to override."
  exit 1
fi

# Ensure all required variables are defined
DEFAULT_USERNAME='[unknown user]'
DEFAULT_BRANCH='default'
BASE_URL='https://obartra.github.io/reflex'
USER=${CIRCLE_USERNAME:-$DEFAULT_USERNAME}
BRANCH=${CIRCLE_BRANCH:-$DEFAULT_BRANCH}

if [ "$CIRCLE_BRANCH" = 'master' ]; then
  TARGET_PATH='.'
  TARGET_URL=$BASE_URL
else
  TARGET_PATH="./branch/$BRANCH"
  TARGET_URL="$BASE_URL/branch/$BRANCH"
fi

# Set git user
git config user.email "$USER@reflex.ci" && git config user.name "Reflex CI ($BRANCH)"

# Build StoryBook in the `../temp` folder
./node_modules/.bin/build-storybook -c storybook -o "$PWD/../temp"

# Copy circle.yml to ensure last config is used
cp circle.yml ../temp
# Copy .gitignore to avoid commiting unnecessary files
cp .gitignore ../temp

# Switch to gh-pages branch
git reset --hard HEAD
git checkout -b gh-pages
git fetch origin gh-pages
git reset --hard origin/gh-pages
git clean -xdf

# Remove current content (except for branch folders)
if [ "$CIRCLE_BRANCH" = 'master' ]; then
  rm * & rm -rf static
else
  rm -rf $TARGET_PATH
  mkdir -p $TARGET_PATH
fi

# Copy prior content to a folder with the current branch name
mv ../temp/* $TARGET_PATH

# Cleanup temp folder
rm -rf ../temp

# Commit changes
if [ -z $(git status --porcelain) ];
then
  echo "Nothing to commit, everything is clean ✨"
else
  git add -A -f
  git commit -m "docs(storybook): $USER updated '$TARGET_URL'" --no-verify
  git push origin gh-pages
fi
