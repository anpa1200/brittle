---
title: Reproducibility
---

# Reproducibility Checklist

המחקר צריך להיות reproducible ככל האפשר, תחת מגבלות dual-use ו-restricted raw
data.

## Areas

- code reproducibility
- data reproducibility
- computation reproducibility
- documentation reproducibility
- verification

## מה צריך להירשם

בשלבי execution ו-analysis צריך לתעד:

- source repository versions ו-commit hashes.
- corpus snapshot date.
- dataset hashes.
- LLM provider, model ID, API version ו-sampling parameters.
- environment details כמו OS, dependency versions ו-runtime.
- random seeds אם יש randomness.
- expected outputs עבור smoke tests.

## כלל עבודה

לפני publication, צריך לוודא שה-results tables, dataset schema, environment
details ו-reference corpus ניתנים לשחזור או מוסברים במפורש אם יש מגבלה.

כאשר raw data לא יכולה להתפרסם בגלל dual-use risk, צריך לתעד מה פורסם במקום:
sanitized metadata, schema, hashes, access procedure או synthetic reference
corpus.

## Canonical Source

https://github.com/anpa1200/brittle/blob/main/REPRODUCIBILITY.md
