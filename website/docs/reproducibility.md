# Reproducibility Checklist

> **Cross-cutting log C5.** A living checklist tracking reproducibility readiness. Items are checked off as the study matures through execution phases. Standards followed: [ACM Artifact Review and Badging v1.1](https://www.acm.org/publications/policies/artifact-review-and-badging-current) and [FAIR Data Principles](https://www.go-fair.org/fair-principles/).
>
> Related: [PROTOCOL.md §6.5](./protocol#65-reliability-strategy) | [future-execution/README.md](https://github.com/anpa1200/brittle/tree/main/future-execution)

---

## Status Key

- `[ ]` Not yet addressed
- `[~]` In progress / partially addressed
- `[x]` Complete

---

## Code Reproducibility

- [ ] Primary language and version pinned (e.g., Python 3.11.x)
- [ ] All dependencies listed in a lockfile (e.g., `requirements.lock` or `pyproject.toml` with pinned versions)
- [ ] Container or environment specification provided (Dockerfile or `environment.yml`)
- [ ] All randomness seeded and seeds recorded
- [ ] Build is deterministic: same inputs → same outputs on the same platform
- [ ] No hardcoded paths; all paths configurable via environment or config file
- [ ] Code passes a clean install and run on a fresh environment

## Data Reproducibility

- [ ] Corpus snapshot archived with a content hash (SHA-256 or equivalent)
- [ ] Snapshot date recorded in PROTOCOL.md §5.2
- [ ] Dataset stored with persistent identifier (DOI or equivalent)
- [ ] Data format documented (schema or data dictionary)
- [ ] Data license is CC-BY-4.0 and is applied to every released data file
- [ ] Raw (unsanitized) and public (sanitized) datasets clearly separated
- [ ] Access procedure for restricted raw data documented

## Computation Reproducibility

- [ ] Hardware requirements documented (RAM, storage, GPU if applicable)
- [ ] Wall-clock runtime for each major phase reported
- [ ] LLM API version and model name pinned per run (provider, model ID, API version)
- [ ] LLM temperature and sampling parameters recorded per run
- [ ] Evaluation environment (OS, kernel, detection engine versions) documented

## Documentation Reproducibility

- [ ] README includes install instructions from scratch
- [ ] README includes example invocations for each major pipeline step
- [ ] PROTOCOL.md is complete, locked, and matches actual study execution
- [ ] Pre-registration URL recorded in PROTOCOL.md §9.4

## Verification

- [ ] Automated tests cover core evaluation logic
- [ ] Expected outputs for a small reference corpus provided (smoke test)
- [ ] Results tables in the paper can be reproduced from archived inputs + code
- [ ] An independent replication attempt has been completed (post-publication goal)
