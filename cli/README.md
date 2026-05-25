# CLI Workspace

This directory is for command-line tooling that makes BrittleBench workflows reproducible.

Required controls:

- Keep commands deterministic where possible.
- Avoid embedding secrets, API keys, raw malware, or restricted mutation content.
- Provide explicit dry-run or manifest-only modes for risky operations.
- Document every command before relying on it for confirmatory execution.
