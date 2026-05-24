---
title: Open Questions
---

# Open Questions

`OPEN-QUESTIONS.md` שומר שאלות שעדיין לא נכון לפתור. המטרה היא לא לנחש מוקדם מדי.

## Open Questions קיימות

- **OQ-0001:** LLM provider selection for mutation generation. צריך להחליט לפי
  cost, refusal behavior, output quality ו-reproducibility.
- **OQ-0002:** rules with no obtainable ground-truth sample. זה משפיע ישירות על
  denominator של robustness score.
- **OQ-0003:** האם לכלול vendor-published rules. זה משפיע על scope,
  generalizability ו-disclosure complexity.
- **OQ-0004:** corpus snapshot cutoff date. public repositories משתנים כל הזמן,
  ולכן צריך date קבוע.
- **OQ-0005:** inter-rater reliability protocol for manual mutation review. זה
  קריטי ל-construct validity של functional equivalence.

## כלל עבודה

כאשר שאלה נפתרת, צריך לעדכן גם `OPEN-QUESTIONS.md` וגם `DECISIONS.md`.

אם שאלה חוסמת phase מסוים, היא צריכה להופיע גם ב-GitHub Project כ-blocker.

## Canonical Source

https://github.com/anpa1200/brittle/blob/main/OPEN-QUESTIONS.md
