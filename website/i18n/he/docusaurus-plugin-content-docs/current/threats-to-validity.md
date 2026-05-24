---
title: איומים על validity
---

# איומים על validity

מסמך זה מלווה את Section 7 ב-Protocol. המטרה היא לא לחכות לסוף המחקר ואז
להסביר limitations בדיעבד, אלא להגדיר מראש מה עלול לפגוע ב-validity ואיך
מתכננים לצמצם את הסיכון.

## R7.1 Conclusion validity

למילוי בהמשך - איומים על הקשר בין observations לבין conclusions.

דוגמאות שייבדקו בהמשך: underpowered sample, multiple comparisons,
non-independent observations, או statistical test שלא מתאים ל-distribution.

## R7.2 Internal validity

למילוי בהמשך - איומים שיכולים להטות את תהליך המדידה בתוך המחקר.

דוגמאות: LLM mutation quality variance, evaluator non-determinism, selection
bias ב-corpus, או ground-truth contamination.

## R7.3 Construct validity

למילוי בהמשך - איומים לכך שה-operationalization לא באמת מודד את ה-construct הרצוי.

השאלה המרכזית כאן: האם robustness score באמת מודד detection robustness, או רק
רגישות ל-mutator מסוים, ל-format מסוים, או לסט מצומצם של samples?

## R7.4 External validity

למילוי בהמשך - מגבלות על generalizability מעבר ל-sampled public corpus.

המחקר לא יטען על כל detection engineering בעולם. הוא יטען רק על sampled public
corpus, בזמן snapshot מוגדר, וב-scope שיוגדר ב-Section 5.2.

## R7.5 Ethical validity

למילוי בהמשך - dual-use, attribution harm ו-dataset misuse risks.

אם המחקר יפרסם raw mutation payloads או ייצור naming-and-shaming, זה יפגע
בלגיטימיות של המחקר. לכן Section 8 חייב להגדיר disclosure ו-sanitization.

## R7.6 איומים על replication

למילוי בהמשך - API access, restricted data ו-non-determinism risks.

LLM APIs, model versions, sampling parameters ו-restricted raw data עלולים להפוך
replication לקשה. לכן ה-reproducibility plan צריך לתעד seeds, versions, hashes
ו-environment details.
