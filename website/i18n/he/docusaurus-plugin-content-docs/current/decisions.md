---
title: החלטות
---

# יומן החלטות מתודולוגיות

כל methodological decision צריך להופיע ב-`DECISIONS.md`. הגרסה העברית מסבירה את
המטרה, אבל הקובץ האנגלי הוא המקור המחייב.

## למה זה חשוב

החלטות כמו scope, sampling strategy, robustness score, statistical methods
ו-disclosure policy משפיעות על credibility של המחקר. אם ההחלטות לא מתועדות בזמן
אמת, קשה להסביר בדיעבד למה נבחרה מתודולוגיה מסוימת.

## החלטות קיימות

- **DEC-0001:** אימוץ pre-registered research protocol ונעילה לפני execution.
  ההחלטה הזו אומרת שאין corpus collection, mutation generation, evaluator או
  analysis לפני שה-protocol ננעל.
- **DEC-0002:** קביעת scope ראשוני ל-public detection content בשלב R1.
  ההחלטה הזו מגבילה את ה-scope הראשוני ל-public detection content שאפשר לבצע לו
  snapshot, לצטט אותו, ולנתח אותו בלי גישה proprietary.

## מתי מוסיפים DEC חדש

מוסיפים entry חדש כאשר מתקבלת החלטה שמשנה את המחקר:

- בחירת rule formats או repositories.
- הגדרת functional equivalence.
- הגדרת robustness score.
- בחירת sampling strategy.
- בחירת statistical methods.
- החלטות disclosure או dataset sanitization.

לא מספיק לכתוב את ההחלטה ב-issue. היא חייבת להופיע גם ב-`DECISIONS.md`.

## מקור מחייב

https://github.com/anpa1200/brittle/blob/main/DECISIONS.md
