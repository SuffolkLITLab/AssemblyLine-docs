---
id: yaml_dynamic
title: Making your interview dynamic
sidebar_label: Making your interview dynamic
slug: yaml_dynamic
---

### Use the `depends on` modifier when setting values with code

Using [`depends on`](https://docassemble.org/docs/logic.html#depends%20on) keeps
the value of your variables fresh, while also keeping your YAML file easy to
read and performant.

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

The snippet above will recalculate the value of `client_is_overpaid_person` if
the user ever changes the value of `filing_for`.

### Use the attachment block or template file for display-only logic

When the output document or form has responses that should sometimes be hidden,
it is better to keep your variables general and use short logical statements
inside the `attachment` `fields` block (or inside the DOCX template's Jinja2
code) to control when the variables are displayed or hidden.

Use the multi-line `mako` `if` statement rather than a one-line `ternary` `if`
statement. The preferred option is shown below:

```yaml
attachment:
  pdf template file: my_template.pdf
  fields:
      - "client_relationship_other": |
          % if not client_is_overpaid_person:
          ${ relationship_to_user['other'] }
          % endif
      - "client_relationship_other_explanation": |
          % if not client_is_overpaid_person and relationship_to_user['other']:
          ${ client_relationship_other_explanation }
          % endif
```

The advantage of this is keeping your variable name space neat and completely
semantic. It reduces the need for adding `depends on` modifiers.

When your logic starts to become nested several levels deep or you have very
complex calculations, abandon this rule.

### Use Python classes in module files to keep complex logic readable

When you have very complex business rules that are reflected in the template
file, it is appropriate to move away from small `mako` blocks inside the
template or attachment block. However, replacing complex logic with long `code`
blocks is not always clear and easy to read.

It is better to encapsulate that logic inside a Python class.

Use logical method names to encapsulate such logic. For example:

The `ALIndividual` class has a `gender_female()` method that helps
fill in checkboxes. It returns `True` or `False` depending on
whether the user specifies that `the_individual.gender == 'female'`.
There is also a matching `gender_male` and `gender_other` method.

Small helper methods like this can make your attachment block or
DOCX template easier to read. They can also reduce errors caused by
copying and pasting code.

### Use the "named block" pattern sparingly

The [`named block`
pattern](../docassemble_intro/controlling-interview-order#triggering-code-and-then-continuing-using-named-blocks)
should not be overused. Most often, it is appropriate to just use a standard
code block that defines a variable without giving it a "name".

Use `named blocks` when performing a calculation that should only need to be
performed once, such as sending an email or e-filing a form.

### Avoid `needs`, `sets`, `force_ask` and other logic "hacks"

Avoid the use of question modifiers that make your logic harder to follow, such
as `needs`, `sets`, `force_ask()` and the like. Instead, be explicit with your
interview logic and place most logic directly in the `interview order` block.

However, there are common exceptions to this rule:

1. use `needs` on review screens and other blocks that do not automatically
   trigger referenced variables to trigger `template:` blocks and the like
1. use `sets` with `ALIndividual` blocks that rely on `name_fields()` and
   similar fields, where needed for docassemble to locate the question

### Use `validation code` carefully

`validation code` is powerful, but can will cause a visible error when a
variable that is not already defined is mentioned. This may lead to bugs that
show up as pop-up "toast" notifications. This can be a poor user experience.

1. Use [`validation
   code`](https://docassemble.org/docs/fields.html#validation%20code) only for
   validation, not to set variable values.
1. Always use the `field` parameter when using `validation_error()` inside a
   `validation code` modifier to ensure that errors are raised in context.

### Use `show if` with extra caution

[`show if`](https://docassemble.org/docs/fields.html#show%20if) can be used
to make question screens dynamic and usable. Still, be cautious when using
it: if your `show if` logic hides a variable that is referenced in a `mandatory`
block somewhere else in the interview, your user can be stuck on a screen
without being able to continue.

To reduce this risk:

1. unless it is necessary, use only one level deep of `show if`
1. always implement the logic on your screen that uses `show if` in the template
   or attachment block at the same time you implement it in the question block
1. always test your interview with answers that leave `show if` fields hidden
1. actively search your code for `show if` and confirm that hidden variables are
   only referenced with matching logic as a final step before release

