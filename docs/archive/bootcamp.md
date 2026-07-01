---
id: bootcamp
title: Suffolk LIT Lab's Document Assembly Line Bootcamp
sidebar_label: Bootcamp
slug: bootcamp
---

:::info
This page is about the bootcamp that we ran from February 18th, 2021 to March 11th, 2021. Although the camp is already finished, you can
follow along yourself using the resources on this page!
:::

## Goals

This bootcamp aims to bring you up to speed on the Document Assembly Line project. It will do this by helping you start to automate a form of your choosing and introducing you to a number of Assembly Line tools and practices. By the end of the bootcamp, you should feel comfortable participating in discussions with other members of the team about your work and how to troubleshoot issues you are facing.

## Meeting times

Thursdays @ 11am-1pm Eastern: February 18th, February 25th, March 4th, and March 11th, 2021.

Each bootcamp meeting will be at [this Zoom link](https://suffolk.zoom.us/j/96015143827). If you signed up at the link above, you should have received the Zoom link and the password in a calendar invite. If you haven't received an invite or you haven't signed up, email "mass access at suffolk dot edu."

If you are finding this page after February 18th, 2021, be sure to watch the videos for past sessions below before joining the next live session.

## Outline of course

### Week 0

Read:

1. If you are unfamiliar with the Assembly Line project, please give the [intro page](../get_started) a look
1. Read over this short [introduction to docassemble](../docassemble_intro/introduction-to-docassemble)
1. And if you want more context, consider reading [what should you use docassemble for?](../docassemble_intro/practical-guide-docassemble)

Do:

After signing up, you should have received invites to our docassemble server (https://apps-dev.suffolklitlab.org) and [our MS TEAMS group](https://teams.microsoft.com/l/channel/19%3a143ac652e7f1494aacda1f6793b21ccc%40thread.tacv2/bootcamp?groupId=eaa9bd9d-cf39-4686-8f30-e55aa9d98c75&tenantId=78733fa9-540e-4eb8-bf29-73c4eeb63412).

1. Confirm that you can access the docassemble server and your developer account at https://apps-dev.suffolklitlab.org
1. Confirm that you can access the [Suffolk LIT Lab Teams group](https://teams.microsoft.com/l/channel/19%3a143ac652e7f1494aacda1f6793b21ccc%40thread.tacv2/bootcamp?groupId=eaa9bd9d-cf39-4686-8f30-e55aa9d98c75&tenantId=78733fa9-540e-4eb8-bf29-73c4eeb63412)
1. **Optional:** Work through this [Hello, World](../docassemble_intro/hello-world) exercise making use of your developer account. NOTE: this may be challenging for those of you without prior programing experience. You will **NOT** be behind if you can't do it all on your own. Use the [#coding-help](https://teams.microsoft.com/l/channel/19%3ae16e9e9701a5445ea4035b5cb776a4cc%40thread.tacv2/coding-help?groupId=eaa9bd9d-cf39-4686-8f30-e55aa9d98c75&tenantId=78733fa9-540e-4eb8-bf29-73c4eeb63412) channel on Teams if you are stuck and want help.

### Week 1: Introduction and getting started using the Assembly Line interview Weaver, 2/18/2021

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/SILuBSKWoaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Resources from the session:

* [Running templates through the Weaver](../authoring/weaver_overview.md)
* [Labeling PDF variables](../authoring/pdf_templates.md)
* [Naming Variables Quick Reference](../authoring/doc_vars_reference.md)
* [The LIST taxonomy](https://taxonomy.legal/)

Homework:

* Label and run your own PDF or Word file through the Weaver

### Week 2: Using Trello, Editing your interview file. 2/25/2021

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Nn_ciny-xWo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

* Explaining the Trello boards and checklists
    * [Pre-processing](https://trello.com/b/TLXUvTFb/1-assembly-line-bootcamp-pre-processing)
    * [Development](https://trello.com/b/kciaTOph/2-assembly-line-bootcamp-development)
    * [Testing](https://trello.com/b/om3C3Iy6/3-assembly-line-bootcamp-testing)
* Editing your interview file
    * Reordering questions
    * Adding basic logic
    * Using and modifying question types
    * Using radio buttons and checkboxes
* Practice time and live help in breakout rooms
* Create your Github account

Homework: create a Github organization. Work on your forms and come with
additional questions.

### Week 3: Using Github, Customizing Branding. 3/4/2021

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/VAzXYEacN78" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

* [Using Github in docassemble](../authoring/github.md)
* Customizing basic branding with the [ALThemeTemplate](https://github.com/SuffolkLITLab/docassemble-ALThemeTemplate) package.
    * Logo
    * Intro screen
    * Pushing changes to Github

### Week 4: Advanced docassemble, Installing the backend

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/-YtGtVI79dY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

* Here's the [video on setting up your own docassemble server](https://www.youtube.com/watch?v=JXdOCLMFPHc) 
* [docassemble-ALThemeTemplate](https://github.com/SuffolkLITLab/docassemble-ALThemeTemplate) package
* Introduction to the docassemble.Income class
* Working with tables and repeated data
* How to install the Assembly Line packages on your docassemble server
* How to install individual packages on your docassemble server
    * Creating short links
    * The index page

A list of the packages we installed:

You can install from either PyPI or from Github. PyPI will handle installing
related packages and is slightly simpler. Installing from Github will always get
you the latest "bleeding edge" version.

Purpose | On PyPI | On Github
--------|---------|-------------
Weaver (for creating interviews) | [docassemble.ALWeaver](https://pypi.org/project/docassemble.ALWeaver/) | https://github.com/SuffolkLITLab/docassemble-ALWeaver
Basic runtime | [docassemble.AssemblyLine](https://pypi.org/project/docassemble.AssemblyLine/) | https://github.com/SuffolkLITLab/docassemble-AssemblyLine
Massachusetts-specific runtime code | [docassemble.MassAccess](https://pypi.org/project/docassemble.MassAccess/) | https://github.com/SuffolkLITLab/docassemble-MassAccess, https://github.com/SuffolkLITLab/docassemble-ALMassachusetts (must install separately if you install from Github)
Optional "toolbox"/helper functions | [docassemble.ALToolbox](https://pypi.org/project/docassemble.ALToolbox/) | https://github.com/SuffolkLITLab/docassemble-ALToolbox
Income gathering functionality | [docassemble.income](https://pypi.org/project/docassemble.income/) | https://github.com/GBLS/docassemble-income
Customizable starting point for your jurisdiction | * | https://github.com/SuffolkLITLab/docassemble-ALThemeTemplate
