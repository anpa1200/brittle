---
title: מילון מונחים
---

# מילון מונחים

הטבלה שומרת מונחים מקצועיים באנגלית בכוונה. בעברית מוסיפים הסבר, לא מחליפים את
המונח. זה חשוב במיוחד במונחים כמו `firewall`, `EDR`, `SIEM`, `detection rules`,
`mutation`, `robustness`, `ground truth`, `false positive` ו-`false negative`.

| מונח | תיאור |
|------|-------|
| detection rule | כלל שמזהה observable behavior או artifact מתוך logs, files, process activity, network events וכדומה. |
| mutation | שינוי של artifact או behavior representation תוך שמירה על attacker-relevant behavior. |
| functional equivalence | מצב שבו variant שומר על אותה משמעות תפקודית למחקר, גם אם surface form השתנה. |
| robustness score | המדד שיגדיר עד כמה rule ממשיך לזהות validated equivalent variants. |
| brittleness pattern | סוג חוזר של failure mode שבו rule נכשל מול mutation מסוים. |
| ground truth sample | דוגמה חיובית שאמורה להפעיל את ה-rule לפי scope המחקר. |
| evaluator | רכיב post-lock שיריץ rules מול samples או mutations לפי ה-protocol. |
| unit of analysis | היחידה הסטטיסטית המרכזית: למשל rule, rule+mutation או rule set. |
| SIEM | מערכת שמרכזת logs ו-security events ומשמשת ל-detection, investigation ו-response workflows. |
| EDR | endpoint security platform שמנטרת endpoints, processes, files ו-behavior לצורך detection ו-response. |
| firewall | רכיב network או host security שמבקר traffic לפי policy. |
| false positive | מצב שבו detection מסמן פעילות כחשודה למרות שהיא benign. |
| false negative | מצב שבו detection לא מזהה פעילות שהייתה אמורה להיות detected. |
| ATT&CK | MITRE ATT&CK taxonomy להתנהגויות וטכניקות adversary. |

ההגדרות המחייבות יופיעו ב-Protocol בשלב R4.
