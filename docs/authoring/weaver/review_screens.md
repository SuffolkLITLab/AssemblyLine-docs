---
id: weaver_review_screens
title: |
  Review screen synchronization
sidebar_label: |
  Review screens
slug: review_screens
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A **Review Screen** provides a critical checkpoint in a guided interview, allowing users to review a summary of their answers and jump back to edit any mistakes before generating final court documents.

---

## Anatomy of a review block

In Docassemble and AssemblyLine, review screens are defined using a `review:` block with the `event:` matching the screen ID:

```yaml
---
id: motion_review_screen
event: motion_review_screen
question: |
  Review your answers
subquestion: |
  Please check over your information before creating your court forms. Click **Edit** next to any section you need to change.
review:
  - Edit: case_information
    button: |
      **Case Information**: ${ court_name }, Docket #${ docket_number }
  - Edit: motion_grounds
    button: |
      **Reason for Motion**: ${ motion_grounds }
  - Edit: hearing_date_screen
    button: |
      **Hearing Date**: ${ requested_hearing_date }
```

---

## Re-drafting a review screen with "Sync from questions"

Review screens are not kept in sync automatically as you edit — the Weaver drafts one on request:

1. Open (or add) the review block and click **Sync from questions** (<i class="fa-solid fa-wand-magic-sparkles"></i>).
2. The Weaver re-reads every question screen the interview asks today — including screens in files it includes — and drafts a new review block from them.
3. A **Sync review screen** modal shows a unified diff of what would change (or the full drafted YAML), along with how many existing entries the draft did not cover and were carried over unchanged.
4. Click **Replace review screen** (or **Add review screen** if none exists yet) to save the result, or **Edit the whole file instead** to hand-edit the draft in the full YAML view before saving.

This makes re-drafting safe to run again later: if you add new questions to the interview, running **Sync from questions** brings the review screen back in line without you having to hand-edit every row.

---

## Best practices for review screens

* **Group by Topic**: Keep related fields together under clear, descriptive bold headers (e.g. `**Your Contact Information**`, `**Court Details**`).
* **Format Dates and Currency**: Display human-readable dates (e.g. `requested_hearing_date.format('MMMM d, yyyy')`) and currency values (`currency(filing_fee)`).
* **Handle Optional Answers**: Wrap optional fields in conditional checks or defaults so missing values do not display as blanks or errors.

---

## Next steps

* Run static lint diagnostics and safe variable refactoring in [Diagnostics, refactoring, and YAML code view](diagnostics_and_refactoring.md).
* Commit and push your interview to GitHub in [Publishing and version control with GitHub](publishing_and_github.md).
