---
id: intro
title: The Document Assembly Line
sidebar_label: Introduction
slug: /get_started
---

The Document Assembly Line helps people build open-source access-to-justice tools and resources for court forms, online guided interviews, and e-filing. We also provide affordable docassemble hosting and e-filing tools for courts and legal aid organizations.

The Document Assembly Line is supported by the [Legal Innovation and Technology Lab (LIT Lab)](https://suffolklitlab.org/) at [Suffolk University Law School](https://www.suffolk.edu/law/) and a community of courts, orgs, and volunteers. [Our community goals and practices](/docs/get_started/community_practices.md) describe the collaborative environment we aim to foster.

## Background

:::info
[Get our one-page, printable overview of the Document Assembly Line.](https://onepagers.suffolklitlab.org/overview/)
:::

This short, 3-minute video by David Colarusso and Quinten Steenhuis explains how the Document Assembly Line was born from a large-scale international pandemic collaboration:

<p align="center">
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/y7Bwk9g8H7g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

The LIT Lab gathered more than 200 volunteers from around the world with the goal of making it easier to build online guided interviews with docassemble. The initial tools included:

* The core [AssemblyLine tools](https://github.com/SuffolkLITLab/docassemble-AssemblyLine), to make it easier to use key docassemble features
* The [the Weaver](../authoring/weaver_overview.md), a tool for converting existing PDF and DOCX court forms into draft docassemble interviews in as little as one hour
* A [question library](../style_guide/question_library/names.md) of pre-built, commonly used, accessible questions, vetted by experts and translated into at least 5 languages
* An [open-source, non-profit e-filing service provider (EFSP)](components/EFSPIntegration/efsp_overview.md) for integrating docassemble interviews with e-filing management systems
* A [style guide](../style_guide/question_style_overview.md) for interview questions that are easy to read and answer

The Document Assembly Line has evolved into a community of courts and legal aid organizations building online guided interviews using docassemble and the AssemblyLine tools.

We continue to update and expand the AssemblyLine tools and resources. In 2024, we also began offering affordable docassemble hosting and e-filing tools for courts and legal aid organizations.

## See the Document Assembly Line in action

You can see online guided interviews from the community, Suffolk Law students, and others at [Court Forms Online](https://courtformsonline.org/). Court Forms Online aggregates online guided interviews in one place, helps people find the right tool for their legal problem, and links to more resources.

Our e-filing tools are a little harder to see in action, but we'd be happen to do a demo if you [email us](mailto:litlab@suffolk.edu).

docassemble and the Document Assembly Line tools are open source, so courts and orgs can use them with confidence that the underlying software will be free to use, forever, with no vendor lock-in. Instead, we are building digital public infrastructure together.

If you want to try building an interview with docassemble and the Document Assembly Line tools, follow our [beginner's guide](beginners_guide.md).

## Join the community {#join-the-community}

The Document Assembly Line community is free to join and open to courts, legal aid organizations, and anyone else interested in building online guided interviews with docassemble and the Document Assembly Line Tools.

We offer:

* **Weekly community check-ins.** We meet every Monday to share knowledge and troubleshoot problems
* **Community forum.** We also offer support through our online forum in Microsoft Teams
* **Monthly workshops.** We host [monthly online workshops](https://suffolklitlab.org/tag/first-wednesday-workshops/) where we go in-depth on topics requested by the community

To join the community, just [email us](mailto:litlab@suffolk.edu)!

## Get involved/support our work

- We offer affordable docassemble hosting and e-filing tools for courts and legal aid organizations. Interested? [Email us!](mailto:litlab@suffolk.edu)
- We need [volunteers](/docs/volunteer/volunteer.mdx) to help update, test, and translate interviews. We also need volunteers to help us organize volunteers.
- We also accept [donations](https://www.givecampus.com/campaigns/70271/donations/new) to help us continue developing these free and open-source tools.

## Our code

All code generated as part of this project is available for free [on GitHub](https://github.com/SuffolkLITLab) under the [MIT license](https://opensource.org/license/mit).

### docassemble interview-building tools

* [The core AssemblyLine package](https://github.com/SuffolkLITLab/docassemble-AssemblyLine) contains runtime code and shared questions for interviews.
* [ALWeaver](https://github.com/SuffolkLITLab/docassemble-ALWeaver) is a tool for
  rapidly generating interviews from marked-up court form PDF and DOCX templates.
* [ALToolbox](https://github.com/SuffolkLITLab/docassemble-ALToolbox) contains functions and components that might benefit docassemble developers whether or not they choose not to install the full Document Assembly Line toolbox.
* [ALRecipes](https://github.com/SuffolkLITLab/docassemble-ALRecipes) examples and snippets that use Assembly Line features or demonstrate best practices. Can be included directly in the docassemble Playground to supplement the list of Playground examples.
* [PovertyScale](https://github.com/SuffolkLITLab/docassemble-PovertyScale) which contains a Python library, docassemble code, static JSON and a REST server for determining income qualification based on the [United States Federal Poverty Scale](https://web.archive.org/web/20250528044709/http://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines), updated on an annual basis.
* [GithubFeedbackForm](https://github.com/SuffolkLITLab/docassemble-GithubFeedbackForm) helps docassemble authors collect feedback from users and generate GitHub issues.

### docassemble server tools

* [ALDashboard](https://github.com/SuffolkLITLab/docassemble-ALDashboard) is a Document Assembly Line–independent tool that makes it easier to maintain a docassemble server.
* [InterviewStats](https://github.com/SuffolkLITLab/docassemble-InterviewStats/) for gathering usage analytics.

### E-filing

* [EFSP Integration](https://github.com/SuffolkLITLab/docassemble-EFSPIntegration/) is a Python and docassemble frontend for Suffolk Law School's electronic filing Java server.
* [EFileProxyServer](https://github.com/SuffolkLITLab/EfileProxyServer) is a Java-based REST server that provides a simplified interface to [Tyler EFMs](https://www.tylertech.com/products/odyssey/file-serve), as well as an interface to JeffNet, the home-brew efiling server run by Jefferson Parish, Louisiana.
* [LITEfile](https://github.com/SuffolkLITLab/LITEFile) is a standalone e-filing tool built for self-represented litigants