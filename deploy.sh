#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m "Deploy Commit"
git push -f git@github.com:DavidAM-JS/github-user-search.git master:gh-pages

cd -
