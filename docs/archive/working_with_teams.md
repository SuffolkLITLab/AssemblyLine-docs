---
id: working_with_teams
title: Working with teams
slug: working_with_teams
---

:::warning
We are actively updating the Document Assembly Line documentation and much of the information on this page is outdated.
:::

## Getting the project started

### Identify decision makers, team members, and sources of information

Identify an internal and external team for the project. It should include:

1. A project manager tasked with keeping the project on schedule. This can be either
   internal or external.
1. A lead developer, with additional developers as needed
1. An identified subject matter expert or experts, as well as representative users of the final project
1. Key stakeholders who will need to sign off on the project or make decisions.

This is also a good time to identify primary and secondary sources that the team
can use to answer questions if an SME isn't readily available.

### Schedule a check-in cadence

Many projects require a check-in at a cadence of once a week. For slower projects,
once every 2 weeks or once a month may be sufficient. Pick a day of the week
and time in advance and set up a regular standing meeting on your calendar.

Check-ins should generally be focused on quick status updates and resolving blockers and take from 15 
minutes to 1 hour, depending on their frequency.

Before each meeting, the team members should identify an agenda that focuses on:

* progress on meeting milestones and deadlines
* a list of blockers (things that prevent completing required tasks)
* questions that will benefit from input from the meeting participants

Not everyone needs to attend each check-in meeting. It can be efficient on some 
projects to have everyone attend one meeting to get in sync, but it can also get 
expensive if the client is paying for your time. Weigh the benefits and costs carefully. It may depend on how effectively the asynchronous communication methods
work for your project, which depends on individual team members.

The project manager and the stakeholder or their representative are the most
important participants on this meeting, to communicate progress on the work. Often,
work can stall without these regularly scheduled check-ins. The project manager 
can separately schedule frequent standup meetings with the developers.

:::tip A sample check-in schedule for a 4-9 month project

Check-ins:

1. Happen once a month
1. The first check-in includes the whole team
1. The rest include the project manager, the stakeholders, the lead developer, and any
   other developers only if they have questions that need live discussion

:::

:::tip A sample check-in schedule for a 3 month project

Check-ins:

1. Happen every 2 weeks
1. Include the project manager, the stakeholders, and the lead developer

:::


### Create a project communication system

On the Assembly Line project, we default to using Kanban-style project boards to 
track interview progress. We use these columns:

* Backlog, for cards that haven't been prioritized yet (they can represent ideas that need review)
* To-do
* Doing
* Blocked, for cards that can't be acted on because of a "blocker" (which might include waiting for an SME's response)
* Done

(this set of columns is similar to a "[scrum](https://www.atlassian.com/agile/project-management/scrum-board)" board in the Agile development world)

:::tip A sample board

You can use our [GitHub project template](https://github.com/orgs/SuffolkLITLab/projects/22/views/2) as a starting
point for your project.

:::

Using the GitHub project, you can track progress, assign deadlines to tasks, and have threaded conversations (once the cards are
[converted into issues](https://docs.github.com/en/enterprise-server@3.9/issues/planning-and-tracking-with-projects/managing-items-in-your-project/converting-draft-issues-to-issues)).

#### Alternatives to GitHub project boards for asynchronous communication

Alternatives to GitHub project boards:
* A shared Google Document
* Trello
* Microsoft Planner

Supplementary tools:

Either of these may be useful for closer to real-time communication.
* Microsoft Teams
* Slack

## Gather information

### Understanding the project's users and intended purpose

#### Review the source documents

Gather all of the templates that the client wants to automate.

Identify the following substantive points:

* The topic
* The purpose or purposes of the completed documents
* The party or user the form will be completed by or for
        * For example: the plaintiff, defendant, testator
* Any limits to the jurisdiction
* Any other limits to the applicability (relative to the related problem a user might use the document for)
        * For example: is this for minors or adults?

#### Start to understand who the user is going to be

1. Who is the most likely user of this tool? Possibilities often include:
        * An attorney or paralegal who is experienced in this area of work
        * A professional who may get light training (for example, a new employee
           or a volunteer in a clinic)
        * A litigant on their own.
1. What else do we know about the most likely user?
        * Will they use this tool multiple times, or just once without training?
        * Is the user encountering this tool because of a stressful, conflict-driven, or traumatic life experience?
        * What education level will they have?
        * What English language reading grade level will they have?
        * Will they mostly using a desktop or a smartphone?
        * Will they have access to a printer?
        * Will they have reliable internet access?
        * Will they be able to or need to return to complete the form in multiple sittings?

Consider working with the client to create a few [user personas](https://en.wikipedia.org/wiki/Persona_(user_experience)). After you have built a few out,
they should be validated with feedback from the client. ChatGPT can help you make user personas (but make sure you
validate them).

**If the user is an attorney or paralegal in the firm, consider making a persona both for the attorney and for their ultimate client.**

:::tip A sample persona for an eviction defense tool

**Persona: Maria Rodriguez**
* Age: 35
* Location: Boston, Massachusetts
* Occupation: Retail Worker
* Family Status: Single mother with two children, ages 8 and 5
* Income Level: Low-income bracket
* Housing Status: Renting a two-bedroom apartment in a building primarily occupied by similar low-income families
* Technology Use: Maria owns an older Android smartphone but has limited data. She's used to using social media and does all her communication on it

**Challenges**
* Financial Strain: Maria’s earns $20,000 a year, which isn't enough for her expenses. She often has to decide between paying different bills.
* Lack of Legal Knowledge: She has limited understanding of her rights as a tenant and feels intimidated by legal processes.
* Access to Resources: Maria has limited access to technology and legal assistance due to her financial situation and work hours.

**Goals**
* Stability: Maria’s primary goal is to provide a stable home for her children. She wants to avoid eviction to maintain access to her children’s school and her local support network.
* Education: She is keen to learn more about her rights as a tenant and how she can legally contest an unfair eviction.
* Assistance: Maria needs easy-to-understand, accessible legal advice and support that fits into her limited budget and time constraints.

:::

#### How sophisticated does the automation need to be?

1. Look over the [Legal app maturity model](https://suffolklitlab.org/legal-tech-class/docs/legal-tech-overview/maturity-model). What level form 
will be your target for this project? Keep in mind both the sophistication of your user, available time and budget constraints, and any safety concerns.

For a tool aimed at legal professionals, a level 1.5 or level 2 form is usually enough.

For a tool aimed at the general public, a level 2 is usually the minimum. Targeting level 3 or 4 is always tempting, but
depending on constraints may not be justified by the increased time and cost. You should release a first draft at the earliest
safe stage, and then continue refining only as long as appropriate based on the needs of the end user for this particular project.

### Identify a project timeline

Come up with a rough schedule with key milestones.

When coming up with a project timeline, think about both resources and the project's
size.

Resource constraints include:

* Available working hours (a typical developer has 25 productive hours in a week, while a student can allocate about 1/2 of their credit hour expectations to development and may also take 3-5 times as long as an experienced developer at the same tasks)
* Other ongoing projects
* Delivering early and frequent work to the client for review and feedback

Complexity is affected by:

* The number of formatted pages (static pages without fields or logic don't add to complexity)
* Expected precision and fidelity
        * Complexity of formatting for lists, headings, names, addresses, phone numbers, etc.
        * Whether language must be made dynamic to account for quantity, pronouns, and relationships
        * How flexible pagination will be in the output document depending on the 
          amount of optional text or the quantities of people (such as children, agents, etc.)
* Number of fields
* The complexity of the fields and responses possible for each field
* The number of branching logic points (often caused by conditional language or documents in the output)
* The kind of output documents that are expected:
        * Multiple sets, in different combinations, for different quantities of people?
        * With addenda or other ancillary documents that need to be created from scratch?

For a project involving one form, the first milestone should be a working
draft of the tool that completes every question, even if it is in a very
rough order. Set a deadline for this. With the help of the Weaver, it should 
be possible to reach this in 10-15 hours for even a quite long form. Be
willing to postpone certain features to hit this first milestone.

You'll need to communicate very clearly with the client that this rough prototype is
not even close to the final product but that you still need their high level feedback
on it.

For a project involving multiple forms, we recommend:

* Starting with the simplest form to get the client's early feedback
* Moving on to the most complex form to confirm the shape and logic
  of the whole process with your client
* Then continuing with the remaining forms

:::tip Sample timeline for a project with 12 forms of varied complexity

Each phase is scheduled for 2 weeks-2 months:
1.	Phase 1, 2 weeks: Completion of a draft of 1 key document, which may include a subset of the full functionality, in order to obtain the client's input and review. The decisions that come out of this first document will guide completion of the remaining 11 documents.
2.	Phase 2: Completion of drafts of up to 6 of the remaining documents.
3.	Coordination of usability tests to identify changes that should apply to the remaining documents.
4.	Phase 3: Completion of the full document set. Some functionality may be in a rough draft or ommitted for this stage.
5.	Phase 4: All functionality is implemented. client to review and offer suggestions. Coordinate for second round of usability testing and feedback.
6.	Final phase: based on the final feedback and proposed changes, complete all remaining work. Budget up to 30 hours for this phase.

:::

### Understanding success metrics

Consider success in terms of:

* Time
* Total people helped
* People who can now complete the process who couldn't before

For a commercial project, this directly corresponds to money: either
a reduced fee you can charge a client, or an increased profit, or both.

1. How will we know if the project is successful?
        * Time
                * How much time does the process take now?
                * What time savings (per use) is enough to justify the project?
        * People helped
                * How many people **need** the solution your tool helps with? For example: About 10,000 people are brought to eviction court in Massachusetts each year.
                * How many people would be **enough** to reach? 10%? 30%? More? For example: helping 2,000 of the 10,000 people who are
                evicted represents a significant percentage of the whole even though it is
                a relatively small absolute number.
        * Closing an access gap
                * Who is not **appropriate** to complete the process now due to lack of training or legal specific expertise, but can be after your tool exists?
                        * For example: will your tool allow a social worker to complete the process, whereas before it required a lawyer or paralegal?
                * Who **can't** easily participate in the process now, due to language, reading grade level, complexity, or other barriers?
                * How will your tool reduce or eliminate these barriers?

Think in advance how you will measure success on these criteria. You can use
the [Interview Stats](https://github.com/SuffolkLITLab/docassemble-InterviewStats) package to track usage.
Usability tests, reading grade level measurements, and auditing for best practices may all help you understand how you 
closed the access gap with your tool.

#### Consider a pre-mortem

A [pre-mortem](https://hbr.org/2007/09/performing-a-project-premortem) can be helpful on larger and riskier projects. Pre-mortems are 
a technique that asks participants to imagine a project's failure
in advance, without judgment or blame. Studies show that premortems
can increase the success of projects because they make it easier for
stakeholders to "correctly identify the reasons for future outcomes" by as much as 30%.

Once you have identified the future causes of failure, act to reduce the risks, or
consider whether the project is still worth trying.

### Document the existing process

A legal app is always an **intervention** at a particular
point in a larger and more complex process.

Your app will need to take into account the before and after steps as well as the steps that you automate.

Don't expect to have complete answers to these questions in your first client
interview. But you'll need to know all of the answers at different stages in
your project.

#### Document the user's ultimate goal and any intermediate goals

For example: you may automate an estate plan. The user's
goal is to identify a guardian for their children and to pass on their assets to specific people.

Getting a will or trust is an intermediate goal, not the ultimate success state. Keep the final goal in mind.

#### Identify sources of information

1. What primary law sources and secondary sources are important for this project?
1. Who knows about the current process?
        * Identify experts both within and outside the participating organizations

#### Document the before, during, and after

1. What **steps** in the real world must take place before someone can use your tool?
        * For example: before filing an answer in a court case, the defendant has to have been served a complaint.
1. What **information** will the user need to have ready **before they use** the tool?
        * For example: they may need to look at the complaint, do a diligent search for military status, or more. You can't wait until the middle of your app to tell them this!
1. What information will the user need to provide **when they use** the tool?
        * Roughly classify the kind and number of answers needed using the Jarrett and Gaffney framework, namely:
                * Slot-in, or information the user already knows, like their own name and address
                * Gathered, information the user will look up from a readily available source like a court notice or a government ID
                * Third-party, information the user will get by calling someone or looking it up in a database
                * Created, answers the user will make on the spot
1. What decision points will be made during usage of the tool?
        * What branching logic and follow up questions will be needed?
        * How will this change the output document?
1. What sources are available to consult when they use the tool, manually or automatically? For example:
        * Online court docket
        * Case management systems or CRMs
        * Help pages, glossaries, documentation, and videos?
1. What are the outputs of the tool?
        1. What templates will be automated?
        1. How will the templates be grouped or bundled for different recipients?
        1. Are any documents produced in a mirrored form (for example, for each spouse) or copied for 
           multiple named parties (for example, one per child?)
        1. Will any ancillary documents need to be created that aren't already in existence, like:
                * Addenda for overflow text
                * Affidavits
                * Motions
1. What happens after the user completes the automated steps?
        * How will the document be signed or notarized?
        * How will it be served on the other party, if applicable?
        * How will copies be provided to other parties, such as designated agents, hospitals, or others?
        * How will it be filed in court, if applicable?
        * What does the user need to know about the possible outcomes and decisions that will be made
          based on their document?
1. Should any parts of the process be left **un**-automated?
1. What compliance or regulation needs to be kept in mind?

One approach to this is to interview someone who currently completes the process. Have them pretend
that you are the client and ask questions as they walk you through filling in the form or gathering the information
needed to complete the document.

Interview key stakeholders to get answers. Write down the responses and make your own observations. 
Share your summary with the stakeholders to make sure they agree with your assessment.

## Mark up the templates

Annotate the documents so you know where fields will go. Typically, this 
includes the following:

1. Names of parties or agents, other participants, locations, and organizations
1. Pronouns, quantities, relationships, and titles
1. Language that **depends** on quantity, relationship, or title
1. Dates
1. Dollar figures and financial terms
1. Conditional clauses
1. Signatures

Review the annotated document with the client to check your understanding about what parts of
the document need to be part of the interview. Some information may be static
that you don't expect. Some may need to be dynamic.

Preferences will vary, for example, about whether to make pronouns depend on
the parties named in the document or to use gender neutral language.

## Share drafts early and often for feedback

### Consider using flowcharts, wireframes or low fidelity prototypes to communicate your vision

You can use a tool like:

1. Figma
1. Penpot
1. Flowchart.fun

or even PowerPoint or pen and paper sketches to communicate an early vision
of how the tool will work. This should include key branching logic.

This isn't necessary in every straightforward automation project or if
it would take less time to build a functional basic automation than to 
turn it into a flowchart or wireframes. The [Weaver](https://github.com/SuffolkLITLab/docassemble-ALWeaver) helps reach the prototype stage
early.

### Share examples of the marked up template

Early on, provide the client with your prepared template, ideally with the
Jinja syntax or PDF fields higlighted. This helps make sure you and the client 
both agree about what parts of the document will be automated.

If you rely on the client interactively testing to catch issues with the template,
they may not test a branch that would reveal the problem.

Let the client know the universe of possible choices, such as updating language
for quantity and pronouns.

### Use the translation tool to pull out language from the interview

Once you have built the first version of the interview, you can use the
[ALDashboard](https://github.com/SuffolkLITLab/docassemble-ALDashboard)'s 
"Interview Translation" widget to create an Excel spreadsheet that contains
all of the text in the interview. This can help the subject matter expert review
the written work.

### Have your stakeholders take detailed notes or record their feedback

In some instances, it may be useful to have the stakeholder record themselves
using the tool to capture errors. Make sure that the screen ID is visible in the recording.

A recording may capture irrelevant feedback. If the stakeholder has capacity,
it's more useful for them to write down their feedback.

You should also be ready to use the [ALDashboard's View Answers](https://github.com/SuffolkLITLab/docassemble-ALDashboard) feature
to inspect the stakeholder's interview session and so you can reproduce the inputs
that they made to lead to the unexpected or undesired output.

### Help the stakeholder communicate using marked up documents

If there is a problem in the output document, have the user both:

1. Share the generated document
1. Annotate (e.g., edit with tracked changes or highlight) the corrections

### Ask the stakeholder to directly edit the document for some formatting changes

Sometimes it may be more helpful to ask the stakeholder to directly edit the template
(to make proposed formatting changes that don't directly involve variables) than
to try to interpret their requests.

1. Download the templates from the docassemble package or playground
1. Send the templates to the user in an email, with instructions to ignore anything inside curly brackets
1. When you get the documents back, use Word's "compare documents" feature to make sure
   they didn't accidentally change something they weren't supposed to change
1. Run the edited template through the [ALDashboard's](https://github.com/SuffolkLITLab/docassemble-ALDashboard)
   Validate DOCX Template tool to catch any syntax errors the client introduced.

### Ask the stakeholder to directly edit the language of the interview on GitHub

Sometimes, you can train the stakeholder to make direct edits of the interview's YAML on GitHub and
propose the change as a pull request. This can cut back on issues with understanding
and interpreting feedback, but requires careful review by the developer and a
brave stakeholder.

If you do take this approach, you'll need to set aside time to do a brief training 
for the client. Record yourself walking the client through a simple edit.

Make sure that the client has a firm timeline to make their edits (such as 7 days)
and that you do not need to edit any of the documents at the same time.

### Ask the decision maker to triage feedback

It's generally not useful to get unfiltered feedback from multiple stakeholders.
If you have multiple people contribute feedback, ask the decision maker to triage
it. If they aren't able or willing to triage the feedback, take your own first pass
and come up with structured questions to triage any feedback that:

1. Is contradictory, either of a previous decision or another item of feedback
1. Seems out of the original project vision or scope
1. May take a significant amount of time, perhaps outside of the understood budget
1. Seems to contradict best practices or principles of usability

Ultimately, the client is working with you because they trust your expertise. But they
are the final decision maker. Your job is to counsel and then follow.

## Check in regularly on the project timeline and hourly budget

It's easy to get lost in the refining stage for a project. Pay attention to 
the project milestones, timeline, and budget. This may mean having to make
choices about optional features that don't directly advance the project goals.

The project manager should help communicate the status of the deadlines and budget
at the regular check-in meetings. It's normal for the scope to change over the life
of the project. Early, clear communication is needed to prevent this causing
problems.

In addition to synchronous meetings, some projects will benefit from weekly status
updates by email, Slack or Teams.

## Your first meeting with the client

:::tip A sample agenda and script for the first meeting from the developer's perspective

1. Introductions
1. What automation is and what it can do:
        * It's not just fill in the blank
        * We can follow rules, apply grammar, and possibly use generative AI where rules aren't enough
        * Explain the tradeoffs between features and cost or timeline, the maturity model and how it relates to the expected user
                * E.g., targeting level 1-2 for internal tools, and 2-3 for most external facing projects, rarity of level 4
1. Explain the expected timeline.
1. Explain what a minimum viable product is, and why we may share early, rough drafts for feedback.
        * Marked up template
        * Flowcharts
        * A very rough runnable prototype
1. Confirm who the expected user is:
        * Attorney
        * Paralegal
        * Social worker or helper (repeat user)
        * Client (single or repeat user)
1. Confirm the scope:
        * Which documents will we produce, and in what combinations?
        * Where will the information need to go after it is input by the user?
1. Establish communication methods and frequencies
1. What are your goals for this project?
1. How will you know if the project succeeded?
1. Sometimes we will need decisions about options, contradictory feedback, features that change the scope, and timelines. Who will be the decision makers on these points?
1. How do you expect to handle gathering feedback and sharing it with us?
1. What else do you think we need to know before we get started?
1. What questions do you have for our team right now?
1. Schedule an interview with the subject matter expert to get more detailed information about the process, potentially walking through as if we are the client.
1. Schedule initial document markup review and review of any flowcharts or wireframes.
1. Schedule the next standup meetings.

:::