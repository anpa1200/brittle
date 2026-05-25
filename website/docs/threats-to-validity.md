---
status: "DRAFT"
last_updated: "2026-05-25"
---

# Threats to Validity

This is the long-form companion to [Protocol Section 7](./protocol#7-threats-to-validity-phase-r7). The protocol summary names the threat classes; this document records the detailed validity risks, planned mitigations, and residual risk that remain after mitigation.

## R7.1 Conclusion Validity Threats

### Description

Conclusion validity threats affect whether the study's observations justify its statistical conclusions. The main risks are underpowered strata, non-independent observations, skewed bounded robustness scores, multiple comparisons, noisy age/maintenance metadata, unstable repository-level random effects, and treating exploratory comparisons as confirmatory.

### Why It Threatens Validity

The corpus will likely contain uneven rule counts across YARA, Elastic, and Sigma-to-Elastic strata. Some repositories may dominate the sample. Multiple mutations belong to the same rule, and rules may share upstream logic, so rule-mutation rows are not independent. Robustness scores are bounded between `0` and `1`, likely skewed, and may have many exact `0` or `1` values. If these properties are ignored, the study could overstate precision, report false differences between groups, or miss meaningful effects in smaller strata.

### Planned Mitigation

- Use rule-level robustness score as the primary unit for RQ1 through RQ4 and RQ6.
- Use clustered or mixed-effects models for rule-mutation outcomes.
- Prefer medians, empirical distributions, and bootstrap confidence intervals over assumptions of normality.
- Apply the Section 5.8 minimum sample decision rules before making confirmatory within-family or repository claims.
- Use fractional logit for bounded rule-level robustness scores and rule-level random intercepts for mutation-level mixed-effects models.
- Report exact coverage funnels for collected, parsed, eligible, original-positive, mutation-eligible, and scored rules.
- Apply false-discovery-rate correction for related secondary comparisons.
- Label underpowered or post-hoc analyses as exploratory.

### Residual Risk

Some strata may remain too small for strong inference even after mitigation. Repository effects may remain partially confounded with format and target mix. Confidence intervals may be wide, especially for age/maintenance claims. The paper must treat weakly powered comparisons as descriptive rather than definitive.

## R7.2 Internal Validity Threats

### Description

Internal validity threats affect whether observed bypasses are caused by rule brittleness rather than artifacts of the procedure. The main risks are invalid baseline positives, mutation semantic drift, evaluator configuration errors, translation loss, field-mapping mistakes, hidden duplicates, reviewer bias, researcher allegiance effects in solo mutation review, and outcome leakage into mutation selection.

### Why It Threatens Validity

A rule cannot be called brittle if it never detected the original example. A mutation cannot be counted as a bypass if it stopped representing the same behavior. Sigma translations can lose logic. Elastic event rules can fail because synthetic ECS fields are incomplete. YARA rules can fail because imports, modules, or external variables were configured incorrectly. Manual review can approve mutations inconsistently, and a solo researcher may unconsciously favor decisions that support expected results. Repeated mutation attempts can also accidentally select examples that already reflect observed bypasses.

### Planned Mitigation

- Require original-positive validation before mutation scoring.
- Apply the Section 4.2 functional-equivalence gates to every mutation.
- Freeze mutation sets before outcome scoring.
- Use pinned YARA and Elastic/Kibana evaluator versions.
- Record evaluator configuration, ECS mappings, translator versions, and failure codes.
- Admit only high-fidelity Sigma-to-Elastic translations to confirmatory scoring.
- Deduplicate by source identity, normalized logic hash, and visible upstream lineage.
- Use the Section 5.7 coding guide, reviewer-drift pilot, independent second-review requirement, and downscoping rule for mutation approval and brittleness labels.

### Residual Risk

Some semantic drift may escape review. Some evaluator mismatches may only appear after deeper execution testing. If no independent reviewer is available, confirmatory scope must shrink and remaining review-dependent results become exploratory. The final report must preserve failure-code counts so readers can see how much evidence was lost to procedural failures.

## R7.3 Construct Validity Threats

### Description

Construct validity threats affect whether the measurements correspond to the intended concepts. The core risk is that "robustness score" may be mistaken for real-world evasibility or rule quality. Other risks include ambiguous functional equivalence, evaluator-specific semantics, evaluator-environment normalization effects, indicator-only rule interpretation, and conflating translation behavior with original rule behavior.

### Why It Threatens Validity

BrittleBench measures whether a rule continues to fire on controlled behavior-preserving mutations in a pinned harness. It does not measure production deployment quality, false-positive burden, alert triage value, layered defense, or real attacker success. Some rules are intentionally narrow indicators and may be useful despite low robustness under mutation. Some broad rules may detect a mutation through an unintended side effect. Translated Sigma rules may reflect translator behavior as much as original Sigma logic. Local evaluator normalization may also make events cleaner or more uniform than production telemetry.

### Planned Mitigation

- Define robustness narrowly in Section 4.3 and restate the boundary in Section 6.4.
- Separate true bypasses from translation failures, evaluator failures, and unsupported semantics.
- Label indicator-only and behavioral rules as detection-logic types.
- Report brittleness patterns as diagnostic mechanisms, not as author blame or product rankings.
- Keep native and translated rule families visible as separate strata.
- Treat between-family YARA-versus-event-rule comparisons as exploratory because file artifacts and event streams are different data surfaces.
- Include qualitative review notes for ambiguous broad detections or unexpected matches.

### Residual Risk

Readers may still overinterpret robustness score as a general security score. The paper must avoid terms such as "best rules" or "worst rules" and must frame the metric as a benchmark-specific robustness measure.

## R7.4 External Validity Threats

### Description

External validity threats affect whether findings generalize beyond the Phase 1 corpus. The main limits are public-rule-only sampling, selection bias toward documented techniques with obtainable positives, the `2026-05-25` snapshot cutoff, focus on YARA/Elastic/Sigma-to-Elastic, local self-managed evaluator behavior, LLM-provider dependence, possible LLM training-data contamination, and lack of production telemetry.

### Why It Threatens Validity

Public repositories may differ from private SOC content or vendor-managed detections. Rule sets change continuously, so the snapshot may not represent future content. Rules with documented techniques and obtainable positives may be overrepresented because undocumented or restricted samples are excluded. Elastic/Kibana local validation may differ from production SIEM or EDR deployments with enrichment and custom pipelines. YARA file rules and Elastic event rules represent different detection surfaces. LLM-generated mutations may not reflect all behavior-preserving variation used by real attackers, and the LLM may have seen public rule or technique content during training.

### Planned Mitigation

- State the generalization target as sampled public detection rules at the snapshot date.
- Report source-level and stratum-level coverage counts.
- Keep exploratory rule families separate from confirmatory Phase 1 findings.
- Record evaluator versions, license state, configuration, and field mappings.
- Record LLM provider/model/prompt/settings and mutation acceptance rates.
- Report exclusion counts for missing ground-truth positives and restricted samples.
- Cache LLM prompts/responses and, where feasible, compare a secondary model on a `10%` subsample.
- Recommend future replications on later snapshots, private SOC content where allowed, and additional evaluator families.

### Residual Risk

The study will not support claims about all detection content globally. It will provide a benchmark and an empirical baseline for a defined public corpus. Claims about private enterprise detections, managed vendor content, undocumented techniques, or future rule versions require separate studies.

## R7.5 Ethical Validity Threats

### Description

Ethical validity threats affect whether the research remains defensible as a defender-oriented study. The main risks are dual-use release of bypass examples, accidental publication of weaponizable payloads, unfair attribution harm to rule authors, overclaiming repository comparisons, and creating incentives to shame maintainers instead of improving methodology.

### Why It Threatens Validity

If the project publishes raw mutation payloads or per-rule bypass recipes, attacker benefit could exceed defender benefit. If results are framed as author failure, public maintainers may be penalized for sharing defensive knowledge. If vendor or repository rankings are publicized without context, methodological critique can become reputational harm.

### Planned Mitigation

- Keep raw dangerous mutations in restricted-access storage.
- Release sanitized benchmark metadata, aggregate results, and non-weaponizable examples.
- Avoid naming individual authors in failure examples.
- Report repository-level results constructively and with uncertainty intervals.
- Notify maintainers of systematic findings before publication when practical.
- Disclose researcher employment, funding, LLM-provider relationships, and vendor relationships.
- Formalize detailed disclosure, sanitization, and tone policy in Phase R8.

### Residual Risk

Even sanitized findings can reveal classes of weaknesses. Some readers may use aggregate brittleness patterns offensively. R8 must define exact release boundaries before protocol lock, and publication language must consistently emphasize defensive improvement.

## R7.6 Replication Threats

### Description

Replication threats affect whether another researcher can reproduce or audit the study. The main risks are LLM API drift, unavailable or restricted ground-truth samples, repository disappearance, license changes, local environment drift, nondeterministic evaluator behavior, and withheld raw artifacts.

### Why It Threatens Validity

LLM providers may change model behavior or remove models. Some samples may be unsafe or illegal to redistribute. Public repositories can be rewritten, removed, or relicensed. Elastic/Kibana and YARA versions can change semantics. If raw mutations or samples are withheld for ethical reasons, independent replication may require re-generation rather than exact replay.

### Planned Mitigation

- Store source snapshot manifests with commit hashes, release tags, archive checksums, and retrieval dates.
- Store content-addressed prompt and response caches with hashes for mutation generation, subject to the restricted-artifact policy.
- Record model/provider/prompt/settings and response metadata for mutation generation.
- Publish sanitized manifests, outcome tables, failure-code tables, and analysis code when execution begins.
- Pin evaluator versions and record Docker image digests or package hashes where available.
- Publish enough metadata for independent researchers to reconstruct eligible corpora and repeat the scoring procedure.
- Clearly separate reproducible public artifacts from restricted raw artifacts in [REPRODUCIBILITY.md](./reproducibility).

### Residual Risk

Exact replication may be impossible when LLM models drift or raw samples cannot be released. The realistic target is auditable computational reproducibility for public artifacts plus conceptual replication for restricted artifacts.
