# GitHub Project Pipeline

This document defines the end-to-end GitHub task pipeline for BrittleBench. It is
intended to be copied into GitHub Issues, Milestones, and Projects after the
repository is published.

The pipeline preserves the research discipline established in
[PROTOCOL.md](PROTOCOL.md): no execution-phase code, corpus collection, mutation
generation, or analysis begins until PROTOCOL.md Section 9.1 reads `LOCKED`.

## Project Board Setup

Recommended GitHub Project name:

`BrittleBench Research Protocol and Execution`

Recommended fields:

| Field | Type | Values |
|-------|------|--------|
| Status | Single select | Backlog, Ready, In Progress, Blocked, Review, Done |
| Phase | Single select | R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, E1, E2, E3, E4, A1, A2, A3, P1, P2, P3, P4 |
| Type | Single select | Research, Documentation, Decision, Open Question, Ethics, Reproducibility, Execution, Analysis, Publication |
| Priority | Single select | P0, P1, P2, P3 |
| Risk | Single select | Low, Medium, High |
| Locked? | Checkbox | Checked only when the relevant protocol section is locked |

Recommended views:

- `Roadmap` grouped by Phase.
- `Current Week` filtered to Status = Ready or In Progress.
- `Protocol Lock Readiness` filtered to phases R1-R9.
- `Open Questions` filtered to Type = Open Question.
- `Execution Blockers` filtered to Status = Blocked or Risk = High.
- `Publication Release` filtered to phases P1-P4.

## Labels

Recommended labels:

| Label | Purpose |
|-------|---------|
| `phase:R0` through `phase:P4` | Lifecycle phase |
| `type:research` | Research writing or review |
| `type:documentation` | Repo documentation |
| `type:decision` | Requires DECISIONS.md entry |
| `type:open-question` | Tracks OPEN-QUESTIONS.md item |
| `type:ethics` | Responsible research or disclosure task |
| `type:reproducibility` | Artifact, environment, or repeatability task |
| `type:execution` | Post-lock implementation or data task |
| `type:analysis` | Statistical or results-analysis task |
| `type:publication` | Paper, release, citation, DOI |
| `priority:P0` | Blocks protocol lock or publication |
| `priority:P1` | Important, should be completed this phase |
| `priority:P2` | Useful but not immediately blocking |
| `blocked` | Cannot proceed until dependency is resolved |
| `needs-decision` | Needs explicit DECISIONS.md entry |
| `needs-review` | Needs human review before close |

## Milestones

| Milestone | Target | Completion Criteria |
|-----------|--------|---------------------|
| R0 - Repository Scaffold | Week 0 | Skeleton docs exist; no execution directories exist |
| R1 - Problem Definition | Week 1 | PROTOCOL.md Section 1 complete |
| R2 - Research Questions | Week 2 | Primary and secondary RQs complete |
| R3 - Hypotheses | Week 2 | Hypotheses, nulls, effect-size expectations drafted |
| R4 - Definitions | Week 1-2 | Operational definitions complete |
| R5 - Methodology | Week 3 | Sampling, variables, stats, and power plan complete |
| R6 - Validation | Week 3 | Evidence and reliability strategy complete |
| R7 - Validity Threats | Week 4 | Short and long-form validity threats complete |
| R8 - Ethics | Week 4 | Responsible research plan complete |
| R9 - Protocol Lock | Week 4 | Protocol locked and pre-registration link recorded |
| E1 - Corpus Collection | Month 3 | Corpus snapshot archived and hashed |
| E2 - Ground Truth | Month 3 | Ground-truth acquisition policy executed |
| E3 - Mutation Generation | Month 4 | Mutation generation completed under locked protocol |
| E4 - Evaluation Pipeline | Month 4 | Evaluation outputs produced and smoke-tested |
| A1 - Data QA | Month 5 | Cleaned analysis dataset ready |
| A2 - Statistical Analysis | Month 5 | Confirmatory and exploratory analyses separated |
| A3 - Findings Draft | Month 5 | Paper draft includes findings and limitations |
| P1 - Internal Review | Month 6 | Reproducibility and ethics checks complete |
| P2 - External Review | Month 6 | Trusted review feedback addressed |
| P3 - Artifact Release | Month 6 | Dataset, code, and citation metadata released |
| P4 - Publication | Month 6 | Final publication package complete |

## Issue Template

Use this body for manually created GitHub issues:

```markdown
## Goal

Describe the task outcome.

## Scope

What is included and excluded.

## Dependencies

- Depends on: #
- Blocks: #

## Acceptance Criteria

- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Relevant docs updated
- [ ] DECISIONS.md updated if this makes or changes a methodological decision
- [ ] OPEN-QUESTIONS.md updated if this resolves or creates a deferred question

## Notes

Any context needed to complete the task.
```

## R0 - Repository Scaffold

### R0-001 - Verify Initial Repository Skeleton

Labels: `phase:R0`, `type:documentation`, `priority:P0`

Goal: Verify that all scaffold files exist and match the bootstrap requirements.

Acceptance criteria:

- [ ] README.md exists and describes current phase.
- [ ] PROTOCOL.md exists with Sections 1-9.
- [ ] Cross-cutting logs exist: DECISIONS.md, COSTS.md, OPEN-QUESTIONS.md, CHANGELOG.md, REPRODUCIBILITY.md.
- [ ] Supporting docs exist under docs/.
- [ ] CODE_OF_CONDUCT.md and SECURITY.md exist.
- [ ] No execution-phase directories exist.

### R0-002 - Make Initial Manual Commit

Labels: `phase:R0`, `type:documentation`, `priority:P0`

Goal: Commit the initial scaffold manually.

Acceptance criteria:

- [ ] Working tree reviewed.
- [ ] Commit created with message `chore: initial project scaffolding (Phase R0)`.
- [ ] Commit hash recorded in CHANGELOG.md if desired.

### R0-003 - Create Initial GitHub Release

Labels: `phase:R0`, `type:publication`, `type:reproducibility`, `priority:P1`

Goal: Create a reproducible starting point for the project.

Acceptance criteria:

- [ ] Tag `v0.0.1-scaffold` created.
- [ ] GitHub release created.
- [ ] Release notes state that this is protocol scaffolding only.

## R1 - Problem Definition

### R1-001 - Finalize Problem Statement

Labels: `phase:R1`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 1.1.

Acceptance criteria:

- [ ] Problem is stated in 1-3 paragraphs.
- [ ] Brittleness is described without overclaiming results.
- [ ] LLM-generated mutations are framed as a measurement tool, not as proof of novel attack capability.
- [ ] Section contains no fake numbers, sample sizes, or findings.

### R1-002 - Write Why This Matters

Labels: `phase:R1`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 1.2.

Acceptance criteria:

- [ ] Practical defender stakes are described.
- [ ] Harm from brittle public rules is explained.
- [ ] Motivation is grounded in observable detection-engineering realities.
- [ ] No unsupported empirical claims are introduced.

### R1-003 - Build Prior Work Survey

Labels: `phase:R1`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 1.3.

Acceptance criteria:

- [ ] At least 10 relevant works or primary sources identified.
- [ ] Coverage includes detection rule quality, LLM-assisted mutation or security generation, benchmark methodology, and public rule repositories.
- [ ] Each source has a short note explaining what it does and does not cover.
- [ ] Bibliographic references are stored in a consistent format.

### R1-004 - Define Study Gap

Labels: `phase:R1`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 1.4.

Acceptance criteria:

- [ ] Gap follows directly from prior work.
- [ ] Gap maps to the primary research question.
- [ ] Gap does not depend on results not yet collected.

### R1-005 - Define Scope Boundaries

Labels: `phase:R1`, `type:research`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 1.5.

Acceptance criteria:

- [ ] In-scope rule formats listed.
- [ ] Out-of-scope formats listed.
- [ ] In-scope repositories listed or criteria defined.
- [ ] Attack categories and threat model boundaries stated.
- [ ] DECISIONS.md updated for scope choices.

## R2 - Research Questions

### R2-001 - Draft Primary Research Question

Labels: `phase:R2`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 2.1.

Acceptance criteria:

- [ ] One primary empirical question is stated.
- [ ] Question is answerable from planned data.
- [ ] Question is falsifiable.
- [ ] Null or negative result would still be meaningful.

### R2-002 - Draft Secondary Research Questions

Labels: `phase:R2`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 2.2.

Acceptance criteria:

- [ ] 2-5 secondary RQs are stated.
- [ ] Each RQ is independently answerable.
- [ ] Each RQ maps to a planned hypothesis in Section 3.
- [ ] RQs do not expand scope beyond Section 1.5.

### R2-003 - Create Question Hierarchy

Labels: `phase:R2`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 2.3.

Acceptance criteria:

- [ ] Hierarchy table or diagram added.
- [ ] Secondary RQs visibly support the primary RQ.
- [ ] Exploratory questions are separated from confirmatory questions.

### R2-004 - Complete Falsifiability Check

Labels: `phase:R2`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 2.4.

Acceptance criteria:

- [ ] Null or negative outcome defined for every RQ.
- [ ] Each outcome remains publishable.
- [ ] Ambiguous or unfalsifiable wording removed.

## R3 - Hypotheses

### R3-001 - Write Directional Hypotheses

Labels: `phase:R3`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 3.1.

Acceptance criteria:

- [ ] One hypothesis per confirmatory RQ.
- [ ] Each hypothesis has plain-language form.
- [ ] Each hypothesis has formal statistical notation if applicable.
- [ ] Hypotheses are written before data collection.

### R3-002 - Write Null Hypotheses

Labels: `phase:R3`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 3.2.

Acceptance criteria:

- [ ] Null hypothesis exists for every directional hypothesis.
- [ ] Null form is explicit.
- [ ] Statistical comparisons match Section 5.7 plan.

### R3-003 - Define Expected Effect Sizes

Labels: `phase:R3`, `type:research`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 3.3.

Acceptance criteria:

- [ ] Expected effect-size range stated for each primary hypothesis.
- [ ] Justification source or reasoning documented.
- [ ] DECISIONS.md updated.
- [ ] Values are usable for power analysis in Section 5.8.

### R3-004 - List Pre-Registered Predictions

Labels: `phase:R3`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 3.4.

Acceptance criteria:

- [ ] Ranked predictions listed.
- [ ] Confirmatory predictions separated from exploratory analyses.
- [ ] Predictions are ready for public pre-registration.

## R4 - Definitions and Operationalization

### R4-001 - Define Detection Rule

Labels: `phase:R4`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 4.1 and docs/glossary.md entry.

Acceptance criteria:

- [ ] Inclusion criteria defined.
- [ ] Exclusion criteria defined.
- [ ] Format constraints specified.
- [ ] Glossary updated.

### R4-002 - Define Functional Equivalence

Labels: `phase:R4`, `type:research`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 4.2.

Acceptance criteria:

- [ ] Functional equivalence definition is operational.
- [ ] Verification approach is described.
- [ ] Edge cases are addressed.
- [ ] DECISIONS.md updated.
- [ ] Glossary updated.

### R4-003 - Define Robustness Score

Labels: `phase:R4`, `type:research`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 4.3.

Acceptance criteria:

- [ ] Numerator and denominator defined.
- [ ] Rule-level, rule-set-level, and repository-level score definitions provided.
- [ ] Handling of untestable rules references OQ-0002.
- [ ] DECISIONS.md updated.
- [ ] Glossary updated.

### R4-004 - Define Brittleness Pattern

Labels: `phase:R4`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 4.4.

Acceptance criteria:

- [ ] Pattern taxonomy approach described.
- [ ] Counting method defined.
- [ ] Analyst agreement requirements identified.
- [ ] Glossary updated.

### R4-005 - Define Unit of Analysis

Labels: `phase:R4`, `type:research`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 4.5.

Acceptance criteria:

- [ ] Primary unit of analysis selected.
- [ ] Secondary units, if any, stated.
- [ ] Implications for statistical method selection documented.
- [ ] DECISIONS.md updated.

## R5 - Methodology Design

### R5-001 - Select Methodological Approach

Labels: `phase:R5`, `type:research`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 5.1.

Acceptance criteria:

- [ ] Study design type stated.
- [ ] Design justified against RQs.
- [ ] LLM provider open question OQ-0001 is referenced or resolved.
- [ ] DECISIONS.md updated.

### R5-002 - Define Sampling Strategy

Labels: `phase:R5`, `type:research`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 5.2.

Acceptance criteria:

- [ ] Sampling frame defined.
- [ ] Sampling method selected.
- [ ] Corpus cutoff date decision references OQ-0004.
- [ ] Vendor-rule decision references OQ-0003.
- [ ] DECISIONS.md and OPEN-QUESTIONS.md updated.

### R5-003 - Define Independent Variables

Labels: `phase:R5`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 5.3.

Acceptance criteria:

- [ ] Each IV has operational definition.
- [ ] Measurement method specified.
- [ ] Expected range of values listed.

### R5-004 - Define Dependent Variables

Labels: `phase:R5`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 5.4.

Acceptance criteria:

- [ ] Primary DV defined.
- [ ] Secondary DVs defined if used.
- [ ] Measurement scale and distribution expectations stated.

### R5-005 - Define Control Variables

Labels: `phase:R5`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 5.5.

Acceptance criteria:

- [ ] Candidate control variables listed.
- [ ] Measurement method stated for each.
- [ ] Variables impossible to control are moved to Section 5.6.

### R5-006 - Define Confounders and Mitigations

Labels: `phase:R5`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 5.6.

Acceptance criteria:

- [ ] Confounders listed.
- [ ] Confounding pathway explained for each.
- [ ] Planned mitigation stated for each.
- [ ] Residual risk identified.

### R5-007 - Select Statistical Methods

Labels: `phase:R5`, `type:research`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 5.7.

Acceptance criteria:

- [ ] Statistical test selected for each hypothesis.
- [ ] Multiple-comparison correction strategy stated.
- [ ] Confidence interval reporting policy stated.
- [ ] IRR protocol references or resolves OQ-0005.
- [ ] DECISIONS.md updated.

### R5-008 - Complete Power Analysis Plan

Labels: `phase:R5`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 5.8.

Acceptance criteria:

- [ ] Power assumptions listed.
- [ ] Minimum sample size calculation approach stated.
- [ ] Expected effect sizes from Section 3.3 used.
- [ ] Sampling strategy in Section 5.2 remains consistent.

## R6 - Evidence and Validation

### R6-001 - Define Evidence Standards

Labels: `phase:R6`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 6.1.

Acceptance criteria:

- [ ] Evidence threshold stated for each hypothesis.
- [ ] Null-result reporting policy stated.
- [ ] Confirmatory and exploratory evidence separated.

### R6-002 - Define Internal Validity Mitigations

Labels: `phase:R6`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 6.2.

Acceptance criteria:

- [ ] LLM mutation variance addressed.
- [ ] Evaluator non-determinism addressed.
- [ ] Ground-truth contamination addressed.
- [ ] docs/threats-to-validity.md cross-reference updated.

### R6-003 - Define External Validity Boundaries

Labels: `phase:R6`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 6.3.

Acceptance criteria:

- [ ] Population of inference stated.
- [ ] Time-bound generalizability stated.
- [ ] Repository and format limits stated.

### R6-004 - Define Construct Validity Argument

Labels: `phase:R6`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 6.4.

Acceptance criteria:

- [ ] Robustness score construct fit discussed.
- [ ] Functional-equivalence edge cases discussed.
- [ ] Known measurement limitations stated.

### R6-005 - Define Reliability Strategy

Labels: `phase:R6`, `type:research`, `type:reproducibility`, `priority:P0`

Goal: Complete PROTOCOL.md Section 6.5 and REPRODUCIBILITY.md.

Acceptance criteria:

- [ ] Seed management plan stated.
- [ ] Environment pinning plan stated.
- [ ] LLM model/version recording plan stated.
- [ ] REPRODUCIBILITY.md updated.

## R7 - Threats to Validity

### R7-001 - Complete Conclusion Validity Threats

Labels: `phase:R7`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 7.1 and docs/threats-to-validity.md R7.1.

Acceptance criteria:

- [ ] Threats listed.
- [ ] Mitigations listed.
- [ ] Residual risk stated.

### R7-002 - Complete Internal Validity Threats

Labels: `phase:R7`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 7.2 and docs/threats-to-validity.md R7.2.

Acceptance criteria:

- [ ] Threats listed.
- [ ] Mitigations listed.
- [ ] Residual risk stated.

### R7-003 - Complete Construct Validity Threats

Labels: `phase:R7`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 7.3 and docs/threats-to-validity.md R7.3.

Acceptance criteria:

- [ ] Threats listed.
- [ ] Mitigations listed.
- [ ] Residual risk stated.

### R7-004 - Complete External Validity Threats

Labels: `phase:R7`, `type:research`, `priority:P1`

Goal: Complete PROTOCOL.md Section 7.4 and docs/threats-to-validity.md R7.4.

Acceptance criteria:

- [ ] Threats listed.
- [ ] Mitigations listed.
- [ ] Residual risk stated.

### R7-005 - Complete Ethical Validity Threats

Labels: `phase:R7`, `type:ethics`, `priority:P0`

Goal: Complete PROTOCOL.md Section 7.5 and docs/threats-to-validity.md R7.5.

Acceptance criteria:

- [ ] Dual-use risk considered.
- [ ] Attribution harm considered.
- [ ] Dataset misuse risk considered.
- [ ] Residual risk stated.

### R7-006 - Complete Replication Threats

Labels: `phase:R7`, `type:reproducibility`, `priority:P1`

Goal: Complete PROTOCOL.md Section 7.6 and docs/threats-to-validity.md R7.6.

Acceptance criteria:

- [ ] API access limitations considered.
- [ ] Restricted raw-data limitations considered.
- [ ] Non-determinism considered.
- [ ] Residual risk stated.

## R8 - Ethics and Responsible Research

### R8-001 - Write Defender-Benefit Analysis

Labels: `phase:R8`, `type:ethics`, `priority:P0`

Goal: Complete PROTOCOL.md Section 8.1.

Acceptance criteria:

- [ ] Defender benefit is explicitly argued.
- [ ] Attacker benefit is explicitly bounded.
- [ ] Withheld information is identified.

### R8-002 - Define Disclosure Approach

Labels: `phase:R8`, `type:ethics`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Complete PROTOCOL.md Section 8.2.

Acceptance criteria:

- [ ] Notification targets defined.
- [ ] Disclosure timeline defined.
- [ ] What is and is not disclosed defined.
- [ ] DECISIONS.md updated.

### R8-003 - Define No Novel-Attack Policy

Labels: `phase:R8`, `type:ethics`, `priority:P0`

Goal: Complete PROTOCOL.md Section 8.3.

Acceptance criteria:

- [ ] Policy statement written.
- [ ] Verification step described.
- [ ] Handling of accidental novel technique discovery described.

### R8-004 - Define Dataset Sanitization Policy

Labels: `phase:R8`, `type:ethics`, `type:reproducibility`, `priority:P0`

Goal: Complete PROTOCOL.md Section 8.4.

Acceptance criteria:

- [ ] Public vs raw dataset distinction defined.
- [ ] Redaction or generalization approach stated.
- [ ] Restricted-access procedure identified if needed.
- [ ] LICENSE-DATA implications checked.

### R8-005 - Define Tone Policy

Labels: `phase:R8`, `type:ethics`, `priority:P1`

Goal: Complete PROTOCOL.md Section 8.5.

Acceptance criteria:

- [ ] No naming-and-shaming commitment written.
- [ ] Attribution policy for examples stated.
- [ ] Handling of media or "worst performer" requests stated.

## R9 - Protocol Lock

### R9-001 - Complete Falsification Criteria

Labels: `phase:R9`, `type:research`, `priority:P0`

Goal: Complete PROTOCOL.md Section 9.3.

Acceptance criteria:

- [ ] Criteria that would revise or abandon primary claims are stated.
- [ ] Criteria are concrete enough to apply after results.
- [ ] Criteria are pre-registered before execution.

### R9-002 - Pre-Register Protocol

Labels: `phase:R9`, `type:research`, `type:reproducibility`, `priority:P0`

Goal: Submit the locked protocol to OSF or equivalent registry.

Acceptance criteria:

- [ ] Protocol reviewed for completeness.
- [ ] Registry selected.
- [ ] Pre-registration submitted.
- [ ] Public link recorded in PROTOCOL.md Section 9.4.

### R9-003 - Lock PROTOCOL.md

Labels: `phase:R9`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Lock the protocol before any execution-phase work.

Acceptance criteria:

- [ ] PROTOCOL.md frontmatter `locked` set to `true`.
- [ ] PROTOCOL.md Section 9.1 set to `LOCKED`.
- [ ] CHANGELOG.md updated.
- [ ] DECISIONS.md updated.
- [ ] Git tag created for locked protocol.

## E1 - Corpus Collection

### E1-001 - Create Execution Directory Structure

Labels: `phase:E1`, `type:execution`, `priority:P0`

Goal: Create execution-phase directories only after protocol lock.

Acceptance criteria:

- [ ] PROTOCOL.md Section 9.1 is confirmed `LOCKED`.
- [ ] Required directories created according to locked plan.
- [ ] future-execution/README.md updated or superseded.

### E1-002 - Collect Corpus Snapshot

Labels: `phase:E1`, `type:execution`, `type:reproducibility`, `priority:P0`

Goal: Collect public detection-rule corpus according to locked sampling strategy.

Acceptance criteria:

- [ ] Corpus sources match PROTOCOL.md Section 5.2.
- [ ] Snapshot date recorded.
- [ ] Source commits or versions recorded.
- [ ] Corpus hash generated.

### E1-003 - Build Corpus Metadata Table

Labels: `phase:E1`, `type:execution`, `priority:P1`

Goal: Build metadata needed for later analysis.

Acceptance criteria:

- [ ] Rule ID recorded.
- [ ] Repository and format recorded.
- [ ] Rule date or age proxy recorded when available.
- [ ] Attack category mapping recorded when available.

## E2 - Ground-Truth Sample Acquisition

### E2-001 - Resolve Untestable Rule Policy

Labels: `phase:E2`, `type:open-question`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Resolve OQ-0002 based on actual corpus composition.

Acceptance criteria:

- [ ] Frequency of untestable rules measured.
- [ ] Policy selected.
- [ ] DECISIONS.md updated.
- [ ] OPEN-QUESTIONS.md OQ-0002 marked resolved.

### E2-002 - Acquire or Construct Ground-Truth Samples

Labels: `phase:E2`, `type:execution`, `priority:P0`

Goal: Obtain ground-truth positive artifacts according to the locked protocol.

Acceptance criteria:

- [ ] Samples conform to ethical policy.
- [ ] Provenance recorded.
- [ ] Unsafe or restricted samples segregated.
- [ ] Rule trigger baseline recorded.

## E3 - Mutation Generation

### E3-001 - Resolve LLM Provider Selection

Labels: `phase:E3`, `type:open-question`, `type:decision`, `priority:P0`, `needs-decision`

Goal: Resolve OQ-0001 before mutation generation.

Acceptance criteria:

- [ ] Candidate providers compared using locked pilot criteria.
- [ ] Cost, refusal behavior, quality, and reproducibility considered.
- [ ] DECISIONS.md updated.
- [ ] OPEN-QUESTIONS.md OQ-0001 marked resolved.

### E3-002 - Generate Candidate Mutations

Labels: `phase:E3`, `type:execution`, `priority:P0`

Goal: Generate mutation candidates according to locked methodology.

Acceptance criteria:

- [ ] Model ID and API version recorded.
- [ ] Prompt versions recorded.
- [ ] Sampling parameters recorded.
- [ ] Cost logged in COSTS.md.
- [ ] Raw outputs stored according to ethics policy.

### E3-003 - Validate Functional Equivalence

Labels: `phase:E3`, `type:execution`, `type:ethics`, `priority:P0`

Goal: Validate candidate mutations before evaluation.

Acceptance criteria:

- [ ] Validation follows PROTOCOL.md Section 4.2.
- [ ] Invalid mutations excluded or labeled.
- [ ] Reviewer agreement recorded if applicable.
- [ ] Novel-attack policy applied if needed.

## E4 - Evaluation Pipeline

### E4-001 - Implement Evaluation Harness

Labels: `phase:E4`, `type:execution`, `priority:P0`

Goal: Implement the minimum evaluation tooling required by the locked protocol.

Acceptance criteria:

- [ ] Implementation matches locked methods.
- [ ] No unregistered metric changes introduced.
- [ ] Smoke test corpus included.
- [ ] Core evaluation tests added.

### E4-002 - Run Baseline Evaluation

Labels: `phase:E4`, `type:execution`, `priority:P0`

Goal: Confirm rules detect original ground-truth samples where expected.

Acceptance criteria:

- [ ] Baseline trigger status recorded.
- [ ] Rules failing baseline handled according to protocol.
- [ ] Results stored reproducibly.

### E4-003 - Run Mutation Evaluation

Labels: `phase:E4`, `type:execution`, `priority:P0`

Goal: Evaluate validated mutations against selected rules.

Acceptance criteria:

- [ ] All evaluated rule-mutation pairs recorded.
- [ ] Robustness inputs exported.
- [ ] Runtime and environment recorded.
- [ ] Failures triaged without changing locked methodology.

## A1 - Data QA

### A1-001 - Clean Evaluation Outputs

Labels: `phase:A1`, `type:analysis`, `priority:P0`

Goal: Produce analysis-ready data.

Acceptance criteria:

- [ ] Invalid or incomplete records identified.
- [ ] Exclusion reasons recorded.
- [ ] Analysis dataset schema documented.
- [ ] Hash generated for final analysis input.

### A1-002 - Reproducibility Smoke Test

Labels: `phase:A1`, `type:reproducibility`, `priority:P0`

Goal: Verify that a small reference run reproduces expected outputs.

Acceptance criteria:

- [ ] Fresh environment test run completed.
- [ ] Expected outputs documented.
- [ ] Deviations recorded and resolved or documented.

## A2 - Statistical Analysis

### A2-001 - Run Confirmatory Analyses

Labels: `phase:A2`, `type:analysis`, `priority:P0`

Goal: Run only the pre-registered confirmatory analyses.

Acceptance criteria:

- [ ] Analyses map to PROTOCOL.md Sections 2 and 3.
- [ ] Statistical methods match Section 5.7.
- [ ] Confidence intervals reported.
- [ ] Multiple-comparison strategy applied.

### A2-002 - Run Exploratory Analyses

Labels: `phase:A2`, `type:analysis`, `priority:P2`

Goal: Run clearly labeled exploratory analyses.

Acceptance criteria:

- [ ] Exploratory analyses separated from confirmatory results.
- [ ] No exploratory result is described as pre-registered.
- [ ] Limitations documented.

## A3 - Findings Draft

### A3-001 - Draft Results Section

Labels: `phase:A3`, `type:publication`, `priority:P0`

Goal: Write the results section of the paper.

Acceptance criteria:

- [ ] Results trace to pre-registered RQs.
- [ ] Null results reported if present.
- [ ] Tables and figures reproducible from analysis outputs.

### A3-002 - Draft Limitations Section

Labels: `phase:A3`, `type:publication`, `priority:P0`

Goal: Write limitations based on validity-threat documents.

Acceptance criteria:

- [ ] Limitations map to PROTOCOL.md Section 7.
- [ ] Overgeneralization avoided.
- [ ] Residual risks stated plainly.

## P1 - Internal Review

### P1-001 - Protocol Adherence Audit

Labels: `phase:P1`, `type:reproducibility`, `priority:P0`

Goal: Verify execution matched locked protocol.

Acceptance criteria:

- [ ] Deviations listed.
- [ ] CHANGELOG.md updated for post-lock changes.
- [ ] Confirmatory vs exploratory separation checked.

### P1-002 - Ethics and Disclosure Review

Labels: `phase:P1`, `type:ethics`, `priority:P0`

Goal: Verify release does not expose weaponizable details.

Acceptance criteria:

- [ ] Dataset sanitization checked.
- [ ] Disclosure obligations checked.
- [ ] Raw restricted artifacts remain restricted.

## P2 - External Review

### P2-001 - Trusted Reviewer Feedback

Labels: `phase:P2`, `type:publication`, `priority:P1`

Goal: Obtain review from trusted security/research reviewers.

Acceptance criteria:

- [ ] Reviewers selected.
- [ ] Feedback recorded.
- [ ] Actionable feedback resolved or explicitly deferred.

## P3 - Artifact Release

### P3-001 - Release Public Dataset

Labels: `phase:P3`, `type:publication`, `type:reproducibility`, `priority:P0`

Goal: Publish sanitized public dataset.

Acceptance criteria:

- [ ] Dataset license applied.
- [ ] Dataset schema documented.
- [ ] DOI or persistent identifier assigned if available.
- [ ] Raw restricted data excluded.

### P3-002 - Release Toolkit

Labels: `phase:P3`, `type:publication`, `priority:P1`

Goal: Release evaluation toolkit after research execution.

Acceptance criteria:

- [ ] Install instructions complete.
- [ ] Example invocation complete.
- [ ] Tests pass.
- [ ] License confirmed.

### P3-003 - Update Citation Metadata

Labels: `phase:P3`, `type:publication`, `priority:P1`

Goal: Update CITATION.cff and README citation.

Acceptance criteria:

- [ ] DOI updated if assigned.
- [ ] Version updated.
- [ ] Release date updated.
- [ ] Citation format verified.

## P4 - Publication

### P4-001 - Publish Paper or Preprint

Labels: `phase:P4`, `type:publication`, `priority:P0`

Goal: Publish the primary study write-up.

Acceptance criteria:

- [ ] Paper includes methodology, results, ethics, limitations, and reproducibility notes.
- [ ] Public artifacts linked.
- [ ] Citation information updated.

### P4-002 - Final Release Tag

Labels: `phase:P4`, `type:publication`, `type:reproducibility`, `priority:P0`

Goal: Create final release tag for publication artifacts.

Acceptance criteria:

- [ ] Final version tag created.
- [ ] Release notes include dataset/toolkit/paper links.
- [ ] CHANGELOG.md complete.

## Dependency Gates

Hard gates:

- R1-R9 must complete before E1 starts.
- R9-003 must complete before any execution-phase directories or code are created.
- E1 and E2 must complete before E3 starts.
- E3 must complete before E4 mutation evaluation starts.
- E4 must complete before A1 starts.
- A1 must complete before A2 starts.
- P1 ethics review must complete before P3 public artifact release.

Open-question gates:

- OQ-0001 blocks E3.
- OQ-0002 blocks final robustness-score denominator handling.
- OQ-0003 blocks R5.2.
- OQ-0004 blocks E1.
- OQ-0005 blocks R5.7 and E3 validation.

## Weekly Operating Loop

Recommended weekly loop for a solo 8-10 hour/week cadence:

1. Pick 2-4 Ready issues for the week.
2. Move only one high-risk issue to In Progress at a time.
3. Update DECISIONS.md immediately when a methodological decision is made.
4. Update OPEN-QUESTIONS.md immediately when a question is opened or resolved.
5. End each week by checking whether PROTOCOL.md and support docs still agree.
6. Do not start implementation tasks while protocol tasks remain unlocked.
