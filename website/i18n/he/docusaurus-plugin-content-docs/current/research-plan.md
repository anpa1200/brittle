---
title: Research Plan
---

# Research Plan

ה-Research Plan מחלק את BrittleBench לשלבים ברורים מ-Phase R1 עד publication.
המטרה היא לשמור על protocol-first discipline: קודם מגדירים מה מודדים ואיך,
ורק אחר כך בונים execution artifacts.

המסמך הזה הוא מפה תפעולית. הוא לא מחליף את `PROTOCOL.md`, אבל הוא עוזר להבין
איזה סוג עבודה שייך לכל phase ומה אסור להתחיל לפני protocol lock.

## Protocol Phases

- **R1 - Problem Definition:** הגדרת הבעיה, prior work, research gap ו-scope.
- **R2 - Research Questions:** ניסוח primary ו-secondary research questions.
- **R3 - Hypotheses:** ניסוח hypotheses, null hypotheses ו-pre-registered predictions.
- **R4 - Definitions:** operational definitions ל-detection rule, functional equivalence, robustness score, brittleness pattern ו-unit of analysis.
- **R5 - Methodology:** sampling strategy, variables, statistical methods ו-power analysis.
- **R6 - Validation:** evidence standards, reliability strategy ו-validity mitigations.
- **R7 - Threats to Validity:** תיעוד conclusion, internal, construct, external, ethical ו-replication threats.
- **R8 - Ethics:** responsible research, disclosure approach, no novel-attack policy ו-dataset sanitization.
- **R9 - Protocol Lock:** pre-registration, lock date ו-falsification criteria.

## Execution Phases

Execution phases מתחילים רק אחרי protocol lock:

- **E1:** corpus collection
- **E2:** ground-truth sample acquisition
- **E3:** mutation generation
- **E4:** evaluation pipeline

בשלבים האלה כבר מותר ליצור execution directories, אבל רק לפי ה-methodology שננעלה
ב-protocol. שינוי מתודולוגי אחרי lock חייב להופיע ב-CHANGELOG.

## Analysis and Publication

- **A1-A3:** data QA, statistical analysis ו-findings draft.
- **P1-P4:** review, artifact release ו-publication.

## Cadence מומלץ

בגלל שהפרויקט מוגדר כ-solo research עם בערך 8-10 שעות בשבוע, עדיף לעבוד ב-small
batches:

1. לבחור 2-4 issues לשבוע.
2. לעדכן `DECISIONS.md` מיד כשמתקבלת החלטה.
3. לעדכן `OPEN-QUESTIONS.md` כששאלה נפתחת או נסגרת.
4. לוודא בסוף השבוע שה-Docusaurus docs וה-canonical Markdown לא סותרים זה את זה.
