# Corpus Workspace

This directory is for Phase E1 corpus manifests and sanitized corpus metadata after protocol lock.

Raw downloaded rule sources should stay outside the public repository unless a later release decision explicitly permits publication. Use this directory for reproducible source manifests, hashes, inclusion/exclusion tables, and non-sensitive normalized metadata.

Required controls:

- Follow [PROTOCOL.md](../PROTOCOL.md) Sections 4.1 and 5.2.
- Record source URL, retrieval method, commit/release/checksum, license, and retrieval date.
- Keep raw third-party rule archives out of git unless redistribution is confirmed.
- Track the funnel: collected -> parsed -> deduplicated -> evaluator-compatible -> original-positive validated -> mutation-eligible.
