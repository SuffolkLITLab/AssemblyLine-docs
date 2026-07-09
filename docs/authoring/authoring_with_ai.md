---
id: authoring_with_ai
title: Coding with AI assistance
sidebar_label: Coding with AI assistance
slug: authoring_with_ai
---

Here's an experimental workflow for using AI assistance to generate docassemble interviews,
while leveraging the Assembly Line framework's predictable, rules-based assistance
at every stage where it can be helpful.

For API-first workflows, see:

- [Use MCP and REST endpoints for AI-assisted coding](ai_mcp_and_rest.md)
- [AI checklist: project setup and context](ai_checklist_project_setup.md)
- [AI checklist: field labeling](ai_checklist_field_labeling.md)
- [AI checklist: Weaver generation and interview editing](ai_checklist_weaver_editing.md)
- [AI checklist: quality checks and publishing](ai_checklist_quality_publish.md)

You can follow these instructions with any AI coding assistant: one that runs in
a local code editor is best in order to run the different pieces. You might use:

* GitHub Copilot with VS Code, free for students, faculty, and staff at universities and only $10/month.
* OpenAI Codex, which is included with a ChatGPT+ subscription ($20/month).
* Google Gemini or Google's Antigravity, which has a modest free tier (might not be enough to develop a full docassemble app).
* Claude Code, which also has a $20/month tier.

In fact, you might be able to point your AI agent at this page and have it follow these
instructions. You just need:

a. Install all of the build dependencies for docassemble as well as packages that might
be needed to run FormFyxer

```bash
sudo apt install -y \
    build-essential \
    gcc g++ make \
    ghostscript qpdf \
    tesseract-ocr tesseract-ocr-eng tesseract-ocr-spa \
    poppler-utils \
    libqpdf-dev libjpeg-dev zlib1g-dev \
    libtiff5 libtiff5-dev \
    libleptonica-dev \
    libpng-dev \
    libwebp-dev \
    libopenjp2-7 libopenjp2-7-dev \
    libzbar0 libzbar-dev \
    pngquant unpaper \
    jbig2enc
```

b. Enable web access for your AI coding assistant of choice. For OpenAI Codex, edit ~/.codex/config.toml and add these lines:

```toml
# At the top of the config file
web_search = "live"

# remaining lines ...

# at end of file
[sandbox_workspace_write]
network_access = true
```

c. Pip install `docassemblecli`, then run `dacreate [your form name, in CamelCase and with state prefix]`. 
    * Change into this directory
    * Run `git init` to make this directory a git repository
    * start your AI assistant.

Your AI agent can probably follow the remaining steps:

d. Download the PDF or DOCX file (specify the URL to the file at least) into the data/templates folder.
e. Create a Python virtual environment
f. `git checkout` these two repositories: `git@github.com:SuffolkLITLab/FormFyxer.git` and `https://github.com/suffolkLITLab/docassemble-ALWeaver` (at this writing, you need to checkout the branch `558-use-as-package`)
g. Install all the Python packages in `~/FormFyxer/requirements.txt` and `~/docassemble-ALWeaver/docassemble/ALWeaver/requirements.txt`

## Overview of the remaining AI workflow

1. Task AI with reading the website and getting context about the form
1. Scan the form. Use the FormFyxer repo to automatically label the various fields; optionally, if you have a .env with an `OPENAI_API_KEY=proj-...` defined, you should start out with pretty 
good labels, but you'll be using the API key instead of your coding agent, for a small extra cost.
1. Use your AI's local tools to read through the field labels and make sure they are fully compliant with [Field labels to use](doc_vars_reference.md). Rename if not.
    * You as the human probably need to review at this stage. You can prompt the AI to fix
      the labels though. A common issue is not identifying the `users` and `other_parties` correctly.
1. Create a draft interview using the `ALWeaver` repository. You should be able to run it as a python module. Use the `interview_generator.py` and the `generate_interview_from_path()` function.
1. Use the AI to read through the generated YAML. Rename field labels, add context, sort into more logical screens.
1. Read over the generated YAML. Pay special attention to AssemblyLine conventions, like using `address_fields`, `name_fields`. Re-prompt the AI to fix anything it got wrong.
1. Create a new repository on Github.com and follow the instructions to connect your local git repo.

More details about each stage, hopefully AI friendly, are below.


## Research phase

Confirm high quality sources of information that explain how to use the form. If you can,
find one web page that has all of the information you need.

## Project setup (dacreate)

- [ ] Create a new package skeleton with `dacreate`.
- [ ] Fill in package name, author, and short title consistently with your form title.
- [ ] Confirm the generated structure includes `docassemble/<PackageName>/data/questions` and `docassemble/<PackageName>/data/templates`.

Reference:
```
https://docassemble.org/docs/packages.html#creating
```

## Relabel the PDF fields (AssemblyLine conventions)

Goal: get the PDF fields to match the variable names you want in YAML.

- [ ] Open the PDF in a form editor or use FormFyxer to inspect and rename fields.
- [ ] Use AssemblyLine variable conventions (e.g., `users1_name`, `children1_birthdate`).
- [ ] Use contextual date names instead of `day/month/year`.
- [ ] If you need multiple checkboxes for a single choice, split radio groups into separate checkbox fields.

References:
```
https://assemblyline.suffolklitlab.org/docs/authoring/label_variables
```

## Generate a Weaver draft interview

Goal: create a first-pass YAML and docx package using the renamed PDF.

- [ ] Place the renamed PDF in `data/templates/`.
- [ ] Use `generate_interview_from_path` in `docassemble-ALWeaver` to produce a draft YAML and supporting files.
- [ ] Copy the generated YAML into `data/questions/`.
- [ ] Copy any generated DOCX (e.g., next-steps template) into `data/templates/`.

Notes:
- This step is a starting point. Expect to edit the YAML for content, flow, and alignment with legal guidance.

Reference (ALWeaver entry point):
```
/home/quinten/docassemble-ALWeaver/interview_generator.py
```

## Import relevant files into the package

- [ ] Confirm YAML is under `docassemble/<PackageName>/data/questions/`.
- [ ] Confirm PDF and DOCX templates are under `docassemble/<PackageName>/data/templates/`.
- [ ] Ensure any files referenced in `attachment:` blocks exist and match filenames exactly.
- [ ] If you replaced the PDF, update the `pdf template file` field in YAML.

## Field naming and PDF mapping

- [ ] Rename PDF fields to AssemblyLine conventions using clear nouns (`users`, `children`, `caregivers`) and contextual dates (avoid `day`, `month`, `year`).
- [ ] Ensure unique names for multiple parties and signatures (e.g., `users1`, `users2`).
- [ ] If a PDF radio group is implemented as checkboxes, split into separate checkbox fields and map with boolean expressions in YAML.
- [ ] For checkboxes, map True/False and let docassemble handle export values.
- [ ] After PDF edits, re-verify that the YAML field mapping matches the PDF field names.

Docs:
```
https://assemblyline.suffolklitlab.org/docs/authoring/label_variables
```

## Interview structure and defaults

- [ ] Confirm form type and set defaults as appropriate (e.g., `al_form_type = "starts_case"`).
- [ ] Decide list limits (e.g., max parents, max children) and enforce them explicitly.
- [ ] If the form is always for a fixed number of people, remove the default “how many” screens and use a fixed flow.
- [ ] Merge tightly related questions when it reduces screen count without harming clarity.

Docs:
```
https://assemblyline.suffolklitlab.org/docs/authoring/customizing_interview
```

## Use AssemblyLine object patterns

- [ ] Collect names with `name_fields()`.
- [ ] Collect addresses with `ALIndividual.address` + `address_fields()`.
- [ ] Add `sets:` entries for address subfields when using `address_fields()`.

Docs:
```
https://assemblyline.suffolklitlab.org/docs/style_guide/question_library/names
https://assemblyline.suffolklitlab.org/docs/components/AssemblyLine/ALGeneral/overview#ALAddress
```

## Translation-friendly options and review display

- [ ] Every `choices:` list must use invariant values (`label: invariant_value`).
- [ ] All logic compares invariant values only.
- [ ] In review screens, display translated labels by mapping invariants via `variable name` + `data` blocks and rendering the mapped text.

Docs:
```
https://assemblyline.suffolklitlab.org/docs/coding_style/yaml_translation
```

## Plain-language and content alignment

- [ ] Rewrite screens to a sixth-grade reading level.
- [ ] Align eligibility and guidance with authoritative legal content for the jurisdiction.
- [ ] Use bulleted lists for “can/cannot” or similar enumerations.

Docs:
```
https://texaslawhelp.org/article/authorization-for-nonparent-care-of-a-child
```

## Metadata and publishing

- [ ] Ensure metadata meets AssemblyLine publishing guidance.
- [ ] Add `landing_page_url`, `help_page_url`, and `when_you_are_finished`.
- [ ] Verify the correct LIST code on taxonomy.legal.

Docs:
```
https://assemblyline.suffolklitlab.org/docs/authoring/generated_yaml#interview-metadata-and-metadata-for-publishing-on-courtformsonline
https://taxonomy.legal/
```

## Packaging and next steps

- [ ] Ensure a next-steps DOCX exists in `data/templates` and is referenced in YAML.
- [ ] Keep next-steps content consistent with interview logic and legal requirements.
- [ ] Maintain formatting of the template next steps document.

## Quality checks

- [ ] Run a quick pass through the interview to confirm flow, defaults, and conditional logic.
- [ ] Pay special attention to things like unnecessary list gathering, questions about default role that are not needed, etc.
- [ ] Confirm review screen shows human-friendly labels, not invariants.
- [ ] Validate PDF output fields after any PDF changes.

## Translation

At the moment, translating a docassemble interview does require a running docassemble server to pull in the various strings
from the different included packages. Install the interview in a playground and use the ALDashboard translation tool
to do the translation. This is likely to be a human step for now.

With GPT-5-nano, a small interview can still take up to 30 minutes to fully translate, so be patient.

Once you have the translation file, download and put in the data/sources folder.

### Follow the translation instructions to update the interview YAML

Visit https://assemblyline.suffolklitlab.org/docs/components/AssemblyLine/translation, especially
https://assemblyline.suffolklitlab.org/docs/components/AssemblyLine/translation#a-complete-example
to see how to integrate the translation XLSX file into your interview.
