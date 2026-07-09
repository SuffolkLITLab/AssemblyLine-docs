---
id: yaml_translation
title: Planning for translation and flexible updates
sidebar_label: Planning for translation
slug: yaml_translation
---
### Use labeled options with the `choices` modifier

When using the `choices` field modifier, always provide both
a display label and a value.

Example:

```yaml
fields: 
  - Pick a card, any card: which_card
    choices:
      - Ace: ace
      - Queen: queen
      - 3: three
      - 1: one
```

The value will remain stable for translation and any language changes that will
be made during the course of the project, allowing you to avoid updating your
logic with minor language tweaks.

It may be helpful to use `snake_case` for `choices` values. This will help
signal that they are static terms that will not change when other interview
language changes.

### Avoid hardcoded string in code - use templates instead

Avoid placing literal English text inside code blocks, functions and methods. Instead,
use docassemble `template` blocks. You should use an `f` string or explicitly
convert `template`s to `str` to avoid certain docassemble bugs.

Example:

```yaml
---
template: my_text_template
content: |
  Hello, World
---
code: |
  list_options = [{'option1': str(my_text_template)}]
```

Template blocks will become part of the docassemble XLSX or XLIFF translation
file, which makes them the most convenient way to handle text that must be
translated.

### Do not add a language modifier to blocks in the default language

For certain kinds of metadata, such as navigation sections, the only way to make
them change when the interview language changes is to add a `language:` modifier.

Leave the default language with no modifier. E.g., if your interview is written
in English, do not add a `language: en` modifier. Instead, add the modifier
to each new language as you go.

Example:

```yaml
# English
sections: 
  - Section 1
  - Section 2
---
language: es
sections:
  - Sección 1
  - Sección 2
```

### Avoid using the language functions from `pattern.en` in your interview

docassemble includes very useful features to conjugate verbs, match gender, and
more that are drawn from `pattern.en`, such as the `does_verb` method of a
DAList. These are safe to use inside a language-specific template, such as a
court form that will always be filed in English. Never use these inside a
`question` block:

1. using `does_verb` and its cousins inside a question block leads to question
   "fragments" that may not be grammatical in another language
1. `does_verb` may not be available in a language that you decide to translate
   your interview to in the future.

Similarly, do not use sentence fragments to update text that will change if:

1. the number of people in a list is either 1 or more
1. the user is answering the question on their own behalf or for someone else

Instead: use a Mako `if` statement on the whole sentence.

Example:

```yaml
---
id: agree overpaid
question: |
  % if client_is_overpaid_person:
  Do you agree that you got too much money from Social Security?
  % else:
  Do you agree that ${ recorded_person } got too much money from Social Security?
  % endif
```
