---
title: Glossary
---

# Glossary

הטבלה שומרת מונחים מקצועיים באנגלית בכוונה.

| Term | תיאור |
|------|-------|
| detection rule | כלל שמזהה observable behavior או artifact מתוך logs, files, process activity, network events וכדומה. |
| mutation | שינוי של artifact או behavior representation תוך שמירה על attacker-relevant behavior. |
| functional equivalence | מצב שבו variant שומר על אותה משמעות תפקודית למחקר, גם אם surface form השתנה. |
| robustness score | המדד שיגדיר עד כמה rule ממשיך לזהות validated equivalent variants. |
| brittleness pattern | סוג חוזר של failure mode שבו rule נכשל מול mutation מסוים. |
| ground truth sample | דוגמה חיובית שאמורה להפעיל את ה-rule לפי scope המחקר. |
| evaluator | רכיב post-lock שיריץ rules מול samples או mutations לפי ה-protocol. |
| unit of analysis | היחידה הסטטיסטית המרכזית: למשל rule, rule+mutation או rule set. |

ה-definitions המחייבים יופיעו ב-Protocol Phase R4.
