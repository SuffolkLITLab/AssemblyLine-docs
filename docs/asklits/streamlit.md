---
id: streamlit
title: "Deprecated: Streamlit Scaffolder"
sidebar_label: "Deprecated: Streamlit"
description: Legacy reference for existing standalone Streamlit AskLIT projects.
---

# Deprecated: Streamlit Scaffolder

:::warning Deprecated workflow

The standalone Streamlit Scaffolder workflow is deprecated in this documentation.
For new work, use [AskLit Studio](https://asklit.suffolklitlab.org) and the
[Studio walkthrough](./studio). Keep this page as a reference for existing projects;
the legacy workflow may be removed from the documentation later.

:::

## Existing projects

The Scaffolder has **Knowledge**, **Prompt**, **Chat**, **Evaluate**, and **Export**
screens. Upload and index source files in Knowledge, connect them to a prompt,
write and test instructions in Prompt and Chat, and use Evaluate for repeatable
scenarios. Save a workspace YAML and evaluation results separately: evaluation
scenarios and runs are not included in the exported chatbot. Some installations
require a shared password for model calls.

Existing standalone apps and their repositories are independent of Studio.
Publishing in Studio does not update a Streamlit deployment, and updating a
Streamlit app does not update Studio. Keep your source files, workspace, and
credentials according to your organization's policies.

To move a project to Studio, create an AskLit and use **Settings → Export → Import
workspace** on an empty AskLit if you have a compatible workspace YAML. Reupload
source documents, then check prompts, knowledge bases, model settings,
access, and behavior before publishing. Import does not bring server credentials;
review the result rather than assuming the two deployments are synchronized. See
[Studio export and recovery](./studio#export-and-recovery).

## Export and deploy an existing project

In **Export**, review the app title, welcome message, model, access, branding,
prompts, and knowledge bases. Prepare a ZIP or use **Connect to GitHub** and the
device-code authorization flow to push a repository. A public repository exposes
its bundled source documents.

For Streamlit Community Cloud, create an app from the repository, choose the
branch and `app.py` as the main file, and configure model credentials in the
private **Secrets** settings before deploying. The Scaffolder's administrative
credentials are not exported. Do not place keys in prompts, source files, or
public repositories. After deployment, test a question that requires retrieval.
The repository and deployment are managed through their owners' accounts.

The older [Clinical Skills Gallery](https://asklit-clinical-skills-gallery-5hokdmbr8cbcyztuvkeaty.streamlit.app/)
and its [source repository](https://github.com/nonprofittechy/asklit-clinical-skills-gallery)
illustrate three legacy prompt profiles: a haiku helper, a fictional lease reviewer,
and a fictional client interview. Use approved, nonconfidential materials when
adapting an example.
