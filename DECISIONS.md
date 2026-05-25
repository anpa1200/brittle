# Methodological Decision Log

> **Cross-cutting log C1.** Every methodological decision — including ones that feel obvious — gets an entry here. The discipline of writing rationale prevents "why did I do it this way?" six months from now and strengthens the credibility of the final publication.
>
> Related: [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) (deferred questions) | [CHANGELOG.md](CHANGELOG.md) (post-lock protocol changes)

---

## Format

Each entry uses the following structure:

```
### DEC-XXXX — Short title

| Field | Value |
|-------|-------|
| ID | DEC-XXXX |
| Date | YYYY-MM-DD |
| Status | OPEN / ADOPTED / SUPERSEDED |
| Supersedes | DEC-XXXX (if applicable) |
| Superseded by | DEC-XXXX (if applicable) |

**Decision:** One-sentence statement of what was decided.

**Rationale:** Why this decision was made. What considerations drove it.

**Alternatives considered:**
- Alternative A — why rejected
- Alternative B — why rejected

**Implications:** What this decision constrains or enables downstream.
```

---

## Log

---

### DEC-0001 — Adopt pre-registered research protocol; lock before execution

| Field | Value |
|-------|-------|
| ID | DEC-0001 |
| Date | 2026-05-24 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Adopt a pre-registered research protocol approach. PROTOCOL.md must be locked (Section 9.1 set to LOCKED) before any execution-phase work (corpus collection, mutation generation, evaluation) begins.

**Rationale:** Pre-registration strengthens external validity and credibility by separating hypothesis generation from hypothesis testing. It is standard practice in modern empirical research (psychology, medicine, and increasingly software engineering). It is cheap insurance against post-hoc rationalization: if the protocol is locked before data is seen, the confirmatory analyses are genuinely confirmatory. For a solo-researcher study without an institutional review board, pre-registration is the primary credibility mechanism available.

**Alternatives considered:**
- Exploratory-first approach (collect data, then form questions) — rejected because it produces descriptive findings that are hard to generalize and invites p-hacking without a precommitted analysis plan.
- Protocol written concurrently with implementation — rejected because it defeats the purpose; the temptation to adjust the protocol to match emerging results is too high.

**Implications:** No execution-phase directories or code may exist in this repository until PROTOCOL.md Section 9.1 reads LOCKED. This is enforced by convention (see [future-execution/README.md](future-execution/README.md)) and by the structure of this repository.

---

### DEC-0002 — Set initial public detection content scope for Phase R1

| Field | Value |
|-------|-------|
| ID | DEC-0002 |
| Date | 2026-05-24 |
| Status | SUPERSEDED FOR CONFIRMATORY PHASE 1 |
| Supersedes | — |
| Superseded by | DEC-0006 |

**Decision:** Phase R1 scope is limited to publicly accessible detection content, initially considering Sigma YAML, YARA rules, Elastic detection rules, and Splunk Security Content detections; proprietary or closed vendor rule sets remain out of scope unless Section 5.2 explicitly includes a public, citable source.

**Rationale:** The project needs a corpus that can be snapshotted, cited, reviewed, and partially released without special access. Public repositories also match the study's central claim: defenders reuse public detection content as shared security knowledge. Keeping the initial scope to public content reduces legal, reproducibility, and disclosure complexity for a solo six-month study.

**Alternatives considered:**
- Include all vendor and managed-service detections — rejected for Phase R1 because access, licensing, redistribution, and disclosure constraints would dominate the protocol before the public-content question is defined.
- Limit the study only to Sigma — rejected because the project goal is a multi-family robustness benchmark, and restricting to one format would not test whether brittleness patterns differ across common public detection ecosystems.
- Include execution telemetry and false-positive measurement now — rejected for Phase R1 because it requires environment-specific benign data and would expand the study beyond robustness against behavior-preserving mutation.

**Implications:** Section 5.2 turned this initial boundary into the narrower confirmatory Phase 1 sampling frame recorded in DEC-0006. Section 8 defines how raw mutation artifacts are restricted while sanitized benchmark metadata remains publishable.

---

### DEC-0003 — Structure Phase R2 around one primary robustness question

| Field | Value |
|-------|-------|
| ID | DEC-0003 |
| Date | 2026-05-24 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Structure Phase R2 around one primary research question measuring robustness of sampled public detection rules against validated functionally equivalent mutations, supported by five secondary questions on format, repository, rule characteristics, mutation class, and rule age.

**Rationale:** A single primary question keeps the study pre-registerable and prevents the benchmark from becoming a loose collection of exploratory analyses. The secondary questions decompose the primary robustness distribution into explanations that are useful for detection engineers while remaining answerable from the same planned data collection.

**Alternatives considered:**
- Multiple co-primary research questions — rejected because it would dilute the main claim and complicate confirmatory analysis for a solo six-month study.
- A repository-ranking primary question — rejected because the project goal is constructive robustness measurement, not public shaming or league-table scoring.
- A mutation-taxonomy primary question — rejected because mutation classes are diagnostic mechanisms; the central empirical target remains rule robustness.

**Implications:** Section 3 must define one hypothesis and one null hypothesis for each RQ. Section 5 must ensure the sampling frame, variables, controls, and statistical methods are sufficient to answer RQ1 through RQ6 without adding execution-phase code before protocol lock.

---

### DEC-0004 — Use practical-significance thresholds for Phase R3 hypotheses

| Field | Value |
|-------|-------|
| ID | DEC-0004 |
| Date | 2026-05-24 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Define Phase R3 hypotheses using a default minimum effect of interest of `0.10` for robustness-score differences, with a corresponding 10 percentage point threshold for mutation-class bypass-rate differences.

**Rationale:** The project should distinguish statistically detectable differences from differences that matter for detection engineering. A 0.10 robustness-score threshold is conservative enough to avoid overclaiming on trivial effects while still small enough to detect meaningful brittleness in public rule content if the sample is adequately powered.

**Alternatives considered:**
- No minimum effect threshold — rejected because large corpora can make unimportant differences look persuasive.
- Larger threshold such as 0.20 — rejected for the initial protocol because it may miss practically relevant degradation in a heterogeneous corpus.
- Hypotheses without directional expectations — rejected because R3 is intended to support pre-registration, not only descriptive reporting.

**Implications:** Section 5.7 must define estimators that can report robustness-score differences against this threshold. Section 5.8 must check whether the final sample can estimate the planned effects with acceptable uncertainty. If power analysis shows the threshold is not estimable, any change must happen before protocol lock or be logged as exploratory after lock.

---

### DEC-0005 — Use self-managed Elastic/Kibana as Phase 1 event-rule validator

| Field | Value |
|-------|-------|
| ID | DEC-0005 |
| Date | 2026-05-25 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Use a pinned self-managed Elastic Stack + Kibana environment as the primary Phase 1 validation platform for Elastic rules and high-fidelity Sigma-to-Elastic translations. Native YARA remains validated with `yara` / `yara-python`; YARA-to-EQL and YARA-L conversions remain exploratory.

**Rationale:** Elastic/Kibana is the most practical local event-rule evaluator for the Phase 1 scope because Elastic rules are native to it, EQL/KQL are supported rule languages, and Sigma has mature Elastic backend translation paths. It also gives a reproducible local harness for event documents without requiring production SIEM access. The protocol should describe this as a self-managed Elastic/Kibana validation environment under a recorded license state, not loosely as an "open-source SIEM," because Elastic's source and distribution licensing are more specific than that phrase.

**Alternatives considered:**
- YARA-L as the universal validation backend — rejected for confirmatory Phase 1 because YARA-L is event/log oriented, not a native file-signature evaluator, and local reproducibility is not yet solved.
- Translate all rules to EQL — rejected because YARA, Snort/Suricata, Falco, Wazuh, Splunk, and Sentinel semantics are lossy when forced into EQL without a formal fidelity model.
- Use only native evaluators for every source family in Phase 1 — rejected because it would expand operational complexity beyond the current solo-researcher scope.

**Implications:** R5 must specify the exact Elastic/Kibana version, deployment method, ECS field mapping, rule import API, synthetic event indexing process, and pass/fail detection criteria. YARA compile failures must be fixed natively rather than hidden by EQL conversion. Any YARA-L or YARA-to-EQL result must be labeled exploratory until a separate protocol section admits it.

---

### DEC-0006 — Adopt Phase 1 stratified eligible-corpus methodology

| Field | Value |
|-------|-------|
| ID | DEC-0006 |
| Date | 2026-05-25 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Phase 1 uses a stratified eligible-corpus design with three confirmatory rule families: native YARA, native Elastic, and Sigma translated to Elastic only when translation is high-fidelity. The corpus snapshot cutoff is `2026-05-25`. Confirmatory scoring requires original-positive validation and at least `5` validated functionally equivalent mutations per rule, with a target of `10`.

**Rationale:** This keeps the study executable for a solo researcher while preserving the core benchmark claim. Native YARA and native Elastic have clear evaluators, and Sigma-to-Elastic is practical when field mappings and translation fidelity are explicit. A fixed cutoff date prevents the corpus from shifting during analysis. Requiring original-positive validation avoids counting rules that cannot be tested, and a minimum mutation count prevents one-off mutation outcomes from dominating rule-level robustness scores.

**Alternatives considered:**
- Include every collected rule family in confirmatory Phase 1 — rejected because Splunk, Sentinel, Chronicle YARA-L, Falco, Wazuh, Snort, and Suricata would require separate evaluator semantics and would expand the protocol beyond the current timeline.
- Treat translated YARA/EQL or YARA-L outputs as confirmatory — rejected because translation fidelity is not yet established.
- Use no fixed snapshot cutoff — rejected because moving upstream repositories would weaken reproducibility.
- Score rules without original-positive validation — rejected because robustness cannot be interpreted if the rule never detected the baseline case.

**Implications:** OQ-0002, OQ-0003, OQ-0004, and OQ-0005 are resolved for Phase 1 protocol purposes. R6 must specify validation evidence standards for original-positive gates, mutation-review gates, and evaluator execution. Execution-phase tooling must produce a coverage funnel rather than silently dropping rules.

---

### DEC-0007 — Require gate-based evidence before confirmatory scoring

| Field | Value |
|-------|-------|
| ID | DEC-0007 |
| Date | 2026-05-25 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** A rule-mutation outcome enters confirmatory scoring only after source provenance, parsing, deduplication, evaluator readiness, original-positive validation, mutation functional-equivalence review, evaluator execution, and failure classification gates are satisfied.

**Rationale:** The benchmark must avoid treating parser failures, missing ground truth, translation loss, or evaluator setup problems as detector brittleness. Gate-based evidence makes the denominator auditable and keeps true bypasses separate from untestable or unsupported cases.

**Alternatives considered:**
- Score every parsed rule regardless of original-positive validation — rejected because a mutation miss is uninterpretable if the rule never matched the baseline.
- Treat evaluator errors as bypasses — rejected because infrastructure and semantic-support failures are different constructs from rule brittleness.
- Rely on aggregate corpus counts without per-rule evidence gates — rejected because it would weaken reproducibility and make later disputes hard to resolve.

**Implications:** Execution tooling must emit manifests for source snapshots, normalized rules, translations, evaluator versions, ground-truth positives, mutations, review decisions, outcomes, and failure codes. R7 should discuss residual validity threats after these gates.

---

### DEC-0008 — Adopt explicit validity-threat register before protocol lock

| Field | Value |
|-------|-------|
| ID | DEC-0008 |
| Date | 2026-05-25 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Maintain a long-form validity-threat register in `docs/threats-to-validity.md` and summarize the same six threat categories in PROTOCOL.md Section 7 before protocol lock.

**Rationale:** The benchmark's credibility depends on acknowledging known weaknesses before results exist. Separating conclusion, internal, construct, external, ethical, and replication threats makes later findings easier to interpret and reduces the risk of hiding methodological limits after the fact.

**Alternatives considered:**
- Keep threats only as a short protocol paragraph — rejected because the risk surface is too broad for a single summary.
- Defer validity threats until paper writing — rejected because threats identified after results are easier to rationalize away.
- Treat R6 evidence gates as sufficient — rejected because gates reduce threats but do not eliminate residual risk.

**Implications:** R8 must complete the ethical controls referenced by R7. Execution-phase reports must preserve coverage funnels, failure-code counts, and exploratory/confirmatory separation so the threats register remains auditable.

---

### DEC-0009 — Restrict raw bypass artifacts and publish sanitized defender-oriented outputs

| Field | Value |
|-------|-------|
| ID | DEC-0009 |
| Date | 2026-05-25 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Public releases will include sanitized metadata, aggregate findings, reproducibility manifests, and defensive methodology, while raw dangerous mutations, direct per-rule bypass recipes, unsafe samples, and operationally useful payload content remain restricted.

**Rationale:** The project is defensible only if its public artifacts improve detection engineering without becoming a reusable evasion guide. Sanitized outputs preserve scientific auditability at the metadata and aggregate-result level while reducing direct attacker utility.

**Alternatives considered:**
- Publish all raw mutations for maximum reproducibility — rejected because it creates unnecessary dual-use risk.
- Publish only a paper with no dataset metadata — rejected because it would make the benchmark hard to audit or reuse.
- Privately notify every individual rule miss — rejected as impractical and inconsistent with the benchmark's focus on systematic robustness patterns.

**Implications:** R9 lock must not occur until the public/restricted artifact boundary is accepted. Execution-phase tooling must tag restricted artifacts at creation time rather than trying to sanitize them after analysis.

---

### DEC-0010 — Keep protocol unlocked until final review and public preregistration

| Field | Value |
|-------|-------|
| ID | DEC-0010 |
| Date | 2026-05-25 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Complete R9 with explicit pre-lock checklist and falsification criteria, but keep PROTOCOL.md `locked: false` and Section 9.1 `UNLOCKED` until final author review and public preregistration are complete.

**Rationale:** R1 through R9 can be methodologically complete before the protocol is formally locked. Locking should be a deliberate author action tied to a public timestamped preregistration URL, not an incidental documentation edit.

**Alternatives considered:**
- Lock immediately after completing R9 — rejected because final author review and preregistration URL are still missing.
- Leave falsification criteria undefined until after execution — rejected because that would weaken preregistration and invite post-hoc claim adjustment.
- Start execution while the protocol remains unlocked — rejected for confirmatory work because it undermines the project discipline established in DEC-0001.

**Implications:** The next work item is final protocol review and preregistration preparation, not confirmatory execution. Any execution work before lock must be clearly labeled exploratory or preparatory and must not influence locked confirmatory criteria.

---

### DEC-0011 — Adopt v0.2.0 pre-lock methodology hardening revisions

| Field | Value |
|-------|-------|
| ID | DEC-0011 |
| Date | 2026-05-25 |
| Status | ADOPTED |
| Supersedes | Partial: DEC-0004, DEC-0006, DEC-0007, DEC-0010 |
| Superseded by | — |

**Decision:** Revise the protocol to v0.2.0 DRAFT-REVISED before lock, adding mandatory pre-lock feasibility pilots, stronger reviewer reliability, fixed mutation-class profiles with `n_min = 10`, explicit LLM validation and caching, construct-limited H2 interpretation, estimation-focused statistical modeling, stronger ethics/disclosure controls, and expanded falsification criteria.

**Rationale:** The pre-lock review identified weaknesses that would reduce credibility if left unresolved: reviewer reliability depended too heavily on intra-rater fallback, eligible-corpus attrition was not piloted, YARA and event-rule family comparisons risked construct mismatch, mutation difficulty was not controlled, and LLM mutation generation was a single point of failure.

**Alternatives considered:**
- Keep v0.1.0 unchanged and handle concerns during execution — rejected because the issues affect preregistered methodology.
- Expand evaluator scope to solve cross-family comparability — rejected because it would violate solo-researcher feasibility and add new scope.
- Require full independent review of all mutations — rejected as likely infeasible; the adopted compromise requires at least `300` independently reviewed decisions or confirmatory downscoping.

**Implications:** The protocol remains unlocked. Lock now requires completion of the pre-lock feasibility pilot, reviewer-drift pilot, and LLM-validity pilot, plus human approval of any downscoping triggered by those pilots.

---

### DEC-0012 — Apply v0.2.1 lock-readiness polish without changing v0.2.0 design

| Field | Value |
|-------|-------|
| ID | DEC-0012 |
| Date | 2026-05-25 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Apply targeted v0.2.1 pre-lock polish while preserving v0.2.0 design decisions: fixed mutation-class stratification, within-family confirmatory H2, mandatory pilot, independent `>=300`-decision reliability sample or downscoping, LLM `70%`/`60%` thresholds, and semantic versioning.

**Rationale:** The v0.2.1 edits clarify lock prerequisites, operational thresholds, and artifact boundaries without changing research scope or adding evaluator families.

**Alternatives considered:**
- Defer these edits until after lock — rejected because they affect preregistration clarity.
- Reopen the full methodology — rejected because v0.2.0 is methodologically sound and the requested changes are surgical.

**Implications:** The next gate remains the pre-lock feasibility/reviewer/LLM pilots and human review. No confirmatory execution begins until the protocol is locked.
