---
version: "1.0.0"
status: "LOCKED"
last_updated: "2026-05-25"
locked: true
---

# BrittleBench Research Protocol

> **Lock status:** LOCKED — see [Section 9](#9-protocol-status-phase-r9)
>
> This is the canonical research protocol for BrittleBench. All methodology decisions live here. Cross-cutting decisions are logged in [DECISIONS.md](DECISIONS.md). Deferred questions are tracked in [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md). Changes after locking must be documented in [CHANGELOG.md](CHANGELOG.md).

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
10. [Revision Notes](#10-revision-notes)

---

## 1. Problem Definition (Phase R1)

### 1.1 Problem Statement

Public detection rules are often written to identify known malicious behaviors from observable artifacts such as process command lines, file patterns, registry changes, network indicators, or log events. These rules may be brittle when they match narrow surface forms of an attack rather than the underlying behavior the rule is intended to detect. A brittle rule, for the purposes of this study, is a rule that detects a known attack instance but fails to detect functionally equivalent variants that preserve the same attacker-relevant behavior while changing non-essential implementation details.

This study examines whether publicly published detection content remains robust when the attacks it targets are transformed into such functionally equivalent variants. The central research problem is that defenders rely on public rule repositories as reusable security knowledge, but the degree to which those rules generalize beyond the exact examples, strings, syntax, or artifacts they were written against is not systematically measured. Without a benchmark for this robustness, detection engineers cannot easily distinguish rules that encode durable behavioral coverage from rules that only recognize one fragile representation of a behavior.

LLM-generated mutations are a meaningful measurement tool for this problem because modern language models can rapidly produce plausible variants of scripts, commands, configuration snippets, and other security-relevant artifacts. The study does not assume that these mutations are novel attacks or that LLMs are required for evasion. Instead, LLMs are treated as a scalable way to generate candidate variants whose functional equivalence must be independently validated. The empirical question is whether public detection rules continue to fire across validated equivalent variants, and where they fail.

### 1.2 Why This Matters

Public detection content is part of the practical infrastructure of modern defense. Detection engineers routinely adapt community and vendor-published rules instead of writing every rule from first principles. Projects such as [SigmaHQ](https://github.com/SigmaHQ/sigma), [Elastic Detection Rules](https://github.com/elastic/detection-rules), and [Splunk Security Content](https://github.com/splunk/security_content) explicitly support this reuse by publishing rule content, contribution workflows, testing conventions, and mappings to broader defensive taxonomies such as MITRE ATT&CK.

The practical risk is not merely that a rule may be wrong. The more specific risk is that a rule may be correct for the artifact it was written against but fragile under routine variation: renamed files, reordered command arguments, alternate scripting syntax, changed encodings, different parent processes, equivalent API usage, modified string literals, or different but behaviorally equivalent execution paths. A defender who imports such a rule may believe they have coverage for a behavior while actually having coverage for one narrow representation of that behavior.

This matters most for defenders with limited detection-engineering capacity. Public rules are valuable because they compress expert knowledge into reusable artifacts, but their reuse also creates dependency on quality properties that are rarely measured consistently across repositories. If robustness is not measured, teams cannot easily prioritize which rules need hardening, which rule formats or repositories tend to encode more durable logic, or which failure modes should be addressed by rule-authoring guidance.

BrittleBench therefore treats robustness as a measurable property of detection content, not as an anecdotal criticism of individual rule authors. The intended benefit is constructive: help detection engineers understand where public rules generalize, where they fail, and what kinds of rule structures are most exposed to functionally equivalent variation.

### 1.3 Prior Work Survey

This section records the starting prior-work map for Phase R1. It is not yet the final bibliography. The purpose is to establish that BrittleBench is adjacent to several existing bodies of work but is not duplicative of them.

| Area | Source | What it contributes | What it does not cover |
|------|--------|---------------------|------------------------|
| Public log-detection rules | [SigmaHQ/sigma](https://github.com/SigmaHQ/sigma) | Defines a large public corpus of vendor-agnostic log detection rules. The repository describes Sigma as a generic signature format for log events and states that the main rule repository is intended for detection engineers and threat hunters. | Does not provide a benchmark for whether rules remain effective under functionally equivalent mutations of the target behavior. |
| Public Elastic rules | [Elastic Detection Rules](https://github.com/elastic/detection-rules) | Provides public Elastic Security rules and a detection-as-code workflow for rule development, maintenance, testing, validation, and release. | Focuses on Elastic's rule lifecycle and validation tooling, not cross-repository robustness under semantic variation. |
| Public Splunk rules | [Splunk Security Content](https://github.com/splunk/security_content) | Provides Analytic Stories, detections, attack data, and contentctl tooling; the repository explicitly connects content to ATT&CK, Cyber Kill Chain, and CIS Controls. | Does not provide a shared robustness benchmark for rule brittleness against validated equivalent variants; Splunk is future/exploratory for BrittleBench Phase 1. |
| File and malware signatures | [YARA documentation](https://yara.readthedocs.io/en/latest/) | Defines YARA as a rule language for identifying and classifying samples using textual or binary patterns plus Boolean logic. | Describes rule semantics and usage, but not a large-scale benchmark of public YARA rule robustness under mutation. |
| Detection-rule evolution | [Long and Evans, "Evolution of Log-Based Detection Rules in Public Repositories" (2026)](https://arxiv.org/abs/2605.05383) | Studies longitudinal evolution of Sigma and Splunk Security Content rules, including detection logic changes over time. It establishes that public detection rules evolve through operational trade-offs. | Analyzes rule history and revision behavior, not whether rules detect behavior-preserving variants generated after publication. |
| YARA effectiveness | [Pendlebury et al., "Assessing the Effectiveness of YARA Rules for Signature-Based Malware Detection and Classification" (2021)](https://arxiv.org/abs/2111.13910) | Evaluates YARA rules as signature-based malware detection/classification artifacts. It is directly relevant to measuring rule effectiveness rather than assuming it. | Focuses on YARA and malware classification effectiveness, not public multi-format detection robustness against LLM-generated functional variants. |
| YARA ecosystem quality | [Esteban et al., "Mining the YARA Ecosystem" (2026)](https://arxiv.org/abs/2603.14191) | Mines public YARA repositories at large scale and studies ecosystem structure, maintenance, syntactic quality, and operational reliability. | Studies YARA ecosystem health and quality, but not comparable robustness across native YARA, native Elastic, and high-fidelity Sigma-to-Elastic rules under a shared mutation methodology. |
| LLM-assisted rule generation | [RuleLLM, "Automatically Generating Rules of Malicious Software Packages via Large Language Model" (2025)](https://arxiv.org/abs/2504.17198) | Shows that LLMs can be used to generate YARA and Semgrep-style rules from malicious package evidence. | Addresses rule generation, not mutation-based stress testing of existing public detection rules. |
| LLM-assisted obfuscation | [Coppolino et al., "Can LLMs Obfuscate Code?" (2024)](https://arxiv.org/abs/2412.16135) | Studies whether LLMs can generate obfuscated assembly code, supporting the broader premise that LLMs can transform code-like artifacts. | Focuses on code obfuscation capability, not validated functional equivalence of attack artifacts or detection-rule robustness. |
| Attack behavior taxonomy | [MITRE ATT&CK Enterprise Matrix](https://attack.mitre.org/matrices/enterprise/) | Provides a widely used taxonomy for adversary tactics and techniques that detection repositories commonly map to. | ATT&CK is a behavior taxonomy, not an evaluation protocol for rule robustness or mutation resistance. |
| Artifact reproducibility | [ACM Artifact Review and Badging](https://www.acm.org/publications/policies/artifact-review-and-badging-current) | Provides artifact-review concepts relevant to packaging code, data, and computational results for external review. | Does not define security-specific mutation methodology or detection-rule scoring. |
| Data stewardship | [FAIR Principles](https://www.go-fair.org/fair-principles/) | Provides general principles for making data findable, accessible, interoperable, and reusable. | Does not resolve dual-use release constraints for security datasets containing raw mutation artifacts. |

The main conclusion from this survey is that public detection content, detection-as-code workflows, YARA effectiveness, rule evolution, LLM-assisted security work, and reproducibility standards are all active areas. The missing piece is an explicitly pre-registered, multi-format benchmark that asks whether public detection rules continue to detect validated functionally equivalent variants of the behaviors they claim to cover.

Candidate public rule sources and later collection recipes are tracked separately in [docs/rule-source-inventory.md](docs/rule-source-inventory.md). That inventory is an input to Section 5.2 sampling design, not an authorization to collect corpus data before protocol lock.

### 1.4 Gap This Study Fills

BrittleBench fills the gap between rule-quality studies and mutation-based robustness testing. Existing work shows that public detection rules are important, widely reused, and actively maintained; some work studies YARA effectiveness or the evolution of log-based rules over time. However, the prior-work map does not identify a public, pre-registered benchmark that measures whether detection rules across multiple public repositories continue to fire when the target behavior is transformed into validated functionally equivalent variants.

The specific gap is therefore:

> Public detection content lacks a multi-family empirical robustness benchmark that measures rule behavior under validated behavior-preserving mutations of the attacks or artifacts those rules are intended to detect while respecting construct boundaries between file-content and event-stream rules.

This gap matters because a rule can pass ordinary validation against its original example while still failing under small, practical, non-novel variations of that example. A benchmark focused on this property would let the study report robustness distributions, compare rule families or repositories, identify recurring brittleness patterns, and provide concrete guidance for future detection authoring. The primary research question in Section 2.1 should directly ask how robust public detection rules are under validated functionally equivalent mutation, with secondary questions decomposing that result by format, repository, rule characteristics, and attack category.

### 1.5 Scope Boundaries

This Phase R1 scope is intentionally narrow enough for a solo six-month study and broad enough to support the core claim. Final sampling details, including exact repository snapshots and inclusion/exclusion counts, are deferred to Section 5.2.

In scope:

- Publicly accessible detection content whose source rules can be downloaded, versioned, and cited.
- Confirmatory Phase 1 rule families: native YARA, native Elastic detection rules, and Sigma rules translated to Elastic only when translation is high-fidelity.
- Public repositories initially inventoried include SigmaHQ/sigma, Elastic detection-rules, Splunk security_content, and selected public YARA rule repositories. Section 5.2 narrows the confirmatory sampling frame; Splunk and other non-Phase-1 families are future or exploratory unless a later locked amendment admits them.
- Rules associated with a concrete observable behavior, artifact, command, file pattern, process activity, registry activity, network event, or malware/sample family where a ground-truth positive example can be obtained or constructed under the ethical constraints in Section 8.
- Mutations that preserve the attacker-relevant behavior of the original example while changing non-essential implementation details.
- Defensive evaluation of whether existing rules fire on original examples and validated equivalent variants.
- Aggregate reporting by rule family, repository, rule characteristics, and attack category, subject to the statistical plan in Sections 3 and 5.

Out of scope:

- Proprietary rules that cannot be legally accessed, snapshotted, or redistributed as part of the study record.
- Closed-source vendor rule sets, managed-service-only rules, or customer-private detections unless a public, citable source is available and Section 5.2 explicitly includes them.
- Novel attack technique discovery, exploit development, malware improvement, or publication of weaponizable mutation payloads.
- Claims about all detection engineering globally. The study will generalize only to the sampled public corpus at the recorded snapshot date.
- Runtime evaluation against production SIEMs, EDRs, or live enterprise environments.
- Measuring false-positive rates in benign enterprise telemetry, unless later added as an explicitly exploratory analysis after protocol lock.
- Ranking or shaming individual rule authors.

Threat model boundary:

The mutation threat model is an attacker, red-team operator, or tool-assisted operator who already knows a public technique or artifact and can vary non-essential surface details without changing the underlying behavior. The study does not model a fully adaptive attacker with feedback from the exact target environment, and it does not model discovery of new offensive capabilities.

Execution boundary:

No corpus collection, mutation generation, evaluator implementation, or analysis code may begin until this protocol is complete, pre-registered, and locked in Section 9.1. The scope above constrains later design work, but Sections 4 and 5 must still operationalize exact definitions, sampling, variables, and scoring before execution begins.

---

## 2. Research Questions (Phase R2)

### 2.1 Primary Research Question

**RQ1:** Among sampled publicly published detection rules that detect an original ground-truth behavior or artifact, how robust are those rules against validated functionally equivalent mutations of the behavior or artifact they are intended to detect?

This is the primary research question for BrittleBench. It is empirical because each eligible rule can be evaluated against an original positive example and a bounded set of validated mutations derived from that example. It is falsifiable because the study can observe high robustness, low robustness, mixed robustness, or no meaningful degradation relative to original-example detection. The answer will be reported as a robustness-score distribution over the sampled corpus, with the exact scoring definition specified in Section 4.3 and the statistical plan specified in Section 5.7.

The question is intentionally limited to public detection content in the sampled corpus. It does not claim to measure all defensive detection quality, production SIEM performance, EDR behavior, or false-positive behavior on benign enterprise telemetry.

### 2.2 Secondary Research Questions

**RQ2:** How does robustness vary across the confirmatory Phase 1 rule families in the sampled corpus: native YARA, native Elastic detection rules, and high-fidelity Sigma-to-Elastic rules?

RQ2 is descriptive and exploratory for between-family interpretation because YARA rules operate on file/content artifacts while Elastic and Sigma-to-Elastic rules operate on event streams. Between-family robustness differences may reflect evaluator surface, data type, and mutation affordances rather than comparable rule quality. Confirmatory interpretation for RQ2 is therefore limited to within-family contrasts such as behavioral versus indicator-heavy rules, surface-form dependency characteristics, and mutation-class response patterns.

**RQ3:** How does robustness differ across public detection repositories after controlling for rule family, rule age, attack category, and other control variables defined in Section 5.5?

**RQ4:** Which observable rule characteristics are associated with lower robustness against validated functionally equivalent mutations?

Candidate characteristics include dependence on exact strings, exact command-line argument order, narrow file or path literals, hash or indicator-only matching, weak behavioral abstraction, and rule complexity. The final feature set must be operationalized in Section 5.3 and Section 5.5 before execution begins.

**RQ5:** Which mutation classes most frequently bypass public detection rules that otherwise detect the original ground-truth example?

Candidate mutation classes include string substitution, argument reordering, equivalent command syntax, encoding changes, variable or identifier renaming, alternate file paths, equivalent API or utility usage, and benign wrapper variation. The final mutation taxonomy must be defined in Section 4.4 and Section 5.1 before mutation generation begins.

**RQ6:** Is rule age associated with robustness after accounting for repository, format, attack category, and available maintenance signals?

Rule age will be measured from repository metadata only if that metadata can be collected reproducibly. Exact age definitions, maintenance variables, and exclusion rules are deferred to Section 5.2 and Section 5.5.

### 2.3 Question Hierarchy

The study is organized around RQ1. RQ2 through RQ6 are explanatory and diagnostic questions that decompose the robustness distribution observed for RQ1.

| Level | Question | Role in the study | Depends on |
|-------|----------|-------------------|------------|
| Primary | RQ1 | Estimates the overall robustness distribution of sampled public detection rules under validated functionally equivalent mutation. | Section 4 definitions; Section 5 sampling and scoring. |
| Secondary / exploratory for between-family claims | RQ2 | Describes robustness variation across rule families and supports confirmatory within-family contrasts. | RQ1 measurements; family labels from the sampling frame; construct boundary in Section 6.4. |
| Secondary | RQ3 | Tests whether repository-level differences remain after accounting for format and other controls. | RQ1 measurements; repository labels; controls in Section 5.5. |
| Secondary | RQ4 | Identifies rule characteristics associated with brittleness. | RQ1 measurements; feature extraction or manual coding protocol. |
| Secondary | RQ5 | Identifies mutation classes most associated with bypass outcomes. | RQ1 measurements; mutation taxonomy from Section 4.4. |
| Secondary | RQ6 | Tests whether older or less-maintained rules are more brittle. | RQ1 measurements; reproducible age and maintenance metadata. |

Questions outside this hierarchy are exploratory unless added before protocol lock. In particular, false-positive behavior on benign telemetry, production deployment performance, and author-level ranking are outside the confirmatory question hierarchy.

### 2.4 Falsifiability Check

Each research question has a meaningful null or negative outcome:

| Question | Null or negative result | Why still meaningful |
|----------|-------------------------|----------------------|
| RQ1 | Sampled rules remain highly robust, or robustness degradation is small under the validated mutation set. | This would provide evidence that public detection content generalizes better than expected under the study's mutation model and would still establish a reusable benchmark protocol. |
| RQ2 | No material robustness differences are observed across rule families or within-family feature strata. | This would suggest that brittleness is not primarily family-driven under the study's measurement surface and would redirect attention toward rule authoring practices, target behavior, or repository-level processes. |
| RQ3 | Repository identity is not associated with robustness after controls. | This would argue against repository-level quality claims and support aggregate, cross-repository guidance rather than repository ranking. |
| RQ4 | No measured rule characteristic reliably predicts brittleness. | This would show that the selected feature model is insufficient or that brittleness depends on interactions not captured by simple rule features, which is useful for future benchmark design. |
| RQ5 | No mutation class is disproportionately associated with bypass outcomes. | This would indicate that bypasses are distributed across mutation types rather than concentrated in a few failure modes, affecting how hardening guidance should be written. |
| RQ6 | Rule age is not associated with robustness after controls. | This would challenge the assumption that older rules are necessarily more brittle and would help separate age effects from format, repository, and maintenance effects. |

The study is publishable if it produces a reproducible corpus-selection protocol, mutation-validation process, scoring definition, and robustness distribution, even if expected differences are not observed. Any question that cannot be answered because of insufficient data availability, failed operationalization, or inadequate inter-rater reliability must be reported as a protocol limitation rather than silently dropped.

---

## 3. Hypotheses (Phase R3)

### 3.1 Hypotheses per Research Question

The hypotheses below are pre-analysis commitments. They are based on the mechanism implied by the research problem, not on any observed BrittleBench results. Any dataset-preparation work running in parallel must not be used to inspect robustness outcomes before this protocol is locked.

Notation:

- `RS` = robustness score as formally defined in Section 4.3.
- `RS_original` = detection outcome on the original ground-truth example.
- `RS_mutated` = detection outcome across validated functionally equivalent mutations.
- `median(RS)` = median robustness score over eligible rules in the relevant group.
- `Δ` = group difference in median or modeled expected robustness score, with the exact estimator defined in Section 5.7.

| ID | Linked RQ | Directional hypothesis |
|----|-----------|------------------------|
| H1 | RQ1 | Public detection rules that detect their original ground-truth example will show measurable robustness degradation when evaluated against validated functionally equivalent mutations. Formally, `median(RS) < 1.0` for the eligible sampled corpus. |
| H2 | RQ2 | Within each rule family where sample size permits, rules that rely on richer behavioral/logical conditions will have higher robustness than rules dominated by literal artifact matching. Between-family contrasts across YARA, Elastic, and Sigma-to-Elastic are exploratory because the underlying data surfaces are not directly comparable. |
| H3 | RQ3 | Robustness will differ by source repository after controlling for format, rule age, attack category, and other Section 5.5 controls. Formally, repository-level effects remain non-zero in the planned model. |
| H4 | RQ4 | Rules with narrow surface-form dependencies, such as exact strings, exact command-line order, literal paths, hashes, or indicator-only matching, will have lower robustness than rules with more behavioral abstraction. Formally, surface-form dependency indicators have negative association with `RS`. |
| H5 | RQ5 | Mutation classes that alter surface syntax while preserving behavior, especially command syntax variation, argument reordering, string substitution, and encoding variation, will account for a disproportionate share of bypass outcomes. Formally, bypass probability differs by mutation class. |
| H6 | RQ6 | Older or less recently maintained rules will have lower robustness after accounting for repository, format, and attack category. Formally, rule age has a negative association with `RS`, while recent maintenance has a positive association where maintenance metadata is available. |

### 3.2 Null Hypotheses

| ID | Linked hypothesis | Null hypothesis |
|----|-------------------|-----------------|
| H0-1 | H1 | Eligible public detection rules that detect the original ground-truth example do not show measurable robustness degradation under validated functionally equivalent mutation. Formally, `median(RS) = 1.0` or any observed degradation is below the minimum effect of interest in Section 3.3. |
| H0-2 | H2 | Within-family robustness does not differ materially by behavioral/logical abstraction versus literal artifact matching after planned adjustment. Between-family contrasts remain descriptive/exploratory. |
| H0-3 | H3 | Repository identity is not materially associated with robustness after controlling for format, rule age, attack category, and other Section 5.5 controls. |
| H0-4 | H4 | Surface-form dependency indicators are not materially associated with lower robustness after controls. |
| H0-5 | H5 | Bypass probability does not materially differ by mutation class; bypass outcomes are not concentrated in any planned mutation class. |
| H0-6 | H6 | Rule age and maintenance recency are not materially associated with robustness after controls. |

Failing to reject a null hypothesis is an acceptable result. It must be reported as such and must not be reframed as support for an unregistered alternative after results are known.

### 3.3 Expected Effect Sizes

This section defines minimum effects of interest for planning and interpretation. These are not observed values and must be revisited only before protocol lock if Section 5.8 estimation precision planning shows that the planned sample cannot estimate them responsibly.

| Hypothesis | Minimum effect of interest | Rationale |
|------------|----------------------------|-----------|
| H1 | A corpus-level median robustness score at least `0.10` below perfect robustness, or an equivalent modeled degradation of at least 10 percentage points from original-example detection to mutation detection. | Smaller degradation may be statistically detectable in a large corpus but may not be practically meaningful for detection engineering prioritization. |
| H2 | A within-family robustness difference of at least `0.10` in median or modeled expected robustness score between behavioral/logical rules and literal or indicator-heavy rules. | Cross-family comparisons are construct-limited because YARA and event-rule families operate on different data surfaces; confirmatory claims should be made within comparable families. |
| H3 | A between-repository adjusted robustness difference of at least `0.10`. | Repository-level interpretation is sensitive and should not be based on trivial differences. |
| H4 | A negative association equivalent to at least `0.10` lower expected robustness for rules with a surface-form dependency characteristic, after controls. | Rule-characteristic findings should be actionable; smaller associations may be reported descriptively but not emphasized as confirmatory. |
| H5 | A mutation-class bypass-rate difference of at least `10` percentage points between at least two planned mutation classes. | Mutation guidance should identify failure modes with operationally visible differences, not noise-level variation. |
| H6 | A robustness difference of at least `0.10` between planned age or maintenance strata, or an equivalent modeled age/maintenance effect defined in Section 5.7. | Age claims should be conservative because repository metadata may be noisy and rule age may proxy for other factors. |

The default practical-significance threshold for robustness-score differences is therefore `0.10`. Section 5.7 must specify exact estimators, confidence intervals, multiplicity adjustment, and model forms. Section 5.8 must check whether the final sample size can estimate the effects above with acceptable uncertainty.

### 3.4 Pre-Registered Predictions

The following predictions are the confirmatory claims to be included in the public pre-registration record before Phase E begins:

1. The eligible sampled corpus will have `median(RS) < 1.0`, indicating measurable degradation from original-example detection under validated functionally equivalent mutation.
2. At least one planned within-family comparison between behavioral/logical rules and literal or indicator-heavy rules will show a robustness difference meeting or exceeding the `0.10` minimum effect of interest. Between-family comparisons will be reported as exploratory/descriptive only.
3. At least one planned source-repository comparison will show an adjusted robustness difference meeting or exceeding the `0.10` minimum effect of interest.
4. Rules with surface-form dependency characteristics will have lower expected robustness than rules without those characteristics, after controls.
5. Bypass outcomes will be unevenly distributed across planned mutation classes, with at least one class differing by 10 percentage points or more from another planned class.
6. Older or less recently maintained rules will show lower expected robustness than newer or recently maintained rules, subject to metadata availability and the age/maintenance operationalization in Section 5.5.

Analyses not mapped to these predictions are exploratory unless added before protocol lock. Examples of exploratory analyses include author-level comparisons, false-positive behavior on benign telemetry, model-provider comparisons for mutation generation, and post-hoc mutation subclasses discovered during manual review.

---

## 4. Definitions and Operationalization (Phase R4)

> _See also: [docs/glossary.md](docs/glossary.md) for the full terminology table._

### 4.1 "Detection Rule" — Formal Definition

A **detection rule** is a machine-readable artifact that expresses conditions intended to identify a malicious or suspicious behavior, file, or event from observable security telemetry or file content.

For Phase 1 confirmatory analysis, eligible detection rules are limited to three evaluator families:

| Family | Eligible sources | Validation path | Confirmatory status |
|--------|------------------|-----------------|---------------------|
| Native YARA | Public `.yar`, `.yara`, or YARA-compatible `.rule` files from retained YARA sources. | Native `yara` CLI and `yara-python`, with required modules/imports/external variables explicitly configured. | Confirmatory after compile validation. |
| Native Elastic | Non-deprecated Elastic detection rules from `elastic/detection-rules` normal `rules/` paths. | Self-managed Elastic Stack + Kibana detection engine using native KQL/EQL/ESQL rule semantics where supported. | Confirmatory after import and query validation. |
| Sigma translated to Elastic | Sigma rules from normal `rules/` and, if retained, `rules-emerging-threats/` paths. | Translation to Elastic-compatible KQL/EQL only when translation fidelity is high and auditable. | Confirmatory only for high-fidelity translations. |

The Elastic/Kibana validation environment is a self-managed Elastic Stack test harness. Elastic documentation states that new self-managed installations default to a non-expiring Basic license, and Elastic's licensing FAQ states that free portions of Elasticsearch and Kibana source are available with AGPLv3 as an option alongside SSPL and Elastic License 2.0 while Elastic release distributions remain under Elastic's licensing model. Therefore this protocol describes the evaluator as **self-managed Elastic/Kibana under a pinned version and recorded license state**, not generically as an "open-source SIEM." See Elastic's [licensing FAQ](https://www.elastic.co/pricing/faq/licensing/), [self-managed license documentation](https://www.elastic.co/guide/en/kibana/current/managing-licenses.html), and Kibana [detection rule API documentation](https://www.elastic.co/docs/api/doc/kibana/v8/operation/operation-createrule).

A **high-fidelity Sigma-to-Elastic translation** is a translation that satisfies all required checks below:

- The pySigma backend produces no warnings or errors for the selected Elastic target.
- Every referenced field resolves to a known ECS field through a documented mapping table.
- A reviewer confirms that the translated query preserves the original Sigma detection intent.
- If a native Sigma evaluator or equivalent reference evaluator is available for the original positive example, the translated Elastic rule detects the same original positive example.

An **original ground-truth positive example** is the baseline artifact or event representation that the rule is expected to detect before any mutation outcome can be scored. For native YARA, this is a file artifact meeting the safety and restriction requirements in Section 8. For native Elastic, this is an ECS event document derived from Atomic Red Team, public PoC captures, public detection-test fixtures, or a hand-crafted reproduction with documented provenance and field mapping. For Sigma-to-Elastic, this is the same kind of ECS event document used for Elastic validation after high-fidelity translation.

Inclusion criteria:

- The rule source is public, citable, and locally snapshotted.
- The rule is parseable in its native or selected translated format.
- The rule has a concrete detection condition, not only documentation.
- The rule can be associated with a target behavior, artifact, technique, or file characteristic.
- The rule has or can be paired with at least one ground-truth positive example under the ethical constraints in Section 8.
- The rule can be evaluated in the selected Phase 1 evaluator without unsupported proprietary enrichment, closed telemetry, or inaccessible runtime context.

Exclusion criteria:

- Deprecated, unsupported, placeholder, test-only, template-only, documentation-only, or example-only rules.
- Elastic building-block rules and promotion/vendor-alert wrapper rules.
- Elastic Protections behavior rules, Falco rules, Wazuh/OSSEC XML rules, Splunk SPL, Microsoft Sentinel KQL, Chronicle YARA-L, Snort, and Suricata rules from confirmatory Phase 1. These may be future or exploratory sources.
- YARA rules that do not compile under the pinned native YARA environment after documented imports/modules/external variables are configured.
- Sigma rules whose Elastic translation drops required logic, placeholders, aggregations, correlations, backend-specific semantics, or field mappings in a way that changes detection intent.
- Rules for which no acceptable ground-truth positive example can be obtained or constructed. This handling is resolved for Phase 1 by DEC-0006 in [DECISIONS.md](DECISIONS.md).

Rules excluded from confirmatory analysis may still be described in corpus accounting and may be used in exploratory analysis if clearly labeled.

### 4.2 "Functional Equivalence" — Formal Definition

A **functional-equivalent mutation** is a modified artifact or event representation that preserves the attacker-relevant behavior targeted by the parent rule while changing non-essential surface form.

A mutation is functionally equivalent only if all conditions below hold:

- **Same detection intent:** The mutation still represents the same behavior, artifact family, or technique that the rule is intended to detect.
- **Same observable surface:** The mutation remains visible through the same evaluator family. A YARA file mutation remains a file/content artifact; an Elastic/Sigma event mutation remains an ECS-compatible event or event sequence.
- **No novel capability:** The mutation does not add a new exploit, malware capability, persistence mechanism, privilege escalation path, or attacker goal not present in the parent example.
- **No semantic downgrade:** The mutation does not remove the malicious or suspicious behavior that made the original example a positive case.
- **Evaluator-ready representation:** The mutation can be represented in the evaluator input format without relying on production SIEM, EDR, or enterprise-only telemetry.
- **Reviewable rationale:** The mutation has a recorded explanation of what changed and why the change is behavior-preserving.

Functional equivalence is verified through a three-gate process:

| Gate | Purpose | Required outcome |
|------|---------|------------------|
| Static consistency check | Confirm the mutation is parseable and belongs to the same evaluator family as the parent. | Pass/fail. Failed mutations are excluded. |
| Behavioral review | Confirm the mutation preserves attacker-relevant behavior and does not introduce new technique content. | At least one reviewer approval; R5.7 defines inter-rater process if manual review is used. |
| Positive-control check | Confirm the original parent example is detected by the target rule before mutated examples are scored. | Rules without original-example detection are excluded from robustness scoring for that parent example. |

For event/log rules, a mutation may alter fields such as command-line spelling, argument order, path form, process ancestry representation, casing, encoding, or equivalent utility usage only when the resulting event still represents the same behavior under the same schema. For YARA rules, a mutation may alter non-essential strings, sections, metadata, packing-related surface features, or file layout only when the mutated sample remains a valid member of the same target artifact class and is safe to handle under Section 8.

Ambiguous mutations are excluded from confirmatory scoring and logged as validation failures or exploratory cases. Exclusion is preferable to counting a questionable bypass.

### 4.3 "Robustness Score" — Formal Definition

The **robustness score** measures how often a rule continues to detect validated functionally equivalent mutations after detecting its original ground-truth example.

For a rule `r` with an original positive example `o` and a validated mutation set `M_r = {m_1, ..., m_n}`, where `M_r` is drawn from a fixed mutation-class profile:

```text
detect(r, x) = 1 if rule r fires on example x, else 0
eligible(r) = detect(r, o) = 1 and n >= n_min and mutation_profile(r) complete
RS(r) = (Σ detect(r, m_i)) / n, for all m_i in M_r
```

Where:

- `n_min = 10` is the minimum number of validated mutations required per rule for confirmatory scoring.
- The default mutation profile is `10` validated mutations per rule: `2` mutations from each of `5` predeclared mutation classes applicable to the rule family.
- If a mutation class is not meaningful for a rule family, the rule-family-specific profile must define the substitute class before execution; post-hoc substitution after observing outcomes is not allowed.
- Mutations that fail functional-equivalence validation are removed from the denominator.
- Mutations that cannot be evaluated because of evaluator failure are not counted as bypasses unless the failure is caused by the rule's own unsupported semantics; Section 5.7 must define the exact failure accounting.
- Rules that fail the original positive-control check are excluded from confirmatory robustness scoring and reported separately.

Aggregate scores:

```text
RS_group = median RS(r) over eligible rules in a group
BypassRate_group = 1 - RS_group
```

Groups may be source repository, rule family, ATT&CK tactic/technique, rule characteristic, mutation class, or age/maintenance stratum. The primary confirmatory aggregate is the median rule-level robustness score over eligible Phase 1 rules. Means may be reported as secondary descriptive statistics but the median is preferred because robustness scores are bounded and may be highly skewed.

Rules with no obtainable ground-truth positive example are excluded from confirmatory scoring and counted in a coverage/exclusion table, following DEC-0006.

If the pre-lock pilot shows that `n_min = 10` is infeasible for one or more rule families, the protocol must be revised before lock per Section 9.3 falsification language to document the precision tradeoff and to downscope confirmatory claims rather than silently accepting coarser scores.

### 4.4 "Brittleness Pattern" — Formal Definition

A **brittleness pattern** is a recurring rule-failure mechanism where a validated functionally equivalent mutation is not detected because the rule depends on a narrow representation of the target behavior.

Patterns are assigned at the rule-mutation evaluation level and may later be aggregated by rule, source, format, or repository. Initial Phase 1 pattern categories are:

| Pattern | Operational definition |
|---------|------------------------|
| Exact string dependency | Bypass occurs after changing a literal string, filename, path, registry key, command fragment, domain, URL, or other exact token while preserving behavior. |
| Argument-order dependency | Bypass occurs after reordering equivalent command-line arguments or equivalent syntax elements. |
| Encoding/casing dependency | Bypass occurs after behavior-preserving encoding, quoting, escaping, or case changes. |
| Narrow path/process dependency | Bypass occurs after changing executable path, parent process, working directory, or process name representation while preserving the behavior being modeled. |
| Indicator-only dependency | Bypass occurs because the rule depends on hashes, fixed IOCs, or single artifacts rather than behavioral structure. |
| Field-mapping dependency | Bypass occurs because equivalent behavior lands in a different field, schema representation, or translation mapping than the rule expects. |
| Translation-loss dependency | Bypass occurs because a translated Sigma rule lost required semantics during conversion to Elastic-compatible logic. |
| Evaluator unsupported semantics | The rule or mutation cannot be evaluated faithfully because the selected evaluator lacks required semantics. This is reported separately from true bypasses unless Section 5.7 defines it as an analysis stratum. |
| No pattern assigned | The bypass cannot be confidently attributed to a predefined pattern. |

For confirmatory analysis, the primary brittleness-pattern unit is a single failed rule-mutation pair. A rule may have multiple brittleness patterns if different mutation classes bypass it through different mechanisms. Manual pattern assignment requires a coding guide and reliability check in Section 5.7 before confirmatory use.

The locked mutation-profile shape is `5` classes per rule family and `2` validated mutations per class. Exact class definitions must be finalized during the pre-lock pilot, but the profile shape is locked before execution.

| Rule family | Locked mutation-class profile shape |
|-------------|-------------------------------------|
| YARA file-content rules | String-literal substitution; section/metadata changes; packing/encoding variation; structural layout changes; behavioral-equivalent code paths. |
| Elastic and Sigma-to-Elastic event-rule families | Argument-order variation; command-syntax variation; encoding/casing changes; path/process substitution; equivalent-API/utility substitution. |

Operational definitions for each class, including edge cases and representative examples, must be finalized during the pre-lock pilot and committed to [DECISIONS.md](DECISIONS.md) before main execution. Once committed, these definitions are frozen for confirmatory Phase 1.

If more than `20%` of true bypasses receive `No pattern assigned`, the brittleness taxonomy is inadequate for confirmatory RQ5 interpretation. RQ5 must then be revised before lock or demoted to exploratory reporting.

### 4.5 Unit of Analysis

The study uses multiple units of analysis, with the primary unit chosen to match each research question:

| Unit | Definition | Used for |
|------|------------|----------|
| Rule | One eligible detection rule after parsing, filtering, and deduplication. | Primary robustness distribution, repository/family comparisons, age analysis. |
| Rule-mutation pair | One eligible rule evaluated against one validated functionally equivalent mutation. | Bypass counting, mutation-class analysis, brittleness-pattern assignment. |
| Rule-source group | Eligible rules grouped by repository, format, or source family. | RQ2 and RQ3 aggregate comparisons. |
| Mutation class | A predefined category of behavior-preserving mutation. | RQ5 and brittleness-pattern analysis. |

The primary confirmatory unit for RQ1, RQ2, RQ3, RQ4, and RQ6 is the **rule-level robustness score** `RS(r)`. The primary confirmatory unit for RQ5 is the **rule-mutation pair**, because mutation-class effects are observed at the individual mutation outcome level.

Section 5.7 must account for non-independence: multiple mutations belong to the same rule, multiple rules come from the same repository, and multiple repositories may share upstream logic or derived content. Statistical models must therefore avoid treating all rule-mutation pairs as independent observations without clustering, mixed effects, or equivalent correction.

---

## 5. Methodology Design (Phase R5)

### 5.1 Methodological Approach

BrittleBench uses a preregistered, corpus-based, quasi-experimental robustness study. The study observes public detection rules as they exist in published repositories, then applies a controlled mutation treatment to ground-truth-positive examples associated with those rules. The treatment is not applied to the rules themselves; it is applied to the attack representation or artifact that the rule is expected to detect.

The confirmatory Phase 1 workflow is:

1. Snapshot public rule sources listed in [docs/rule-source-inventory.md](docs/rule-source-inventory.md), recording repository URL, retrieval method, commit hash or release tag, retrieval date, license, and local path.
2. Normalize the inventory into rule-level metadata without changing rule logic.
3. Apply inclusion and exclusion gates from Section 4.1 and Section 5.2.
4. Validate that each candidate rule detects its original ground-truth-positive example in the selected evaluator.
5. Generate a bounded set of functionally equivalent mutations for each eligible original example.
6. Review mutations through the functional-equivalence gates in Section 4.2.
7. Evaluate each rule against its validated mutation set using the same evaluator family used for original-example validation.
8. Compute rule-level robustness score, group-level robustness distributions, and brittleness-pattern labels.
9. Report exclusions, evaluator failures, translation failures, and unsupported-semantics failures separately from true bypasses.

The confirmatory evaluators are:

| Rule family | Confirmatory evaluator | Scope note |
|-------------|------------------------|------------|
| YARA | Native `yara` CLI and `yara-python` under a pinned version | File/object matching only; compile failures are fixed or excluded with reason. |
| Elastic detection rules | Self-managed Elastic Stack + Kibana under pinned version and recorded license state | Native Elastic rule execution against synthetic ECS event documents. |
| Sigma | Sigma translated to Elastic-compatible query/rule form, then evaluated in the Elastic/Kibana harness | Confirmatory only when translation is high-fidelity and field mappings are explicit. |

The following are exploratory unless admitted by a later locked protocol amendment: YARA-to-EQL, YARA-L, Snort/Suricata-to-YARA-L, Falco/Wazuh-to-YARA-L, Splunk SPL, Sentinel KQL, Chronicle YARA-L, and Elastic Protections behavior artifacts. Exploratory results may be described in appendices but must not be mixed into the confirmatory robustness estimates.

High-fidelity Sigma-to-Elastic translation is operationalized by the four checks in Section 4.1. A translated Sigma rule enters confirmatory scoring only if those checks pass before mutation scoring begins.

Pre-execution LLM validation:

- Before lock, run a labeled pilot set through the intended LLM mutation generator.
- The labeled pilot reference set must contain at least `100` mutations spanning all five mutation classes per family, must be labeled against the Section 4.2 functional-equivalence gates by the reviewer(s) before the LLM is run against it, and must include intentionally invalid mutations such as semantic drift and novel-capability examples as negative controls. The labeling rubric must match Section 4.2 exactly.
- The LLM must achieve at least a `70%` mutation-validity rate on the labeled pilot set to support the planned execution design.
- If validity is below `70%` but at least `60%`, the protocol must either improve prompting/review procedures before lock or downscope the planned sample.
- If validity is below `60%`, the mutation-generation design fails the falsification criterion in Section 9.3.
- The selected model/provider/version must be pinned where the API exposes versioning. If the provider updates or retires the model mid-execution, execution pauses until a bridging pilot compares old and new behavior; affected results are labeled separately unless equivalence is documented.
- A secondary model comparison on a `10%` subsample is recommended as a sensitivity analysis. If this comparison would require more than two weeks of additional setup, it is a human decision before lock rather than a mandatory execution commitment.

All LLM prompts and responses must be cached with content-addressable storage as specified in Section 6.5.

### 5.2 Sampling Strategy

Phase 1 uses a stratified eligible-corpus design. All collected public rules are inventoried, then the confirmatory sample is drawn from eligible rules after parsing, deduplication, evaluator compatibility checks, and original-example validation. The primary strata are rule family: YARA, Elastic native, and Sigma-to-Elastic.

Mandatory pre-lock pilot:

- Before protocol lock, run `20` to `30` rules end-to-end across all three confirmatory families where feasible.
- The pilot is preparatory feasibility work, not confirmatory execution, and its robustness outcomes must not be used to support final research claims.
- The pilot must estimate attrition at each funnel stage: collected -> parsed -> deduplicated -> evaluator-compatible -> original-positive validated -> at least `10` validated mutations.
- The pilot must record time per rule, reviewer burden, mutation-validity rate, evaluator failure rate, and taxonomy `No pattern assigned` rate.
- If the pilot funnel projection yields fewer than `200` eligible rules from realistic collection, the protocol must be downscoped before lock.

Snapshot policy:

- The Phase 1 corpus snapshot cutoff is `2026-05-25`.
- Each source must be recorded with commit hash, release tag, or immutable archive checksum where available.
- If a source must be re-downloaded before protocol lock, the new snapshot must replace the old one only through a logged decision in [DECISIONS.md](DECISIONS.md) and a protocol-change entry in [CHANGELOG.md](CHANGELOG.md).
- Rules added upstream after the cutoff are excluded from confirmatory Phase 1 and may be considered only in later replication work.

Inclusion criteria:

- Publicly accessible and citable source with license or redistribution terms recorded.
- Rule parses into a rule-level record with source, path, identifier, format, and detection logic.
- Rule belongs to one of the Phase 1 confirmatory families: native YARA, native Elastic, or Sigma with high-fidelity Elastic translation.
- Rule has or can be paired with a ground-truth-positive example that is legal and safe to evaluate locally.
- The original example is detected by the rule in the selected evaluator.
- The rule has at least `n_min = 10` validated functionally equivalent mutations available after review, using the fixed mutation-class profile.

Exclusion criteria:

- Deprecated, unsupported, placeholder, example-only, documentation-only, or test rules.
- Elastic building-block rules, promotion rules, and vendor-alert wrapper rules.
- Rules requiring proprietary telemetry, proprietary malware samples, cloud-only services, paid-only features, or private threat-intelligence feeds.
- Rules whose translation to Elastic loses required semantics, unresolved field mappings, or detection logic.
- Rules with no obtainable ground-truth-positive example.
- Duplicate rules after canonicalization of source, title/ID, normalized logic, and upstream lineage.

Sampling target:

- Prefer exhaustive inclusion of all eligible rules in each confirmatory stratum.
- If a stratum remains too large for the mutation budget, use stratified random sampling within that stratum by repository, rule age/maintenance band, and ATT&CK tactic/technique when available.
- The planning target is at least `300` eligible rules total and at least `75` eligible rules per major confirmatory stratum where the corpus supports it.
- Each eligible rule receives `10` validated mutations as both the target and minimum for confirmatory scoring.
- Each eligible rule should receive a fixed mutation-class profile of `2` mutations from each of `5` predefined classes. Rule-family-specific substitutions must be defined before execution if a class is not meaningful for that family.
- The YARA file-content profile covers string-literal substitution, section/metadata changes, packing/encoding variation, structural layout changes, and behavioral-equivalent code paths.
- The Elastic and Sigma-to-Elastic event-rule profile covers argument-order variation, command-syntax variation, encoding/casing changes, path/process substitution, and equivalent-API/utility substitution.
- The exact class definitions must be finalized during the pre-lock pilot, but the profile shape of `5` classes per family and `2` mutations per class is locked.

Sampling limitations must be reported as first-class results: number collected, number parsed, number deduplicated, number evaluator-compatible, number original-positive, number mutation-eligible, and number included in final confirmatory scoring.

### 5.3 Independent Variables

The primary independent variables are defined before execution and measured from source metadata, normalized rule records, evaluator metadata, and mutation-review records.

| Variable | Operational definition | Measurement method | Planned use |
|----------|------------------------|--------------------|-------------|
| Rule family | Native detection ecosystem used for confirmatory evaluation: YARA, Elastic, Sigma-to-Elastic | Parser and evaluator assignment | RQ2 descriptive family comparison and within-family H2 stratification |
| Source repository | Public repository or source bundle from which the rule was collected | Snapshot manifest | RQ3/H3 repository comparison |
| Rule age | Time between first observed commit/date for the rule and corpus cutoff | Git history, release metadata, or file metadata fallback | RQ6/H6 age analysis |
| Maintenance recency | Time between most recent rule-relevant change and corpus cutoff | Git history or source metadata | RQ6/H6 maintenance analysis |
| Attack category | ATT&CK tactic/technique, malware family, or detection category when available | Rule metadata and manual normalization | Control and stratification |
| Detection-logic type | Behavioral, indicator-only, hybrid, or structural/file-signature | Rule-feature coding guide | RQ4/H4 brittleness predictors |
| Mutation class | Type of functionally equivalent change applied to the original example, assigned through the fixed mutation-class profile | Mutation taxonomy and review label | Controlled design feature; RQ5/H5 mutation-effect analysis (analyzed at the rule-mutation pair unit per Section 4.5). |
| Rule complexity | Approximate number of logical conditions, selectors, atoms, strings, clauses, or query terms | Format-specific complexity extractors | Control and sensitivity analysis |
| Translation status | Native, high-fidelity translation, lossy translation, or unsupported translation | Translator output and review | Inclusion gate and sensitivity analysis |
| LLM provider/model | Provider and model used to propose mutations | Mutation manifest | Controlled metadata; not a primary claim unless multiple providers are used. Any provider relationship such as credits, compute, or employment must be disclosed per Section 8.6. |

If metadata is unavailable or unreliable for a variable, that variable is marked missing rather than inferred from rule content without evidence.

Mutation-class stratification is a controlled design feature, not merely observed metadata. The default profile is `2` validated mutations from each of `5` predeclared classes per eligible rule. This is intended to reduce bias from variable mutation difficulty and to make rule-level robustness scores more comparable.

### 5.4 Dependent Variables

The primary dependent variable is the rule-level robustness score defined in Section 4.3.

| Variable | Unit | Scale | Measurement method |
|----------|------|-------|--------------------|
| Rule-level robustness score `RS(r)` | Rule | Continuous bounded `[0, 1]` | Fraction of validated mutations detected by the rule |
| Rule-mutation detection outcome | Rule-mutation pair | Binary | `1` if detected by evaluator, `0` if not detected |
| Rule-level bypass rate | Rule | Continuous bounded `[0, 1]` | `1 - RS(r)` |
| Group robustness score | Format, repository, age band, mutation class, or other stratum | Continuous bounded `[0, 1]` | Median and distribution of `RS(r)` within group |
| Mutation eligibility count | Rule | Count | Number of generated mutations passing functional-equivalence review |
| Brittleness-pattern frequency | Rule-mutation pair and rule | Count/proportion | Manual or rule-assisted label assigned to bypass cases |
| Evaluator failure rate | Rule and evaluator family | Count/proportion | Failures caused by evaluator setup, unsupported semantics, or execution errors |
| Translation failure rate | Source rule and translated rule | Count/proportion | Translation unavailable, lossy, or semantically unsupported |

True bypasses are counted only when the original example is detected, the mutation passes functional-equivalence review, the evaluator executes successfully, and the mutated example is not detected.

### 5.5 Control Variables

Controls are used either by design, by stratification, or by statistical adjustment.

Held constant by design:

- Evaluator version per rule family.
- Elastic/Kibana deployment configuration for Elastic and Sigma-to-Elastic evaluations.
- ECS field mapping for synthetic event documents.
- Original-positive requirement before mutation scoring.
- Mutation-review gates for functional equivalence.
- Minimum mutation count `n_min = 10` for confirmatory scoring, with fixed mutation-class profile.
- Random seeds for sampling, ordering, and bootstrap procedures where randomness is used.

Controlled or adjusted in analysis:

| Control | Measurement |
|---------|-------------|
| Rule family | Confirmatory evaluator assignment |
| Source repository | Snapshot manifest |
| Rule age and maintenance recency | Git/source metadata with missingness reported |
| Attack category | Rule metadata and normalized taxonomy |
| Rule complexity | Format-specific complexity metrics |
| Detection-logic type | Coding guide labels |
| Mutation class | Mutation manifest and review labels |
| Ground-truth source type | File artifact, synthetic ECS event, command/event representation, or other approved positive example |
| Translation status | Native versus high-fidelity translated |

Controls that cannot be measured reliably are moved to Section 5.6 as confounders and discussed again in Section 7.

### 5.6 Confounders and Mitigation

The main expected confounders are:

| Confounder | Confounding pathway | Mitigation | Residual risk |
|------------|---------------------|------------|---------------|
| Translation loss | Sigma-to-Elastic results may fail because translation changed semantics, not because the original rule was brittle | Include only high-fidelity translations in confirmatory analysis; report translation failures separately | Some semantic drift may remain invisible |
| Ground-truth availability | Rules with available examples may differ systematically from rules without examples | Report coverage funnel; avoid claiming results generalize to excluded rules | Final corpus may overrepresent well-documented detections |
| LLM training-data contamination | Mutation LLM may have seen included rules or their associated samples during training, biasing mutations toward LLM-expected forms rather than realistic attacker variations | Record model training cutoff date; report alongside corpus cutoff; treat as named residual risk in Section 7.4 | Cannot fully eliminate without open-weights model with known training data |
| Repository style | Some repositories publish broad behavioral rules while others publish narrow indicators | Stratify by repository and adjust for detection-logic type | Repository and style may remain entangled |
| Rule age metadata noise | Commit history may reflect repository migration, formatting, or bulk updates rather than detection age | Use first-seen and last-relevant-change fields where possible; sensitivity analysis excluding noisy age records | Age claims may be weaker than format/repository claims |
| Mutation difficulty variation | Some original examples may be easier to mutate while preserving function | Record mutation class and eligibility count; require minimum validated mutations; compare by mutation class | Hard-to-mutate rules may be excluded |
| Evaluator mismatch | Local evaluator behavior may differ from production deployment behavior | Use pinned local evaluator; document configuration; keep claims scoped to the harness | Production SIEM behavior is not directly measured |
| Duplicated upstream logic | Repositories may copy or derive rules from each other | Deduplicate exact/near-identical logic and record upstream lineage where visible | Hidden derivation may remain |
| Manual reviewer bias | Functional-equivalence and brittleness-pattern labels may reflect reviewer judgment | Use coding guide, blinded review where feasible, and reliability checks in Section 5.7 | Solo-researcher constraints limit independent review capacity |

These confounders are expanded in [docs/threats-to-validity.md](docs/threats-to-validity.md) during Phase R7.

### 5.7 Statistical Methods

All confirmatory estimates are reported with uncertainty intervals and exclusion counts. The default alpha level is `0.05`, but interpretation emphasizes effect sizes and confidence intervals over binary significance.

Primary summaries:

- Overall robustness distribution: median, interquartile range, mean, standard deviation, and empirical CDF of `RS(r)`.
- Rule-level bounded outcomes: given that `RS(r)` is effectively an 11-point ordinal scale at `n = 10`, the analysis cascade is quasi-binomial GLM with logit link treating successes out of `n` as the outcome (primary); fractional logit and beta regression (sensitivity); and ordinal regression (further sensitivity if pilot diagnostics show substantial ties or boundary mass).
- Rule-mutation outcomes: mixed-effects logistic regression with rule-level random intercepts as the primary mutation-level model.
- Repository-level effects: sensitivity analysis using repository-level random intercepts only if at least `5` repositories have at least `20` eligible rules each and the variance component does not estimate to a boundary value. Otherwise repository effects are reported descriptively with cluster-robust standard errors.
- Group comparisons: median difference and bootstrap confidence interval for robustness-score differences.

Hypothesis mapping:

| Hypothesis | Planned method |
|------------|----------------|
| H1 | Estimate overall `RS(r)` distribution and compare median robustness against the minimum practical-effect framing from Section 3.3. |
| H2 | Estimate within-family associations between detection-logic abstraction and `RS(r)` using quasi-binomial GLM with logit link (primary) and bootstrap contrasts. Fractional logit and beta regression are sensitivity analyses. Between-family comparisons are exploratory/descriptive. |
| H3 | Estimate repository effects with covariate adjustment and cluster-aware uncertainty. |
| H4 | Model association between detection-logic features and bypass probability. |
| H5 | Compare bypass probability across mutation classes using rule-clustered models. |
| H6 | Estimate age/maintenance effects with sensitivity analysis for noisy metadata. |

Multiplicity:

- H1 is its own hypothesis family and is interpreted without multiplicity correction.
- H2 through H6 form a second confirmatory family controlled using Benjamini-Hochberg false-discovery-rate correction at `alpha = 0.05`.
- Within-hypothesis contrasts, such as pairwise within-family contrasts or mutation-class contrasts, form sub-families with separate Benjamini-Hochberg false-discovery-rate correction.
- Exploratory comparisons, including between-family YARA-versus-event-rule contrasts, are labeled exploratory and reported separately.

Manual review reliability:

- A coding guide must define functional-equivalence approval and brittleness-pattern labels before mutation review begins.
- Before main execution, run a reviewer-drift pilot on a labeled reference set that includes accepted mutations, rejected mutations, ambiguous mutations, and brittleness-pattern examples from all confirmatory families. The reviewer-drift pilot reference set must include at least `50` examples per confirmatory family covering all label categories: accepted, rejected, ambiguous, and each brittleness-pattern type.
- Confirmatory mutation review requires an independent second reviewer for a subsample of at least `300` mutation-review decisions, with Cohen's kappa reported for categorical labels and raw agreement reported for binary approval decisions.
- The `>=300`-decision reliability sample must include detection-logic type classifications from Section 5.3, not only mutation-approval and brittleness-pattern decisions, because H2's confirmatory within-family contrast depends on this classification.
- If no independent second reviewer can be recruited before lock, the protocol must explicitly downscope confirmatory N to the portion that can be independently reviewed, and the remainder must be labeled exploratory.
- Kappa is computed and reported per decision type: mutation approval, brittleness pattern, and detection-logic type. The lowest stratum kappa gates the affected analysis. For example, if mutation-approval kappa is `0.75` but brittleness-pattern kappa is `0.55`, RQ5 and brittleness-pattern analyses are demoted to exploratory while RQ1 and RQ4 analyses remain confirmatory. Each RQ's gating depends on which decision-type kappas its analysis requires. Failing strata are demoted to exploratory while passing strata remain confirmatory.
- If Cohen's kappa is below `0.6`, the coding guide must be revised and review repeated before confirmatory analysis proceeds; otherwise affected mutation-review analyses are demoted to exploratory.

Failure accounting:

- Evaluator infrastructure failures are excluded from bypass counts and reported separately.
- Unsupported rule semantics are excluded from confirmatory scoring unless the rule had already passed the original-positive gate and the unsupported behavior is part of the measured deployment limitation.
- Translation failures are never counted as detection bypasses.

### 5.8 Estimation Precision Plan

The Phase 1 estimation precision plan is based on estimation precision and practical-effect thresholds rather than assuming a known robustness-score distribution before data collection. This is not a classical NHST power analysis.

Planning assumptions:

- Minimum practical robustness-score difference from Section 3.3: `0.10`.
- Target validated mutations per rule: `10`.
- Minimum validated mutations per rule: `10`.
- Target eligible confirmatory sample: at least `300` rules total.
- Target per major stratum: at least `75` eligible rules where available.
- Desired bootstrap confidence-interval half-width for major group median robustness estimates: approximately `0.05` where the empirical distribution permits.

Decision rules before protocol lock:

- If the mandatory pre-lock pilot projects fewer than `200` eligible rules from realistic collection, the protocol must be downscoped before lock.
- If fewer than `150` total eligible confirmatory rules remain after original-positive validation during execution, Phase 1 becomes a pilot study and confirmatory claims are narrowed.
- If a major rule-family stratum has fewer than `50` eligible rules, that stratum is reported descriptively and excluded from planned within-family contrasts.
- If fewer than `10` validated mutations are available for a rule, the rule is excluded from confirmatory robustness scoring but remains in the coverage funnel.
- If mutation-review or evaluator cost makes the `10`-mutation target infeasible, the protocol must be amended before lock or the affected analysis must be labeled exploratory.

The final pre-execution estimation precision check must simulate or bootstrap from the locked eligible-corpus structure before mutation generation begins. That check must be logged in [DECISIONS.md](DECISIONS.md) and must not use post-treatment robustness outcomes.

The pre-execution estimation precision check must simulate from at least two prior scenarios for the rule-level `RS` distribution: an optimistic scenario such as `Beta(5, 2)` with expected `RS` approximately `0.71`, and a pessimistic scenario such as `Beta(2, 5)` with expected `RS` approximately `0.29`. The check passes if both scenarios yield bootstrap confidence-interval half-width no greater than `0.05` for the corpus-level median at the planned sample size.

---

## 6. Evidence and Validation (Phase R6)

### 6.1 Evidence Standards

BrittleBench requires rule-level evidence before a rule can enter confirmatory scoring. A rule is not scored merely because it exists in a public repository. It must pass the complete eligibility chain defined below.

Evidence gates:

| Gate | Required evidence | Failure handling |
|------|-------------------|------------------|
| Source provenance | Repository URL, retrieval method, snapshot date, commit hash/release/checksum when available, license notes | Exclude from confirmatory corpus if provenance is missing |
| Parser validity | Rule parses into a normalized rule record without changing detection logic | Exclude or mark parse-failed |
| Deduplication | Canonical rule ID, source path, normalized logic hash, and lineage notes where available | Keep one canonical rule; count duplicates in corpus accounting |
| Evaluator readiness | Rule compiles/imports in the pinned evaluator or translates with high fidelity | Exclude or mark evaluator-unsupported/translation-failed |
| Original-positive validation | Rule detects its original ground-truth-positive example | Exclude from robustness scoring; count as original-negative or untestable |
| Mutation validity | Mutation passes functional-equivalence review from Section 4.2 | Exclude mutation from denominator |
| Mutation evaluation | Evaluator executes successfully on the validated mutation | Count detection outcome only if evaluator succeeds |
| Failure classification | Each failure receives a controlled reason code | Report separately from true bypasses |

Sufficient evidence for a true bypass:

1. The rule passed source, parser, deduplication, evaluator-readiness, and original-positive gates.
2. The mutation passed functional-equivalence review.
3. The evaluator executed without infrastructure failure.
4. The rule did not fire on the mutation under the same evaluator configuration.

Sufficient evidence for continued robustness:

1. The same gates above passed.
2. The rule fired on the validated mutation under the same evaluator configuration.

Hypotheses are supported, weakened, or rejected based on the statistical plan in Section 5.7. Null or mixed results are reported directly; they must not be reinterpreted as success by changing the denominator, excluding inconvenient strata after observing outcomes, or moving confirmatory analyses into exploratory framing without a protocol change.

### 6.2 Internal Validity Threats and Mitigations

Internal validity is protected by separating baseline validation, mutation validation, and outcome evaluation.

| Threat | Risk | Mitigation |
|--------|------|------------|
| Invalid original positive | A rule appears brittle because the baseline example never matched the rule | Require original-positive validation before scoring any mutations |
| Mutation semantic drift | A mutation removes or changes the target behavior rather than preserving it | Apply Section 4.2 functional-equivalence gates and review rationale |
| LLM output variance | Mutation quality varies by provider, model, prompt, or sampling settings | Record provider/model/prompt/settings; use fixed mutation budget; report failed mutation generation |
| Evaluator non-determinism | Different runs produce different detection outcomes | Pin evaluator versions; rerun a validation subset; record timestamps and configs |
| Translation error | Sigma-to-Elastic failures are mistaken for detector brittleness | Admit only high-fidelity translations into confirmatory scoring; report translation failures separately |
| Field-mapping error | Synthetic ECS events fail because fields are missing or mapped incorrectly | Use a documented ECS mapping table and original-positive validation before mutation scoring |
| Deduplication error | Duplicate or derived rules inflate evidence | Use normalized logic hashes and source-lineage notes; report duplicate counts |
| Manual reviewer bias | Reviewer expectations affect mutation approval or brittleness labels | Use a coding guide and second-pass review policy from Section 5.7 |
| Researcher allegiance effect | Solo researcher hypothesizing brittleness may unconsciously bias mutation review or pattern coding toward finding brittleness | Independent second-reviewer sample from Section 5.7; reviewer-drift pilot; coding guide; blinded review where feasible. See Section 7.2 for expanded discussion. |
| Data leakage from outcomes | Mutation selection is influenced by observed bypass results | Freeze mutation set before outcome scoring; log excluded mutations with reason codes |

These mitigations reduce but do not eliminate internal validity risk. Remaining risks are summarized in Section 7 and expanded in [docs/threats-to-validity.md](docs/threats-to-validity.md).

### 6.3 External Validity and Generalizability

Confirmatory claims generalize only to the locked Phase 1 eligible corpus and closely similar public detection content.

In scope for generalization:

- Publicly available rules captured at the `2026-05-25` corpus cutoff.
- Native YARA rules evaluated with pinned YARA tooling.
- Native Elastic rules evaluated in the pinned self-managed Elastic/Kibana harness.
- Sigma rules whose Elastic translation is high-fidelity and whose field mappings are explicit.
- Robustness against validated functionally equivalent mutations of known positive examples.

Out of scope for generalization:

- Closed-source vendor rule sets, managed-service-only detections, and private customer detections.
- Production SIEM, EDR, or SOAR deployments with proprietary enrichments or custom pipelines.
- False-positive behavior on benign enterprise telemetry.
- Detection of novel attack techniques, new malware capabilities, or behaviors outside the original rule intent.
- Rule families marked exploratory in Section 5.1.
- Rules added upstream after the snapshot cutoff.

The study may describe exploratory sources, but the paper must keep confirmatory and exploratory findings visibly separate. Generalization language should use "sampled public detection rules" rather than "all detection rules" or "all SIEM content."

### 6.4 Construct Validity

The study measures **rule robustness under controlled behavior-preserving mutation**, not total real-world evasibility.

Construct mapping:

| Construct | Operational measure | Validity boundary |
|-----------|---------------------|-------------------|
| Detection robustness | Rule-level `RS(r)` from Section 4.3 | Measures persistence of detection across validated mutations, not full adversarial resistance |
| Functional equivalence | Review gates from Section 4.2 | Depends on reviewer judgment and available observable fields |
| Brittleness | Failure to detect validated mutations after original-positive detection | Does not imply the rule is useless; it identifies narrowness under the tested mutation set |
| Rule family effect | Differences across YARA, Elastic, and Sigma-to-Elastic strata | May combine language semantics, repository practices, and evaluator behavior |
| Repository effect | Adjusted robustness differences by source repository | May reflect authoring conventions, target mix, and rule age rather than repository quality alone |

YARA and event-rule families operate on fundamentally different data types. YARA observes file/content artifacts; Elastic and Sigma-to-Elastic observe ECS event documents or event sequences. For that reason, between-family robustness comparisons are descriptive and exploratory. Confirmatory interpretation for H2 is limited to within-family comparisons of rule characteristics, especially behavioral/logical abstraction versus literal or indicator-heavy matching.

Edge-case policy:

- If a rule is intentionally indicator-only, bypass under non-indicator mutation is still a measured brittleness pattern, but interpretation must acknowledge the rule's likely operational role.
- If a rule is broad and detects many mutations through side effects unrelated to the intended behavior, the outcome counts as detected, but the case may be flagged for qualitative review.
- If a mutation changes the observable surface enough that the evaluator family is no longer appropriate, the mutation is invalid and excluded.
- If a rule requires enterprise enrichment or private telemetry, it is outside confirmatory scoring rather than treated as brittle.
- If translation changes a rule's meaning, the translated rule is not evidence about the original rule's robustness.

The robustness score is therefore a benchmark metric, not a claim that attackers can or cannot bypass a production environment.

### 6.5 Reliability Strategy

Reliability depends on making every stage replayable or auditable.

Required artifacts:

- Source snapshot manifest with URL, commit/release/checksum, retrieval date, and license notes.
- Normalized rule inventory with stable IDs and exclusion reason codes.
- Translation manifest for Sigma-to-Elastic rules, including backend version and fidelity status.
- Evaluator manifest with YARA version, `yara-python` version, Elastic/Kibana version, license state, Docker image digests or package hashes where available, and configuration files.
- ECS field-mapping table for event-rule validation.
- Ground-truth-positive manifest with safe handling status and release classification.
- LLM prompt/response cache using content-addressable storage for every prompt, response, system/developer instruction bundle, model identifier, generation setting, and response metadata. Hashes of prompts and responses should be published even when raw content is restricted. If the cache contains content meeting the restricted-artifact criteria in Section 8.4, such as raw weaponizable mutations or direct bypass strings, the cache itself is a restricted artifact. Publish content hashes and structural metadata; do not publish raw cache contents.
- Mutation manifest with parent rule/example ID, mutation class, prompt/version, model/provider, generation settings, review status, and reviewer notes.
- Outcome table with rule ID, mutation ID, evaluator run ID, detection result, failure code, and timestamp.
- Analysis manifest with random seeds, software versions, and exact scripts/notebooks used once execution-phase code exists.
- Estimation precision simulation script and random seed used for the Section 5.8 pre-execution check. The simulation script is pinned at lock and must not be modified during execution.

Repeatability requirements:

- Use deterministic seeds for sampling, ordering, bootstrap resampling, and any local stochastic tooling.
- Store LLM prompts and responses as primary reproducibility artifacts, not only summary metadata. Use content-addressable storage and publish hashes for auditability.
- Store model names, pinned model versions where exposed, temperature/top-p settings, and response metadata.
- Re-run at least `5%` of scored rule-mutation evaluations, or at least `100` evaluations if available, to estimate evaluator repeatability.
- If the 5% re-run sample has more than `10%` detection-outcome disagreement, trigger a full investigation of the affected evaluator batch before final scoring.
- Re-run all failed evaluator executions once before assigning final failure codes.
- Keep raw dangerous artifacts restricted; publish sanitized metadata and reproducible manifests when raw release is not ethical or legal.

The detailed reproducibility checklist is maintained in [REPRODUCIBILITY.md](REPRODUCIBILITY.md). If a step cannot be made fully reproducible because of LLM API drift, restricted samples, or licensing, the limitation must be disclosed in the final artifact report.

---

## 7. Threats to Validity (Phase R7)

> _This section is a summary. The full threat analysis is in [docs/threats-to-validity.md](docs/threats-to-validity.md)._

### 7.1 Conclusion Validity Threats

Primary threats are underpowered strata, non-independent rule-mutation observations, skewed bounded robustness scores, multiple comparisons, noisy age/maintenance metadata, and accidental promotion of exploratory comparisons into confirmatory claims.

Mitigation: use rule-level robustness scores as the primary unit where appropriate, clustered or mixed-effects models for rule-mutation outcomes, bootstrap confidence intervals, false-discovery-rate correction for related secondary comparisons, and Section 5.8 decision rules for minimum sample size. Underpowered or post-hoc analyses must be labeled exploratory.

Residual risk: some format, repository, or age strata may remain too small for strong inference. See [docs/threats-to-validity.md](docs/threats-to-validity.md#r71-conclusion-validity-threats).

### 7.2 Internal Validity Threats

Primary threats are invalid baseline positives, mutation semantic drift, evaluator configuration errors, Sigma translation loss, ECS field-mapping mistakes, hidden duplicate rules, reviewer bias, researcher allegiance effects in solo mutation review, and outcome leakage into mutation selection.

Mitigation: require original-positive validation, apply Section 4.2 mutation gates, freeze mutation sets before scoring, pin evaluator versions, record translator and field-mapping metadata, deduplicate normalized rule logic, require independent second-review sampling or downscoping under Section 5.7, and use the reviewer-drift pilot before main execution.

Residual risk: some semantic drift, evaluator mismatch, or reviewer bias may remain despite gating. See [docs/threats-to-validity.md](docs/threats-to-validity.md#r72-internal-validity-threats).

### 7.3 Construct Validity Threats

Primary threats are overinterpreting robustness score as total real-world evasibility, ambiguous functional equivalence, evaluator-specific semantics, evaluator-environment normalization effects, indicator-only rule interpretation, and conflating Sigma translation behavior with original rule behavior.

Mitigation: define robustness narrowly, separate true bypasses from translation/evaluator failures, classify detection-logic type, keep native and translated strata visible, and frame brittleness patterns as diagnostic mechanisms rather than rule-author blame.

Residual risk: readers may still treat the benchmark metric as a general security score unless the paper and dataset documentation keep the construct boundary explicit. See [docs/threats-to-validity.md](docs/threats-to-validity.md#r73-construct-validity-threats).

### 7.4 External Validity Threats

Primary threats are public-rule-only sampling, selection bias toward documented techniques with obtainable positives, the `2026-05-25` snapshot cutoff, focus on YARA/Elastic/Sigma-to-Elastic, local self-managed evaluator behavior, LLM-provider dependence, possible LLM training-data contamination, and no production telemetry or false-positive measurement.

Mitigation: state the target population as sampled public detection rules at the snapshot date, report source and stratum coverage, keep exploratory families separate, record evaluator and LLM settings, report how many rules are excluded for missing ground truth, and recommend future replications on later snapshots and additional evaluator families.

Residual risk: the study cannot support claims about all detection content, private SOC rules, managed vendor detections, or future repository states. See [docs/threats-to-validity.md](docs/threats-to-validity.md#r74-external-validity-threats).

### 7.5 Ethical Validity Threats

Primary threats are dual-use release of bypass examples, accidental publication of weaponizable payloads, unfair attribution harm to public rule authors, overclaiming repository comparisons, and creating incentives for shaming rather than defensive improvement.

Mitigation: restrict raw dangerous mutations, release sanitized metadata and aggregate findings, avoid naming individual authors in failure examples, report repository-level findings with uncertainty and context, and finalize disclosure/sanitization/tone rules in Phase R8.

Residual risk: even sanitized aggregate patterns may be misused. See [docs/threats-to-validity.md](docs/threats-to-validity.md#r75-ethical-validity-threats).

### 7.6 Replication Threats

Primary threats are LLM API drift, unavailable or restricted ground-truth samples, repository disappearance, license changes, local environment drift, nondeterministic evaluator behavior, and withheld raw artifacts.

Mitigation: record source snapshot manifests, model/provider/prompt/settings, evaluator versions, Docker image digests or package hashes where available, sanitized manifests, outcome tables, failure-code tables, and analysis code once execution begins.

Residual risk: exact replication may be impossible for restricted samples or changed LLM models. The target is auditable computational reproducibility for public artifacts plus conceptual replication where raw artifacts cannot be released. See [docs/threats-to-validity.md](docs/threats-to-validity.md#r76-replication-threats).

---

## 8. Ethics and Responsible Research (Phase R8)

### 8.1 Defender Benefit > Attacker Benefit

BrittleBench is justified only if the public outputs help defenders improve detection robustness more than they help attackers evade specific rules.

Defender benefit comes from:

- A public methodology for measuring detection-rule robustness.
- Aggregate evidence about which rule patterns are brittle.
- Sanitized benchmark metadata that helps rule authors test their own content.
- Reproducible evaluation procedures for YARA, Elastic, and high-fidelity Sigma-to-Elastic rules.
- Constructive recommendations for writing more robust detection logic.

Attacker benefit is reduced by:

- Not publishing raw weaponizable mutation payloads.
- Not publishing per-rule bypass recipes.
- Not publishing ranked lists of weakest individual rules or authors.
- Releasing mutation classes and brittleness patterns at an abstraction level useful for defense but insufficient as direct evasion instructions.
- Keeping restricted artifacts out of public releases when they contain malware, exploit material, direct evasion strings, or operationally useful command lines.

The ethical standard is: public artifacts should enable a defender to reproduce the measurement method and improve detection content, but should not enable a reader to copy a working bypass against a named rule.

### 8.2 Disclosure Approach

Before public release of final results, maintainers of included repositories should receive advance notice when the study identifies systematic brittleness patterns that materially affect their content.

Disclosure policy:

- Notify repository maintainers at least `90` calendar days before publication when practical.
- Use public security/contact channels first: `SECURITY.md`, repository security advisory process, maintainer email, or issue tracker if no private channel exists.
- Share aggregate findings, affected pattern categories, methodology, and suggested defensive improvements.
- Do not include raw mutation payloads, direct bypass strings, malware samples, or per-rule evasion recipes in maintainer notification unless the maintainer has a secure channel and a clear defensive need.
- If maintainers ask for additional detail, provide the minimum detail needed for remediation and record what was shared.
- If maintainers do not respond within `45` calendar days, send one follow-up through the same channel and one alternate public contact channel if available.
- If maintainers still do not respond or a repository has no reachable maintainer channel, document the attempt and proceed with sanitized aggregate publication after the `90`-day window.
- Maintainers may submit a right-of-reply statement of up to `500` words for inclusion in the published artifact or dataset documentation. The researcher may include a response, but the maintainer statement must not be edited except for safety, legality, length, or material factual inaccuracy; all edits are documented in the published artifact.

Disclosure is coordinated for systematic findings, not for every individual failed mutation. The study is not a vulnerability disclosure program for every rule miss; it is a benchmark of robustness patterns.

### 8.3 No Novel-Attack Policy

BrittleBench does not generate, validate, or publish novel attack techniques. Mutations must be behavior-preserving variants of already documented public techniques, samples, or event patterns.

Operational rules:

- A mutation must preserve the same attacker-relevant behavior as the parent example.
- A mutation must not add a new exploit, persistence method, privilege escalation method, malware capability, command-and-control method, credential theft method, or destructive behavior.
- A mutation must not expand the original technique into a new operational recipe.
- A mutation must remain within the same evaluator surface: YARA file/object artifact or Elastic-compatible event representation.
- Mutation review must reject outputs that introduce new capability, new target context, or materially more actionable attacker instructions.

If review identifies a mutation that appears novel or materially more offensive than the parent example:

1. Exclude it from confirmatory scoring.
2. Mark it with a restricted failure reason.
3. Do not publish the raw content.
4. If it appears to reveal a real vulnerability or dangerous operational method, handle it under [SECURITY.md](SECURITY.md) rather than the benchmark release process.

### 8.4 Dataset Sanitization

The public dataset and the raw research workspace are different artifacts.

Public release may include:

- Source rule identifiers, repository names, commit hashes, licenses, and normalized metadata.
- Inclusion/exclusion reason codes.
- Rule family, source repository, detection-logic type, rule age/maintenance metadata where available.
- Mutation class labels and sanitized descriptions.
- Detection outcomes, robustness scores, aggregate tables, confidence intervals, and failure-code counts.
- Sanitized examples that cannot be used as direct payloads or per-rule bypass recipes.
- Analysis code and reproducibility manifests where they do not expose restricted material.

Restricted artifacts include:

- Raw malware samples or unsafe file artifacts.
- Raw mutation payloads that function as direct bypasses.
- Per-rule bypass instructions against named rules.
- Operational command lines, exploit strings, credentials, infrastructure indicators, or malware configuration details that increase attacker utility.
- Any material that cannot be redistributed under source license, law, or responsible-research policy.

Sanitization rules:

- Replace raw payload content with mutation class, feature-delta description, and non-operational abstract representation.
- Preserve enough metadata to audit scoring without publishing direct evasion material.
- Store restricted artifacts outside the public repository with access limited to the researcher and any approved reviewers.
- Record sanitization decisions in the dataset documentation so readers understand what was withheld and why.
- If sanitization would make a result impossible to audit, report that limitation explicitly rather than publishing unsafe material.

Sanitized mutation-class descriptions may still teach exploitable patterns if written too concretely. To mitigate this, public descriptions should use generalized pattern language, avoid named rule/payload pairings, avoid step-by-step transformation recipes, and group examples at a level useful for defensive hardening rather than direct evasion.

### 8.5 Tone Policy

The project critiques methods and robustness patterns, not individual authors.

Required tone:

- Use constructive language focused on improving detection engineering practice.
- Avoid "worst rule," "bad author," "failed maintainer," or similar blame framing.
- Do not publish leaderboards of weakest authors or individual rules.
- Report repository-level comparisons only with uncertainty, scope limits, and methodological context.
- Use attribution-free or generalized examples when illustrating failure modes.
- Acknowledge that narrow indicator rules may be intentional and operationally useful even when they score low on mutation robustness.
- Emphasize that public rule authors provide defensive value by sharing content and making empirical study possible.

If asked by journalists, vendors, or third parties to identify the "worst" rules, authors, or repositories, the response should redirect to aggregate findings, methodology, and defensive recommendations. The project should not provide shame-oriented rankings or exploit-style commentary.

### 8.6 Conflicts of Interest

The final report must disclose researcher employment, funding sources, LLM provider relationships or credits, vendor relationships with included repositories, and any other relationship that could reasonably affect interpretation.

If a conflict involves a repository included in the study, the repository remains eligible only if the conflict is disclosed and no special analytical treatment is applied outside the locked protocol.

---

## 9. Protocol Status (Phase R9)

### 9.1 Lock Status

**LOCKED**

This protocol is locked for confirmatory execution. No methodology change may be made without a new major protocol version and logged entries in [DECISIONS.md](DECISIONS.md) and [CHANGELOG.md](CHANGELOG.md).

Pre-lock checklist:

- Sections R1 through R8 are complete.
- R9 falsification criteria are defined.
- The mandatory 20-30 rule feasibility pilot is complete and does not trigger downscoping criteria.
- Reviewer-drift pilot and LLM mutation-validity pilot are complete.
- Second reviewer recruited, trained on the coding guide, and committed to the `>=300`-decision sample, or an explicit downscoping plan is recorded in [DECISIONS.md](DECISIONS.md) that limits confirmatory N to what can be independently reviewed.
- Public preregistration destination is selected.
- Final reviewer pass confirms that no confirmatory analysis was adjusted using observed post-treatment robustness outcomes.
- `CHANGELOG.md` records the protocol version that is being locked.
- `DECISIONS.md` contains all material methodology decisions known before execution.

Protocol versioning follows semantic versioning:

- Patch versions (`0.2.x`) are for typos, link fixes, and non-methodological clarifications.
- Minor versions (`0.x.0`) are for non-methodology documentation changes before lock.
- Major versions (`x.0.0`) are for methodology changes, including changes to RQs, hypotheses, sampling, scoring, validation gates, statistical plan, or release boundaries.
- Formal protocol lock should occur at a major version boundary.
- Pre-lock development, meaning any version before v1.0.0, may include methodology changes documented through [DECISIONS.md](DECISIONS.md) and [CHANGELOG.md](CHANGELOG.md) entries; semantic versioning is informational during this period. After lock at v1.0.0, methodology changes require a major version increment and logged [DECISIONS.md](DECISIONS.md) and [CHANGELOG.md](CHANGELOG.md) entries.

### 9.2 Lock Date

2026-05-25

Locked after final author review and publication of the timestamped GitHub release record in Section 9.4.

### 9.3 Falsification Criteria

The primary claim of BrittleBench is that robustness of public detection content under validated functionally equivalent mutation can be measured reproducibly and that the resulting distribution is informative for defenders.

This claim must be abandoned or substantially revised if any of the following occur:

- Fewer than `150` total rules pass all confirmatory eligibility gates, making the study too small for the planned benchmark claim.
- The mandatory pre-lock pilot projects fewer than `200` eligible rules from realistic collection.
- Fewer than two major confirmatory rule families have at least `50` eligible rules each, making multi-family descriptive coverage unsupported.
- Original-positive validation fails for a large enough share of candidate rules that the final eligible corpus is no longer representative of the sampled public corpus; threshold for mandatory revision: more than `75%` of parsed candidate rules excluded before mutation for reasons other than planned scope exclusions.
- Mutation review cannot produce at least `10` validated functionally equivalent mutations for at least `150` eligible rules.
- LLM mutation-validity rate is below `60%` on the pilot reference set.
- Inter-rater Cohen's kappa is below `0.6` after coding-guide revision if an independent second reviewer is recruited.
- Detection-logic type inter-rater kappa is below `0.6` after coding-guide revision, requiring H2 confirmatory within-family contrasts to be demoted to exploratory.
- More than `20%` of true bypasses receive `No pattern assigned`, making the brittleness-pattern taxonomy inadequate for RQ5.
- Evaluator repeatability checks show inconsistent detection outcomes above `5%` of repeated scored evaluations without a correctable configuration cause.
- Sigma-to-Elastic translation loss is too high to support confirmatory Sigma claims; threshold for mandatory revision: fewer than `50` Sigma rules pass high-fidelity translation and original-positive validation.
- The public/restricted artifact boundary in Section 8.4 prevents enough auditability that the benchmark cannot be independently inspected at the metadata and outcome level.
- Ethical review during execution identifies unacceptable dual-use risk that cannot be mitigated through sanitization or restricted release.
- Pilot reviewer time per rule, multiplied by target eligible-corpus size, projects an execution effort exceeding the researcher's available time budget: target `6` months for confirmatory execution, with a `9` month hard ceiling. The pilot must produce this projection as a named deliverable.

If a falsification criterion is triggered, the affected claim must be downgraded before publication. Possible downgrades are: pilot study, single-family benchmark, descriptive corpus audit, or exploratory methodology paper. Such a downgrade must be recorded in [DECISIONS.md](DECISIONS.md) and [CHANGELOG.md](CHANGELOG.md).

### 9.4 Public Pre-Registration Link

GitHub release timestamp:

<https://github.com/anpa1200/brittle/releases/tag/v1.0.0-protocol-lock>

This GitHub release is the public timestamped protocol-lock record for Phase 1. A later OSF registration may mirror the same locked protocol, but must not change the locked methodology without a new major protocol version.

---

> **This protocol is locked once Section 9.1 is set to LOCKED. Any post-lock changes must be documented in [CHANGELOG.md](CHANGELOG.md) with rationale.**

---

## 10. Revision Notes

This section records v0.2.0, v0.2.1, and v0.2.2 draft changes made before protocol lock.

| Priority | Revision |
|----------|----------|
| P1-1 | Replaced the intra-rater fallback in Section 5.7 with a requirement for an independent second reviewer on at least `300` mutation-review decisions, Cohen's kappa reporting, and downscoping/exploratory labeling if independent review is not available. Added reviewer-drift pilot before main execution. Rationale: independent review is the minimum credible reliability control for confirmatory manual labeling. |
| P1-2 | Added a mandatory pre-lock pilot of `20` to `30` rules across all three confirmatory families in Sections 5.2, 5.8, and 9.3. The pilot estimates funnel attrition and triggers downscoping if projected eligible rules are below `200`. This pilot is preparatory feasibility work, not confirmatory execution. |
| P1-3 | Chose the conservative path for H2/RQ2: between-family YARA-vs-event-rule comparisons are exploratory because the data surfaces differ. Confirmatory H2 is reframed as within-family comparison of behavioral/logical abstraction versus literal or indicator-heavy matching. Sections 2.2, 3.1, 3.2, 3.3, 3.4, 5.7, and 6.4 were updated. Rationale: within-family contrasts avoid overclaiming across incompatible file-content and event-stream measurement surfaces. |
| P1-4 | Added fixed mutation-class stratification: `10` validated mutations per rule, defaulting to `2` from each of `5` predeclared classes. Updated Sections 4.3, 5.2, 5.3, and 5.5. |
| P1-5 | Added LLM mutation-generator validation: at least `70%` validity target on pilot, `60%` falsification threshold, pinned model behavior, API-update pause/bridging pilot, content-addressable response caching, and recommended secondary-model comparison on a `10%` subsample. |
| P2-6 | Renamed Section 5.8 from "Power Analysis" to "Estimation Precision Plan" because the plan is estimation-based rather than a classical NHST power analysis. |
| P2-7 | Committed to rule-level random intercepts as the primary mutation-level model and repository-level random intercepts as a sensitivity analysis only when stable. Rationale: rule-level clustering is structurally guaranteed, while repository-level effects may be unstable with small repository counts. |
| P2-8 | Defined multiplicity families: H1 alone; H2-H6 as a second BH-FDR family at `alpha = 0.05`; within-hypothesis contrasts as separate BH-FDR sub-families. Rationale: this preserves the single primary RQ while controlling error across related secondary claims. |
| P2-9 | Added fractional logit as the primary modeled analysis for bounded rule-level `RS(r)` outcomes and beta regression as sensitivity analysis where boundary handling is valid. |
| P3-10 | Defined high-fidelity Sigma-to-Elastic translation operationally in Sections 4.1 and 5.1. |
| P3-11 | Defined original ground-truth positive examples by family in Section 4.1: YARA file artifacts, Elastic ECS event documents, and Sigma-to-Elastic ECS event documents. |
| P3-12 | Increased `n_min` from `5` to `10` in Sections 4.3, 5.2, 5.5, 5.8, and 9.3. Added pilot-driven precision tradeoff language if `10` proves infeasible. |
| P3-13 | Added `No pattern assigned` falsification threshold: if more than `20%` of true bypasses are unclassified, RQ5 must be revised or demoted. |
| P4-14 | Added threat coverage for selection bias toward documented techniques, LLM training-data contamination, evaluator-environment normalization effects, and researcher allegiance effect in solo mutation review. |
| P5-15 | Extended maintainer disclosure window from `30` to `90` calendar days and added `45`-day escalation/follow-up. |
| P5-16 | Added conflict-of-interest disclosure requirements for employment, funding, LLM providers, vendors, and relationships with included repositories. |
| P5-17 | Added maintainer right-of-reply policy with up to `500` words included in the published artifact or dataset documentation. |
| P6-18 | Added LLM prompt/response caching as a primary reproducibility artifact with content-addressable storage and published hashes. |
| P6-19 | Added protocol semantic-versioning rules in Section 9.1; formal lock occurs at a major version boundary. |
| P7-20 | Added falsification triggers for LLM validity below `60%`, `No pattern assigned` above `20%`, inter-rater kappa below `0.6`, and pilot-to-execution projection above `9` months. |
| P8-21 | Removed conditional building-block-rule stratum language. Elastic building-block, promotion, and vendor-alert wrapper rules are excluded from confirmatory Phase 1. |
| P8-22 | Added repeat-evaluation disagreement threshold: more than `10%` disagreement in the 5% rerun sample triggers full investigation of the affected evaluator batch. |
| P8-23 | Added Section 8.4 mitigation for sanitized mutation-class descriptions that could still teach exploitable patterns. |
| **-- v0.2.1 polish revisions below --** |  |
| T1.1 | Added explicit pre-lock second-reviewer recruitment/training/commitment requirement, or a DECISIONS.md downscoping plan limiting confirmatory N to independently reviewable material. |
| T1.2 | Added per-family mutation-class profiles for YARA file-content rules and Elastic/Sigma-to-Elastic event-rule families in Sections 4.4 and 5.2. The profile shape is locked while exact class definitions remain pilot-finalized. |
| T1.3 | Specified the LLM labeled pilot reference set: at least `100` mutations across all five classes per family, pre-labeled against Section 4.2 gates, with intentionally invalid negative controls. |
| T1.4 | Replaced fractional logit as the primary modeled analysis with quasi-binomial GLM for successes out of `n`, because `RS(r)` is an 11-point scale at `n = 10`; fractional logit, beta regression, and ordinal regression remain sensitivity analyses. |
| T1.5 | Replaced the simple `9`-month time trigger with a pilot-derived reviewer-time projection deliverable, using `6` months as the target and `9` months as the hard ceiling. |
| T2.1 | Defined repository random-intercept stability operationally: at least `5` repositories with at least `20` eligible rules each and no boundary variance estimate; otherwise repository effects are descriptive with cluster-robust standard errors. |
| T2.2 | Added optimistic and pessimistic prior simulation scenarios for the estimation precision check; both must meet the planned median CI half-width threshold. |
| T2.3 | Split conflict-of-interest disclosure into new Section 8.6 rather than overloading the maintainer disclosure section. |
| T2.4 | Added cross-reference that LLM prompt/response caches become restricted artifacts when they contain raw weaponizable mutations or direct bypass strings. |
| T2.5 | Added detection-logic type classification to the `>=300`-decision reliability sample because H2 depends on that classification. |
| T2.6 | Added LLM training-data contamination to the Section 5.6 confounder table. |
| T3.1 | Clarified that infeasibility of `n_min = 10` must be handled through Section 9.3 falsification/downscoping language. |
| T3.2 | Clarified that pre-lock v0.1.0 to v0.2.0 methodology changes are allowed, but post-lock methodology changes require a major version plus DECISIONS.md and CHANGELOG.md entries. |
| T3.3 | Added rationale notes for binary design choices in this Section 10 table: independent review over intra-rater fallback, within-family H2 over between-family confirmatory comparison, quasi-binomial primary modeling over fractional logit primary modeling, and separate COI section over combined disclosure section. |
| T3.4 | Added per-decision-type kappa reporting and gating; failing strata are demoted to exploratory while passing strata remain confirmatory. |
| T3.5 | Tightened right-of-reply editing language to allow edits for material factual inaccuracy only when documented in the published artifact. |
| M.1 | Harmonized the H2 planned-method row with quasi-binomial GLM as the primary rule-level model, with fractional logit and beta regression retained as sensitivity analyses. |
| M.2 | Clarified that mutation-class analysis uses the rule-mutation pair unit from Section 4.5. |
| M.3 | Harmonized Section 5.7 bounded-outcome language to the quasi-binomial primary, fractional-logit/beta sensitivity, and ordinal further-sensitivity cascade. |
| M.4 | Added researcher allegiance effect to the Section 6.2 internal validity threat table. |
| M.5 | Added a commitment to finalize and freeze operational definitions for mutation classes before main execution. |
| M.6 | Added a `50` examples-per-confirmatory-family minimum for the reviewer-drift pilot reference set. |
| M.7 | Added the estimation precision simulation script and random seed to required reproducibility artifacts. |
| M.8 | Added an example showing per-decision-type kappa gating and RQ-specific demotion logic. |
| M.9 | Added an LLM provider relationship disclosure cross-reference to Section 8.6. |
| M.10 | Added a falsification trigger demoting H2 if detection-logic type inter-rater kappa remains below `0.6`. |
| M.11 | Added a divider row between v0.2.0 revision entries and later polish entries. |
| M.12 | Replaced the versioning grandfather note with a general pre-lock semantic-versioning clarification. |
