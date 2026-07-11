#!/usr/bin/env python3
"""Parity report: fork vs REF enterprise, per functional module.

Generates docs/cal-fork/PARITY.md. Re-run any time:

    python3 scripts/parity_report.py

Method: for each module, list REF's .ts/.tsx files (tests excluded) under the
module's path prefixes and check which exist in the fork at the same path.
File presence is a PROXY for parity — a fork reimplementation under a
different path counts as "missing" even when the feature works (e.g. the
fork's custom teams router). Those cases are annotated manually in NOTES.
Modules marked scope="ignored" are excluded from the overall score by
deliberate owner decision (ALLGED scope).
"""

import os
import sys
from datetime import date

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(REPO, "docs/cal-fork/cal-diy-opensource/cal-diy-opensource")

# module -> (scope, [path prefixes], manual note)
# scope: core = counts toward overall parity; ignored = owner decision, excluded
MODULES = {
    "Bookings": ("core", [
        "packages/features/bookings",
        "packages/trpc/server/routers/viewer/bookings",
        "apps/web/modules/bookings",
    ], ""),
    "Event Types": ("core", [
        "packages/features/eventtypes",
        "packages/trpc/server/routers/viewer/eventTypes",
        "apps/web/modules/event-types",
    ], ""),
    "Availability/Slots": ("core", [
        "packages/features/availability",
        "packages/features/schedules",
        "packages/trpc/server/routers/viewer/availability",
        "packages/trpc/server/routers/viewer/slots",
        "apps/web/modules/availability",
    ], ""),
    "Routing Forms": ("core", [
        "packages/app-store/routing-forms",
        "packages/features/routing-trace",
        "packages/trpc/server/routers/viewer/routing-forms",
    ], "@ts-nocheck zerado 2026-07-11; débito REF quitado 07-08"),
    "Insights": ("core", [
        "packages/features/insights",
        "packages/trpc/server/routers/viewer/insights",
        "apps/web/modules/insights",
    ], ""),
    "Workflows": ("core", [
        "packages/features/ee/workflows",
        "packages/trpc/server/routers/viewer/workflows",
        "apps/web/modules/ee/workflows",
    ], ""),
    "Teams": ("core", [
        "packages/features/ee/teams",
        "packages/trpc/server/routers/viewer/teams",
        "apps/web/modules/ee/teams",
        "apps/web/modules/settings/teams",
    ], "fork tem router custom (1 arquivo cobre CRUD; arquivos REF contam como ausentes) — paridade FUNCIONAL maior que a numérica"),
    "Organizations": ("core", [
        "packages/features/ee/organizations",
        "packages/features/organizations",
        "packages/trpc/server/routers/viewer/organizations",
        "apps/web/modules/ee/organizations",
    ], "idem Teams: CRUD custom no fork; wizard/onboarding ausentes de verdade"),
    "Auth/SSO/DSync": ("core", [
        "packages/features/ee/sso",
        "packages/features/ee/dsync",
        "packages/trpc/server/routers/viewer/sso",
        "packages/trpc/server/routers/viewer/dsync",
        "apps/web/modules/ee/sso",
        "apps/web/modules/ee/dsync",
    ], ""),
    "PBAC/Attributes": ("core", [
        "packages/features/pbac",
        "packages/features/attributes",
        "packages/trpc/server/routers/viewer/pbac",
        "packages/trpc/server/routers/viewer/attributes",
    ], ""),
    "Admin": ("core", [
        "packages/trpc/server/routers/viewer/admin",
        "apps/web/app/(use-page-wrapper)/settings/(admin-layout)",
    ], "playground/workspace-platforms dentro deste número são candidatos a ignorar"),
    "Payments (Stripe checkout)": ("core", [
        "packages/features/ee/payments",
        "packages/trpc/server/routers/viewer/payments",
    ], ""),
    # ---- fora do escopo ALLGED (decisão do dono registrada no GAP-2026-07-11) ----
    "Billing SaaS/seats": ("ignored", [
        "packages/features/ee/billing",
        "packages/trpc/server/routers/viewer/credits",
        "apps/web/modules/billing",
    ], "cobrança por assento p/ vender SaaS — não se aplica"),
    "AI Phone (Cal AI)": ("ignored", [
        "packages/features/calAIPhone",
        "packages/trpc/server/routers/viewer/aiVoiceAgent",
        "packages/trpc/server/routers/viewer/phoneNumber",
    ], "depende de Retell/telefonia paga"),
    "SCIM/attr-sync": ("ignored", [
        "packages/features/ee/integration-attribute-sync",
        "packages/trpc/server/routers/viewer/attribute-sync",
    ], "só com IdP corporativo"),
    "Platform/OAuth clients": ("ignored", [
        "apps/web/app/(use-page-wrapper)/settings/platform",
        "apps/web/app/(use-page-wrapper)/auth/platform",
    ], "produto Platform da Cal.com"),
}

TEST_MARKERS = (".test.", ".spec.", "__tests__", "/test/", "playwright")


def list_files(base, prefix):
    root = os.path.join(base, prefix)
    out = []
    for dirpath, _dirs, files in os.walk(root):
        for f in files:
            if not f.endswith((".ts", ".tsx")):
                continue
            full = os.path.join(dirpath, f)
            rel = os.path.relpath(full, base)
            if any(m in rel for m in TEST_MARKERS):
                continue
            out.append(rel)
    return out


def bar(pct, width=20):
    filled = round(pct / 100 * width)
    return "█" * filled + "░" * (width - filled)


def main():
    if not os.path.isdir(REF):
        sys.exit(f"REF não encontrado: {REF}")

    rows, core_total, core_present = [], 0, 0
    for name, (scope, prefixes, note) in MODULES.items():
        ref_files = []
        for p in prefixes:
            ref_files.extend(list_files(REF, p))
        ref_files = sorted(set(ref_files))
        present = [f for f in ref_files if os.path.exists(os.path.join(REPO, f))]
        total, have = len(ref_files), len(present)
        pct = 100.0 * have / total if total else 100.0
        if scope == "core":
            core_total += total
            core_present += have
        rows.append((name, scope, have, total, pct, note))

    overall = 100.0 * core_present / core_total if core_total else 0.0
    today = date.today().isoformat()

    lines = [
        "# Dashboard de Paridade — fork cal.diy vs REF enterprise",
        "",
        f"**Gerado:** {today} por `scripts/parity_report.py` (re-rode para atualizar; não edite os números na mão).",
        "",
        "Método: presença de arquivo .ts/.tsx (sem testes) do REF no fork, por módulo.",
        "É PROXY — reimplementação custom do fork em outro path conta como ausente;",
        "esses casos estão anotados. Módulos IGNORADOS = decisão do dono (escopo ALLGED),",
        "fora da média geral.",
        "",
        "```",
        "Enterprise → Fork (escopo ALLGED)",
        "─────────────────────────────────────────────",
    ]
    for name, scope, have, total, pct, _note in sorted(
        rows, key=lambda r: (r[1] != "core", -r[4])
    ):
        if scope == "ignored":
            lines.append(f"{name:<28} IGNORADO (decisão)")
        else:
            lines.append(f"{name:<28} {bar(pct)} {pct:5.1f}%  ({have}/{total})")
    lines += [
        "─────────────────────────────────────────────",
        f"{'PARIDADE GERAL (escopo ALLGED)':<28} {bar(overall)} {overall:5.1f}%  ({core_present}/{core_total})",
        "```",
        "",
        "## Gap Matrix",
        "",
        "| Módulo | Escopo | Arquivos | Paridade | Nota |",
        "|---|---|---|---|---|",
    ]
    for name, scope, have, total, pct, note in sorted(
        rows, key=lambda r: (r[1] != "core", -r[4])
    ):
        if scope == "ignored":
            lines.append(f"| {name} | ❌ IGNORADO | — ({total} no REF) | — | {note} |")
        else:
            flag = "✅" if pct >= 99 else ("⚠️" if pct >= 60 else "🔴")
            lines.append(f"| {name} | {flag} core | {have}/{total} | {pct:.1f}% | {note} |")
    lines += [
        "",
        "## Leitura",
        "",
        "- **✅ ≥99%** paridade de arquivos praticamente total.",
        "- **⚠️ 60–99%** parcial — ver nota; parte pode ser reimplementação custom funcional.",
        "- **🔴 <60%** gap real; priorizar OU reclassificar como ignorado.",
        "- Decisões de escopo e plano de sprints: `GAP-2026-07-11.md`.",
        "",
    ]

    out = os.path.join(REPO, "docs/cal-fork/PARITY.md")
    with open(out, "w") as fh:
        fh.write("\n".join(lines))
    print(f"escrito: {out}")
    print(f"paridade geral (escopo ALLGED): {overall:.1f}% ({core_present}/{core_total})")


if __name__ == "__main__":
    main()
