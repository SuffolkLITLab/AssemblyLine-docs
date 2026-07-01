---
id: dynamic_phrasing_based_on_values
title: Dynamic phrasing based on values (gender, list length, and more)
sidebar_label: Dynamic phrasing based on values
slug: dynamic_phrasing_based_on_values
---

docassemble has several clever features that you can use in templates
and in the body of your interview to automatically rephrase text in a
context specific way depending on:

1. the length of a list
1. the gender or pronouns of an individual
 
In general, these features are useful short-hand solutions for problems that
you could also solve with ordinary conditional text (e.g., an `if` statement).

These are covered in more depth in the documentation for
[DAList](https://docassemble.org/docs/objects.html#DAList), although it may be hard to 
find the specific functions on that fairly long documentation page without internal anchors. The best solution
to learn more may be to read about the method on this page, then visit the DAList documentation page
and search within the page for the appropriate keyword with command/control+f.

:::caution Be careful with grammar shortcuts if the interview will be translated

These functions help you write short, readable code, but they result in text
"fragments". In languages that have a different order of verbs, subjects, and objects, this 
can result in nonsense. It's usually best to use a condition at the whole paragraph level if your text will be translated.

It's often safe to use the grammar shortcuts inside a template (because it will be single language), and best
to avoid them inside the interview itself.
:::

## What do to instead for text that will be translated

Instead of using the special grammar functions below, use conditional logic at the sentence level
when the text might be translated in the future.

You might want to use the special [`label`/`field` syntax](https://docassemble.org/docs/fields.html#label) to make it 
easier to use conditional logic on the `field` level. This syntax allows you to use multi-line `mako` conditional
syntax.

For example:

```yaml
question: |
  % if children.number_gathered() > 1:
  Where do the children live?
  % else:
  Where does your child live?
  % endif
fields:
  - label: |
      % if children.number_gathered() > 1:
      Children's address
      % else:
      Child's address
      % endif
    field: children.shared_address
```

## Show the person's full name, without abbreviation

By default, docassemble abbreviates an individual's middle name, so
John Quincy Adams is printed as John Q Adams.

You can write someone's full name, in a template or the interview, with the `name_full()` or `name.full(middle="full")`
methods.

For example, in a DOCX template:

```jinja
{{ users[0].name_full() }} {# if it is an ALIndividual #}
{{ users[0].name.full(middle="full") }} {# if it is regular docassemble Individual #}
```

And for a list of people, you can use:

```jinja
{{ users.full_names() }} {# only available for ALPeopleList #}
```

## Friendly name for a person

Often, throughout an interview, you want to use the person's first name.
You can write this as `users[0].name.first`, but this is both long to write
and doesn't help if you want to show multiple peoples' first names.

A convenient shorthand for this is the `.familiar()` method. If you have a list of
people in an ALPeopleList, you can use `.familiar()` on the list, as well as `.familiar_or()`.

For example, if you have an ALPeopleList with "John Adams" and "Jane Smith":

```jinja
{{ users[0].familiar() }}
{{ users.familiar() }}
{{ users.familiar_or() }}
```

Results in:

```
John
John and Jane
John or Jane
```

## Referring to a list automatically uses `comma_and_list`

If your list is a DAList or a ALPeopleList, referring to the list in
the YAML or in your template results in the items all being printed,
separated by a comma and with the ending word "and", thanks to
docassemble automatically applying the function [`comma_and_list`](https://docassemble.org/docs/functions.html#comma_and_list)
to the list.

For example, if `children` is a list with "John", "Jane" and "Mary":

```jinja
{{ children }}
```

Results in

```
John, Jane, and Mary
```

You can customize the word (for example, you can substitute "or") and the trailing "Oxford comma"
by explicitly passing the list name to `comma_and_list()`:

```jinja
{{ comma_and_list(children, and_string="or", oxford=False) }}
```

Results in 

```
John, Jane or Mary
```

## Pluralize a word depending on the number of people in a list

The `.as_noun()` method lets you automatically use the plural or singular
version of the list's name, depending on how many items it contains.
This uses an academic natural language processing library named `pattern` that
should work with most words in the English language. For example, it can handle
non-standard pluralizations for words like "goose" and "octopus".

For example, if `children` is a list with "John", "Jane" and "Mary":

```jinja
I gift the rest, residue, and remainder to my {{ children.as_noun() }}, {{ children }}, per stirpes.
```

Results in:

```
I gift the rest, residue, and remainder to my children, John, Jane, and Mary, per stirpes
```

And if the list contains only "John":

```
I gift the rest, residue, and remainder to my child, John, per stirpes
```

Notice that `as_noun()` passes the **name** of the list implicitly. If your variable
name does not match the word you want to make plural or singular, add the word you want
pluralized as a parameter:

```jinja
My spouse's {{ children_of_spouse.as_noun("children")}}
```

## Create a singular version of the list name

In case you need to refer to the singular version for the question to make sense, you can use
`as_singular_noun()`.

```yaml
generic object: DAList
question: |
  ${ x.as_singular_noun() }'s name
subquestion: |
  Start with the name of the first ${ x.as_singular_noun() }
```

## Conjugate a verb based on the number of people in a list

The `does_verb()` and `did_verb()` methods allow you to automatically conjugate 
verbs in the present and past tense, respectively, to match the number of subjects 
in a list. This is useful for creating grammatically correct sentences in 
dynamically generated documents.

For example, if `employees` is a list containing the names "Alice" and "Bob":

```jinja
{{ employees }} {{ employees.does_verb("work") }} at the company.
```

Results in:

```
Alice and Bob work at the company.
```

And if the list contains only "Carol":

```jinja
{{ employees }} {{ employees.does_verb("work") }} at the company.
```

Results in:

```
Carol works at the company.
```

Similarly, for past actions using `did_verb()`:

If `participants` is a list with "Dave", "Ella", and "Frank":

```jinja
Last year, {{ participants }} {{ participants.did_verb("be") }} at the conference.
```

Results in:

```
Last year, Dave, Ella, and Frank were at the conference.
```

And if the list contains only "Greg":

```jinja
Last year, {{ participants }} {{ participants.did_verb("be") }} at the conference.
```

Results in:

```
Last year, Greg was at the conference.
```

## Using responsive pronouns and titles

You can also insert appropriate pronouns into a document with the following methods:

* `pronoun`
* `pronoun_objective`
* `pronoun_possessive`
* `pronoun_subjective`

These methods work on an Individual, ALIndividual, DAList and ALPeopleList.

Note that if you use the standard Individual class (and not the Assembly Line ALIndividual class)
the only pronouns will be of the he/she/they forms, but ALIndividual allows
asking for an using the individual's unique set of pronouns.

If you are using standard Individual and DAList object, the `pronoun_*` methods
require the definition of each object's `gender` attribute. If you are using the
ALIndividual or ALPeopleList classes, they will first look for the value of 
the individual's `pronouns` attribute.

`pronouns` can either be a single string, of the form "he/him/his" or "xe/xir/xirs",
or a DADict with various pronouns marked as True or False, as would be created by
a docassemble [datatype: checkboxes](https://docassemble.org/docs/fields.html#fields%20checkboxes) question.

### `pronoun` and `pronoun_objective`

For an Individual, `pronoun_objective` returns `him` if the person has the `gender` `male`.

For an ALIndividual, `pronoun_objective` returns `him` if the person has the `pronouns` `he/him/his` or `{"he/him/his": True}`
(with a fallback to the `gender` attribute if `pronouns` cannot be parsed or doesn't exist).

For a DAList or ALPeopleList, `pronoun_objective` returns `him` if the list has only one person with the
appropriate `gender` or `pronouns` attributes, and `them` if the list has multiple items.

`pronoun` is the same as `pronoun_objective` in all of these circumstances. The two only behave differently
if the list contains something other than Individuals or ALIndividuals.

For example, if `users[0]` has the `pronouns` attribute `ze/zir/zirs`:

```jinja
I asked {{ other_parties[0].pronoun() }} to fix the problem on {{ request_date }}
```

Results in:

```
I asked zir to fix the problem on May 1st, 2024.
```

If `users` is a list with "John" and "Jane":

```jinja
I asked {{ other_parties.pronoun() }} to fix the problem on {{ request_date }}
```

Results in:

```
I asked them to fix the problem on May 1st, 2024
```

### `pronoun_subjective`

`pronoun_subjective` returns the word "he", "she", "they" or "it", otherwise following the same pattern as `pronoun`.

For example, if `users` is a list with just 1 party "John" with pronouns "they/them/theirs":

```jinja
Why did {{ users.pronoun_subjective() }} do it?
```

Results in:

```
Why did they do it?
```

### `pronoun_posessive`

For an Individual or ALIndividual, `pronoun_possessive` works the same
as `pronoun` and `pronoun_subjective`, except it returns the word
"his/her/their" in the appropriate place.

Unlike `pronoun` and `pronoun_subjective`, `pronoun_posessive` requires that you include the word you want to 
"posessify" as a parameter.

If `users` is a list with just 1 party "Jane" with the pronouns "she/her/hers":

```jinja
They are {{ users.pronoun_possessive("shoes") }}
```

Results in:

```
They are her shoes.
```

### Automatically use responsive first and second person pronouns ("I", "We", "You", "Your", etc.)

Versions of the Assembly Line >= 3.0.0 and docassemble servers later than 1.4.103 can 
conjugate pronouns in the first and second person as well as the default third-person.
This works both for an ALIndividual and an ALPeopleList.

These minimum versions support a new parameter, `person`, that can be one of:

* 1 (First person, responsive to list length)
* "1p" (first person plural)
* 2 (second person, responsive to list length)
* "2p" (second person plural)
* 3 (third person, responsive to list length. **Default**)
* "3p" (third person plural)

This is especially helpful in an output document when there can be either 1 or multiple litigants, 
such as a letter or complaint that is written from the litigant's perspective.

For example, to write a letter that is from the perspective of the user or users:

```jinja
It's all about {{ users.pronoun(person=1) }}.

{{ users.pronoun_subjective(person=1) }} love animals.

Especially {{ users.pronoun_possessive("elephant", person=1) }}.
```

Results in:

> It's all about me.
> I love animals.
> Especially my elephant.

If users is a list with exactly 1 person, and

> It's all about us.
> We love animals.
> Especially our elephant.

When there are 2 or more people in the list.

The `person=2` parameter would result in the following output,
regardless of the length of the list (because there is not a separate
second person pronoun in English):

> It's all about you.
> You love animals.
> Especially your elephant.

### More about adapting language based on gender and plurality

[docassemble's documentation](https://docassemble.org/docs/objects.html#language%20methods) 
includes several more comprehensive examples of how to use these functions to automatically 
use appropriate pronouns.

### `salutation`

The [`salutation`](https://docassemble.org/docs/objects.html#Individual.salutation) method
returns the word "Mr." or "Ms." depending entirely on the user's `gender`.