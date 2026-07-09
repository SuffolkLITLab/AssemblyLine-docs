---
id: python
title: Python
sidebar_label: Python
slug: python
---

:::info Workshop Resource
📺 **First Wednesday Workshop:** For help understanding index variables and loop constructs in docassemble, watch our workshop [Demystifying i and x in docassemble](https://suffolklitlab.org/demystifying-i-and-x-in-docassemble/). This session clarifies common confusion around indexing and iteration patterns in docassemble interviews.
:::

## Use Python conventions for Python code

In general, we refer to Python's [PEP 8](https://www.python.org/dev/peps/pep-0008/) for all Python code.

### Highlights of PEP 8

docassemble does not force you to write very much Python code. Where you do, however, please
follow Python conventions, listed below.

### Use snake_case for variable names

Variable names should always start with a letter or `_`. Names should be lowercase
and words should separated by an underscore.

Example: `number_of_people`, `issue_12_address`

### Do not annotate variable names with type (Hungarian notation)

Use descriptive variable names, but do not include the type as part of the name.

E.g., `user_name_TE` for a "text" or `str` type. This limits your ability to change
the datatype later and usually does not add helpful information.

However: you may want to specify types that also have a **semantic** meaning, such
as `_date` or `_list`. These usually aid in clarity and do not limit the specific
datatype of the variable.

### Exceptions to PEP 8

#### Tab width

We use 2 spaces, not 4, for all indentation levels. The docassemble playground makes it hard to
edit files that scroll too far horizontally.
