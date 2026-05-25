# Dataset Workspace

This directory is for public dataset packaging after sanitization review.

The public dataset should include metadata and outcomes useful for defender reproduction without exposing raw dangerous artifacts.

Required controls:

- Follow [PROTOCOL.md](../PROTOCOL.md) Section 8.4.
- Include source identifiers, hashes, inclusion/exclusion reason codes, normalized metadata, sanitized mutation-class labels, and aggregate outcomes.
- Exclude raw malware, direct bypass payloads, per-rule evasion instructions, credentials, exploit strings, and non-redistributable material.
- Document every withheld artifact class and why it is restricted.
