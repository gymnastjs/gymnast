
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
USER=${CIRCLE_USERNAME:-$DEFAULT_USERNAME}
BRANCH=${CIRCLE_BRANCH:-$DEFAULT_BRANCH}

if [ "$CIRCLE_BRANCH" = 'master' ]; then
  TARGET_PATH='.'
else
  TARGET_PATH="./branch/$BRANCH"
fi

# Set git user
git config user.email "$USER@flexgrid.ci" && git config user.name "FlexGrid CI ($BRANCH)"

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
git add -A -f
git commit -m "Publish StoryBook to '$TARGET_PATH'" --no-verify
git push origin gh-pages
