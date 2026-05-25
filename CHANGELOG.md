# Protocol Change Log

> **Cross-cutting log C4.** All changes to PROTOCOL.md after it is locked (Section 9.1 = LOCKED) must be logged here with version, date, affected sections, and rationale. Changes before locking do not require a log entry — but significant pivots are worth noting for audit purposes.
>
> Related: [PROTOCOL.md](PROTOCOL.md) | [DECISIONS.md](DECISIONS.md)

---

## Format

```
## vX.Y.Z — YYYY-MM-DD

**Sections affected:** §X.Y, §X.Z
**Type:** Correction / Clarification / Scope change / Statistical revision / Other
**Rationale:** Why this change was necessary.
**Impact on pre-registration:** None / Minor (notation change) / Major (requires OSF amendment)
```

---

## Log

---

## v1.0.0 — 2026-05-25

**Sections affected:** §9.1, §9.2, §9.4
**Type:** Protocol lock / Public timestamp
**Rationale:** Locked the BrittleBench research protocol after final author review and recorded the GitHub release as the public timestamped protocol-lock artifact.
**Impact on pre-registration:** Major — this is the Phase 1 protocol lock. Post-lock methodology changes require a new major protocol version and logged DECISIONS.md and CHANGELOG.md entries.

---

## v0.2.2 — 2026-05-25

**Sections affected:** §4.4, §5.3, §5.7, §6.2, §6.5, §9.1, §9.3, §10
**Type:** Pre-lock cosmetic consistency polish
**Rationale:** Applied final M-series consistency edits without changing methodology: harmonized H2 and bounded-outcome modeling language, clarified mutation-class operational-definition freeze, added reviewer-drift minimums, added researcher allegiance and reproducibility-script notes, clarified pre-lock semantic-versioning language, and recorded v0.2.2 revision notes.
**Impact on pre-registration:** None — pre-registration not yet submitted and protocol remains UNLOCKED.

---

## v0.2.1 — 2026-05-25

**Sections affected:** §4.3, §4.4, §5.1, §5.2, §5.6, §5.7, §5.8, §6.5, §8.2, §8.6, §9.1, §9.3, §10
**Type:** Pre-lock clarification / Methodology polish
**Rationale:** Applied targeted lock-readiness edits: explicit second-reviewer checklist, per-family mutation-class profiles, labeled LLM pilot reference-set requirements, quasi-binomial primary modeling for discrete `RS(r)`, operational repository-effect stability rule, estimation-prior scenarios, restricted LLM cache handling, COI subsection, and revised time-projection falsification language.
**Impact on pre-registration:** None — pre-registration not yet submitted and protocol remains UNLOCKED.

---

## v0.2.0 — 2026-05-25

**Sections affected:** §1–§10, docs/research-plan.md, docs/threats-to-validity.md, docs/rule-source-inventory.md, docs/preregistration-summary.md
**Type:** Scope clarification / Methodology revision / Pre-lock review
**Rationale:** Revised the draft protocol to address pre-lock review findings: narrowed confirmatory Phase 1 scope to native YARA, native Elastic, and high-fidelity Sigma-to-Elastic rules; demoted between-family H2 comparisons to exploratory; added pre-lock funnel, reviewer-drift, and LLM-validity pilots; increased `n_min` to `10`; added fixed mutation-class profiles; strengthened statistical modeling, multiplicity, reviewer reliability, ethics, reproducibility, falsification criteria, and revision notes.
**Impact on pre-registration:** None — pre-registration not yet submitted and protocol remains UNLOCKED.

---

## v0.1.0 — 2026-05-24

**Sections affected:** All (initial creation)
**Type:** Initial scaffolding
**Rationale:** Project bootstrapped. All research content sections marked TO BE FILLED. Protocol is UNLOCKED. No pre-registration exists yet.
**Impact on pre-registration:** N/A — pre-registration not yet submitted.
