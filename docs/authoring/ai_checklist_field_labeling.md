---
id: ai_checklist_field_labeling
title: "AI checklist: field labeling"
sidebar_label: "Checklist: field labeling"
slug: ai_checklist_field_labeling
---

Use this checklist when AI is labeling PDF/DOCX fields.

- [ ] Ensure labels follow AssemblyLine variable naming conventions.
- [ ] Use clear nouns for parties and roles (`users`, `other_parties`, etc.).
- [ ] Use contextual date names (not generic `day`, `month`, `year` fields).
- [ ] Ensure repeated fields use consistent suffix/index patterns.
- [ ] Confirm no reserved variable names are used.
- [ ] Validate field labels against expected interview logic before weaving.
- [ ] Re-check high-risk labels manually (party names, signatures, addresses, dates).

Related guides (canonical details):

- [Field labels to use in template files](doc_vars_reference.md)
- [PDF templates](pdf_templates.md)
- [DOCX templates](docx_templates.md)
- [docassemble variable naming in Python](../coding_style/python.md)
