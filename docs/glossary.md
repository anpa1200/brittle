---
status: "DRAFT"
last_updated: "2026-05-25"
---

# Glossary

Definitions in this file are populated as Phase R4 firms up. The canonical
definitions belong in [../PROTOCOL.md Section 4](../PROTOCOL.md#4-definitions-and-operationalization-phase-r4).

| Term | Definition | Protocol Reference | Status |
|------|------------|--------------------|--------|
| Detection rule | Machine-readable artifact that expresses conditions intended to identify malicious or suspicious behavior, file content, or event telemetry. Phase 1 confirmatory rules are limited to native YARA, native Elastic, and high-fidelity Sigma-to-Elastic translations. | [§4.1](../PROTOCOL.md#41-detection-rule--formal-definition) | DRAFT |
| Mutation | Modified artifact or event representation derived from a parent ground-truth example for robustness testing. | [§4.2](../PROTOCOL.md#42-functional-equivalence--formal-definition) | DRAFT |
| Functional equivalence | Property of a mutation that preserves the attacker-relevant behavior, same detection intent, same observable surface, and no novel capability relative to the parent example. | [§4.2](../PROTOCOL.md#42-functional-equivalence--formal-definition) | DRAFT |
| Robustness score | Per-rule fraction of validated functionally equivalent mutations detected after the rule detects its original positive example. | [§4.3](../PROTOCOL.md#43-robustness-score--formal-definition) | DRAFT |
| Brittleness pattern | Recurring failure mechanism where a validated equivalent mutation is missed because the rule depends on a narrow representation of the target behavior. | [§4.4](../PROTOCOL.md#44-brittleness-pattern--formal-definition) | DRAFT |
| Ground truth sample | Original positive example that should be detected by the rule before any mutation result can be scored for that rule. | [§4.2](../PROTOCOL.md#42-functional-equivalence--formal-definition) | DRAFT |
| Evaluator | Pinned validation environment used to execute or test a rule family, such as native YARA or self-managed Elastic/Kibana. | [§4.1](../PROTOCOL.md#41-detection-rule--formal-definition) | DRAFT |
| Unit of analysis | Object over which measurements are made: rule, rule-mutation pair, rule-source group, or mutation class. | [§4.5](../PROTOCOL.md#45-unit-of-analysis) | DRAFT |
