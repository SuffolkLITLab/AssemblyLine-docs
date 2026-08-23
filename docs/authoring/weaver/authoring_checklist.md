---
id: weaver_authoring_checklist
title: |
  Authoring checklist: start to finish
sidebar_label: |
  Authoring checklist
slug: authoring_checklist
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use this comprehensive pre-flight checklist before handing off your interview for legal review, user testing, or production launch.

---

## 1. Document template preparation

- [ ] **Labels Verified**: All fields in DOCX and PDF templates are labeled with standard [AssemblyLine variable conventions](../doc_vars_reference.md).
- [ ] **Clean Filenames**: Template files have clean, descriptive names without draft suffixes (e.g. `motion_to_dismiss.docx`).
- [ ] **Overflow Safeguards**: Multi-line narrative text areas in PDF templates have matching overflow addenda or auto-scaling enabled.

---

## 2. Project setup and metadata

- [ ] **Project Created**: Playground project initialized in the Weaver.
- [ ] **Metadata Defined**: The `metadata:` block includes title, short title, description, author names, and relevant legal topic tags.
- [ ] **Standard Objects Declared**: `ALPeopleList` declared for `users` and `other_parties` with appropriate quantity rules.

---

## 3. Question screens and plain language

- [ ] **Readable Headings**: Screen titles and subquestions are written in plain, accessible language (5th-to-8th grade reading level).
- [ ] **Input Field Types**: Every field uses the appropriate datatype (e.g., date pickers for dates, currency for dollar amounts, yes/no for booleans).
- [ ] **Required vs Optional**: Required toggles are properly set, and optional fields are wrapped in conditional logic in templates.
- [ ] **Help Text Added**: Unfamiliar legal terms are explained using field help popovers.

---

## 4. Interview order and flow

- [ ] **Logical Step Hierarchy**: Question screens, loops (`.gather()`), conditional branches (`if/else`), and progress indicators (`set_progress`) are sequenced in the Order Builder.
- [ ] **Off-Ramp Screens**: Exit screens are in place for users who do not qualify or who should not proceed.
- [ ] **Review Screen Enabled**: A `review:` screen allows users to inspect and edit their answers before compiling final documents.

---

## 5. Document bundles and assembly

- [ ] **Document Bundles Configured**: `ALDocument` and `ALDocumentBundle` definitions are ordered and labeled cleanly.
- [ ] **Conditional Inclusion Tested**: Documents that should only appear under certain conditions (e.g. fee waivers, instructions) have verified conditional expressions.

---

## 6. Diagnostics and quality verification

- [ ] **Zero Validation Errors**: The **Errors & Warnings** drawer shows no missing IDs, duplicate blocks, or undefined variables.
- [ ] **Live End-to-End Test**: Successfully completed a full test run of the interview using **Open interview**, generating and downloading sample court documents.
- [ ] **Mobile and Desktop Tested**: Screen layouts and touch targets verified in live screen preview on mobile, tablet, and desktop viewports.

---

## 7. Version control and publishing

- [ ] **Committed to GitHub**: Code pushed to the appropriate GitHub organization repository with a clean commit message.
