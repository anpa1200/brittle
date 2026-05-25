---
id: local-corpus-build-scenario
title: Local Corpus Build Scenario
sidebar_position: 6
status: "LOCAL WORKFLOW NOTE"
last_updated: "2026-05-24"
phase: "R4/R5 input"
locked_protocol_method: false
---

# Local Corpus Build Scenario

This document logs the local exploratory workflow used to discover, download, normalize, sort, and clean public detection-rule sources. It is **not** the locked research methodology. The formal sampling and validation method still belongs in [PROTOCOL.md](./protocol), especially Sections 4 and 5.

The purpose of this scenario is to preserve operational knowledge while the protocol is still being written: what was attempted, why each step exists, what was kept for Phase 1, and what was removed as future scope or duplicate material.

## Scenario Goal

Build a local working corpus from public detection-rule repositories so the project can later evaluate rule robustness under a controlled protocol.

The desired long-term pipeline is:

1. Find public open-source detection-rule sources.
2. Download source snapshots locally.
3. Normalize or translate rules into analysis-friendly formats.
4. Sort rules by source, format, MITRE metadata, and validation feasibility.
5. Remove non-useful sources, duplicate artifacts, generated caches, and out-of-scope formats.
6. Keep a small Phase 1 working set aligned with the current protocol direction.

## Current Phase 1 Scope Used for Cleanup

The cleanup used the current working scope discussed during R4 planning:

| Category | Status | Validation direction |
|----------|--------|----------------------|
| YARA file/content rules | Kept | Native `yara` / `yara-python` validation |
| Elastic detection rules | Kept | Native Elastic KQL/EQL validation |
| Sigma rules | Kept | Translate to Elastic/EQL where translation fidelity is high |
| YARA-L conversions | Exploratory only | Removed from retained output until reproducibility and backend execution are decided |
| Splunk, Sentinel, Chronicle, Falco, Wazuh, Snort, Suricata, Panther, OpenSearch | Future/exploratory | Removed from retained local working set |

This scope is pragmatic, not final. PROTOCOL.md Sections 4.1, 4.2, 4.3, and 5.2 must still define the formal inclusion rules.

## Step 1 - Find Public Rule Sources

Purpose: identify public rule repositories that could plausibly support a detection robustness benchmark.

Inputs:

- Existing Phase R1 prior-work survey in [PROTOCOL.md](./protocol#13-prior-work-survey).
- Public GitHub repositories and direct rule-download endpoints.
- Candidate inventory in [Public Rule Source Inventory](./rule-source-inventory).

Candidate sources reviewed:

- SigmaHQ Sigma rules.
- Elastic Detection Rules.
- Splunk Security Content.
- Public YARA repositories.
- Elastic Protections Artifacts.
- Microsoft Sentinel.
- Chronicle / Google SecOps detection rules.
- Google Security Analytics.
- Panther Analysis.
- Falco rules.
- Wazuh rules.
- OpenSearch Security Analytics.
- Emerging Threats Suricata rules.
- Snort community rules.
- Discovery indexes such as Awesome YARA.

Why this step matters:

- The benchmark cannot be credible if the source universe is vague.
- Every source has different licensing, rule semantics, metadata quality, and evaluator requirements.
- Source discovery must happen before sampling design so R5.2 can define a defensible sampling frame.

Output:

- A documented source inventory with source URLs, download methods, local target paths, and R5.2 notes.

## Step 2 - Download Local Source Snapshots

Purpose: create local snapshots for inspection and dataset preparation without relying on changing upstream repositories.

Initial local target:

```bash
/home/andrey/git-projects/brittle/detection rules
```

Download methods used:

- `git clone --depth 1` for ordinary GitHub repositories.
- sparse Git checkout for very large repositories such as Azure Sentinel and Wazuh main.
- `curl -L` for direct archive endpoints such as Sigma tarball, Emerging Threats, and Snort community rules.

Why this step matters:

- Rule repositories change frequently.
- Local snapshots allow repeatable parsing and cleanup.
- Shallow/sparse retrieval reduces disk usage when only rule-bearing paths are needed.

Important result:

- The initial broad download reached approximately `5.6G`.
- After cleanup, retained local raw sources were reduced to approximately `74M`.

## Step 3 - Convert or Normalize Rules

Purpose: move from heterogeneous upstream repositories toward formats that can be analyzed consistently.

Exploratory conversion outputs created by the local corpus builder included:

| Output | Purpose | Final cleanup decision |
|--------|---------|------------------------|
| `01_inventory.jsonl` | Unified inventory of discovered rules and metadata. | Kept, filtered to Phase 1 sources. |
| `04_translated_sigma.jsonl` | Sigma normalization/translation output. | Kept, filtered to useful Sigma paths. |
| `05_translated_elastic.jsonl` | Elastic rule normalization output. | Kept. |
| `yara_file_rules/by_source/*.yar` | Consolidated native YARA bundles by source repository. | Kept. |
| YARA-L output | Experimental single-format event-rule conversion. | Removed from retained output for now. |
| Splunk/Sentinel/Chronicle/other translated outputs | Future-scope translation experiments. | Removed from retained output. |
| Network translated output | Future-scope Snort/Suricata-style material. | Removed from retained output. |

Why not keep YARA-L as the single retained format right now:

- YARA-L is an event/log detection language, not a native file-signature evaluator.
- Classic YARA rules should remain native for correctness.
- Snort/Suricata packet rules, Falco runtime rules, Wazuh XML rules, and Splunk SPL rules lose semantics if forced into YARA-L without a formal translation-fidelity model.
- YARA-L execution reproducibility still needs a clear local validation strategy or controlled Chronicle/Google SecOps access.

Current interpretation:

- YARA-L conversion is useful as an exploratory normalization experiment.
- It should not be treated as the confirmatory validation backend until R4/R5 define translation fidelity, evaluator availability, and exclusion rules.

## Step 4 - Sort and Classify

Purpose: separate rules that are useful for the next protocol steps from rules that belong to future expansion.

Classification used for cleanup:

| Source | Kept? | Reason |
|--------|-------|--------|
| `sigmahq-sigma` | Yes | Core Phase 1 event/log rule source; candidate for Elastic/EQL translation. |
| `elastic-detection-rules` | Yes | Core Phase 1 native Elastic source. |
| `yara-rules` | Yes | Core native YARA source. |
| `neo23x0-signature-base` | Yes | Core native YARA source after pruning IOC/scripts. |
| `elastic-protections-artifacts` | Yes | Kept for YARA rules; non-YARA behavior/ransomware artifacts pruned. |
| `reversinglabs-yara-rules` | Yes | Core native YARA source. |
| `inquest-yara-rules` | Yes | Core native YARA source after removing non-rule artifacts. |
| `stratosphere-yara-rules` | Yes | Small native YARA source. |
| `malpedia-signator-rules` | Yes | Native YARA source; should be flagged later as generated rules. |
| `azure-sentinel` | No | Future KQL scope; very large; not Phase 1. |
| `splunk-security-content` | No | Future SPL scope; needs native SPL or fidelity model. |
| `chronicle-detection-rules` | No | Future YARA-L scope; evaluator/reproducibility unresolved. |
| `google-security-analytics` | No | Future cloud analytics scope. |
| `panther-analysis` | No | Future Python/YAML detection-as-code scope. |
| `falco-rules` | No | Future runtime/container scope; native Falco preferred. |
| `wazuh-main`, `wazuh-ruleset` | No | Future Wazuh/OSSEC XML scope; native evaluator preferred. |
| `opensearch-security-analytics` | No | Future or duplicate Sigma-derived source; double-counting risk. |
| Snort/Suricata archives | No | Future network IDS scope; native packet/flow evaluator preferred. |
| `awesome-yara-index` | No | Discovery index, not a rule corpus. |

Why this step matters:

- Keeping every downloaded source makes R4/R5 harder and increases accidental scope creep.
- The first benchmark should be small enough to define precisely.
- Out-of-scope sources can return later as exploratory or Phase 2 additions.

## Step 5 - Clean Local Raw Sources

Purpose: keep only files useful for Phase 1 inspection and avoid carrying repository noise.

Actions taken:

- Removed full future/exploratory source repositories.
- Removed duplicate archive downloads after source directories existed.
- Removed `.git` and `.github` metadata from retained local snapshots.
- Pruned Sigma to `rules/` and `rules-emerging-threats/` plus basic license/readme files.
- Pruned Elastic Detection Rules to `rules/` plus basic license/readme/notice files.
- Pruned Elastic Protections Artifacts to `yara/` plus basic license/readme files.
- Pruned Neo23x0 Signature Base to `yara/`, `vendor/`, license, and README.
- Removed obvious non-rule artifacts such as PDFs, generator scripts, CI metadata, and duplicate/stub YARA files.

Why this step matters:

- Reduces disk usage.
- Reduces parser noise.
- Makes later manual inspection easier.
- Prevents future scripts from accidentally including docs, tests, caches, or unrelated formats.

Result:

- Raw source folder: approximately `74M`.
- Remaining top-level raw sources: 9.
- Remaining raw rule-like files: 9,372.
- Exact duplicate raw rule-like files found after cleanup: 0.

## Step 6 - Clean Generated Output

Purpose: retain only generated outputs that match the current Phase 1 direction.

Actions taken:

- Removed duplicate packaged output directory `brittle-corpus-v0.1.0`.
- Removed YARA-L generated output from retained local output.
- Removed network, Splunk, Sentinel, Chronicle, and miscellaneous translated JSONL outputs.
- Removed cache files and empty validation findings.
- Filtered `01_inventory.jsonl` to retained Phase 1 source repositories.
- Filtered `04_translated_sigma.jsonl` to useful Sigma rule paths.
- Kept `05_translated_elastic.jsonl` as the Elastic normalized output.
- Kept `yara_file_rules/by_source/*.yar` as consolidated native YARA bundles.

Current retained generated output:

```text
corpus-build/output/01_inventory.jsonl
corpus-build/output/04_translated_sigma.jsonl
corpus-build/output/05_translated_elastic.jsonl
corpus-build/output/yara_file_rules/_summary.json
corpus-build/output/yara_file_rules/by_source/*.yar
```

Result:

- Generated output folder: approximately `67M`.

## Step 7 - Protect Local Artifacts from Git

Purpose: prevent local corpus artifacts from being committed before the protocol is locked.

Actions taken:

- Added `detection rules/` to `.gitignore`.
- Added `corpus-build/` to `.gitignore`.

Why this step matters:

- The protocol currently says execution-phase artifacts should not enter the repository before lock.
- Raw rule sources and generated corpora may have licensing and dual-use constraints.
- Local artifacts can be rebuilt later from documented source URLs and snapshot metadata.

## Current Local State

Raw source directory:

```text
/home/andrey/git-projects/brittle/detection rules
```

Retained raw sources:

```text
elastic-detection-rules
elastic-protections-artifacts
inquest-yara-rules
malpedia-signator-rules
neo23x0-signature-base
reversinglabs-yara-rules
sigmahq-sigma
stratosphere-yara-rules
yara-rules
```

Generated output directory:

```text
/home/andrey/git-projects/brittle/corpus-build/output
```

Retained generated outputs:

```text
01_inventory.jsonl
04_translated_sigma.jsonl
05_translated_elastic.jsonl
yara_file_rules/
```

## Decisions Still Needed Before Formalizing

- Whether Sigma confirmation is based on Elastic/EQL translation only, or whether untranslated Sigma rules are retained separately.
- What translation-fidelity threshold excludes a Sigma rule from confirmatory analysis.
- Whether generated YARA sources such as Malpedia Signator Rules are analyzed separately from human-authored YARA sources.
- Whether Elastic Endgame/promotion rules are in scope or excluded as vendor-alert wrapper rules.
- Whether `rules-emerging-threats/` in Sigma is confirmatory or exploratory.
- Whether YARA-L becomes a later secondary backend after local reproducibility is solved.
- How duplicates are defined: byte-identical files, identical rule names, identical logic, or canonicalized rule AST equivalence.

## Scenario Summary

The local workflow successfully reduced a broad public-rule download into a smaller Phase 1 working set. The cleanup intentionally favors correctness and reproducibility over breadth:

- Native YARA stays native.
- Elastic stays native.
- Sigma is retained for controlled translation to Elastic/EQL.
- YARA-L and other universal-conversion attempts are treated as exploratory until the protocol defines evaluator and fidelity rules.
