---
id: intro
title: סקירה
slug: /
---

# BrittleBench

BrittleBench הוא פרויקט מחקר שבודק את ה-robustness של public detection
rules מול validated, functionally equivalent mutations של ההתנהגויות שה-rules
אמורים לזהות. המטרה היא להבין האם public detection content באמת מכליל מעבר
לדוגמה המקורית שעליה ה-rule נכתב, או שהוא מזהה רק surface form צר מאוד.

הפרויקט נמצא כרגע ב-**שלב R1 - הגדרת הבעיה**. המשמעות המעשית היא
שעדיין לא בונים corpus, mutation pipeline, evaluator, dataset או analysis code.
קודם כותבים ונועלים research protocol. רק אחרי נעילה עוברים ל-execution.

## למה הפרויקט קיים

Detection engineers משתמשים הרבה ב-public rules מתוך SigmaHQ, Elastic Detection
Rules, Splunk Security Content ו-YARA repositories. זה יעיל, אבל יוצר תלות
באיכות שלא תמיד נמדדת: האם ה-rule מזהה behavior, או רק string, command line,
file name, registry path או artifact ספציפי?

BrittleBench מתייחס לזה כאל שאלה אמפירית. במקום להניח ש-rule טוב או רע, המחקר
יבדוק אותו מול variants שעברו validation של functional equivalence.

## מצב נוכחי

- ה-protocol המחייב: [Protocol](/docs/protocol)
- תוכנית המחקר: [תוכנית מחקר](/docs/research-plan)
- שאלות מתודולוגיות פתוחות: [שאלות פתוחות](/docs/open-questions)
- צינור המשימות ב-GitHub: [GitHub Project Pipeline](/docs/github-project-pipeline)

## מונחים מקצועיים

בגרסה העברית לא מתורגמים מונחים מקצועיים כמו `firewall`, `EDR`, `SIEM`,
`detection rules`, `robustness`, `mutation`, `LLM`, `benchmark`, `protocol`,
`corpus`, `evaluator`, `dataset`, `analysis`, `Sigma`, `YARA`, `Elastic`,
`Splunk`, `ATT&CK`, `false positive`, `false negative`, `ground truth` ו-`sample`.

## כלל בטיחות

האתר הוא שכבת תיעוד בלבד. הוא לא משנה את הכלל המרכזי: corpus
collection, mutation generation, evaluators, analysis code ו-results חסומים עד
ש-`PROTOCOL.md` Section 9.1 מוגדר `LOCKED`.
