---
id: rule-source-inventory
title: Public Rule Source Inventory
sidebar_position: 5
status: "DRAFT"
last_updated: "2026-05-25"
phase: "pre-lock source inventory"
---

# Public Detection Rule Source Inventory

This document is a candidate-source inventory for Phase R5.2 sampling design. It does not create the corpus and does not authorize execution-phase collection. Until [PROTOCOL.md Section 9](./protocol#9-protocol-status-phase-r9) reads `LOCKED`, commands in this document are collection recipes only.

Recommended local storage root for later collection:

```bash
export BB_RULES_ROOT="$HOME/brittlebench-rule-sources/$(date -u +%Y%m%d)"
mkdir -p "$BB_RULES_ROOT"
```

Do not store downloaded rules in this repository before protocol lock. If temporary local storage is ever needed inside the checkout, use an ignored directory such as `local-rule-sources/`.

## Inclusion Notes

- **Confirmatory Phase 1 candidate** means directly aligned with the locked methodology: native YARA, native Elastic, or Sigma that can be translated to Elastic with high fidelity.
- **Secondary candidate** means valuable for future expansion or exploratory comparison, but not part of confirmatory Phase 1 unless a later locked protocol amendment admits it.
- **Discovery index** means useful for finding more sources, but not itself a rule corpus.
- All sources require license review, duplicate detection, snapshot date recording, and exact inclusion/exclusion rules in PROTOCOL.md Section 5.2 before collection.

## Candidate Sources

| Priority | Source | Rule family / format | Public source | Later collection method | Candidate local target | Notes for R5.2 |
|----------|--------|----------------------|---------------|-------------------------|------------------------|----------------|
| Confirmatory Phase 1 candidate | SigmaHQ main rule repository | Sigma YAML | [source](https://github.com/SigmaHQ/sigma) | `git clone --depth 1 https://github.com/SigmaHQ/sigma.git "$BB_RULES_ROOT/sigmahq-sigma"` | `$BB_RULES_ROOT/sigmahq-sigma` | Strong fit only for high-fidelity Sigma-to-Elastic translations. Record release tag or commit SHA. |
| Confirmatory Phase 1 candidate | SigmaHQ releases | Sigma YAML release packages | [source](https://github.com/SigmaHQ/sigma/releases) | `curl -L -o "$BB_RULES_ROOT/sigmahq-sigma.tar.gz" https://github.com/SigmaHQ/sigma/archive/refs/heads/master.tar.gz` | `$BB_RULES_ROOT/sigmahq-sigma.tar.gz` | Prefer release artifact or pinned commit if a release exists near snapshot date. |
| Confirmatory Phase 1 candidate | Elastic Detection Rules | Elastic Security detection rules | [source](https://github.com/elastic/detection-rules) | `git clone --depth 1 https://github.com/elastic/detection-rules.git "$BB_RULES_ROOT/elastic-detection-rules"` | `$BB_RULES_ROOT/elastic-detection-rules` | Strong fit. Focus on native rules; exclude deprecated, building-block, and promotion wrapper rules unless separate exploratory strata are defined. |
| Secondary candidate | Splunk Security Content | Splunk detections / analytic stories | [source](https://github.com/splunk/security_content) | `git clone --depth 1 https://github.com/splunk/security_content.git "$BB_RULES_ROOT/splunk-security-content"` | `$BB_RULES_ROOT/splunk-security-content` | Future/exploratory. SPL evaluator semantics are outside confirmatory Phase 1. |
| Confirmatory Phase 1 candidate | Yara-Rules community repository | YARA | [source](https://github.com/Yara-Rules/rules) | `git clone --depth 1 https://github.com/Yara-Rules/rules.git "$BB_RULES_ROOT/yara-rules"` | `$BB_RULES_ROOT/yara-rules` | Strong fit for public YARA. Requires module support and duplicate handling. |
| Confirmatory Phase 1 candidate | Neo23x0 signature-base | YARA and IOC signatures | [source](https://github.com/Neo23x0/signature-base) | `git clone --depth 1 https://github.com/Neo23x0/signature-base.git "$BB_RULES_ROOT/neo23x0-signature-base"` | `$BB_RULES_ROOT/neo23x0-signature-base` | Strong YARA source. Exclude non-YARA IOC lists from confirmatory Phase 1. |
| Confirmatory Phase 1 candidate | Elastic Protections Artifacts | YARA and endpoint behavior rules | [source](https://github.com/elastic/protections-artifacts) | `git clone --depth 1 https://github.com/elastic/protections-artifacts.git "$BB_RULES_ROOT/elastic-protections-artifacts"` | `$BB_RULES_ROOT/elastic-protections-artifacts` | Confirmatory only for native YARA artifacts. Endpoint behavior rules remain exploratory. |
| Confirmatory Phase 1 candidate | ReversingLabs YARA Rules | YARA | [source](https://github.com/reversinglabs/reversinglabs-yara-rules) | `git clone --depth 1 https://github.com/reversinglabs/reversinglabs-yara-rules.git "$BB_RULES_ROOT/reversinglabs-yara-rules"` | `$BB_RULES_ROOT/reversinglabs-yara-rules` | Public vendor-maintained YARA. Review prerequisites and supported YARA modules. |
| Confirmatory Phase 1 candidate | InQuest YARA Rules | YARA | [source](https://github.com/InQuest/yara-rules) | `git clone --depth 1 https://github.com/InQuest/yara-rules.git "$BB_RULES_ROOT/inquest-yara-rules"` | `$BB_RULES_ROOT/inquest-yara-rules` | Public YARA corpus. Verify current maintenance and license before inclusion. |
| Confirmatory Phase 1 candidate | Stratosphere IPS YARA Rules | YARA | [source](https://github.com/stratosphereips/yara-rules) | `git clone --depth 1 https://github.com/stratosphereips/yara-rules.git "$BB_RULES_ROOT/stratosphere-yara-rules"` | `$BB_RULES_ROOT/stratosphere-yara-rules` | Smaller public corpus; useful if sampling includes curated YARA repositories. |
| Confirmatory Phase 1 candidate | Malpedia Signator Rules | YARA | [source](https://github.com/malpedia/signator-rules) | `git clone --depth 1 https://github.com/malpedia/signator-rules.git "$BB_RULES_ROOT/malpedia-signator-rules"` | `$BB_RULES_ROOT/malpedia-signator-rules` | Auto-generated YARA rules. Treat generated rules separately from human-authored rules. |
| Secondary candidate | Microsoft Sentinel public repository | KQL analytics rules and hunting queries | [source](https://github.com/Azure/Azure-Sentinel) | `git clone --depth 1 https://github.com/Azure/Azure-Sentinel.git "$BB_RULES_ROOT/azure-sentinel"` | `$BB_RULES_ROOT/azure-sentinel` | Large public source. Include only if KQL/Sentinel rules are added to scope; likely paths: `Detections/`, `Solutions/*/Analytic Rules/`, `Hunting Queries/`. |
| Secondary candidate | Google SecOps / Chronicle detection rules | YARA-L | [source](https://github.com/chronicle/detection-rules) | `git clone --depth 1 https://github.com/chronicle/detection-rules.git "$BB_RULES_ROOT/chronicle-detection-rules"` | `$BB_RULES_ROOT/chronicle-detection-rules` | Public YARA-L examples. Needs separate evaluator design and may be out of initial multi-format scope. |
| Secondary candidate | Google Cloud Community Security Analytics | GCP audit and threat queries | [source](https://github.com/GoogleCloudPlatform/security-analytics) | `git clone --depth 1 https://github.com/GoogleCloudPlatform/security-analytics.git "$BB_RULES_ROOT/google-security-analytics"` | `$BB_RULES_ROOT/google-security-analytics` | Good cloud-detection source. Needs format mapping and ground-truth strategy. |
| Secondary candidate | Panther Analysis | Python/YAML detection-as-code | [source](https://github.com/panther-labs/panther-analysis) | `git clone --depth 1 https://github.com/panther-labs/panther-analysis.git "$BB_RULES_ROOT/panther-analysis"` | `$BB_RULES_ROOT/panther-analysis` | Public managed-detection content. Requires Python-rule execution model; likely future expansion. |
| Secondary candidate | Falco Rules | Falco YAML runtime/container rules | [source](https://github.com/falcosecurity/rules) | `git clone --depth 1 https://github.com/falcosecurity/rules.git "$BB_RULES_ROOT/falco-rules"` | `$BB_RULES_ROOT/falco-rules` | Public cloud-native runtime rules. Requires syscall/container event model, likely separate from initial SIEM/YARA scope. |
| Secondary candidate | Wazuh ruleset | Wazuh / OSSEC XML rules | [source](https://github.com/wazuh/wazuh-ruleset) | `git clone --depth 1 https://github.com/wazuh/wazuh-ruleset.git "$BB_RULES_ROOT/wazuh-ruleset"` | `$BB_RULES_ROOT/wazuh-ruleset` | Public XML rules and decoders. Verify whether this or `wazuh/wazuh` is the authoritative current source at snapshot time. |
| Secondary candidate | Wazuh main repository ruleset | Wazuh / OSSEC XML rules | [source](https://github.com/wazuh/wazuh) | `git clone --depth 1 https://github.com/wazuh/wazuh.git "$BB_RULES_ROOT/wazuh-main"` | `$BB_RULES_ROOT/wazuh-main` | Use if ruleset is maintained in the main repository. Include `ruleset/rules/` only after authority check. |
| Secondary candidate | OpenSearch Security Analytics | Sigma-derived prepackaged rules | [source](https://github.com/opensearch-project/security-analytics) | `git clone --depth 1 https://github.com/opensearch-project/security-analytics.git "$BB_RULES_ROOT/opensearch-security-analytics"` | `$BB_RULES_ROOT/opensearch-security-analytics` | Uses prepackaged open-source Sigma rules. Avoid double-counting SigmaHQ-derived rules. |
| Secondary candidate | Emerging Threats Open for Suricata | Suricata network IDS rules | [source](https://rules.emergingthreats.net/open/suricata/) | `curl -L -o "$BB_RULES_ROOT/emerging-threats-open-suricata.tar.gz" https://rules.emergingthreats.net/open/suricata/emerging.rules.tar.gz` | `$BB_RULES_ROOT/emerging-threats-open-suricata.tar.gz` | Public network IDS rules. Requires packet/flow ground truth and separate evaluator; likely future scope. |
| Secondary candidate | Snort Community Rules | Snort IDS rules | [source](https://www.snort.org/downloads/community/community-rules.tar.gz) | `curl -L -o "$BB_RULES_ROOT/snort-community-rules.tar.gz" https://www.snort.org/downloads/community/community-rules.tar.gz` | `$BB_RULES_ROOT/snort-community-rules.tar.gz` | Free community rules. Requires license review and network traffic evaluation model. |
| Discovery index | InQuest Awesome YARA | Curated YARA source index | [source](https://github.com/InQuest/awesome-yara) | `git clone --depth 1 https://github.com/InQuest/awesome-yara.git "$BB_RULES_ROOT/awesome-yara-index"` | `$BB_RULES_ROOT/awesome-yara-index` | Not a corpus by itself. Use to discover additional YARA repos, then vet each source individually. |
| Discovery index | GitHub topic: yara-rules | Public YARA repository discovery | [source](https://github.com/topics/yara-rules) | Manual review or GitHub API search after R5.2 | N/A | Useful for expansion, but GitHub topic search is unstable and must not define the final sampling frame alone. |
| Discovery index | Microsoft Sentinel Analytics Rules catalog | Catalog over Azure-Sentinel rules | [source](https://analyticsrules.exchange/) | Manual review; source URLs point back to Azure/Azure-Sentinel | N/A | Useful metadata browser, not a canonical source. Prefer cloning Azure/Azure-Sentinel for actual data. |
| Discovery index | Awesome Threat Detection / Hunting lists | Curated detection-source index | [source](https://threat-hunting.github.io/awesome_Threat-Hunting/) | Manual review after R5.2 | N/A | Discovery only. Every linked source needs separate license, format, and maintenance review. |

## Collection Metadata Required Later

For every source admitted into the final sampling frame, record:

- Source name and canonical URL.
- Retrieval method: `git clone`, GitHub archive download, release download, `curl`/`wget`, or manual copy.
- Snapshot timestamp in UTC.
- Git commit SHA, release tag, or archive checksum.
- License and redistribution constraints.
- Included paths and excluded paths.
- Rule count before and after parsing, deduplication, and eligibility filtering.
- Whether the source is human-authored, vendor-authored, community-authored, generated, aggregated, or mixed.
- Whether rules are primary detections, hunting queries, building blocks, policies, decoders, correlation rules, or metadata.

## Post-R5 Scope Notes

- Microsoft Sentinel KQL, Chronicle YARA-L, Panther Python rules, Falco YAML, Wazuh XML, Suricata rules, Snort rules, and Splunk SPL are future or exploratory sources, not confirmatory Phase 1 inputs.
- Whether generated YARA corpora such as Malpedia Signator Rules are analyzed separately from human-authored rule corpora.
- Whether derived or mirrored Sigma corpora are excluded to avoid double-counting SigmaHQ content.
- Whether hunting queries are included, excluded, or analyzed separately from alerting detections.
- Whether network IDS rules are compatible with the planned mutation model, which currently emphasizes commands, scripts, files, registry events, process behavior, and malware/file artifacts.
