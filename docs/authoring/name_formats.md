---
id: name_formats
title: Name formats
sidebar_label: Name formats
slug: naming
---

In programming languages (and sometimes in computer files and names in general),
there are a lot of different rules that could be used to name different things like files
and variables. When working in a large team, choosing consistent conventions for naming these
things makes reading and writing code easier. At the AssemblyLine project, we've settled on
several conventions:

1. [`snake_case`](#snake_case)
1. [`kebab-case`](#kebab-case)
1. [`PascalCase`](#pascalcase)

## Types of Naming Conventions

### snake_case

* Start with a letter, not a digit
* Separate words with underscores (`_`) instead of spaces
* All other characters are either 0 to 9 or lowercase a to z ([alphanumeric](#alphanumeric))

Some examples: `number_of_people`, `issue_12_address`, `protective_order.pdf`

### kebab-case

* Start with a letter, not a digit
* Separate words with dashes (`-`) instead of spaces
* All other characters are either 0 to 9 or lowercase a to z ([alphanumeric](#alphanumeric))

Some examples: `protective-order.yml`

### PascalCase

* Start with a letter, not a digit
* Each word starts with an uppercase letter
* All the words are squished together
* All characters are either 0 to 9 or a to z ([alphanumeric](#alphanumeric))

Some examples: `ProtectiveOrder`, `ProtectiveOrderRemoveAddress`

## Uses of Naming Conventions

### Form Files stored in docassemble: [snake_case](#snake_case)

* Makes it clear to lawyers, and we can use the file name as a variable name as well.
* Avoid using the section numbers of the law unless they are the common name of the form.  
* Include at least one descriptive term.
  * Example: use `protective_order_209A.pdf`, even if attorneys call it "209A".
* Avoid adding suffixes or information about the progress of the form at the end of the file. For example, use `protective_order.pdf` over `protective_order_processed.pdf` or `protective_order_reviewed.pdf`.
* In all other ways, use the common name of the form - the name attorneys know it by.

### Downloadable documents: [kebab-case](#kebab-case)

* We use dashes (`-`) because underscores (`_`) can be hard to see in file names, especially if the text is underlined.
* Exactly the same as [the docassemble form name](#form-files-stored-in-docassemble-snake_case) in all other ways.

### Other files stored in docassemble: [snake_case](#snake_case)

* `snake_case` is a common convention and is clear to developers

### PDF variables:  [snake_case](#snake_case)

* Each label name must be unique. See how to [ensure uniqueness while still creating fields that display the same value](label_variables#some-suggestions-for-coming-up-with-custom-labels).
* Meets PDF or DOCX requirements
* Is consistent with AssemblyLine conventions (which will help you!). See more details about [labels' variable names in documents](doc_vars_reference.md).

### Code variables: [snake_case](#snake_case) mostly

Naming variables is hard, but good code variables are clear and short, in that order.

#### [`snake_case`](#snake_case)

* Regular variable names (`reason_for_appeal`)
* Objects (`judges`, `other_parties`)
* Methods of classes (`template.get_pdf_fields()`)

#### [`PascalCase`](#pascalcase)

* Classes (`PlaygroundSection`)

Variable names should read close to natural English out loud. Avoid putting the type of the variable in its name, sometimes called hungarian notation:
for example, using `is_parent_bool` to indicate a boolean, or `children_list` indicating a list.

Adding extra information into the variable name does help make things more clear, for example, `got_notice_date`, or `plaintiff_email`. But this is helpful because we're describing the purpose of the variable, not it's type. Our [conventions for our PDF and DOCX variables](doc_vars_reference.md) has some good examples.

For a boolean value, use a word or phrase that you can answer with yes or no. They are often verb-noun pairs. `has_` and `is_` can be useful. **Examples:** `is_minor`, `was_convicted`, `has_court_date`.

Use a plural word for a list of things, and a singular word for one thing. **Examples:** `children`, `child`

### docassemble projects and packages

In the docassemble playground:

* Each project must have a unique name.
* Your package name doesn't have to be the same as your project name.
* Use [PascalCase](#pascalcase) when naming projects and packages.

If you are naming a package for the first time (for example, before [publishing an interview to GitHub](github#set-up-the-github-integration)), take a moment to check the package name, which will be difficult to change later on. Follow these guidelines:

* The package name should be name of the form for which you are making the interview.
* Use [PascalCase](#pascalcase) (**SmallClaims**, not **Smallclaims**).
* Package and GitHub repository names should include an abbreviation for the jurisdiction. (For example, **MASmallClaims** for a Massachusetts small claims form interview. Or perhaps **MATCSmallClaims** if you want to specify that it is for the Massachusetts Trial Court.)

## Definitions

### Alphanumeric
A string that is alphanumeric has only digits 0 to 9 and the letters A to Z in it. The letters can be lowercase or uppercase.

**Yes:** `A` `b` `12` `ab12` `CZ` `5`

**No:** `A!` `(b)` `ab 12` `$12` `"CZ"` `0.5`

## Other resources

* [Different ways to name variables](https://en.wikipedia.org/wiki/Naming_convention_%28programming%29#Examples_of_multiple-word_identifier_formats)
