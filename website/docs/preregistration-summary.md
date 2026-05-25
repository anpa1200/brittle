---
status: "LOCKED"
last_updated: "2026-05-25"
---

# Preregistration Summary

This document summarizes the locked [Protocol](./protocol). The canonical protocol is locked at `v1.0.0`; this summary is a convenience aid and must not override the canonical protocol.

## Project Title

BrittleBench: A Defender's Audit of Public Detection Content Robustness

## Research Purpose

BrittleBench studies how robust publicly published detection rules are when evaluated against validated functionally equivalent mutations of the behaviors or artifacts those rules are intended to detect. The purpose is to measure robustness distributions, identify recurring brittleness patterns, and provide a reusable defender-oriented benchmark methodology.

## Confirmatory Phase 1 Scope

Confirmatory Phase 1 is limited to:

- Native YARA rules evaluated with pinned YARA tooling.
- Native Elastic detection rules evaluated in a pinned self-managed Elastic/Kibana harness.
- Sigma rules translated to Elastic only when translation is high-fidelity and field mappings are explicit.

Splunk SPL, Sentinel KQL, Chronicle YARA-L, Snort, Suricata, Falco, Wazuh, YARA-to-EQL, and YARA-L conversions are exploratory or future scope unless admitted by a later locked amendment.

## Research Questions

- RQ1: Among sampled public detection rules that detect an original ground-truth behavior or artifact, how robust are those rules against validated functionally equivalent mutations?
- RQ2: How does robustness vary across native YARA, native Elastic, and high-fidelity Sigma-to-Elastic rules, with between-family comparisons treated as exploratory and confirmatory interpretation limited to within-family contrasts?
- RQ3: How does robustness differ across public detection repositories after controlling for format, rule age, attack category, and other planned controls?
- RQ4: Which observable rule characteristics are associated with lower robustness?
- RQ5: Which mutation classes produce the largest bypass rates?
- RQ6: How is rule age or maintenance recency associated with robustness?

## Hypotheses

The protocol defines one hypothesis and one null hypothesis per research question in [Protocol Section 3](./protocol#3-hypotheses-phase-r3). The default minimum practical robustness-score difference is `0.10`.

## Sampling Plan

The corpus snapshot cutoff is `2026-05-25`. Phase 1 uses a stratified eligible-corpus design. Candidate rules must pass source provenance, parser validity, deduplication, evaluator readiness, original-positive validation, and mutation eligibility gates.

Planning targets:

- At least `300` eligible rules total where the corpus supports it.
- At least `75` eligible rules per major confirmatory stratum where available.
- At least `10` validated functionally equivalent mutations per scored rule.
- Fixed mutation-class profile of `2` mutations from each of `5` predeclared mutation classes where applicable.
- Mandatory pre-lock feasibility pilot of `20` to `30` rules across all three confirmatory families, with downscoping required if projected eligible rules are below `200`.

## Variables

Primary independent variables include rule family, source repository, rule age, maintenance recency, attack category, detection-logic type, controlled mutation-class profile, rule complexity, translation status, and LLM provider/model metadata.

Primary dependent variable:

- Rule-level robustness score `RS(r)`, defined as the fraction of validated functionally equivalent mutations detected after the rule detects the original positive example.

Secondary dependent variables include rule-mutation detection outcome, bypass rate, mutation eligibility count, brittleness-pattern frequency, evaluator failure rate, and translation failure rate.

## Validation Gates

A true bypass requires:

1. Source, parser, deduplication, evaluator-readiness, and original-positive gates pass.
2. The mutation passes functional-equivalence review.
3. The evaluator executes without infrastructure failure.
4. The rule does not fire on the mutation under the same evaluator configuration.

Evaluator failures, translation failures, unsupported semantics, and invalid mutations are reported separately from true bypasses.

## Statistical Plan

The analysis reports medians, empirical distributions, bootstrap confidence intervals, quasi-binomial GLM with logit link for bounded rule-level robustness scores, and mixed-effects logistic regression with rule-level random intercepts where rule-mutation pairs are analyzed. Fractional logit and beta regression are sensitivity analyses. H1 is interpreted without multiplicity correction. H2-H6 use Benjamini-Hochberg false-discovery-rate correction at `alpha = 0.05`, with within-hypothesis contrast sub-families corrected separately. Exploratory analyses are labeled separately.

## Reviewer and LLM Validation

Before main execution, the study requires a reviewer-drift pilot on a labeled reference set and independent second review for at least `300` mutation-review decisions, with Cohen's kappa reported. If no independent reviewer is available, confirmatory N must be downscoped and the remainder labeled exploratory.

The LLM mutation generator must achieve at least `70%` validity on a labeled pilot set. Validity below `60%` triggers protocol falsification/downscoping. Prompts and responses are cached using content-addressable storage with hashes published where raw content cannot be released.

## Falsification Criteria

The benchmark claim must be abandoned or downgraded if the final eligible corpus, mutation eligibility, evaluator repeatability, Sigma translation fidelity, auditability, or ethics checks fail the thresholds in [Protocol Section 9.3](./protocol#93-falsification-criteria).

## Ethics and Release Boundaries

Public release may include sanitized metadata, aggregate findings, reproducibility manifests, outcome tables, and non-operational examples. Restricted artifacts include raw malware samples, raw bypass mutations, per-rule evasion recipes, operational command lines, exploit strings, credentials, infrastructure indicators, or material restricted by law, license, or responsible-research policy.

The project does not generate or publish novel attack techniques and does not publish shame-oriented rankings of individual authors or rules.

## Preregistration Status

GitHub release timestamp:

[GitHub release v1.0.0-protocol-lock](https://github.com/anpa1200/brittle/releases/tag/v1.0.0-protocol-lock)

This release is the public timestamped protocol-lock record for Phase 1. A later OSF registration may mirror the same locked protocol, but must not change the locked methodology without a new major protocol version.
