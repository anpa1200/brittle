---
title: Protocol
---

# BrittleBench Research Protocol

זהו עמוד ה-Protocol בגרסה העברית של האתר. ה-canonical protocol נשאר באנגלית.
הגרסה העברית נועדה לעזור בקריאה, ניווט ותכנון העבודה, אבל היא לא מחליפה את
הנוסח המחייב ב-`PROTOCOL.md`.

העיקרון המרכזי: קודם מגדירים את המחקר, אחר כך בונים. כל execution work חסום עד
ש-Section 9.1 מוגדר `LOCKED`.

## Phase R1 - Problem Definition

Phase R1 מגדיר את הבעיה לפני כל execution work. בשלב הזה כבר הוגדרו:

- מהי brittle detection rule.
- למה public detection content חשוב ל-defenders.
- מה prior work כבר מכסה.
- איזה research gap BrittleBench ממלא.
- מה in scope ומה out of scope.

ה-scope הנוכחי מתמקד ב-public detection content שאפשר להוריד, לצטט, לבצע snapshot
שלו, ולנתח במסגרת מחקרית. זה כולל בתחילה Sigma YAML, YARA rules, Elastic
detection rules ו-Splunk Security Content detections.

## Phase R2 - Research Questions

Phase R2 יגדיר primary research question ו-secondary research questions. השאלות
צריכות להיות falsifiable, answerable from planned data, וצריכות לאפשר null
result משמעותי.

השאלה המרכזית צריכה להישאר ישירה: עד כמה public detection rules נשארים robust
מול validated, functionally equivalent mutations של ההתנהגות שהם אמורים לזהות?

## Phase R3 - Hypotheses

Phase R3 יגדיר hypotheses, null hypotheses, expected effect sizes ו-pre-registered
predictions. אין להתחיל data collection לפני שהחלק הזה מוגדר.

כל hypothesis חייבת להיות קשורה ל-research question, וכל null hypothesis צריכה
להיות מפורשת. אם התוצאה תהיה null result, היא עדיין צריכה להיות publishable.

## Phase R4 - Definitions and Operationalization

Phase R4 יגדיר את המונחים הקריטיים:

- detection rule
- functional equivalence
- robustness score
- brittleness pattern
- unit of analysis

## Phase R5 - Methodology Design

Phase R5 יגדיר sampling strategy, independent variables, dependent variables,
control variables, confounders, statistical methods ו-power analysis.

זה השלב שבו החלטות כמו corpus snapshot cutoff date, sample size, rule inclusion
criteria ו-statistical tests חייבות להפוך מתיאור כללי לתוכנית מדידה.

## Phase R6 - Evidence and Validation

Phase R6 יגדיר evidence standards, validity mitigations ו-reliability strategy.

## Phase R7 - Threats to Validity

Phase R7 יתעד conclusion validity, internal validity, construct validity,
external validity, ethical validity ו-replication threats.

## Phase R8 - Ethics and Responsible Research

Phase R8 יתעד dual-use risk, disclosure approach, no novel-attack policy,
dataset sanitization ו-tone policy.

המחקר לא נועד לפרסם weaponizable payloads, לא לייצר novel attack techniques, ולא
לדרג או לבייש rule authors. המטרה היא defender benefit.

## Phase R9 - Protocol Status

ה-protocol נשאר `UNLOCKED` עד שכל sections הושלמו, pre-registration בוצע, ו-Section
9.1 עודכן ל-`LOCKED`.

## Canonical Source

לנוסח המחייב והמלא ראו את הקובץ באנגלית:

https://github.com/anpa1200/brittle/blob/main/PROTOCOL.md
