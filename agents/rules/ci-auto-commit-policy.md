## Auto-Commit at Sprint Closure

**Impact: MEDIUM**

For this repo specifically, Claude may commit automatically when a self-contained
unit of work (a sprint slice, a bugfix, a wiring task) is complete and verified —
without waiting for an explicit "commit this" instruction. This overrides the
general default of only committing when explicitly asked, but **only for commit**.

**"Complete and verified" means all of:**
- The specific typecheck for the packages touched passes (`tsc --noEmit`).
- Any existing tests for the touched files pass.
- `biome check` ran on the touched files (auto-fix applied where safe).
- The working tree diff was reviewed (`git status` / `git diff --stat`) and
  contains only files intentionally touched — nothing that belongs to another
  in-progress session's uncommitted work, and no leaked `/export` files.

**What stays manual, always:**
- `git push` — never push without explicit authorization in that turn.
- Force-push, `git reset --hard`, branch deletion, rewriting existing commits —
  unchanged from the general safety rules.
- Anything touching secrets, credentials, or `.env` files.

**Commit message standard:** same as always — explain *why*, not just *what*,
and call out any pre-existing bugs fixed incidentally along the way (see the
`14301649e3` commit for the expected level of detail).

**Why:** verified in conversation with the repo owner (2026-07-12) — the risk
being managed is losing control over *when things reach the push/deploy path*,
not over local commit history, which is cheap to inspect and amend. Push stays
the actual gate.

**Incorrect (waiting for explicit commit instruction on every slice):**

```
[implementation done, tests pass, tsc clean]
assistant: "Work is complete and verified. Want me to commit?"
```

**Correct (commit automatically once verified, still ask before push):**

```
[implementation done, tests pass, tsc clean, diff reviewed]
assistant: [commits with descriptive message]
assistant: "Committed as <hash>. Push to `deploy`?"
```
