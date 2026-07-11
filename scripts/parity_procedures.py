#!/usr/bin/env python3
"""Procedure-level tRPC parity: fork vs REF enterprise.

Generates docs/cal-fork/PARITY-PROCEDURES.md. Re-run any time:

    python3 scripts/parity_procedures.py

Refines the file-presence proxy of parity_report.py: extracts the actual
procedure names each viewer sub-router exposes on BOTH sides and diffs them.
A fork custom reimplementation (one file, many procedures) is credited here.

Extraction is heuristic (regex over router files, no TS compiler):
- keys assigned a procedure builder:   name: authedProcedure/publicProcedure...
- lazy-loaded handlers (REF pattern):  name: importHandler("name", ...)
- nested routers:                      name: router({ ... }) -> recursed inline
It reads every .ts/.tsx inside the sub-router dir that contains `router({`.
Known limit: procedures spread via router mergers/spreads (`...otherRouter`)
are not followed — those show up as ABSENT here even when reachable. Check
manually before porting anything flagged missing.
"""

import os
import re
from datetime import date

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(REPO, "docs/cal-fork/cal-diy-opensource/cal-diy-opensource")
VIEWER = "packages/trpc/server/routers/viewer"

PROC_RE = re.compile(
    r"^\s*([A-Za-z_]\w*)\s*:\s*"
    r"(?:\w*[Aa]uthed\w*Procedure|publicProcedure|importHandler\(|"
    r"\w*[Pp]rocedure\b|router\()",
)
NESTED_RE = re.compile(r"^\s*([A-Za-z_]\w*)\s*:\s*router\(")
SPREAD_RE = re.compile(r"^\s*\.\.\.\s*(\w+)")

TEST_MARKERS = (".test.", ".spec.", "__tests__", "/test/")


def extract_procs(base, sub):
    """Return (set of 'proc' and 'nested.proc' names, set of spread markers)."""
    root = os.path.join(base, VIEWER, sub)
    procs, spreads = set(), set()
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
                m_spread = SPREAD_RE.match(line)
                if m_spread:
                    spreads.add(m_spread.group(1))
                if m_nested and nested_prefix is None:
                    nested_prefix = m_nested.group(1)
                    depth_at_nested = depth
                elif m_proc:
                    name = m_proc.group(1)
                    if nested_prefix and name != nested_prefix:
                        procs.add(f"{nested_prefix}.{name}")
                    else:
                        procs.add(name)
                depth += line.count("{") - line.count("}")
                if nested_prefix is not None and depth <= (depth_at_nested or 0):
                    nested_prefix = None
    # drop nested router keys counted as plain procs too
    nested_parents = {p.split(".")[0] for p in procs if "." in p}
    procs -= nested_parents
    return procs, spreads


def main():
    subs_ref = sorted(
        d for d in os.listdir(os.path.join(REF, VIEWER))
        if os.path.isdir(os.path.join(REF, VIEWER, d))
    )
    today = date.today().isoformat()
    lines = [
        "# Paridade de procedures tRPC — fork vs REF enterprise",
        "",
        f"**Gerado:** {today} por `scripts/parity_procedures.py` (heurística regex — "
        "conferir manualmente antes de portar; spreads `...router` não são seguidos).",
        "",
        "| Router | REF | Fork | Faltam no fork | Só no fork |",
        "|---|---|---|---|---|",
    ]
    detail = ["", "## Detalhe dos gaps", ""]
    tot_ref = tot_fork = tot_missing = 0
    for sub in subs_ref:
        ref_procs, _ = extract_procs(REF, sub)
        fork_procs, fork_spreads = extract_procs(REPO, sub)
        if not ref_procs and not fork_procs:
            continue
        missing = sorted(ref_procs - fork_procs)
        extra = sorted(fork_procs - ref_procs)
        tot_ref += len(ref_procs)
        tot_fork += len(fork_procs)
        tot_missing += len(missing)
        flag = "✅" if not missing else ("⚠️" if len(missing) <= len(ref_procs) / 2 else "🔴")
        spread_note = " (fork usa spread — conferir)" if fork_spreads else ""
        lines.append(
            f"| {flag} `{sub}` | {len(ref_procs)} | {len(fork_procs)}{spread_note} "
            f"| {len(missing)} | {len(extra)} |"
        )
        if missing or extra:
            detail.append(f"### `{sub}`")
            if missing:
                detail.append(f"- **Faltam ({len(missing)}):** " + ", ".join(f"`{m}`" for m in missing))
            if extra:
                detail.append(f"- **Só no fork ({len(extra)}):** " + ", ".join(f"`{e}`" for e in extra))
            detail.append("")
    lines.append(
        f"| **TOTAL** | **{tot_ref}** | **{tot_fork}** | **{tot_missing}** | — |"
    )
    lines += detail
    out = os.path.join(REPO, "docs/cal-fork/PARITY-PROCEDURES.md")
    with open(out, "w") as fh:
        fh.write("\n".join(lines) + "\n")
    print(f"escrito: {out}")
    print(f"procedures REF={tot_ref} fork={tot_fork} faltando={tot_missing}")


if __name__ == "__main__":
    main()
