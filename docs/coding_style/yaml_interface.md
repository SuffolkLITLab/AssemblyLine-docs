---
id: yaml_interface
title: Choosing interface options
sidebar_label: Choosing interface options
slug: yaml_interface
---

## Use radio buttons for short lists of options

When the user has only one valid choice among a relatively short list,
use radio buttons. Use a dropdown menu in situations where:

1. the list of choices is longer than about 7 options
1. the choice is optional and not very common (such as a name suffix)

## Have a "next" or "continue" button on most screens

docassemble has a "yesno" question type that replaces the "Continue" button
with buttons that immediately move to the next screen. This feature
can be disorienting to users with a screen reader and you may lose user trust
by having an inconsistent user interface.

Instead, use `fields` and `yesnoradio` even with a screen that asks a single
yes/no question:

```yaml
question: |
  Do you like pudding?
fields:
  - no label: likes_pudding
    datatype: yesnoradio
```

However, if the buttons represent actions, rather than choices, buttons may be
appropriate.

## Adding help in context

We prefer using the progressive disclosure element to provide help in-context.
This is available from `ALToolbox` with the name `collapse_template()` and
included by default in the Assembly Line package.

Use the `collapse_template()` function with a `template` block to add
in-context explanatory text in the `subquestion` of your question block.

Example:

```yaml
---
id: intro
question: |
  Social Security Overpayment Waiver or Change
subquestion: |
  This website can help you ask the Social Security administration to 
  
  1. **lower the amount that must be paid back**, or;
  1. **change the schedule of payments** for someone who is told that they
  owe the Social Security Administration money.
  
  ${ collapse_template(overpayment_waiver_help_template) }
continue button field: intro_screen
---
template: overpayment_waiver_help_template
subject: |
  More information about an overpayment waiver
content: |
  When Social Security says that you have an overpayment they are saying that
  you got more SSI or SSDI than you should have gotten under their rules. The
  reason Social Security says you have an overpayment is in the Notice of 
  Overpayment. 
```

docassemble has many features that allow you to add help
in-context. They include:

1. the [question help button](https://docassemble.org/docs/modifiers.html#help)
1. the [glossary `terms` feature](https://docassemble.org/docs/modifiers.html#terms)
1. the `under` area
1. the [field `hint` modifier](https://docassemble.org/docs/fields.html#hint) that adds placeholder text
1. the [field `help` modifier](https://docassemble.org/docs/fields.html#help)
1. the [option `help` modifier](https://docassemble.org/docs/fields.html#field%20with%20choices)

Through expert feedback, we have determined that the question help button should
never be used. The placement of the button and the use of a separate mode for
help text can be confusing. Help may also come "too late" with this feature,
after a user has already completed answering the questions on screen.

We also discourage use of the `hint` modifier that adds placeholder text to a
field. [Multiple
references](https://www.nngroup.com/articles/form-design-placeholders/)
discourage this feature.

The `under` feature can be a helpful place to add additional context to a
screen, although the field-specific `note` feature may be more consistent with
user expectations across multiple questions.

The glossary [`terms`](https://docassemble.org/docs/initial.html#terms) feature
should be used cautiously, perhaps with additional CSS to make it more
distinctive. The risk with this feature is distracting or confusing users.

The `field` and `option` help modifiers are both relatively clear and simple to
use for field-specific hints and to explain choices that may otherwise not be
clear. Custom CSS may make these features slightly more polished than the
stock docassemble appearance.

## 