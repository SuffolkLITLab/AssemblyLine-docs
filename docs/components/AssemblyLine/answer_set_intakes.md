---
id: answer_set_intakes
title: |
    Using Answer Sets to capture and re-use client information
sidebar_label: Capture and re-use client information
slug: answer_sets/intakes
---

## Overview

You can use the Answer Set feature to set up a simple client intake workflow.
When a client uses the intake interview, you can save their answers. Then you can 
setup a second interview that retrieves the same answers and reuses them in new template.

You can combine this with docassemble's [`DACatchAll`](https://docassemble.org/docs/fields.html#catchall)
feature to create a general purpose system that allows you to use client information in 
one-off letters and simple documents.

## Creating the intake interview

The interview below leverages the Assembly Line shared question library to create a 
very simple new client questionnaire:


```yaml
---
include:
  - docassemble.AssemblyLine:assembly_line.yml
---
metadata:
  title: |
    New client questionnaire
---
mandatory: True
code: |
  why_want_to_meet
  users[0].name.first
  users[0].address.address
  children.gather()
  answers_saved
  outro_message
---
code: |
  # The user's answers are saved to the "saved session" area
  save_interview_answers(filename="docassemble.AssemblyLine:al_saved_sessions_store.yml", metadata = {"title": str(users) } )
  answers_saved = True
---
id: welcome
question: |
  New client questionnaire
subquestion: |
  Tell us a little about yourself before our first meeting.
fields:
  - What do you want to meet with us about?: why_want_to_meet
    datatype: area
---
event: outro_message
question: |
  Thanks, we will be in touch!
```

At line 20, the interview answers are saved to the system-wide location for
answer sets. You may want to customize this location if you have several
interviews on your server.

## Making use of the saved answers

The interview below allows a user to:

1. Upload a template that uses Jinja2 syntax
1. Select from a list of answer sets on the server
1. Fills in any answers that are contained in the answer set
1. Lets the interview user answer any questions that still remain.


```yaml
---
include:
  - docassemble.AssemblyLine:assembly_line.yml
---
metadata:
  title: |
    Fill in the blanks
---
features:
  use catchall: True
---
mandatory: True
code: |
  template_to_fill  
  if not start_fresh:
    load_existing_answers
  download_template
---
id: upload template
question: |
  Upload a template to fill in
subquestion: |
  You can select an existing set of answers, like from an intake interview, to use 
  to complete the template. If you add new fields to the template,
  you will get a very basic chance to provide an answer to the new field.
fields:
  - Upload a DOCX template file: template_to_fill
    datatype: file
    accept: |
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
---
id: choose an answer set
question: |
  Choose an answer set
fields:
  - Start fresh: start_fresh
    datatype: yesno
    disable others: True
  - Select one: selected_answers
    datatype: combobox
    code: |
      [{idx: answer["title"]} for idx, answer in enumerate(all_answer_sets)]
    required: False      
---
id: download template
event: download_template
question: |
  Your template is ready
attachment: 
  docx template file:
    code: |
      template_to_fill[0]
---
code: |
  if user_has_privilege(['developer', 'admin']):
    all_answer_sets = get_saved_interview_list(filename="docassemble.AssemblyLine:al_saved_sessions_store.yml", user_id="all", exclude_newly_started_sessions=False)
  else:
    all_answer_sets = get_saved_interview_list(filename="docassemble.AssemblyLine:al_saved_sessions_store.yml", exclude_newly_started_sessions=False)
---
code: |
  load_interview_answers(all_answer_sets[int(selected_answers)]["filename"], all_answer_sets[int(selected_answers)]["key"])
  load_existing_answers = True
---
###################### Catchall questions ###########################################
---
generic object: DACatchAll
question: |
  What is ${ x.object_name() }?
fields:
  - no label: x.value
validation code: |
  define(x.instanceName, x.value)
---
if: |
  x.context == 'float'
generic object: DACatchAll
question: |
  How much is ${ x.object_name() }?
fields:
  - Amount: x.value
    datatype: currency
validation code: |
  define(x.instanceName, x.value)
---
if: |
  x.data_type_guess() == 'bool'
generic object: DACatchAll
question: |
  ${x.object_name()}?
yesno: x.value
validation code: |
  define(x.instanceName, x.value)
---
if: |
  x.object_name().endswith('date')
generic object: DACatchAll
question: |
  ${x.object_name()}?
fields:
  - Date: x.value
    datatype: date
validation code: |
  define(x.instanceName, x.value)
```

At line 56, the interview gets a list of all answer sets on the server.
If the user is an administrator or developer, it includes all answer sets.
If the user is not privileged, it will only include answer sets created by the
interview's user.

At line 61, the selected answers are actually loaded into the interview.

## Download the example

[Demonstration repository](https://github.com/LemmaLegalConsulting/docassemble-IntakeAndReuse)