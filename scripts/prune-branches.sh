#!/usr/bin/env bash
# Manual opt-in only. Refresh refs; delete only ancestors of current origin/main.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
git fetch --prune origin
while IFS= read -r ref; do
  branch=${ref#refs/remotes/origin/}
  case "$branch" in main|HEAD) continue ;; esac
  tip=$(git rev-parse "$ref")
  if git merge-base --is-ancestor "$tip" refs/remotes/origin/main; then
    printf 'Deleting safe branch %s (%s)\n' "$branch" "$tip"
    # Lease prevents deleting a branch that acquired work since fetch.
    git push --force-with-lease="refs/heads/$branch:$tip" origin ":refs/heads/$branch"
  else
    printf 'Keeping branch with unique work: %s\n' "$branch"
  fi
done < <(git for-each-ref --format='%(refname)' refs/remotes/origin/)
