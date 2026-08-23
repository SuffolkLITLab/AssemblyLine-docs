---
id: al_income_jobs
title: |
    Jobs: ALJob and ALJobList
sidebar_label: Jobs
slug: ALIncome/jobs
---

Asking people about their jobs is a common task when getting financial information. The `ALJob` class tries to be complete but simple for your users to answer, doing the math for them, and straight-forward for you to use.

If you want to jump right in, check out a [live demo of the ALJob feature](https://apps-dev.suffolklitlab.org/start/ALToolbox/al_income_demo?use_feature=ALJob).

## ALJobList tutorial

Let's make a short interview that asks about someone's jobs, lets
them review their answers, and shows them summaries about their
income from those jobs.

### Before

Before you start, we'll assume that you:

* have access to a [developer account on a docassemble server](https://suffolklitlab.org/legal-tech-class/docs/classes/assembly-line/2020-assembly-line-assignment-1#before-you-get-started)
* have the [`ALToolbox` package installed on your server](../../get_started/installation.md#run-the-installation-script)
* know [what the playground is](/docs/docassemble_intro/hello-world#introduction-to-the-docassemble-playground) and [how to use it to develop a docassemble interview](/docs/docassemble_intro/hello-world#hello-world)
* know [what "blocks" are](/docs/docassemble_intro/yaml#documents) in docassemble

### Writing the interview

This interview will be minimum functionality; it will gather all of the information about someone's jobs, ask them to review it, and finally, will display the information.

First, include the `al_income.yml` YAML file in your interview. This will
let you use the al_income questions and python code.

```yml
include:
  - docassemble.ALToolbox:al_income.yml
```

Then, create an `ALJobList` using a `objects` block.

```yml
objects:
  - jobs: ALJobList.using(complete_attribute='complete', ask_number=True)
```

:::tip Other objects
By default, each ALJob will use `Individual` object for the employer. You can change this to be the
`ALIndividual` object by using the following `objects` block:

```yml
objects:
  - jobs: ALJobList.using(
        object_type=ALJob.using(employer_type=ALIndividual),
        complete_attribute='complete', ask_number=True)
```

:::

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
* how much the user gets paid. This screen handles both hourly and salaried workers, and asks how often they receive their pay,
  and if they have any deductions from their paycheck.
  * if you need more detailed information about someone's pay, such as their
    tips and taxes withheld, you should use [the `ALItemizedJobList` class](al_income_itemizedjobs.md)

You can let the user review their answers with the following screen:

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
Once you have this information, you can use it in a variety of ways.
Let's add one last screen to display our information. We'll
describe what each line of code is doing on the screen.

```yml
event: final_screen
question: Summary of your jobs
subquestion: |
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
  - jobs: ALJobList.using(complete_attribute='complete', ask_number=True)
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
  Annual gross income from all jobs: ${ currency(jobs.total()) }

  Annual net income (gross - deductions) from all jobs: ${ currency(jobs.net_total()) }

  Monthly gross income from all jobs: ${ currency(jobs.total(times_per_year=12)) }

  Annual gross income from the first job listed: ${ currency(jobs[0].total()) }

  Employer information from the first job: ${ jobs[0].employer_name_address_phone() }
```

</details>


You'll likely want to display this information in a PDF or word template as well. [This page about working with PDF files](../../authoring/pdf_templates.md) will help with displaying information in the PDF, and [this page about working with DOCX files](../../authoring/docx_templates.md) will help DOCX users.
