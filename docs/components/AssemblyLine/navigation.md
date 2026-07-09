---
id: navigation
title: Dynamic navigation sections
sidebar_label: Dynamic navigation sections
slug: navigation
---

By default, Assembly Line interviews have navigation turned on. In some cases, you
may want navigation sections to show or hide depending on choices the user makes
during the interview.

The Assembly Line framework adds an optional method to add dynamic navigation when the
`enable_al_nav_sections` variable is set to `True`. This feature is disabled by default.

docassemble already has a way to define sections dynamically, with [
nav.set_sections()](https://docassemble.org/docs/functions.html#DANav.set_sections). Use
the Assembly Line method when your navigation sections are relatively simple. If your needs
don't fit well with the Assembly Line's simple declarative approach, you may prefer to use 
`nav.set_sections()` directly.

The Assembly Line approach can be most helpful when:

1. You know the full list of available sections at the beginning of the process. 
    For example: one section for each optional document or dependent on the user's logged-in
    status.
2. The total possible number of sections is also known in advance.
3. You can evaluate a True/False expression to decide if a section should be visible.

## Turning on the Assembly Line navigation system

Add a code block to your interview that looks like this:

```yaml
---
code: |
  enable_al_nav_sections = True
```

## Defining the list of available sections

When `enable_al_nav_sections` is `True`, the Assembly Line framework will look for the 
definition of a list of dictionaries named `al_nav_sections` on each screen load. The contents
of this list will be used to define the navigation sections.

The structure of each dictionary in the list should be the exact same format that is expected
by [nav.set_sections()](https://docassemble.org/docs/functions.html#DANav.set_sections),
with the addition of one new key, `hidden`. If `hidden` is `True`, the list item will 
not be shown.

You can use docassemble's `data from code` block as a convenient and easy
to read way to create this list:

```yaml
---
reconsider: True
variable name: al_nav_sections
data from code:
  - section_intro: |
      "Introduction"
  - section_about_you: |
      "About you"
  - section_about_spouse: |
      "About your spouse"
    hidden: not showifdef("is_married")
```
### `data from code` vs `data`
When you use `data from code`, the labels need to be defined as literal Python strings (which is why they follow
the vertical pipe symbol, `|` on their own lines). 

In versions of Assembly Line > 2.28.0, you can use a `data` block instead. If we chose to use `data` 
instead, it would look like this:

```yaml
reconsider: True
variable name: al_nav_sections
data:
  - section_intro: Introduction
  - section_about_you: About you
  - section_about_spouse: About your spouse
    hidden: ${ not showifdef("is_married") }
```

### Avoiding triggering variables before they are defined

Navigation appears on every page of the interview, including the very first page.
Therefore it's important that the conditional logic doesn't trigger any questions in
itself.

Make sure to use some combination of:

1. `hasattr`
2. `showifdef()`
3. `defined()`

in your conditions, unless it's a variable that is guaranteed to be defined, such as whether
the user is logged in, or the number of pages visited.

### Example conditions

#### Hide if the user is not logged in

```yaml
...
data:
  ...
  - section_how_to_return_later: How to return later
    hidden: ${ not user_logged_in() }
```

#### Hide if you haven't gotten past the first page yet

```yaml
  - section_how_to_return_later: |
      "How to return later"
    hidden: ${ _internal.get('steps') < 2 }
```

#### Hide to anyone who is not an administrator or developer

```yaml
  - section_developer_only: |
      "Developer and admin only"
    hidden: ${ not (user_logged_in() and user_has_privilege(["developer", "admin"])) }
```

### Using nested sections

You can define nested sections. If you would like to be able to hide the top level section,
you'll need to use the special docassemble "subsections" syntax (explained in the [documentation](https://docassemble.org/docs/initial.html#sections)).

Example:

```yaml
reconsider: True
variable name: al_nav_sections
data:
  - section_name: Section Name
    hidden: True
  - "top level item"
  - about: About You
    hidden: False
    subsections:
      - sub_item_1: Description 1
        hidden: False
      - sub_item_2: Description 2
        hidden: True
```

### Adding an unknown (dynamic) number of sections

If you want to add sections based on, for example, how many items are in a list,
you can't define those dynamically added sections in a `data` or `data from code` block.
But you may want to mix and match, with some dynamic sections and some pre-defined ones.

In that case, you could create a `data` or `data from code` block with a different
`variable name` attached to it. And you would need to define `al_nav_sections` itself
in a separate code block.

Here is an example:

```yaml
question: |
  How many rooms are in your house?
fields:
  - Room count: room_count
  - Do you want the optional section to show?: show_optional
    datatype: yesno
---
variable name: my_always_defined_nav_sections
data:
  - section_name: Section Name
    hidden: False
  - "top level item"
  - section_about: About You
    hidden: False
  - section_opt: Optional section
    hidden: ${ not showifdef("show_optional") }
---
reconsider: True
code: |
  reconsider("my_always_defined_nav_sections")
  if defined("room_count"):
    tmp_sections = []
    for n in range(room_count):
        tmp_sections.append({f"room_{n+1}": f"Room {n+1}"})
    al_nav_sections = my_always_defined_nav_sections + tmp_sections
    del tmp_sections
  else:
    al_nav_sections = my_always_defined_nav_sections
```

## Keeping the navigation menu fresh: warnings

A simple way to keep the list of sections fresh is to add the `reconsider: True` modifier
to the block that defines the sections. We use this in the examples. It should be fine
for most real-world interviews. If your interview is already bit slow, note that using 
`reconsider: True` can add a small slowdown to every page load.

One alternative to avoid this slowdown is to list all of the variables that can 
invalidate the current menu's accuracy with the `depends on` modifier. This is a fine
tradeoff (adds a tiny bit of maintenance), and it works for most scenarios. As an example
of where it won't be sufficient: `depends on` will not trigger an update when the items 
in a list change.

If `depends on` is not enough, you could still save a little page load time by explicitly 
triggering the navigation to be rereshed at defined points in the interview flow. This
works well when you have a linear interview and don't allow editing the answer to questions
that could change the navigation. Even if you do have this issues, you could force reloading
the definition of `al_navigation_sections` in the "edit" button.

To set up this more manual refreshing, you'll want to do this in a separate code block, not directly 
in the interview order block. You need to reconsider the navigation before using `nav.set_section()`. 
For example:

```yaml
---
code: |
  reconsider("al_nav_sections")
  reconsider_nav_once = True
---
code: |
  reconsider("al_nav_sections")
  reconsider_nav_twice = True
---
###################### Main order #######################
mandatory: True
code: |
  nav.set_section("section_documents")
  doc_list
  reconsider_nav_once
  ...
  reconsider_nav_twice
  if some_condition:
    nav.set_section("newly_visible_section")
```

## A complete example

This example uses the `data from code` method 

```yaml
---
include:
  - docassemble.AssemblyLine:assembly_line.yml
---
code: |
  enable_al_nav_sections = True
---
reconsider: True
variable name: al_nav_sections
data from code:
  - section_intro: |
      "Introduction"
  - section_about_you: |
      "About you"
  - section_about_spouse: |
      "About your spouse"
    hidden: not showifdef("is_married")
---
mandatory: True
question: |
  Are you married?
yesno: is_married
---
mandatory: True
question: |
  Thanks for letting us know!
```