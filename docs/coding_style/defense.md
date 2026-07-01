---
id: defense
title: |
   "Safe" coding
sidebar_label: |
   "Safe" coding
slug: defense
---

:::info Workshop Resource
📺 **First Wednesday Workshop:** For hands-on help with debugging and error resolution, watch our workshop on [Troubleshooting docassemble interview errors](https://suffolklitlab.org/troubleshooting-docassemble-interview-errors-workshop/). This community Q&A session covers common error patterns, debugging strategies, and prevention techniques.
:::

## Use docassemble lists, dictionaries, and sets, or subclasses

docassemble relies heavily on exceptions for its declarative logic
system. Those work better with the DAObject class and classes that
inherit from it. docassemble's DAObject class adds an `intrinsicName`
attribute to every object that helps docassemble track down a question
that is able to define a variable.

Where you make uses of lists, dictionaries, or sets, you should
default to using either a DAList, DADict, or DASet, or a class that
inherits from one of those classes.

## Look before you leap

Check for existence if an attribute or object may not be defined:

1. use `hasattr` to check if an optional attribute is defined
1. use `defined()` (sparingly) to check if an object or variable has been
   defined (note there are significant performance implications with `defined()`
   so it should be used carefully)
1. use `.get()` with all dictionary lookups. Include a default value of the
   correct type, especially for nested lookups in API results.
   e.g.:

   ```python
   my_dict.get('key1',{}).get('key2','')
   # NOT
   # my_dict['key1']['key2']
   ```
1. check list length before using a list index, or if you are using a DAList,
   use the `.item()` method.
1. Use the `next(iter(some_list), default_value)` pattern when trying to gather
   the first item in a list that may be empty.


## Use `skip undefined` on attachment blocks

When assembling documents, use the `skip undefined` modifier in production.
`skip undefined` should be used carefully as a safety measure, but not
to replace spelled-out logic in your interview. It leaves undefined fields
blank rather than triggering an exception.

When you use `skip undefined` it is important that you trigger all required
variables in your interview order block.

## Use Python 3.8's `f` strings when composing strings

A common runtime bug is attempting to concatenate a string with a non-string
value, such as `None`.

You can easily avoid these runtime errors by casting values to `str` explicitly.
The most elegant current solution is to use `f` strings.

Example:

```python
some_new_string = f"I like {fruit} the best"
# NOT 
# some_new_string = "I like" + fruit + " the best"
```

In addition to handling converting the value `fruit` to string, the `f` string
example is often clearer and easier to read, with less punctuation.

## Convert types or use more abstract interfaces

Does your function return a list, a set, or a tuple? Be careful when working
with collections that you know which data structure you are using.

When you create a function that accepts a list, you may want to explicitly
convert to a list before working with it in case a developer passes in a `set`.

## Check for None

It is common for Python functions to return `None` in certain error
conditions. Make sure that you handle that possibility.

## Handle API error states

When working with APIs, be careful to handle possible failures. Decide what the
failure state should be for your end user. Ordinarily, API integrations in
docassemble are for convenience and your user should be able to continue in some
fashion. You should never drop down to a docassemble error screen when an
external dependency fails or is unavailable.

## Further reading and sources

* [Defensive Programming](https://en.wikipedia.org/wiki/Defensive_programming), Wikipedia
