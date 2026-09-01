---
id: github
title: Using GitHub with docassemble
sidebar_label: "Using GitHub"
slug: github
---

We strongly recommend using [GitHub](https://github.com/) with docassemble.

GitHub is a version control system. It lets you save a snapshot of your interview that you can revert to an earlier version if you need to and see changes over time. GitHub also makes it easier to build interviews with a team, get help, and hand off your code to future interview builders and maintainers.

Here are some more reasons to use GitHub with docassemble:

* Save versions of the interview code you are working on so you can back up to an earlier version/save point if new edits break something
* Collaborate with others to build docassemble interviews, get help, and hand off your code to future interview builders and maintainers
* Share your code with others who might want to build similar interviews
* Create branches to work on specific issues, or create multiple branches to keep different issues isolated from each other while you work on them
* Track and discuss issues with your code, like tasks, bugs, feature requests, etc. Issues can be assigned, tagged, and attached to commits and pull requests that complete or fix them.
* Use projects to gather issues from multiple repositories and organize them on a Kanban-style project board

:::info
This page covers how to use GitHub with docassemble. Refer to the [GitHub documentation](https://docs.github.com/en) if you see unfamiliar vocabulary or have questions about its features.
:::

## Workflow

Here is what we recommend for a workflow for using GitHub with the docassemble playground. Repeat these steps each time you start working on a new task or issue:

1. Create a new project in your docassemble playground. Give it a name that describes the work to be done, then pull the **main** branch of your interview from GitHub into the project.
2. When you make your first commit from the new project, [commit to a new branch](#commit-your-code)
3. When you finish working on the branch, commit it one last time, then go to the repository in GitHub and [create a pull request](#pull-requests). If you are working with someone on the interview, request a review from them.
4. Once you have resolved any conflicts and any reviewers have signed off, merge the pull request and delete the branch
5. Delete the docassemble playground project
6. Decide on the next task or issue you want to work on and start over at #1

We also shared this workflow in a Document Assembly Line workshop:

<p align="center">
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/4j7rRRvsbfY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

:::info Workshop Resource
📺 **First Wednesday Workshop:** For comprehensive coverage of GitHub workflows with docassemble, watch our workshop on [The GitHub-docassemble workflow](https://suffolklitlab.org/github-docassemble-workflow/). This session includes live demonstrations of branching, merging, and team development workflows specifically designed for docassemble interview building.
:::

## Collaboration

GitHub is built for collaboration, and tips for collaborating are included throughout this page, but here are some key highlights:

* Use issues to identify the work to be done
* Work on one issue (or group of issues related to the same code) at a time, and commit your work in progress to a branch
* Keep your branches "small"—change just one section of code at a time
* Use pull requests to merge completed branches back into **main**
* Have a collaborator [review](#review-pull-requests) your pull requests
* Delete branches and playground projects after merging a pull request

And here are some things to avoid:

* Avoid multiple people working on the same code at the same time, which tends to create merge conflicts
* Avoid using forks, because docassemble does not handle pull requests from forks very well

## How to

### Set up the GitHub integration

In order to use GitHub with docassemble you will need two things:

1. Developer privileges on a docassemble development server with the [GitHub integration configured](https://docassemble.org/docs/installation.html#github). (If you don't have access to a docassemble development server, [contact us](mailto:litlab@suffolk.edu).)
2. A [GitHub](https://github.com/) account. If this is a new account, you may want to [keep your email address private](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address#setting-your-commit-email-address-on-github) and [avoid sharing your email address on commits](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/blocking-command-line-pushes-that-expose-your-personal-email-address).

### Publish your interview to GitHub

The first time you [commit](#commit-your-code) a new interview from the docassemble playground, it will create a new repository in your GitHub account.

:::warning[Check the package name before committing]
The first time you commit an interview to GitHub, the package name will become part of the GitHub repository name and URL, and it is difficult to change later on. Use our [package naming guidelines](naming#docassemble-projects-and-packages).
:::

Follow the [docassemble instructions for publishing an interview package to GitHub](https://docassemble.org/docs/packages.html#github). This will create a repository in your personal GitHub account.

After you have created the repository, follow [these GitHub instructions to transfer it to your organization](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository). (You must be a member of the organization and have permission to create a repository in the organization.)

### Pull a GitHub repository to the playground

1. Make a new project in the docassemble playground[^old-project-warning]
2. In the new project, click on the **Folders** menu and select **Packages**
3. Click the **Pull** button[^github-integration-necessary]
4. Paste the repository URL into the **GitHub URL** field
5. Select the branch you want to work on—usually **main**
6. Click the **Pull** button

[^github-integration-necessary]: You must have already [set up the GitHub integration](#set-up-the-github-integration).

[^old-project-warning]: **Always pull to a newly created project.** When you pull a GitHub repository to a playground project, the files in the repository will overwrite any files with the same name in your project **without warning**. You can lose work from this, and it can cause merge conflicts and other problems. To avoid these problems, always create a new project instead of pulling to an existing project.'

### Use issues

In GitHub, **[issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)** are flexible items for planning, discussing, and tracking your work when building interviews. Issues are one of our primary tools for building and maintaining interviews. Discussions on issues can be especially useful for anyone who may work on the interview in the future—including you.

[Create an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue) for:

* Tasks
* Bugs
* Questions
* Features
* Ideas
* Documentation
* Etc.

You can also [close issues in commit messages and pull request descriptions](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

### Use branches {#branches}

As a general rule, avoid committing to **main**—the default branch. Instead, update **main** with pull requests from other branches. (You can require this by [protecting your repository](#protect-repo).)

Using branches and pull requests instead of committing directly to **main** creates a cleaner record of changes over time and is the key to building interviews as part of a team.

Use branches to isolate the feature, bug, or other issue you are working on. Commit to the branch as you edit, and then when you are finished making your changes, [create a pull request](#pull-requests) to merge the branch into **main**.

:::warning[Don't use sub-branches]
It's best to avoid creating branches from branches other than **main**. Sub-branches tend to make merge conflicts more likely.
:::

#### Naming branches

Name the branch for the issue you are working on. Branch names should be descriptive, unique, and in [snake case](naming#snake_case). One easy way to make the branch name unique is to include the issue or partial date.

For example:

* **78_update_review_screen** (Issue #78 calls for updating the review screen.)
* **2024_01_update_court_form** (Including the year and month makes the branch name more specific.)

Names like these make it easier to tell what issues you (or your teammates) are working on from the list of active branches.

### Commit your code

A commit is a save point. It saves your progress and creates a snapshot of the current state of your interview code. It also helps you find old, working code when something breaks or you need to track down a bug.

GitHub can't help you if you don't use it, so **commit early and often**!

1. In the docassemble playground, click on the **Folders** menu and select **Packages**
2. On the **Packages** screen, review the following fields and update them if necessary:
   1. **Author name and email.** These will be included in the public README file. Consider using your organization's name and email, instead.
   2. **Description.** Change the default to something that actually describes the interview. For example: "A docassemble interview for a Massachusetts 209A Protection from Abuse Order."
   3. **URL.** If the interview is live, use the landing-page URL. Learn more about [creating effective landing pages](../get_started/landing_pages.md).
   4. **Interview, template, static, and source files.** Only selected files will be uploaded to GitHub. (Hold Control on Windows or Command on macOS while you click to select multiple files.)
   5. **README.** Add information for future developers.
3. Scroll to the bottom of the page and click on the **GitHub** button
4. Select the branch you want to commit to and enter a commit message that describes the change you just made to the interview code
5. **Do not** click the **Install package on this server also** checkbox
6. Click the **Commit** button

That's it! Your commit should show up on GitHub! (If you get an error, check [these troubleshooting tips](#troubleshooting-commit-errors).)

:::tip
When you first start working with docassemble it can be hard to remember to stop and commit. Try creating a daily reminder on your phone.
:::

You can commit to a branch as often as you want. Developers often wait to commit code until they have it working, but they also might commit broken code so other people can help them troubleshoot, or to save their progress. If you are concerned about ruining working code, make a new branch for the broken code and commit it to that branch.

#### Commit messages

Take a moment to consider your commit message. Make it descriptive so you (or someone reviewing your commits) can reconstruct the work you did. This is especially helpful when your interview is broken and you need to find working code from a previous commit.

Here are some example commit messages:

  * Update cash income question
  * Fix broken address field
  * Update e-filing codes
  * Update interview version

### Create a pull request {#pull-requests}

Refer to the [GitHub documentation for how to create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

Pull request titles should be a summary of the purpose of your changes. They are usually more detailed than the branch name.

Pull request descriptions should provide context, [mention related issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#about-linked-issues-and-pull-requests), and generally explain the reason for the change.

Here are some good pull request examples:

* [Fix ordering of sections](https://github.com/SuffolkLITLab/docassemble-MATCSmallClaims/pull/106) (SuffolkLITLab/docassemble-MATCSmallClaims)
* [Basic background assembly implementation](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/pull/890) (SuffolkLITLab/docassemble-AssemblyLine)
* [Add some safety for missing metadata that was causing build errors](https://github.com/SuffolkLITLab/courtformsonline.org/pull/108) (SuffolkLITLab/courtformsonline.org)

This helps anyone reviewing your changes—now or in the future.

### Resolve conflicts

Merge conflicts happen to all of us. Refer to the [GitHub documentation on resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github).

:::tip
To reduce merge conflicts:

1. Keep the goals of your branches "small" so there are fewer changes that can conflict with each other.
2. Merge pull requests in the order they were made.
3. Communicate with your team in order to avoid working on the same sections of code at the same time.
4. Avoid making change that are unrelated to your current goal.

You can also [compare commits, branches, etc.](https://docs.github.com/en/github/committing-changes-to-your-project/comparing-commits) in GitHub at any time to see changes more clearly.
:::

### Review pull requests {#review-pull-requests}

When someone assigns you to review a pull request (PR), you will be able to see it in [your GitHub notifications](https://github.com/notifications). Don't let these requests sit around too long, or you increase the likelihood of [merge conflicts](#resolve-conflicts).

The requester should have left notes on what needs to be tested in the description of the pull request.

1. Pull the code into the a new playground project.
2. Test the change(s) made in the pull request.
3. If it does not do what it is supposed to do, leave a comment asking for changes.
4. If the new code does what it is supposed to do, approve the changes and then you or the PR submitter can merge the PR and delete the branch.

:::tip
You can [make comments connected to specific lines of code](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/commenting-on-a-pull-request#adding-comments-to-a-pull-request). This is often helpful when reviewing PRs.
:::

Then, delete the playground project you created for the review.

### Protect your interview repository {#protect-repo}

It is a good idea to add some basic protections to your interview repository.

1. On GitHub, go to the repository, then click on the **Settings** tab
2. In the sidebar, click on **Rules** / **Rulesets**
3. Click the **New ruleset** button and select either:
   1. **New branch ruleset** to manually select options, or
   2. **Import a ruleset** to upload a JSON file like [our example ruleset](../assets/Protect.repo.json)

We recommend targeting the **main** branch and enabling these rules:

* **Restrict deletions.** Restricts deleting repository contents to organization admins.
* **Require a pull request before merging.** Prevents committing directly to **main**. Also, require at least one reviewer to approve the pull request.
* **Block force pushes.** Prevents forcing commits, which can cause lost work.

(The example ruleset includes these options.)

### Rename an interview repository

Changing the name of an interview repository is a multi-step process. For an example, here are the steps to rename **docassemble-OldName** to **docassemble-NewName**:

1. In GitHub, go the repository settings and change the name of the repository in the **General** settings using the **Repository name** field.
2. Clone the repository to your computer (using [GitHub Desktop](https://desktop.github.com/download/), for example).
3. In setup.py in the repository's root directory, search and replace "OldName" with "NewName".
4. Inside the **docassemble** folder, rename the interview folder from **OldName** to **NewName**.

Then you can pull the renamed repository to the docassemble playground.

## Troubleshooting errors when committing from docassemble {#troubleshooting-commit-errors}

When you get an error committing from docassemble, it means docassemble was unable to change anything on GitHub. One of three things is probably going on.

1. You have technically not made any changes to the code that is actually being pushed to GitHub.
2. You lack [permissions for the repository](https://docs.github.com/en/github/getting-started-with-github/access-permissions-on-github) you are trying to commit to.
3. There is a [merge conflict to resolve](#resolve-conflicts).

Scroll to the bottom of the page to see the details of the error. These are a step-by-step log of what is happening in git, the version-control system GitHub uses. The most recent message is at the bottom. (Ignore the line talking about a `Detached head`. That is actually a natural intermediate part of the process, not a problem.)

Here are details about the three problems above, how you can identify them, and possible solutions.

#### If you see `nothing to commit, working tree clean`

This means git cannot detect any changes in your code. You cannot commit anything from docassemble if you have not made changes—not even to a new branch. These are some possibilities:

* If you created a new file you may have not added it to your playground package. Select **Folder** / **Packages** and scroll down to the **Interview files** and **Template files** sections. Use Command (⌘)+click on a Mac and Ctrl+click on Windows to select the files you want to commit to the repository.
* You may not have saved changes to a file. If the file is still open you can click the **Save** button. If the file is closed you will have to open it and make the changes again.
* You may not actually have made any changes to the files even though you thought you did.

#### If you see `403`

A [**403** error](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) means you do not have **write** permission for the repository. Ask the person or organization that owns it to give you permission or add you to a team that has permission.

If you are trying to make a new repository on your GitHub account, you may belong to an organization that already has a  repository with the same name. You will either have to change the name, have the organization delete its repository, or get permission to write to the existing repository.

If you think your GitHub account does have permission, try [redoing the GitHub integration](https://docassemble.org/docs/installation.html#github).

#### If you see `CONFLICT (content): Merge conflict`

The text `CONFLICT (content): Merge conflict` means the branch you are trying to push to changed while you were making your changes. It is what a [merge conflict](#resolve-conflicts) looks like in docassemble in git. Simply make a new branch and commit the changes there. Work out the merge conflicts afterwards.

## Automated quality checks in GitHub

Once your repository is on GitHub, you can enable continuous automated testing and quality checks using **[SuffolkLITLab/ALActions](../automated_quality_checks/github_actions.md)**.

Whenever a pull request is created or code is pushed:
- **[`da_build`](../automated_quality_checks/github_actions.md#da_build)** builds the package, checks Python syntax, runs [`dayamlchecker`](../automated_quality_checks/dayamlchecker.md) on interview YAML files, checks external URLs for 404s, and audits PDF templates with **veraPDF** for PDF/UA-1 accessibility.
- **[`valid_jinja2`](../automated_quality_checks/github_actions.md#valid_jinja2)** validates all modified `.docx` Jinja2 templates for syntax errors and recognized filters.
- **[`word_diff`](../automated_quality_checks/github_actions.md#word_diff)** converts changed `.docx` templates into side-by-side visual diffs for instant review in GitHub.
- **[`black-formatting`](../automated_quality_checks/github_actions.md#black-formatting)** and **[`docsig`](../automated_quality_checks/github_actions.md#docsig)** enforce Python code style and docstrings.

Learn more in our **[Automated quality checks overview](../automated_quality_checks/overview.md)**, **[Running checks before pushing to GitHub](../automated_quality_checks/running_checks_locally.md)**, and **[Navigating logs and artifacts](../automated_quality_checks/navigating_logs_and_artifacts.md)** guides.