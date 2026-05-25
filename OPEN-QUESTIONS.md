# Open Questions Log

> **Cross-cutting log C3.** Questions that arise during the research protocol phase but cannot be resolved until later phases are logged here instead of being answered prematurely. Premature resolution of open questions with insufficient evidence is a major source of methodological error.
>
> Related: [DECISIONS.md](DECISIONS.md) (resolved decisions) | [PROTOCOL.md](PROTOCOL.md) (sections that depend on these resolutions)

---

## Format

```
### OQ-XXXX — Short title

| Field | Value |
|-------|-------|
| ID | OQ-XXXX |
| Date opened | YYYY-MM-DD |
| Status | OPEN / RESOLVED / DEFERRED-INDEFINITELY |
| Resolved in | DEC-XXXX (if resolved) |
| Target phase | RX.Y or EX |

**Question:** The question in full.

**Why deferred:** Why this cannot be answered now and what evidence or work is needed to answer it.

**Stakes:** What this question's answer affects downstream (which PROTOCOL.md sections, which design choices).

**Resolution (if any):** Leave blank until resolved; then link to DECISIONS.md entry.
```

---

## Open Questions

---

### OQ-0001 — LLM provider selection for mutation generation

| Field | Value |
|-------|-------|
| ID | OQ-0001 |
| Date opened | 2026-05-24 |
| Status | OPEN |
| Resolved in | — |
| Target phase | R5.1 / E3 |

**Question:** Which LLM provider(s) should be used for mutation generation? What is the right trade-off between cost, refusal rate on security-adjacent prompts, output quality, and API reproducibility?

**Why deferred:** Requires empirical pilot testing across candidate providers (OpenAI, Anthropic, open-weights models) with representative prompts. Cannot be decided from specifications alone — refusal rates on mutation prompts are empirical, not advertised.

**Stakes:** Drives the majority of the budget (see [COSTS.md](COSTS.md)). Affects external validity (results may vary across providers). Must be documented in the methods section. See also PROTOCOL.md §5.1 and §5.3.

**Resolution:** —

---

### OQ-0002 — Rules with no obtainable ground-truth sample

| Field | Value |
|-------|-------|
| ID | OQ-0002 |
| Date opened | 2026-05-24 |
| Status | RESOLVED |
| Resolved in | DEC-0006 |
| Target phase | E2 |

**Question:** How should the study handle detection rules for which a ground-truth positive sample (i.e., an artifact that triggers the rule) cannot be obtained — for example, rules targeting proprietary malware families, nation-state tooling, or deprecated infrastructure?

**Why deferred:** Requires understanding the corpus composition after E1 (corpus collection) to know the scale of this problem. Several options exist (exclude from robustness scoring, apply a special "untestable" label, impute, use synthetic samples) and the right choice depends on frequency.

**Stakes:** Directly affects the denominator of the robustness score (PROTOCOL.md §4.3). If a large fraction of rules are untestable, the score's validity and the study's external validity are weakened.

**Resolution:** Rules without an obtainable ground-truth-positive example are excluded from confirmatory robustness scoring and reported in the coverage funnel. The execution phase still measures how often this exclusion occurs.

---

### OQ-0003 — Vendor-published rules: include or exclude?

| Field | Value |
|-------|-------|
| ID | OQ-0003 |
| Date opened | 2026-05-24 |
| Status | RESOLVED |
| Resolved in | DEC-0006 |
| Target phase | R5.2 |

**Question:** Should the study corpus include vendor-published detection rules (e.g., CrowdStrike, Microsoft Sentinel built-ins, Palo Alto) in addition to community-published rules (SigmaHQ, Elastic, Splunk ES Content)?

**Why deferred:** Vendor rules raise access, licensing, and attribution complexity. Including them would strengthen generalizability but may require legal review and complicates disclosure (§8.2). Requires a deliberate decision about scope, not a default.

**Stakes:** Determines the corpus sampling frame (PROTOCOL.md §5.2) and the generalizability claim in the paper. If excluded, the paper must be explicit about the community-only scope.

**Resolution:** Phase 1 includes public, citable vendor-published rules only when they are part of the native Elastic or high-fidelity Sigma-to-Elastic confirmatory scope. Closed, managed-service-only, paid-only, or private vendor rule sets are excluded.

---

### OQ-0004 — Corpus snapshot cutoff date

| Field | Value |
|-------|-------|
| ID | OQ-0004 |
| Date opened | 2026-05-24 |
| Status | RESOLVED |
| Resolved in | DEC-0006 |
| Target phase | R5.2 / E1 |

**Question:** What date should be used as the corpus snapshot cutoff? Public detection repositories are continuously updated; any date chosen will be stale by the time the paper is published.

**Why deferred:** The cutoff date is a methodological commitment that must be made once, recorded in the protocol, and held constant throughout the study. The right choice balances recency (more rules, more current threat landscape) against stability (rules change during multi-month study). Needs to be set no later than the start of Phase E1.

**Stakes:** Affects corpus size, rule maturity analysis, reproducibility, and the temporal scope of the generalizability claim.

**Resolution:** The Phase 1 corpus snapshot cutoff is `2026-05-25`. Later upstream changes are excluded from confirmatory Phase 1 unless the protocol is amended before lock.

---

### OQ-0005 — Inter-rater reliability protocol for manual mutation review

| Field | Value |
|-------|-------|
| ID | OQ-0005 |
| Date opened | 2026-05-24 |
| Status | RESOLVED |
| Resolved in | DEC-0006 |
| Target phase | R5.7 |

**Question:** What inter-rater reliability (IRR) protocol should be used for the manual review step that validates functional equivalence of LLM-generated mutations? How many raters, what background, what agreement metric, and what threshold constitutes acceptable reliability?

**Why deferred:** Solo-researcher constraint creates a structural problem here — independent raters require collaboration. Options include: recruiting volunteer reviewers from the security community, using a second LLM as a pseudo-rater, or applying a rule-based functional equivalence checker rather than human judgment. Each option has different validity implications. Requires a deliberate decision.

**Stakes:** Directly affects construct validity (PROTOCOL.md §6.4). IRR is often the weakest link in manual annotation studies. Must be decided before Phase E3.

**Resolution:** Section 5.7 now requires a coding guide, reviewer-drift pilot, and an independent second reviewer for at least `300` mutation-review decisions with Cohen's kappa reported. If no independent second reviewer can be recruited before lock, confirmatory N must be downscoped and the remainder labeled exploratory.
