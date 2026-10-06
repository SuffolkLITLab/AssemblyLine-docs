---
id: yaml_dynamic
title: Dynamic logic and anti-patterns
sidebar_label: Dynamic logic and anti-patterns
slug: yaml_dynamic
---

Docassemble is a full-featured programming language, which means many complex
features you can use and even more completely new patterns that you can easily
add of your own. This means you can make choices that work but aren't optimal.

One way to check for this kind of mistake is to run the [DAYamlChecker](../automated_quality_checks/dayamlchecker.md) over your
code. It can catch many common flaws and risky patterns. However, it can't catch 
everything.

This guide covers best practices for writing clean, dynamic interview logic, as well as common anti-patterns to avoid. It should help you write code like an experienced developer and could
be a good checklist for a new docassemble developer or an LLM coding assistant.

## Focus on code you can read when you come back to it later

Programming languages are designed for people. It is easier to write
a fancy new trick than to read and understand it later. And you should not assume
that someone else who has to work on your project later can read it, either!

Stick with basic docassemble features to save yourself later pain.

## Use the helper functions that come with the AssemblyLine

Most patterns you will run into a need for come up again and again, and there's probably
already a good way to solve them.

You should familiarize yourself with the functions and methods that come with the AssemblyLine,
especially in [ALToolbox](../components/ALToolbox/altoolbox_overview.md). Also get in the habit
of asking this documentation page if there's a way to achieve your goal before inventing something new.

Another common task is to make phrasing [dynamic to pronouns and list length](../authoring/dynamic_phrasing_based_on_values.md).

## Limit use of validation code

Validation code **can** run arbitrary Python code, but it should normally only
be used for one thing: to validate a combination of inputs on-screen that cannot
otherwise be achieved with a field modifier.
Avoid using it to define a variable or produce other side effects.

`validation code` is powerful, but can will cause a visible error when a
variable that is not already defined is mentioned. This may lead to bugs that
show up as pop-up "toast" notifications. This can be a poor user experience.

- Use per-field validation to validate a single field
- Validation code isn't needed for `required` status. Fields are required by
  default.
- Always use the `field` parameter when using `validation_error()` inside a
  `validation code` modifier to ensure that errors are raised in context.

Exception: you can use validation code to update a variable's type if it is a
`DAUndefined` datatype.

## Avoid using `reconsider: True`

`reconsider: True` runs unconditionally on every screen load, regardless of whether
the block it is referenced in is needed to show that screen.

Instead of `reconsider: True`, use options on the review screens to update
exactly the value that is needed.

You can also use `reconsider: ` with a list of variables on the question that requires a fresh
value.

## Avoid logic "hacks" and stick with common modifiers on questions

Avoid the use of question modifiers that make your logic harder to follow, such
as `needs`, `sets`, `force_ask()` and the like. Instead, be explicit with your
interview logic and place most logic directly in the `interview order` block.
Instead of using an `if` modifier on a question, consider using logic in the
interview order block, where it is easier to see and reason over.

However, there are common exceptions to this rule:

- Use `sets` only when you use a `code` field type, where docassemble's normal
  dependency resolution will fail, or with `ALIndividual` blocks that rely on `name_fields()` and
  similar fields, where needed for docassemble to locate the question.
- use `needs` on review screens and other blocks that do not automatically
  trigger referenced variables to trigger `template:` blocks and the like.
- If you want to keep an answer fresh: instead of using `undefine` on a question block, use conditional 
  logic to guard the output.

## Limit abstractions

### Avoid intermediate variables

Using intermediate variables (e.g., defining some_calculated_value and using it later) is a great 
pattern in many programming languages: it keeps it easier to read in those languages. In
docassemble, you either must live with these variables getting out of date, or use
complex strategies to force them to get updated. It's usually best to do calculations and comparisons
in place unless the logic must be copied and updated **many** times.

### Be careful with functions

Avoid creating functions that are only used a few times.

Functions should also normally avoid side effects, like directly modifying a variable
that isn't named as a parameter. Use functions to perform calculations
with parameters that are generic when you can.

Functions should almost always be defined in modules, not in a YAML code block. Functions in YAML:

* get defined multiple times by docassemble, which adds to page load time
* cannot use type annotations, which are an important error safeguard
* cannot be used in unit tests

## Use the `depends on` modifier when setting values with code

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

## Use the attachment block or template file for display-only logic

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

## Use Python classes in module files to keep complex logic readable

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

## Use the "named block" pattern sparingly

The [`named block`
pattern](../docassemble_intro/controlling-interview-order#triggering-code-and-then-continuing-using-named-blocks)
should not be overused. Most often, it is appropriate to just use a standard
code block that defines a variable without giving it a "name".

Use `named blocks` when performing a calculation that should only need to be
performed once, such as sending an email or e-filing a form.

## Use `show if` with extra caution

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