# The Brittleness Benchmark

**BrittleBench: A Defender's Audit of Public Detection Content Robustness**

**Status:** ![Protocol Locked](https://img.shields.io/badge/Protocol-v1.0.0%20LOCKED-brightgreen)

---

## What is BrittleBench?

BrittleBench is a large-scale empirical study measuring how robust publicly-published detection rules are when faced with LLM-generated functional mutations of the attacks those rules are designed to detect. Confirmatory Phase 1 is scoped to native YARA, native Elastic, and high-fidelity Sigma-to-Elastic rules. The study produces (a) a public benchmark dataset for detection robustness, (b) an open-source toolkit for detection engineers to score their own rules, and (c) a primary publication reporting findings. The research protocol is locked at `v1.0.0`; execution-phase work must follow the locked methodology.

**Current phase:** [Protocol v1.0.0 — Locked](PROTOCOL.md)

---

## Research Goals

- Quantify robustness distribution across a public detection content corpus
- Identify failure-mode patterns (what kinds of mutations bypass what kinds of rules)
- Compare robustness across eligible detection repositories and rule families
- Investigate correlation between rule age, complexity, and brittleness
- Produce a reusable benchmark methodology for the detection engineering field

## Non-Goals

- We are NOT building a detection product or a SIEM integration
- We are NOT generating novel attack techniques
- We are NOT publishing weaponizable payloads (mutations are sanitized at release; raw mutations stay in restricted-access form)
- We are NOT shaming individual rule authors — critique is methodological and constructive
- We are NOT building a commercial service

---

## Timeline Overview

| Month | Phase | Milestone |
|-------|-------|-----------|
| 1 | R1–R4 | Problem definition, RQs, hypotheses, definitions locked |
| 2 | R5–R9 | Methodology design, validity, ethics, protocol locked |
| 3 | E1–E2 | Corpus collection, ground-truth sample acquisition |
| 4 | E3–E4 | Mutation generation, evaluation pipeline |
| 5 | A1–A3 | Analysis, findings, paper draft |
| 6 | P1–P4 | Peer review, dataset release, publication |

---

## How to Contribute

The project is in the **research protocol phase** and is not yet accepting external contributions. The protocol must be locked (see [PROTOCOL.md](PROTOCOL.md) Section 9.1) before the execution phase begins.

Once Phase E starts, contributions will be welcome via:
- Issue tracker (corpus gaps, evaluator bugs)
- Pull requests (tooling improvements)
- Dataset feedback (post-release)

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full policy.

---

## Citation

If you reference this project before formal publication, please use:

```
Pautov, A. (2026). BrittleBench: A Defender's Audit of Public Detection Content Robustness.
GitHub: https://github.com/anpa1200/brittle
DOI: to be assigned upon dataset release
```

A machine-readable citation is available in [CITATION.cff](CITATION.cff).

---

## License

- **Code:** MIT License — see [LICENSE](LICENSE)
- **Dataset:** Creative Commons Attribution 4.0 International — see [LICENSE-DATA](LICENSE-DATA)

---

## Author

**Andrey Pautov**
GitHub: [@anpa1200](https://github.com/anpa1200)
Contact: 1200km@gmail.com

For security vulnerability disclosures in tooling used by this project, see [SECURITY.md](SECURITY.md).

## 1200km Ecosystem

This project is part of the 1200km security research ecosystem. Use [AdversaryGraph](https://1200km.com/adversarygraph/) for CTI-to-detection workflows, ATT&CK/ATLAS mapping, actor relevance, IOC enrichment, and analyst-ready reporting.

- [AdversaryGraph project hub](https://1200km.com/adversarygraph/)
- [AdversaryGraph documentation](https://1200km.com/adversarygraph-docs/)
- [Live ATT&CK/ATLAS workspace](https://1200km.com/threat-matrix/)
- [1200km security research ecosystem](https://1200km.com/)

