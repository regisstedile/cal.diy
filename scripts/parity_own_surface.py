#!/usr/bin/env python3
"""Own API-surface regression gate: fork vs its own last snapshot.

Unlike parity_procedures.py (fork vs REF enterprise — deliberately allowed to
diverge, see docs/cal-fork/GAP-2026-07-11.md), this script protects the fork's
OWN custom tRPC API surface from silently losing a procedure. Diffing against
REF would fight the architectural decision to not chase REF ports; diffing
against our own last snapshot catches actual regressions instead.

Usage:
    python3 scripts/parity_own_surface.py            # check (default, exit 1 on regression)
    python3 scripts/parity_own_surface.py --update    # write new baseline after an
                                                       # intentional removal (or first run)

Snapshot: docs/cal-fork/API-SURFACE-SNAPSHOT.json
"""

import json
import os
import re
import sys
from datetime import date

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIEWER = "packages/trpc/server/routers/viewer"
SNAPSHOT_PATH = os.path.join(REPO, "docs/cal-fork/API-SURFACE-SNAPSHOT.json")

PROC_RE = re.compile(
    r"^\s*([A-Za-z_]\w*)\s*:\s*"
    r"(?:\w*[Aa]uthed\w*Procedure|publicProcedure|importHandler\(|"
    r"\w*[Pp]rocedure\b|router\()",
)
NESTED_RE = re.compile(r"^\s*([A-Za-z_]\w*)\s*:\s*router\(")
TEST_MARKERS = (".test.", ".spec.", "__tests__", "/test/")


def extract_procs(sub):
    """Return set of 'sub.proc' / 'sub.nested.proc' names for one viewer sub-router."""
    root = os.path.join(REPO, VIEWER, sub)
    procs = set()
    if not os.path.isdir(root):
        return procs
    for dirpath, _dirs, files in os.walk(root):
        for f in files:
            if not f.endswith((".ts", ".tsx")) or any(m in f for m in TEST_MARKERS):
                continue
            path = os.path.join(dirpath, f)
            try:
                text = open(path, encoding="utf-8", errors="replace").read()
            except OSError:
                continue
            if "router({" not in text and "router( {" not in text:
                continue
            nested_prefix = None
            depth_at_nested = None
            depth = 0
            for line in text.splitlines():
                m_nested = NESTED_RE.match(line)
                m_proc = PROC_RE.match(line)
                if m_nested and nested_prefix is None:
                    nested_prefix = m_nested.group(1)
                    depth_at_nested = depth
                elif m_proc:
                    name = m_proc.group(1)
                    if nested_prefix and name != nested_prefix:
                        procs.add(f"{sub}.{nested_prefix}.{name}")
                    else:
                        procs.add(f"{sub}.{name}")
                depth += line.count("{") - line.count("}")
                if nested_prefix is not None and depth <= (depth_at_nested or 0):
                    nested_prefix = None
    # drop nested router keys counted as plain procs too
    nested_parents = {p.rsplit(".", 1)[0] for p in procs if p.count(".") >= 2}
    procs -= nested_parents
    return procs


def current_surface():
    subs = sorted(
        d for d in os.listdir(os.path.join(REPO, VIEWER))
        if os.path.isdir(os.path.join(REPO, VIEWER, d))
    )
    all_procs = set()
    for sub in subs:
        all_procs |= extract_procs(sub)
    return all_procs


def load_snapshot():
    if not os.path.exists(SNAPSHOT_PATH):
        return None
    with open(SNAPSHOT_PATH) as fh:
        data = json.load(fh)
    return set(data.get("procedures", []))


def write_snapshot(procs):
    data = {
        "generated": date.today().isoformat(),
        "count": len(procs),
        "procedures": sorted(procs),
    }
    with open(SNAPSHOT_PATH, "w") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)
        fh.write("\n")


def main():
    update = "--update" in sys.argv
    current = current_surface()

    if update:
        write_snapshot(current)
        print(f"snapshot atualizado: {len(current)} procedures em {SNAPSHOT_PATH}")
        return

    baseline = load_snapshot()
    if baseline is None:
        print(f"sem snapshot ainda — rode com --update primeiro pra criar {SNAPSHOT_PATH}")
        sys.exit(1)

    removed = sorted(baseline - current)
    added = sorted(current - baseline)

    if removed:
        print(f"REGRESSAO: {len(removed)} procedure(s) sumiram da API do fork:")
        for name in removed:
            print(f"  - {name}")
        print()
        print("Se a remocao foi intencional: python3 scripts/parity_own_surface.py --update")
        sys.exit(1)

    if added:
        print(f"OK — {len(added)} procedure(s) nova(s), sem regressao:")
        for name in added:
            print(f"  + {name}")
    else:
        print(f"OK — {len(current)} procedures, sem mudanca de superficie.")


if __name__ == "__main__":
    main()
