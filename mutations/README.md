# Mutations Workspace

This directory is for Phase E3 mutation manifests and sanitized mutation metadata after protocol lock.

Raw LLM prompts, raw responses, and direct bypass strings are restricted artifacts when they meet [PROTOCOL.md](../PROTOCOL.md) Section 8.4 criteria. Do not commit raw weaponizable mutation content.

Required controls:

- Use the locked mutation profile: five classes per family, two validated mutations per class.
- Record parent rule/example ID, mutation class, model/provider, generation settings, review status, and hashes.
- Publish hashes and structural metadata when raw content is restricted.
- Keep functional-equivalence review outcomes auditable without exposing unsafe payloads.
