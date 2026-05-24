# Methodological Decision Log

> **Cross-cutting log C1.** Every methodological decision — including ones that feel obvious — gets an entry here. The discipline of writing rationale prevents "why did I do it this way?" six months from now and strengthens the credibility of the final publication.
>
> Related: [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) (deferred questions) | [CHANGELOG.md](CHANGELOG.md) (post-lock protocol changes)

---

## Format

Each entry uses the following structure:

```
### DEC-XXXX — Short title

| Field | Value |
|-------|-------|
| ID | DEC-XXXX |
| Date | YYYY-MM-DD |
| Status | OPEN / ADOPTED / SUPERSEDED |
| Supersedes | DEC-XXXX (if applicable) |
| Superseded by | DEC-XXXX (if applicable) |

**Decision:** One-sentence statement of what was decided.

**Rationale:** Why this decision was made. What considerations drove it.

**Alternatives considered:**
- Alternative A — why rejected
- Alternative B — why rejected

**Implications:** What this decision constrains or enables downstream.
```

---

## Log

---

### DEC-0001 — Adopt pre-registered research protocol; lock before execution

| Field | Value |
|-------|-------|
| ID | DEC-0001 |
| Date | 2026-05-24 |
| Status | ADOPTED |
| Supersedes | — |
| Superseded by | — |

**Decision:** Adopt a pre-registered research protocol approach. PROTOCOL.md must be locked (Section 9.1 set to LOCKED) before any execution-phase work (corpus collection, mutation generation, evaluation) begins.

**Rationale:** Pre-registration strengthens external validity and credibility by separating hypothesis generation from hypothesis testing. It is standard practice in modern empirical research (psychology, medicine, and increasingly software engineering). It is cheap insurance against post-hoc rationalization: if the protocol is locked before data is seen, the confirmatory analyses are genuinely confirmatory. For a solo-researcher study without an institutional review board, pre-registration is the primary credibility mechanism available.

**Alternatives considered:**
- Exploratory-first approach (collect data, then form questions) — rejected because it produces descriptive findings that are hard to generalize and invites p-hacking without a precommitted analysis plan.
- Protocol written concurrently with implementation — rejected because it defeats the purpose; the temptation to adjust the protocol to match emerging results is too high.

**Implications:** No execution-phase directories or code may exist in this repository until PROTOCOL.md Section 9.1 reads LOCKED. This is enforced by convention (see [future-execution/README.md](future-execution/README.md)) and by the structure of this repository.
