---
version: "0.1.0"
status: "DRAFT"
last_updated: "2026-05-24"
locked: false
---

# BrittleBench Research Protocol

> **Lock status:** UNLOCKED — see [Section 9](#9-protocol-status-phase-r9)
>
> This is the canonical research protocol for BrittleBench. All methodology decisions live here. Cross-cutting decisions are logged in [DECISIONS.md](./decisions). Deferred questions are tracked in [OPEN-QUESTIONS.md](./open-questions). Changes after locking must be documented in [CHANGELOG.md](./changelog).

---

## Table of Contents

1. [Problem Definition (Phase R1)](#1-problem-definition-phase-r1)
2. [Research Questions (Phase R2)](#2-research-questions-phase-r2)
3. [Hypotheses (Phase R3)](#3-hypotheses-phase-r3)
4. [Definitions and Operationalization (Phase R4)](#4-definitions-and-operationalization-phase-r4)
5. [Methodology Design (Phase R5)](#5-methodology-design-phase-r5)
6. [Evidence and Validation (Phase R6)](#6-evidence-and-validation-phase-r6)
7. [Threats to Validity (Phase R7)](#7-threats-to-validity-phase-r7)
8. [Ethics and Responsible Research (Phase R8)](#8-ethics-and-responsible-research-phase-r8)
9. [Protocol Status (Phase R9)](#9-protocol-status-phase-r9)

---

## 1. Problem Definition (Phase R1)

### 1.1 Problem Statement

Public detection rules are often written to identify known malicious behaviors from observable artifacts such as process command lines, file patterns, registry changes, network indicators, or log events. These rules may be brittle when they match narrow surface forms of an attack rather than the underlying behavior the rule is intended to detect. A brittle rule, for the purposes of this study, is a rule that detects a known attack instance but fails to detect functionally equivalent variants that preserve the same attacker-relevant behavior while changing non-essential implementation details.

This study examines whether publicly published detection content remains robust when the attacks it targets are transformed into such functionally equivalent variants. The central research problem is that defenders rely on public rule repositories as reusable security knowledge, but the degree to which those rules generalize beyond the exact examples, strings, syntax, or artifacts they were written against is not systematically measured. Without a benchmark for this robustness, detection engineers cannot easily distinguish rules that encode durable behavioral coverage from rules that only recognize one fragile representation of a behavior.

LLM-generated mutations are a meaningful measurement tool for this problem because modern language models can rapidly produce plausible variants of scripts, commands, configuration snippets, and other security-relevant artifacts. The study does not assume that these mutations are novel attacks or that LLMs are required for evasion. Instead, LLMs are treated as a scalable way to generate candidate variants whose functional equivalence must be independently validated. The empirical question is whether public detection rules continue to fire across validated equivalent variants, and where they fail.

### 1.2 Why This Matters

> TO BE FILLED — see Phase R1.2 of the research plan
>
> _What this section should contain: Motivation for why detection content robustness is an understudied problem worth a formal empirical study. Who is harmed by brittle rules. What the practical stakes are for defenders. Should be grounded in observable phenomena, not speculation._

### 1.3 Prior Work Survey

> TO BE FILLED — see Phase R1.3 of the research plan
>
> _What this section should contain: A structured survey of prior work covering: (a) empirical studies of detection rule quality, (b) LLM-based attack mutation literature, (c) benchmark methodology in adjacent fields (software testing, ML robustness), (d) detection content repositories and their stated coverage goals. Minimum 10 cited works. Identify what each does and does not cover._

### 1.4 Gap This Study Fills

> TO BE FILLED — see Phase R1.4 of the research plan
>
> _What this section should contain: Explicit statement of the gap identified from 1.3. What no prior study has measured, and why that gap matters. Should directly map to the primary research question in Section 2.1._

### 1.5 Scope Boundaries

> TO BE FILLED — see Phase R1.5 of the research plan
>
> _What this section should contain: Explicit in-scope and out-of-scope boundaries. Which rule formats are included (Sigma, YARA, Elastic, Splunk, other?). Which repositories. Which attack categories. Which threat model. These boundaries must be stable before Phase E begins — they define the corpus sampling frame._

---

## 2. Research Questions (Phase R2)

### 2.1 Primary Research Question

> TO BE FILLED — see Phase R2.1 of the research plan
>
> _What this section should contain: A single primary RQ framed as a falsifiable empirical question. Should be answerable from the data this study will collect. Must be specific enough that a null result is meaningful._

### 2.2 Secondary Research Questions

> TO BE FILLED — see Phase R2.2 of the research plan
>
> _What this section should contain: 2–5 secondary RQs that decompose or extend the primary RQ. Each should be independently answerable. Suggested candidates (do not accept as written — refine): robustness by rule format, robustness by repository, robustness by rule age, robustness by attack category. Each RQ needs a corresponding hypothesis in Section 3._

### 2.3 Question Hierarchy

> TO BE FILLED — see Phase R2.3 of the research plan
>
> _What this section should contain: A diagram or table showing which secondary RQs are subordinate to the primary RQ and how their answers combine to address the primary question. Prevents the study from sprawling into unrelated directions._

### 2.4 Falsifiability Check

> TO BE FILLED — see Phase R2.4 of the research plan
>
> _What this section should contain: For each RQ (primary and secondary), an explicit statement of what a null or negative result would look like and why it would still be publishable and meaningful. "We found no significant robustness difference" should be a viable outcome, not an unacceptable one._

---

## 3. Hypotheses (Phase R3)

### 3.1 Hypotheses per Research Question

> TO BE FILLED — see Phase R3.1 of the research plan
>
> _What this section should contain: One directional hypothesis per RQ in Section 2. Each hypothesis should be stated in plain language and in formal statistical notation. Must be written before data collection begins._

### 3.2 Null Hypotheses

> TO BE FILLED — see Phase R3.2 of the research plan
>
> _What this section should contain: The corresponding null hypothesis for each hypothesis in 3.1. These are what the statistical tests attempt to reject. State the null form explicitly — do not leave implicit._

### 3.3 Expected Effect Sizes

> TO BE FILLED — see Phase R3.3 of the research plan
>
> _What this section should contain: Prior expectations about effect magnitude for each hypothesis, with justification. Used to set meaningful significance thresholds in Section 5.8 (power analysis). Without effect size priors, power analysis is arbitrary._

### 3.4 Pre-Registered Predictions

> TO BE FILLED — see Phase R3.4 of the research plan
>
> _What this section should contain: A ranked list of predictions that will be submitted to a public pre-registration registry (OSF or similar) before Phase E begins. These are the claims the study is committed to testing. Any post-lock analysis that is not in this list must be labeled exploratory in the paper._

---

## 4. Definitions and Operationalization (Phase R4)

> _See also: [docs/glossary.md](docs/glossary.md) for the full terminology table._

### 4.1 "Detection Rule" — Formal Definition

> TO BE FILLED — see Phase R4 of the research plan
>
> _What this section should contain: A precise, operational definition of what counts as a detection rule for the purposes of this study. Must specify format constraints (Sigma version, YARA module support, etc.), inclusion criteria (must be associated with a specific technique or behavior), and exclusion criteria (e.g., rules that are documentation-only, templates, or untestable without proprietary data)._

### 4.2 "Functional Equivalence" — Formal Definition

> TO BE FILLED — see Phase R4 of the research plan
>
> _What this section should contain: A precise definition of when a mutation is considered "functionally equivalent" to its parent attack. This is the most consequential definition in the study — it determines whether a bypass is a true positive or a false alarm. Must address the verifier problem: how do we confirm equivalence without executing in production?_

### 4.3 "Robustness Score" — Formal Definition

> TO BE FILLED — see Phase R4 of the research plan
>
> _What this section should contain: The formal mathematical definition of the robustness score for a single rule, a rule set, and a repository. Must specify numerator, denominator, handling of ties, handling of rules with no obtainable ground truth (cross-reference OQ-0002 in OPEN-QUESTIONS.md). This is the primary dependent variable._

### 4.4 "Brittleness Pattern" — Formal Definition

> TO BE FILLED — see Phase R4 of the research plan
>
> _What this section should contain: How brittleness patterns (failure modes) are identified, categorized, and counted. Is a pattern a structural property of the rule? A class of mutation that bypasses it? Must be defined operationally enough that two independent analysts would agree on classification._

### 4.5 Unit of Analysis

> TO BE FILLED — see Phase R4 of the research plan
>
> _What this section should contain: The primary unit of analysis (one rule? one rule + one mutation? one rule + all its mutations?). The choice has major implications for statistical method selection in Section 5.7. Cross-reference Section 5.5 (control variables)._

---

## 5. Methodology Design (Phase R5)

### 5.1 Methodological Approach

> TO BE FILLED — see Phase R5.1 of the research plan
>
> _What this section should contain: Overall study design (observational, quasi-experimental, etc.). Justification for the chosen design given the research questions. Why this design is appropriate for measuring detection robustness at scale._

### 5.2 Sampling Strategy

> TO BE FILLED — see Phase R5.2 of the research plan
>
> _What this section should contain: How rules are selected from the corpus. Probability sampling vs. stratified vs. exhaustive. Corpus snapshot cutoff date (see OQ-0004). Inclusion of vendor-published rules (see OQ-0003). Sample size justification (must be consistent with power analysis in 5.8). Sampling frame limitations._

### 5.3 Independent Variables

> TO BE FILLED — see Phase R5.3 of the research plan
>
> _What this section should contain: The independent variables (rule format, repository, rule age, attack category, LLM provider, mutation strategy). For each: operational definition, measurement method, expected range of values._

### 5.4 Dependent Variables

> TO BE FILLED — see Phase R5.4 of the research plan
>
> _What this section should contain: The dependent variables (primarily: robustness score as defined in 4.3). Any secondary DVs (mutation count per rule, bypass rate, pattern frequency). For each: measurement method, scale, expected distribution._

### 5.5 Control Variables

> TO BE FILLED — see Phase R5.5 of the research plan
>
> _What this section should contain: Variables held constant or controlled in analysis (rule complexity, rule maturity, detection logic type). How each is measured. Which are impossible to control and must instead be treated as confounders in 5.6._

### 5.6 Confounders and Mitigation

> TO BE FILLED — see Phase R5.6 of the research plan
>
> _What this section should contain: Identified confounders that cannot be controlled experimentally. For each: description of the confounding pathway, planned statistical mitigation (stratification, covariate adjustment, sensitivity analysis), and residual risk. Cross-reference Section 7 (Threats to Validity)._

### 5.7 Statistical Methods

> TO BE FILLED — see Phase R5.7 of the research plan
>
> _What this section should contain: Statistical tests selected for each hypothesis. Justification for each (parametric vs. non-parametric, based on expected data distribution). Inter-rater reliability method for manual mutation review (see OQ-0005). Multiple comparison correction strategy. Confidence interval reporting policy._

### 5.8 Power Analysis

> TO BE FILLED — see Phase R5.8 of the research plan
>
> _What this section should contain: For each primary hypothesis, a power analysis showing the minimum sample size needed to detect the expected effect size (from 3.3) at a given alpha and power level. This drives the sampling decision in 5.2. Must be completed before corpus collection begins._

---

## 6. Evidence and Validation (Phase R6)

### 6.1 Evidence Standards

> TO BE FILLED — see Phase R6.1 of the research plan
>
> _What this section should contain: The evidentiary standard the study commits to. What constitutes sufficient evidence to confirm or refute each hypothesis. How null results are handled and reported._

### 6.2 Internal Validity Threats and Mitigations

> TO BE FILLED — see Phase R6.2 of the research plan
>
> _What this section should contain: Threats to internal validity specific to this study (LLM mutation quality variance, evaluator non-determinism, ground-truth contamination). For each: description and planned mitigation. See also [docs/threats-to-validity.md](docs/threats-to-validity.md)._

### 6.3 External Validity and Generalizability

> TO BE FILLED — see Phase R6.3 of the research plan
>
> _What this section should contain: To what populations, settings, and time periods the findings generalize. Explicit limits on generalizability (e.g., findings apply to community-published rules at the corpus snapshot date, not to all detection content globally). See also [docs/threats-to-validity.md](docs/threats-to-validity.md)._

### 6.4 Construct Validity

> TO BE FILLED — see Phase R6.4 of the research plan
>
> _What this section should contain: Whether the operationalizations in Section 4 actually measure the underlying constructs. Particularly: does the robustness score measure real-world evasibility, or something adjacent? How the definitions handle edge cases._

### 6.5 Reliability Strategy

> TO BE FILLED — see Phase R6.5 of the research plan
>
> _What this section should contain: How the study ensures measurements are reproducible. Deterministic mutation generation strategy. Seed management. Evaluation environment pinning. Cross-reference [REPRODUCIBILITY.md](./reproducibility)._

---

## 7. Threats to Validity (Phase R7)

> _This section is a summary. The full threat analysis is in [docs/threats-to-validity.md](docs/threats-to-validity.md)._

### 7.1 Conclusion Validity Threats

> TO BE FILLED — see Phase R7 of the research plan and [docs/threats-to-validity.md](docs/threats-to-validity.md) §R7.1
>
> _Summary of threats to the statistical relationship between observations and conclusions (underpowering, multiple comparisons, non-independence)._

### 7.2 Internal Validity Threats

> TO BE FILLED — see Phase R7 and [docs/threats-to-validity.md](docs/threats-to-validity.md) §R7.2
>
> _Summary of threats to causal inference within the study (selection bias, instrumentation variance, maturation)._

### 7.3 Construct Validity Threats

> TO BE FILLED — see Phase R7 and [docs/threats-to-validity.md](docs/threats-to-validity.md) §R7.3
>
> _Summary of threats to whether operationalizations match constructs (functional equivalence definition drift, evaluator divergence)._

### 7.4 External Validity Threats

> TO BE FILLED — see Phase R7 and [docs/threats-to-validity.md](docs/threats-to-validity.md) §R7.4
>
> _Summary of threats to generalizability (corpus sampling frame, LLM choice, temporal snapshot)._

### 7.5 Ethical Validity Threats

> TO BE FILLED — see Phase R7 and [docs/threats-to-validity.md](docs/threats-to-validity.md) §R7.5
>
> _Summary of ethical risks that could undermine study legitimacy (dual-use misuse, unintended attribution harm)._

### 7.6 Replication Threats

> TO BE FILLED — see Phase R7 and [docs/threats-to-validity.md](docs/threats-to-validity.md) §R7.6
>
> _Summary of factors that would prevent independent replication (LLM API access, proprietary ground-truth samples, non-determinism)._

---

## 8. Ethics and Responsible Research (Phase R8)

### 8.1 Defender Benefit > Attacker Benefit

> TO BE FILLED — see Phase R8.1 of the research plan
>
> _What this section should contain: Explicit analysis of dual-use risk. How the study's design, disclosure approach, and dataset sanitization together ensure the net benefit accrues to defenders. What information is withheld and why. How to quantify or argue this asymmetry._

### 8.2 Disclosure Approach

> TO BE FILLED — see Phase R8.2 of the research plan
>
> _What this section should contain: Policy for notifying rule authors of systematic brittleness findings before publication. Timeline (e.g., 30-day advance notice to repository maintainers). What is disclosed (aggregate statistics, not per-mutation bypass recipes). Contact method per repository._

### 8.3 No Novel-Attack Policy

> TO BE FILLED — see Phase R8.3 of the research plan
>
> _What this section should contain: Formal statement that mutations are variations of documented, publicly-known attack techniques — not discovery of new techniques. How this is verified operationally (mutation review step). What happens if a mutation turns out to represent a novel technique._

### 8.4 Dataset Sanitization

> TO BE FILLED — see Phase R8.4 of the research plan
>
> _What this section should contain: How the public dataset release differs from the raw mutation dataset. What is redacted, generalized, or withheld. How sanitization is performed without invalidating the benchmark. Who controls access to the raw dataset._

### 8.5 Tone Policy

> TO BE FILLED — see Phase R8.5 of the research plan
>
> _What this section should contain: Explicit commitment that findings will be framed constructively. No naming-and-shaming of authors. Attribution-free failure examples. Language guidelines for the paper. How to handle requests from journalists or others to identify "worst" performers._

---

## 9. Protocol Status (Phase R9)

### 9.1 Lock Status

**UNLOCKED**

This protocol is in active development. No execution-phase work has begun. Sections marked "TO BE FILLED" must be completed before this protocol is locked.

### 9.2 Lock Date

Not yet established. Target: end of Month 2 (see [README.md](/) timeline).

### 9.3 Falsification Criteria

> TO BE FILLED — see Phase R9.3 of the research plan
>
> _What this section should contain: The specific quantitative or qualitative results that would cause the study's primary claim to be abandoned or substantially revised. Pre-committing to these prevents motivated reasoning when results come in._

### 9.4 Public Pre-Registration Link

> TO BE FILLED — see Phase R9.4 of the research plan
>
> _What this section should contain: The OSF (or equivalent) pre-registration URL, submitted before Phase E1 (corpus collection) begins. This is the external anchor that makes pre-registration meaningful._

---

> **This protocol is locked once Section 9.1 is set to LOCKED. Any post-lock changes must be documented in [CHANGELOG.md](./changelog) with rationale.**
