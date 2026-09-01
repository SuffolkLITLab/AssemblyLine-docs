---
id: github_actions
title: "Assembly Line GitHub Actions (ALActions)"
sidebar_label: GitHub Actions
slug: github_actions
---

# Assembly Line GitHub Actions (ALActions)

**[SuffolkLITLab/ALActions](https://github.com/SuffolkLITLab/ALActions)** holds the
reusable GitHub Actions the Document Assembly Line uses for Docassemble packages: package
builds, YAML and template checking, readable Word diffs, PDF accessibility validation
with veraPDF, Python linting and tests, playground deployments, and uptime monitoring.

All of them are [composite
actions](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action).
Reference them at `@main` so that fixes reach your repositories without a version bump:

```yaml
- uses: SuffolkLITLab/ALActions/da_build@main
```

---

## Action catalog

| Action | What it does | Typical triggers | What it produces |
| :--- | :--- | :--- | :--- |
| **[`da_build`](#da_build)** | Package build, Python compile, YAML checks, DOCX and PDF accessibility, URL checks | `push`, `pull_request` | Inline annotations, a PDF accessibility step summary |
| **[`valid_jinja2`](#valid_jinja2)** | Compiles Jinja2 expressions in changed `.docx` templates | `push`, `pull_request` on `.docx` paths | Step summary table, `jinja-validation` artifact |
| **[`word_diff`](#word_diff)** | Converts changed `.docx` templates to Markdown and HTML diffs | `pull_request`, `workflow_dispatch` | Diffs in the step summary, `word-doc-diff` artifact |
| **[`black-formatting`](#black-formatting)** | Runs Black over the repository | `push`, `pull_request` | A failing job when files need reformatting |
| **[`docsig`](#docsig)** | Checks Google-style docstrings against signatures | `push`, `pull_request` | Docstring mismatches in the job log |
| **[`pythontests`](#pythontests)** | Mypy, Bandit, and `pytest` | `push`, `pull_request` | Type, security, and test output |
| **[`da_playground_install`](#da_playground_install)** | Installs the branch into a playground project | `push` on feature branches | A live interview to click through |
| **[`da_package`](#da_package)** | Installs the package server-wide | `push` on `main` or a tag | A deployed package |
| **[`hall_monitor`](#hall_monitor)** | Checks that installed interviews still load | `schedule` | Email or Teams alerts on failure |

---

## `da_build`: build and check the package {#da_build}

`da_build` is the main check for a Docassemble package. It runs, in order:

1. **Python compile**: `python -m compileall .`, so no Python file has a syntax error.
2. **Package build**: `uv build`, producing a wheel and an sdist in `dist/`.
3. **YAML and DOCX checks**: [`dayamlchecker`](./dayamlchecker.md) over the package's
   interview files and Word templates, reporting findings as GitHub annotations.
4. **URL checks**: every absolute URL in question and template files is requested. A
   broken link in a question file fails the job; one in a template is a warning.
5. **PDF accessibility**: veraPDF is installed and every PDF template is validated
   against **PDF/UA-1** (ISO 14289-1).

### Sample workflow

Create `.github/workflows/build_and_check.yml`. `da_build` checks out the repository
itself, so you do not need an `actions/checkout` step:

```yaml
name: Build and check package

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-validate:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/da_build@main
        with:
          python-version: "3.12"
          # Optional: skip endpoints that block CI or are known to be flaky
          ignore-urls: |
            https://example.com/known-flaky-endpoint
            https://another.example.org/blocked-from-ci
```

### Inputs

| Input | Description | Default |
| :--- | :--- | :--- |
| `python-version` | Python version used for the build environment | `"3.12"` |
| `skip-url-check` | `"true"` skips all URL network calls | `"false"` |
| `skip-templates` | `"true"` skips URLs found inside `data/templates` files | `"false"` |
| `ignore-urls` | Comma- or newline-separated URLs to ignore during URL checks | `""` |
| `docx-validation-mode` | `"warning"` annotates without failing, `"error"` fails on DOCX accessibility errors, `"off"` skips DOCX checks | `"warning"` |
| `pdf-validation-mode` | `"warning"` annotates without failing, `"error"` fails on PDF/UA-1 failures, `"off"` skips the check and the veraPDF install | `"warning"` |
| `pdf-strict` | `"true"` also enforces tab-order and annotation-structure rules on form fields | `"false"` |

### Which files are checked

`da_build` does not check every file in the repository. It matches:

- `docassemble/*/data/questions/**/*.yml` for interview checks, so that workflow files
  and ALKiln fixtures are not mistaken for interviews, and
- `docassemble/*/data/templates/**/*.docx` for document accessibility, so that only the
  documents users actually receive are checked. Word lock files (`~$…`) are skipped.

`build/`, `dist/`, and `.venv/` are pruned, because the `uv build` step above has already
copied the package into `build/lib`. Without pruning, every finding would be reported
twice and the annotations would point at the copy rather than at the file you edit.

Note that templates are found by scanning the directory, not by following references from
a YAML file. A template that no interview mentions yet is still checked.

### Adjusting what fails the build

- **DOCX accessibility** is reported as warnings by default, because most existing
  templates have findings and the intent is to work through them over time. Set
  `docx-validation-mode: "error"` once a package is clean, or `"off"` to skip it.
- **PDF accessibility** is likewise `"warning"` by default. Set
  `pdf-validation-mode: "error"` to block merges on PDF/UA-1 failures. Leave `pdf-strict`
  at `"false"` unless your forms stay fillable for the user: tab-order and annotation
  rules are suppressed by default because Assembly Line forms are usually flattened
  before anyone sees them.
- **URLs**: set `skip-templates: "true"` to ignore links inside `data/templates`, or
  `skip-url-check: "true"` to make no network calls at all, which is what you want on a
  runner without outbound internet access.
- **Individual findings**: suppress them in the YAML itself with `# no-dayc:` and
  `# no-dayc-block:` comments. DOCX findings have no YAML to annotate, so a noisy
  document rule has to be silenced with `--suppress` when running
  [`dayamlchecker` locally](./dayamlchecker.md#suppressing-findings), or turned off for
  the whole job with `docx-validation-mode`.

:::note URLs are checked twice
`dayamlchecker` checks URLs as part of its own run, and `da_build` then runs the URL
checker again as a separate step so that warnings can be surfaced as a job annotation.
Seeing the same link reported in two steps is expected.
:::

To audit templates locally at full strictness before pushing:

```bash
python3 -m dayamlchecker --docx-accessibility-severity error docassemble/MyPackage/data/templates/
```

---

## `valid_jinja2`: check Jinja2 in Word templates {#valid_jinja2}

Docassemble builds Word documents with `docxtpl`, which is Jinja2. A typo like
`{{ user.firs_name }}` or an unclosed `{% if %}` only fails when a user tries to download
the document. `valid_jinja2` compiles the templates in a pull request instead.

- **Syntax errors** fail the job.
- **Unknown filters** are warnings, not failures. The action knows 124 Jinja2 and
  Docassemble filters, including `currency`, `format_date`, `title_case`, `nice_number`,
  `ordinal`, `word`, and `comma_and_list`.
- **Added and modified** `.docx` files are found with `git diff` against the pull
  request base. Only committed changes are compared, so commit a fixed template before
  expecting the result to change.
- **A Markdown summary** is always written to the step summary. The HTML artifact is
  uploaded only when there is something to report.

### Sample workflow

```yaml
name: Validate DOCX templates

on:
  pull_request:
    paths: ['**/*.docx']
  push:
    paths: ['**/*.docx']
  workflow_dispatch:

jobs:
  validate-templates:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/valid_jinja2@main
```

### Inputs

| Input | Description | Default |
| :--- | :--- | :--- |
| `base_ref` | Git ref to compare against | detected from the event |
| `working_directory` | Directory to run from | `.` |
| `artifact_name` | Name of the uploaded artifact | `jinja-validation` |
| `output_dir` | Directory for the HTML reports | `jinja_validation` |
| `summary_file` | Path for the Markdown summary | `jinja_validation_summary.md` |
| `skip_checkout` | `"true"` if the job already checked out the repository with `fetch-depth: 0` | `"false"` |

---

## `word_diff`: readable diffs for Word templates {#word_diff}

GitHub shows a changed `.docx` as a replaced binary file, which tells a reviewer nothing.
`word_diff` converts both versions to Markdown and diffs the text.

It is not a pass/fail check. On any pull request that touches a Word document it produces
a report, whether or not anything is wrong; when no `.docx` changed between the two
commits it says so in the summary and stops.

![A side-by-side HTML diff of two versions of a Word template, with removed text on the left and added text on the right](../assets/quality_checks/word_diff_preview.png)

- **In the step summary**: a unified diff per changed file, so a reviewer can read the
  change without downloading anything.
- **In the artifact**: side-by-side HTML diffs plus the converted Markdown, with an
  `index.html` table of contents.
- **Jinja2 is preserved**, so a change from `{{ user.name }}` to `{{ users[0].name }}`
  shows up as a text change like any other.

### Sample workflow

```yaml
name: Diff Word documents

on:
  pull_request:
    paths: ['**/*.docx']
  workflow_dispatch:

jobs:
  docx-diff:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/word_diff@main
```

### Inputs

| Input | Description | Default |
| :--- | :--- | :--- |
| `base_ref` | Git ref or SHA to compare against | detected from the event |
| `working_directory` | Directory to run from | `.` |
| `artifact_name` | Name of the uploaded artifact | `word-doc-diff` |
| `output_dir` | Directory for the diff files and `index.html` | `word_diffs` |
| `summary_file` | Path for the Markdown summary | `word_diff_summary.md` |
| `skip_checkout` | `"true"` if the job already checked out the repository with `fetch-depth: 0` | `"false"` |

For a manually dispatched run, pass `base_ref` explicitly; the automatic detection only
covers pull requests and pushes.

---

## `black-formatting`: Python formatting {#black-formatting}

Runs [Black](https://black.readthedocs.io/en/stable/) over the repository, excluding
`__init__.py` and `setup.py`. The job fails if any file would be reformatted.

```yaml
jobs:
  lint-python:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/black-formatting@main
```

Black also reads `pyproject.toml`. Most Assembly Line packages include:

```toml
[tool.black]
extend-exclude = '(__init__.py|setup.py)'
```

:::caution Gate on the job, not the output
`black-formatting` and `pythontests` both declare an output (`linting-passed` and
`tests-passed`). Neither is currently populated with a meaningful value. Depend on
whether the job succeeded instead.
:::

---

## `docsig`: docstrings that match their signatures {#docsig}

`docsig` checks that every documented parameter exists, that every parameter is
documented, and that the style is consistent. Assembly Line packages use **Google-style**
docstrings.

```yaml
jobs:
  docstrings:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/docsig@main
```

The action checks every `.py` file except `test*.py`, `setup.py`, and `__init__.py`, and
disables the `description-not-capitalized` rule. Configure the rest through
`[tool.docsig]` in `pyproject.toml`; see the
[docsig README](https://github.com/jshwi/docsig#commandline).

---

## `pythontests`: types, security, and tests {#pythontests}

1. Installs the system libraries Docassemble packages tend to need, and sets
   `ISUNITTEST=true`.
2. Installs dependencies with `uv sync --group dev` when `pyproject.toml` has a
   `[dependency-groups]` table, and `uv sync` otherwise.
3. Runs `mypy . --exclude '^build/' --explicit-package-bases`.
4. Runs Bandit at high severity:
   `uv tool run bandit -r . --exclude './scripts,./venv,./.venv,./build' --severity-level=high`.
5. Runs `pytest`.

```yaml
jobs:
  test-python:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/pythontests@main
```

Configure each tool through `pyproject.toml`: `[tool.pytest.ini_options]`, `[tool.mypy]`,
and `[tool.bandit]`.

---

## `da_playground_install`: deploy to a playground {#da_playground_install}

Installs the current branch into a project in a developer's Docassemble playground, so a
reviewer can click through the interview. This action installs whatever is in the working
directory, so the job **must** check out the repository first.

```yaml
name: Deploy to playground

on:
  push:
    branches: ['feature/**']

jobs:
  deploy-playground:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: SuffolkLITLab/ALActions/da_playground_install@main
        with:
          SERVER_URL: ${{ secrets.SERVER_URL }}
          DOCASSEMBLE_DEVELOPER_API_KEY: ${{ secrets.DOCASSEMBLE_DEVELOPER_API_KEY }}
          PROJECT_NAME: "review-${{ github.ref_name }}"
```

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `SERVER_URL` | Server URL, without a trailing slash, such as `https://apps-dev.example.org` | none | Yes |
| `DOCASSEMBLE_DEVELOPER_API_KEY` | API key for an account that may install packages | none | Yes |
| `PROJECT_NAME` | Playground project to install into | none | Yes |
| `USER_ID` | Numeric user id | the account the API key belongs to | No |
| `RESTART` | Set to `0` to skip the server restart | restart | No |

---

## `da_package`: install server-wide {#da_package}

Installs the package for every user on a server. It picks its source in this order:

1. `PYPI_PACKAGE`, if set.
2. `GITHUB_URL` (with `GITHUB_BRANCH`, defaulting to the repository's default branch),
   if set. This is usually what you want, because the server can then be updated later
   with its own **update** button.
3. Otherwise, a zip of the working directory — which means the job must run
   `actions/checkout` first.

```yaml
name: Deploy package server-wide

on:
  push:
    branches: [main]

jobs:
  deploy-package:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/da_package@main
        with:
          SERVER_URL: ${{ secrets.PROD_SERVER_URL }}
          DOCASSEMBLE_DEVELOPER_API_KEY: ${{ secrets.DOCASSEMBLE_DEVELOPER_API_KEY }}
          GITHUB_URL: "https://github.com/${{ github.repository }}"
          GITHUB_BRANCH: "main"
```

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `SERVER_URL` | Server URL, without a trailing slash | none | Yes |
| `DOCASSEMBLE_DEVELOPER_API_KEY` | API key for an account that may install packages server-wide | none | Yes |
| `GITHUB_URL` | GitHub URL of the package to install | none | No |
| `GITHUB_BRANCH` | Branch to install from | the repository's default branch | No |
| `PYPI_PACKAGE` | PyPI package name to install instead | none | No |

---

## `hall_monitor`: scheduled checks on a live server {#hall_monitor}

Docassemble's `/list` page marks any installed interview that failed to load.
`hall_monitor` fetches that page on a schedule and fails the job if any interview is
marked broken — like a hall monitor looking through doorways, without going in. Set
`CHECK_TYPE: "homepage"` to check only that `/` responds.

When the check fails, the action sends alerts through SendGrid, Mailgun, or a Microsoft
Teams webhook. This is separate from GitHub's own notifications, which cannot email
people who are not watching the repository.

```yaml
name: Hall monitor

on:
  schedule:
    # 07:00 and 19:00 UTC
    - cron: "0 7,19 * * *"
  workflow_dispatch:

jobs:
  monitor-server:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/hall_monitor@main
        with:
          SERVER_URL: "https://apps.example.org"
          SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
          ERROR_EMAIL_FROM: "Monitor <alerts@example.org>"
          ERROR_EMAILS: "dev-team@example.org,admin@example.org"
```

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `SERVER_URL` | Server to check, with or without a trailing slash | none | Yes |
| `CHECK_TYPE` | `"homepage"` to check only `/`; anything else checks `/list` | check `/list` | No |
| `SENDGRID_API_KEY` | SendGrid key for failure emails | none | No |
| `MAILGUN_API_KEY` | Mailgun key for failure emails | none | No |
| `MAILGUN_DOMAIN` | Mailgun sending domain | none | No |
| `ERROR_EMAIL_FROM` | Address the alert is sent from | none | No |
| `ERROR_EMAILS` | Comma-separated recipients | none | No |
| `TEAMS_MONITOR_WEBHOOK` | Microsoft Teams incoming webhook | none | No |

---

## A complete workflow

`.github/workflows/quality_checks.yml`, combining the checks that run on every change.
`da_build`, `valid_jinja2`, and `word_diff` each check out the repository themselves.

```yaml
name: Quality checks

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  package-build-and-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/da_build@main
        with:
          python-version: "3.12"

  validate-docx-templates:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/valid_jinja2@main

  diff-word-documents:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/word_diff@main

  python-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: SuffolkLITLab/ALActions/black-formatting@main
      - uses: SuffolkLITLab/ALActions/docsig@main
      - uses: SuffolkLITLab/ALActions/pythontests@main
```

---

## Related documentation

- **[Logs and artifacts](./navigating_logs_and_artifacts.md)**
- **[DAYamlChecker](./dayamlchecker.md)**
- **[Automated testing with ALKiln](../components/ALKiln/intro.mdx)**
