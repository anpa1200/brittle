---
title: תוכנית מחקר
---

# תוכנית מחקר

תוכנית המחקר מחלקת את BrittleBench לשלבים ברורים משלב R1 עד publication.
המטרה היא לשמור על protocol-first discipline: קודם מגדירים מה מודדים ואיך,
ורק אחר כך בונים execution artifacts.

המסמך הזה הוא מפה תפעולית. הוא לא מחליף את `PROTOCOL.md`, אבל הוא עוזר להבין
איזה סוג עבודה שייך לכל phase ומה אסור להתחיל לפני protocol lock.

## שלבי ה-protocol

- **R1 - הגדרת הבעיה:** הגדרת הבעיה, prior work, research gap ו-scope.
- **R2 - שאלות מחקר:** ניסוח primary ו-secondary research questions.
- **R3 - Hypotheses:** ניסוח hypotheses, null hypotheses ו-pre-registered predictions.
- **R4 - הגדרות:** operational definitions ל-detection rule, functional equivalence, robustness score, brittleness pattern ו-unit of analysis.
- **R5 - Methodology:** sampling strategy, variables, statistical methods ו-power analysis.
- **R6 - Validation:** evidence standards, reliability strategy ו-validity mitigations.
- **R7 - איומים על validity:** תיעוד conclusion, internal, construct, external, ethical ו-replication threats.
- **R8 - Ethics:** responsible research, disclosure approach, no novel-attack policy ו-dataset sanitization.
- **R9 - נעילת ה-protocol:** pre-registration, lock date ו-falsification criteria.

## שלבי execution

Execution phases מתחילים רק אחרי protocol lock:

- **E1:** corpus collection
- **E2:** ground-truth sample acquisition
- **E3:** mutation generation
- **E4:** evaluation pipeline

בשלבים האלה כבר מותר ליצור execution directories, אבל רק לפי ה-methodology שננעלה
ב-protocol. שינוי מתודולוגי אחרי lock חייב להופיע ב-CHANGELOG.

## Analysis ו-publication

- **A1-A3:** data QA, statistical analysis ו-findings draft.
- **P1-P4:** review, artifact release ו-publication.

## קצב עבודה מומלץ

בגלל שהפרויקט מוגדר כ-solo research עם בערך 8-10 שעות בשבוע, עדיף לעבוד ב-small
batches:

1. לבחור 2-4 issues לשבוע.
2. לעדכן `DECISIONS.md` מיד כשמתקבלת החלטה.
3. לעדכן `OPEN-QUESTIONS.md` כששאלה נפתחת או נסגרת.
4. לוודא בסוף השבוע שה-Docusaurus docs וה-canonical Markdown לא סותרים זה את זה.
