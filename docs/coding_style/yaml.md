---
id: yaml
title: Interview files
sidebar_label: Interview files
slug: yaml
---

docassemble interviews are written in
[YAML](../docassemble_intro/yaml).

They may also contain:

* template files (e.g., DOCX, PDF, or Markdown (.md) files)
* images
* css
* javascript
* data sources in CSV, XLSX, or JSON format

Keeping your files neat and organized can help other developers understand
your code.

## Use Python conventions for variable names and Python code in your YAML files

See [Python style guide](python.md).

## Organize and name your files

### Use descriptive package names; include state and forum identifiers

For the docassemble package, use names that help someone understand at a glance
what your form does and where it can be used:

* include the form **function** and subject area. E.g., `EvictionStay` not
  just `Stay` or `Motion`
* include the state abbreviation if it is state-specific. E.g., `MAEvictionStay`
* include a forum abbreviation if a form with a similar name exists in a more
  common forum. E.g., `MAAppealsEvictionStay` if you can request a stay in the
  Appeals and the trial courts. But: you likely don't need to specify
  `MATrialEvictionStay` if most of your forms are designed for the trial level.
* unless you have a good reason, avoid internal court form reference numbers in
  package names (you may want one interview to handle multiple forms in the
  future)

Descriptive names will help you and external parties looking for examples in the
future locate your package on GitHub.

### Avoid spaces in file names; use lowercase letters

Files in your docassemble package, including YAML files, Python modules, and any
static resource files or data sources, should all be be named without spaces.
You may choose to use `snake_case` (underscores separating words) or `kebab-case`
(hyphens separating words). Using snake case avoids problems with some
command-line tools, as well as being more consistent with Python file name
conventions, but one challenge is that `snake_case` underscores can be hard to see
in a file browser window.

Use lowercase letters in file names. Some file systems (Unix and Linux) are
case sensitive. Using a consistent case can reduce problems. Lower case is
the most commonly used convention.

### Avoid using leading numbers in file names

Where possible, avoid using leading digits in file names. Leading digits
are not valid in Python variable names, and it is often convenient to have
variable names and file names have matching prefixes.

### When there is just one YAML file in the package, use a descriptive name for it

Most interviews use just one YAML file. This name can "leak" into the user's view
in some cases, so it is usually best to make it a complete, descriptive filename.

For example: `eviction.yml` is probably a better filename than `interview.yml`. It will
be easier to know what file you are working on, and the name will be more descriptive if
it shows to the final user of your tool.

The descriptive name can, and often will, match the name of the package.

Your interview YAML name should avoid:

* Suffixes like `_final`, `_draft`, etc., even when you are in the middle of building it.
  Use GitHub [version control](../authoring/github.md) instead to track multiple versions of the work in progress.
* Any other "insider" information that you do not want the public to see, like the statute number.

Make sure to remove characters that accidentally got added during the edit process, like
(1) that might have been added when you download the file to a Downloads folder that
already has a copy of the same file.

### When you have multiple files in a single package, give each file a clear prefix

While simple interviews have one YAML file, there are three strong reasons to have more than one YAML file in
a single docassemble package:

1. If one package has multiple, distinct interviews contained within it, perhaps for different audiences, like
  children, parents, or interested people, or someone filing a complaint or someone answering it.
2. If one interview assembles multiple complex forms. In that case, it may be helpful to put any unique
   questions for each form, as well as the attachment block, into its own YAML file.
3. If the YAML file simply is getting too large to easily manage. In that case, you might break up the YAML
   into multiple files that are easier to edit. In this case, make sure the reasoning for each file is clear. E.g., you could separate the interview's metadata, questions, and logic into three separate files.

Even if an interview makes sense on its own, you may want to make it re-usable as a module in other interviews.
For example: a fee waiver, an interpreter notice, or a request for accommodation. In that case, you want
to make sure that the mandatory logic and metadata are separated from the part you want to re-use in other
interviews.

Keep things simple when you can! Think ahead to the developer experience. If you are dividing work
across multiple authors, think through what a single change will look like. Can an author make a change
without having to edit multiple YAML files in most cases?

Our current recommendations to name the files in this scenario are:

1. Any runnable files in your package should be named `main.yml`. If there are multiple runnable files,
   give each file the prefix `main_`. (`main` has a long history in computer programming.)
1. If the interview assembles multiple documents, you can make a separate YAML file for each document that contains the unique questions it needs and the document's attachment block. Name it after the document itself,
e.g., `financial_statement.yml`. (be consistent with this: if the
separate documents are very short, you may not need this, but it should be all or nothing inside a single package.)
1. Name the file that is used by multiple related interview endpoints `shared.yml`.

:::info
Remember, there should be only one `mandatory` block in a given combination of YAML files. That means
you should never put a `mandatory` block in the files for each individual document.

To group logic that you might want to run with the template it relates to, without making it mandatory:

1. use the [`named block` pattern](../docassemble_intro/controlling-interview-order#triggering-code-and-then-continuing-using-named-blocks) for the `interview order` block
1. reference your `named block` in a mandatory block inside the `main` file that users will run.

While in the development phase, you might want to temporarily test a single document at a time.
You can do so by making, e.g., a `financial_statement.yml` and a `main_financial_statement.yml` file.
The `mandatory` block will be in the `main_financial_statement.yml` and reference the `named block`
inside the `financial_statement.yml` file. Be careful to not rely on this for more than quick tests!
You'll always want a final round of testing when `financial_statement.yml` runs in combination with
the forms you want the user to interact with.
:::

If you need to subdivide very long YAML files further:

1. Label files that contain only questions `questions.yml`, or prefix with `questions_`. If the name is too long, `ql_eviction.yml` is a reasonable abbreviation that follows the Assembly Line's existing conventions.
1. Name shared files that contain other kind of functionality, e.g., integration with a separate service,
   `support.yml` or prefix the filename with `support_`. E.g., `support_legal_server.yml`, `support_s3.yml`.
1. Name files that contain only logic `logic.yml`, or prefix with `logic_`. E.g., `logic_eviction_defenses.yml`.
1. Name files that contain functionality that only affects the appearance of the interview (e.g., loading CSS, various `default screen parts`) `theme.yml` or `visual.yml`.
1. Name files that contain the review screen logic `review.yml` or prefix with `review_`.

Examples:

#### An interview with exactly one YAML file in it

Filename | Purpose
---------|--------
`eviction.yml` _or_ `main_eviction.yml` | The one YAML file containing mandatory blocks, attachments, metadata. The whole enchilada.

:::info
In our experience, some special setup/integration code, like e-filing, should normally go in its own file.
We have found that developers of the guided interview do not want to be overwhelmed with the logic
needed to support e-filing.

If you are using e-filing, add a file named `support_efiling.yml` with any e-filing setup code
inside of it.
:::

#### A fee waiver that can be assembled by many different interviews

Filename | Purpose
---------|---------
`main.yml` _or_ `main_fee_waiver.yml` | The runnable interview file when someone wants ONLY the fee waiver. Contains mandatory code and metadata (e.g., interview title), and the document bundle (al_user_bundle and al_court_bundle).
`fee_waiver.yml` | Has **no** mandatory logic. Contains questions and the attachment block, and a "named block" with interview order logic that can be referenced in a parent interview's mandatory interview order block.

#### An interview that assembles multiple documents in different combinations depending on audience

Filename | Purpose
---------|---------
`main_petition_for_guardianship.yml` | Entry point for an interested person. Has metadata, a mandatory interview order block and the document bundle (al_user_bundle and al_court_bundle).
`main_object_to_guardianship.yml` | Entry point for the person whose right is being restricted (e.g., a parent or incapacitated adult). Has metadata, a mandatory interview order block and the document bundle (al_user_bundle and al_court_bundle).
`shared.yml` | Contains shared questions, and only questions (perhaps with some basic code setting simple shared variables), for the guardianship process that multiple documents might need written the same way.
`petition_for_guardianship.yml` | Contains unique questions for the petition and attachment code. No mandatory blocks.
`bond.yml` | Contains unique questions, logic, and attachment code for a bond form.
`request_for_counsel.yml` | Contains unique questions, logic, and attachment code for a counsel request form. No mandatory blocks.

#### A complex interview with only one entry point but where managing a single YAML file is too cumbersome

Filename | Purpose
---------|-------------
`main.yml` _or_ `eviction.yml` | Metadata, mandatory logic, document bundle
`questions.yml` | Only questions
`logic.yml` | Code blocks that define various behavior, such as whether a defense or claim will be made.
`support_efiling.yml` | Independent support / setup code to enable connection to the Suffolk E-filing proxy server.
`support_legal_server.yml` | Support / setup code that handles connecting to the Legal Server CMS.
`support_office_365.yml` | Support / setup code for connecting to Office 365.
`theme.yml` or `visual.yml` | Code / setup / metadata that controls the appearance of the interview, but nothing else.
`review.yml` | The review screen, and any `revisit` blocks and `tables` needed purely for the review screen to work.

:::info
Above we suggest that you can use either `main.yml` (a functional name) or `eviction.yml` (descriptive).

Remember that the descriptive name is great when you are sure that you will only have one "descriptive"
name in the package. If you might edit the package later to add multiple documents, it might be best
to start with `main.yml` right at the start of the interview.
:::

## Validating YAML files automatically

To ensure that YAML interview files adhere to correct syntax, do not duplicate keys, and follow docassemble structural rules, use **[DAYamlChecker](../automated_quality_checks/dayamlchecker.md)** locally and enable the **[ALActions `da_build`](../automated_quality_checks/github_actions.md#da_build)** workflow in GitHub.
