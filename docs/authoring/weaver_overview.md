---
id: alweaver_overview
title: |
   "Weaving" your form into a draft interview
sidebar_label: |
   "Weaving" your form into a draft interview
slug: generating_code
---

<!-- Boilerplate, Baseline, kit, ready to build, some assembly required, something to build on, starting point, blank slate, foundation, groundwork, starter dough, groundwork, spark -->

After your document is fully [labeled](doc_vars_reference.md), the next step is
to automate a draft in the [Document Assembly Line
Weaver](https://apps-dev.suffolklitlab.org/start/ALWeaver/assembly_line?new_session=1)
(ALWeaver).

## Philosophy

The Assembly Line Weaver is a tool that helps you create a draft of a guided
interview. You should not spend very much of your time at this stage.

Use the Weaver to:

1. make sure you are using Assembly Line conventions
1. get draft text in the right place, so you can easily find and edit it later
1. get a runnable prototype so that you can start getting expert feedback

We designed the Weaver to produce clean, maintainable code. We do not
intend it to work the way that fully no-code solutions work, which often
are easy to use for simple features but produce code that is challenging
to edit manually.

### Limits of the Weaver

The Assembly Line Weaver does allow you to reorder screens. However:
you will not be able to add **any** logic in the Weaver process.

This is by design. We want you to quickly get to the docassemble playground
to continue editing your code.

## Before you use the Weaver

* Make sure you got the [field labels](label_variables) (variable names) right:
    * Use the Assembly Line variable names for things like `users` and `other_parties`.
    * Double-check the order of word "suffixes" like `name_first` and `address_unit` (they go big to small).
    * In PDFs, make sure you used `__1`, `__2` etc at the end of a variable name if you had to repeat it in the same document.
* Rename the document to remove any extra "stuff", like -01, _final, _labeled, etc. The filename will get reused throughout your project.
* Plan to finish using the Weaver in one sitting, most of the time. It is easier to customize in the playground, and harder to go
  back to your older Weaver session.

## What the Weaver does

The steps that the Weaver will walk you through are as follows:

1. validate the labels and your template file
1. add some basic information about your form
1. add on-screen prompts for each labeled field
1. choose a datatype for each labeled field (for example: text, number, date)
1. organize the fields onto individual screens with headings and optional additional text
1. download a completed, runnable draft interview

[Launch the Assembly Line Weaver](https://apps-dev.suffolklitlab.org/start/ALWeaver/assembly_line?new_session=1)



## Information you will be asked

To prepare to run your form through the Weaver, think about how you will answer
the questions listed below:

* a short label for your form that is used to build unique variable names, like:
  `restraining_order_209A`
* a title for your interview
* a short description
* draft text that orients your user to what they need before they start working
  on your form
* whether the user is usually the plaintiff, defendant or could play either role
* the names of authors of your interview (usually, just you!)
* the country and state the form is from
* the category for your form
* the step in a court process that your form is filed: e.g., starting a case,
  filed as an appeal
* the list of courts your form can be filed in
* the total number of each kind of "person" that can appear on the form. e.g.,
  can multiple plaintiffs file at once, or just one?

New features are regularly added to the Weaver, so the exact list of questions
you will be asked may change.

## Download your interview at the end

When you have finished using the Weaver, download your package. This will put a
.zip file in the Downloads folder on your computer.

Next, upload this file to the docassemble playground's `Packages` folder.

![Folders | Packages ](../assets/playground_packages_menu.png)

:::warning If you are using Safari on a Mac OS computer
Safari, by default, will turn your downloaded package into
a folder on your PC.

Before downloading the package, turn off that behavior:

1. open Safari
1. click Preferences
1. under the General tab, uncheck the option **Open 'safe' files after downloading**
:::

## Example of a page in a docassemble interview
A page might look like this:

![One page of an interview made up of a heading, explanatory text, and the fields](../assets/interview_screen_or_page.png)

You can see [the ALWeaver docassemble package on GitHub](https://github.com/suffolkLITLab/docassemble-ALWeaver)
