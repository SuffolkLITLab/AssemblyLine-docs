---
id: al_income_itemizedjobs
title: |
  Itemized Jobs: ALItemizedJob and ALItemizedJobList
sidebar_label: Itemized jobs
slug: ALIncome/itemizedjobs
---

Sometimes, you'll need detailed information about a person's
income at the same job, including how much income comes from tips, or
how much is deducted from their paycheck for different reasons. `ALItemizedJob` is custom built for this purpose.

## ALItemizedJob

If you want to jump right in, check out a [live demo of the ALItemizedJob feature](https://apps-dev.suffolklitlab.org/start/ALToolbox/al_income_demo?use_feature=ALItemizedJob).

Sometimes, courts will ask for specific pieces of information about a person's pay, such as how many tips they received, or how much is deducted from their pay for health insurance. To keep track of all of those pieces of information for several jobs, you, the interview author,
will want to use a job that can handle itemizing different types of incomes and deductions for the same type of job.

This is not the class that you should reach for first. You should
check and see if the [ALJob](al_income_jobs.md) class satisfies your needs, since it asks the user far fewer questions than the ALItemizedJob.

If you need to use it, a main benefit is the fact that the ALItemizedJobList
will do all of the calculations needed over multiple jobs to get a single answer for monthly pay, even if the jobs have different pay schedules, and have multiple incomes per job that come at different rates.

## ALItemizedJobList Tutorial

### Before

Before you start, we'll assume that you

* have access to a [developer account on a docassemble server](https://suffolklitlab.org/legal-tech-class/docs/classes/assembly-line/2020-assembly-line-assignment-1#before-you-get-started)
* have the [`ALToolbox` package installed on your server](../../get_started/installation.md#run-the-installation-script)
* know [what the playground is](/docs/docassemble_intro/hello-world#introduction-to-the-docassemble-playground) and [how to use it to develop a docassemble interview](/docs/docassemble_intro/hello-world#hello-world)
* know [what "blocks" are](/docs/docassemble_intro/yaml#documents) in docassemble
* have looked at the [the `ALJob` tutorial](al_income_jobs.md) and decided you need to handle more complicated information

### Writing the interview

First, include the `al_income.yml` YAML file in your interview. This will let you use the al_income questions and python code.

```yml
include:
  - docassemble.ALToolbox:al_income.yml
```

Then, create an `ALItemizedJobList` using a `objects` block.

```yml
objects:
  - jobs: ALItemizedJobList.using(complete_attribute='complete', ask_number=True)
```

Next, add a [interview order code block](/docs/docassemble_intro/controlling-interview-order#the-interview-order-block):

```yml
mandatory: True
code: |
  jobs.gather()
```

The interview will ask how many jobs the user has, and then for each job, will ask them:

* their job title. This is mostly for their benefit, and is the simplest way of asking for the information.
* information about their employer. They can mark if they are self-employed, and the module will mark the employers name as
  "self-employed".
* if it's hourly, and how often the users receives payment
* Itemized information from their paystub (hence the name of the class!).
  By default this includes gross wages, federal taxes, and insurance deductions.
  * users can also enter different sources of income and deductions, that
    can happen on different time periods from their standard pay period, like yearly bonuses or weekly tips.

You can let the user review their answers with the following screen.

```yml
id: job review
question: |
  Review your jobs
subquestion: |
  Here is what you've told us about your jobs. You can add more or continue
  to the next question.

  ${ jobs.table }

  ${ jobs.add_action() }
field: review_jobs
```

:::tip Review screens
You can also add the job list to a [review screen](https://docassemble.org/docs/fields.html#review) with the below code:

```yml
review:
  - Edit: jobs.revisit
    button: |
      **Jobs**:

      % for job in jobs:
      * ${ job.source } at ${ job.employer.name }
      % endfor
```

:::

Once you have this information, you have many different ways to display it.

Let's add one last screen to display our information. We'll
describe what each line of code is doing on the screen.

```yml
event: final_screen
question: Summary of your jobs
subquestion: |
  All of itemized value names, which we call "sources": ${ jobs.sources() }

  Itemized deduction names: ${ jobs.sources(which_side="deductions")}

  Itemized income names: ${ jobs.sources(which_side="incomes") }

  Annual gross income from all jobs: ${ currency(jobs.total()) }

  Annual net income (gross - deductions) from all jobs: ${ currency(jobs.net_total()) }

  Monthly gross income from all jobs: ${ currency(jobs.total(times_per_year=12)) }

  Annual gross income from the first job listed: ${ currency(jobs[0].total()) }

  Employer information from the first job: ${ jobs[0].employer_name_address_phone() }
```

Add the screens we just made to the mandatory code block above, so it looks like:

```yml
mandatory: True
code: |
  jobs.gather()
  review_jobs
  final_screen
```

And you can now run through the interview!

<details>
<summary>Click this section to see the whole interview</summary>

```yml
---
include:
  - al_income.yml
---
objects:
  - jobs: ALItemizedJobList.using(complete_attribute='complete', ask_number=True)
---
mandatory: True
code: |
  jobs.gather()
  review_jobs
  final_screen
---
id: job review
question: |
  Review your jobs
subquestion: |
  Here is what you've told us about your jobs. You can add more or continue
  to the next question.

  ${ jobs.table }

  ${ jobs.add_action() }
field: review_jobs
---
event: final_screen
question: Summary of your jobs
subquestion: |
  All of itemized value names, which we call "sources": ${ jobs.sources() }

  Itemized deduction names: ${ jobs.sources(which_side="deductions")}

  Itemized income names: ${ jobs.sources(which_side="incomes") }

  Annual gross income from all jobs: ${ currency(jobs.total()) }

  Annual net income (gross - deductions) from all jobs: ${ currency(jobs.net_total()) }

  Monthly gross income from all jobs: ${ currency(jobs.total(times_per_year=12)) }

  Annual gross income from the first job listed: ${ currency(jobs[0].total()) }

  Employer information from the first job: ${ jobs[0].employer_name_address_phone() }
```

</details>

You'll likely want to display this information in a PDF or word template as well. [This page about working with PDF files](../../authoring/pdf_templates.md) will help with displaying information in the PDF, and [this page about working with DOCX files](../../authoring/docx_templates.md) will help DOCX users.
