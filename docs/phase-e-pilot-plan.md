---
status: "ACTIVE"
last_updated: "2026-05-25"
---

# Phase E Pilot Plan

This document turns the locked protocol into the first execution step. It does not change [../PROTOCOL.md](../PROTOCOL.md); it operationalizes the mandatory feasibility pilot required by Sections 5.1, 5.2, 5.7, 5.8, and 9.3.

## Purpose

Run `20` to `30` rules end-to-end across confirmatory Phase 1 families to estimate feasibility before full execution.

The pilot must produce:

- Attrition estimates for each corpus funnel stage.
- Reviewer time per rule and projected total effort.
- Mutation-validity rate.
- Evaluator failure rate.
- Taxonomy `No pattern assigned` rate.
- Evidence that the locked mutation-class profile can produce `10` validated mutations per rule.

Pilot robustness outcomes are feasibility data only. They must not be used as confirmatory findings.

## Pilot Sample

Target composition:

| Family | Target pilot rules | Purpose |
|--------|--------------------|---------|
| Native YARA | 8-10 | Exercise file-content parsing, compile validation, and YARA mutation classes. |
| Native Elastic | 8-10 | Exercise Elastic/Kibana import, ECS event positives, and event-rule mutation classes. |
| Sigma-to-Elastic | 8-10 | Exercise pySigma translation fidelity, ECS mapping, and translated-rule validation. |

If one family cannot supply enough pilot candidates quickly, record the gap and keep the total pilot size within `20` to `30` rules.

## Funnel Metrics

Record counts at each stage:

| Stage | Required output |
|-------|-----------------|
| Collected | Candidate rules identified from locked source inventory. |
| Parsed | Rules successfully parsed or compiled into normalized records. |
| Deduplicated | Duplicate/derived rules removed or linked. |
| Evaluator-compatible | Rules compile/import/translate under the selected evaluator. |
| Original-positive validated | Rule detects the original ground-truth positive example. |
| Mutation-eligible | Rule has at least `10` validated mutations from the fixed profile. |

## Required Pilot Artifacts

Create or update these artifacts during the pilot:

- `corpus/pilot-source-manifest.csv`
- `corpus/pilot-funnel.csv`
- `corpus/pilot-rule-metadata.csv`
- `evaluators/pilot-environment.md`
- `mutations/pilot-mutation-profile.md`
- `mutations/pilot-review-log.csv`
- `results/pilot-feasibility-report.md`
- `results/pilot-time-projection.md`

Raw unsafe artifacts, raw LLM prompts/responses, and direct bypass strings must not be committed.

## Stop/Revise Triggers

The pilot must raise a decision before full execution if any locked falsification trigger is likely:

- Projected eligible rules from realistic collection are below `200`.
- LLM mutation validity is below `60%`.
- More than `20%` of true bypasses receive `No pattern assigned`.
- Reviewer time projection exceeds the available execution budget: target `6` months, hard ceiling `9` months.
- Detection-logic type inter-rater kappa remains below `0.6` after coding-guide revision.

## Immediate Task Order

1. Confirm source manifests and local snapshots for YARA, Elastic, and Sigma.
2. Select 8-10 candidate rules per family without looking at mutation outcomes.
3. Build `corpus/pilot-source-manifest.csv` and `corpus/pilot-rule-metadata.csv`.
4. Define pilot environment details in `evaluators/pilot-environment.md`.
5. Acquire or construct original-positive examples for the pilot candidates.
6. Run original-positive validation.
7. Generate and review pilot mutations according to the locked class profiles.
8. Evaluate mutations and write the feasibility report.

## GitHub Tracking

Primary issue: E1-001 for execution directory creation.

Follow-on issues:

- E1-002 for source snapshot and manifest work.
- E1-003 for pilot metadata table.
- E2-001 and E2-002 for ground-truth policy and positive examples.
- E3-001 through E3-003 for LLM selection, mutation generation, and functional-equivalence review.
- E4-001 through E4-003 for evaluator harness and pilot evaluation.
