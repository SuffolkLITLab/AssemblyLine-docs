---
id: yaml_structure
title: Structuring your interview
sidebar_label: Structuring your interview
slug: yaml_structure
---

### Use a logical order for blocks inside your YAML file

Each block in your YAML file is separated by `---`. Below is a suggested
good practice for organizing your blocks into a YAML file:

1. `include`d files. Your file may break or act unexpectedly if your
   `include`s are in the wrong order. Keep them up top.
1. Metadata, such as file description and title, navigation [`sections`](https://docassemble.org/docs/initial.html#sections).
1. Your single, mandatory, [interview
   order](../docassemble_intro/controlling-interview-order#the-interview-order-block)
   block. Ideally this should start "above the fold" in your playground. I.e.,
   in the first 20 or so lines. Relocate other blocks as needed to get this "above the fold" (except the `include` block).
1. `object` blocks representing variables used in your interview.
1. Your `question` blocks, in the approximate order that they appear in your
   interview.
1. If short and clearly related, place `code` blocks that set variables based on
   questions directly after the question that they respond to.
1. More complex `code` blocks, including `named blocks`, come next.
1. Your review screen logic.
1. Any object blocks that are used solely for the attachments, such as `ALDocumentBundle` objects.
1. Your attachment block.

```yaml
---
include:
  - ...
---
metadata:
  title: My Interview
  ...
---
id: interview order
mandatory: True
code: |
  intro_screen
  ...
  download_screen
---
id: intro
question: |
  Welcome to my interview
continue button field: intro_screen
---
id: review screen
question: |
  Review your answers
review: 
  - Edit: users[0].name.first
    button: |
      Your name: ${ users[0] }
---
objects:
  - my_interview_attachment: ALDocument...
---
objects:
  - al_user_bundle: ALDocumentBundle...
---
attachment:
  variable name: my_interview_attachment[i]
  docx template file: my_interview.docx          
```

### Add an `id` keyword to every question block

Add a unique `id` to every question block. Your `id` can just be
a copy of the question text with punctuation removed.

Adding an id to each question:

1. gives you an invariant piece of text to enter in the "search" bar for
   feedback and bugs in your YAML file for the benefit of both developers and testers
1. allows you to track your questions with analytics
1. can prevent some (rare) docassemble bugs, or make it easier to find them
1. make it easier to read and understand an interview phrase translation file

### Use an [interview order](../docassemble_intro/controlling-interview-order#the-interview-order-block) block

It is important to be able view the logic of your interview at a glance. The
`interview order` block concept is the most powerful way that we have found to
accomplish that goal in docassemble.

[Read more about interview order blocks](../docassemble_intro/controlling-interview-order#the-interview-order-block).

### Avoid setting values in your interview order block

Wherever possible, use small code blocks that are triggered dynamically by the interview order block
when a value is defined by `code`. Do not set the values directly in the interview order block.
Setting values in the order block can trigger infinite loops or unintended logic; it can also
make your code less flexible.

For example:

```yaml
---
id: client_is_overpaid_person
question: |
  ${ client.familiar() }, are you filing for yourself or someone else?
fields:
  - no label: filing_for
    datatype: radio
    choices:
      - Myself: self
      - Someone else: someone_else  
---
depends on:
  - filing_for
code: |
  client_is_overpaid_person = filing_for == 'self'
```

