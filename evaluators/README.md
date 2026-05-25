# Evaluators Workspace

This directory is for Phase E4 evaluator harness code and configuration.

Confirmatory Phase 1 evaluators are limited to native YARA tooling, native Elastic/Kibana rule evaluation, and high-fidelity Sigma-to-Elastic evaluation through the Elastic/Kibana harness.

Required controls:

- Pin evaluator versions and record package/container digests where available.
- Keep evaluator failures separate from true bypasses.
- Store reusable code and configuration here; keep generated outputs in `results/`.
- Do not add new evaluator families without a post-lock major protocol revision.
