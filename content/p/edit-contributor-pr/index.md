---
title: Editing a Contributor’s Pull Request When They’re Unresponsive
description: How I handle unresponsive pull requests by pushing fixes directly to the contributor’s branch and merging cleanly without duplicating PRs.
pubDate: 2026-01-03
categories: ["git", "github"]
---

Sometimes you receive a pull request that’s *almost perfect*. The idea is solid, the implementation is good; but it needs a few tweaks.
You request changes… and then the author goes silent.

Instead of letting a good PR stall, you can push fixes **directly to the contributor’s PR branch** (when permissions allow) and merge it while co-authoring the work.

Here’s the workflow I personally use.

---

## The Problem

- A contributor opens a PR from their fork
- The PR needs minor fixes or improvements
- The author is unresponsive
- You want to merge it **without recreating the PR**

---

## The Approach

The idea is straightforward:

1. Add the contributor’s fork as a remote
2. Fetch their branch
3. Check out their PR branch locally
4. Make changes
5. Push **back to the contributor’s branch**

GitHub will automatically update the existing PR.

---

## Step-by-Step

### 1. Add the contributor’s fork as a remote

```bash
git remote add contributor https://github.com/username/repo.git
```

You only need to do this once.

### 2. Fetch the contributor’s branches

```bash
git fetch contributor
```

### 3. Check out the PR branch locally

Assuming the PR branch is called `feature-x`:

```bash
git checkout -b feature-x contributor/feature-x
```

Now you’re working directly on the PR’s branch.

### 4. Make your changes

Fix bugs, clean up code, update docs; whatever is needed.

```bash
git commit -am "Fix edge cases and improve handling"
```

### 5. Push back to the contributor’s branch

```bash
git push contributor feature-x
```

This updates the existing pull request automatically.

## Merging the PR

Once pushed:

- The PR reflects your commits
- GitHub will list you as a **co-author**
- You can merge normally

I usually leave a comment explaining what was changed and why, especially if the author is inactive.

---

## Why This Works Well

- [x] No duplicate PRs
- [x] Original PR stays intact
- [x] Clean history with shared credit
- [x] Faster merges without waiting indefinitely

---

## Final Thoughts

Maintaining momentum matters. When contributors go quiet but their work is solid,
this approach lets you move forward **respectfully and transparently**, while still crediting their contribution.

Just make sure you only do this when:
- The changes are clearly beneficial
- The contributor hasn’t responded after reasonable time
- You’re comfortable taking responsibility for the final result
