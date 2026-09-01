---
id: running_checks_locally
title: Running checks before you push to GitHub
sidebar_label: Running checks locally
slug: running-checks-locally
---

# Running checks before you push to GitHub

GitHub Actions checks every pull request, but a round trip through CI takes minutes and
leaves a trail of "fix lint" commits. The same checks run locally in seconds.

---

## From the command line

```bash
# Interview YAML: structure, WCAG, and broken links
python3 -m dayamlchecker docassemble/MyPackage/data/questions/

# Word templates: document accessibility
python3 -m dayamlchecker docassemble/MyPackage/data/templates/

# Python: syntax, formatting, docstrings, tests
python3 -m compileall . -q
black .
docsig docassemble/
pytest
```

See the [DAYamlChecker page](./dayamlchecker.md) for what each finding means and how to
suppress one.

:::tip Skip the network when you are iterating
`dayamlchecker` requests every external link it finds, which is the slowest thing it
does. Pass `--no-url-check` while you are working, and leave the link checking to CI.
:::

---

## Automating with Git pre-commit hooks

A pre-commit hook runs every time you `git commit`. If a check fails, the commit is
aborted, so a broken template never reaches your history in the first place. There are
two ways to set one up.

## Option 1: the `pre-commit` framework (recommended)

[pre-commit](https://pre-commit.com/) installs and runs hooks from many languages, and
only passes it the files you actually staged.

### 1. Install it

```bash
uv tool install pre-commit
# or
pip install pre-commit
```

### 2. Create `.pre-commit-config.yaml`

In the root of your package repository:

```yaml
repos:
  # General file hygiene
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
        # Docassemble interviews are multi-document YAML with Mako in them
        exclude: ^docassemble/.*/data/questions/.*\.yml$

  # Python formatting
  - repo: https://github.com/psf/black
    rev: 24.8.0
    hooks:
      - id: black

  # Python docstrings
  - repo: https://github.com/jshwi/docsig
    rev: v0.96.0
    hooks:
      - id: docsig
        args: [--disable=description-not-capitalized]
        exclude: (test_.*|setup)\.py$

  # DAYamlChecker, from your own environment
  - repo: local
    hooks:
      - id: dayamlchecker
        name: DAYamlChecker
        entry: dayamlchecker --no-url-check
        language: system
        files: ^docassemble/.*/data/(questions/.*\.ya?ml|templates/.*\.docx)$
        pass_filenames: true
```

`--no-url-check` keeps every commit from making live HTTP requests to every link in your
interview. CI still checks the links.

### 3. Install the hook

```bash
pre-commit install
```

```text
pre-commit installed at .git/hooks/pre-commit
```

### 4. What it looks like

```bash
$ git add docassemble/MyPackage/data/questions/interview.yml
$ git commit -m "Add new interview screen"

Trim Trailing Whitespace.................................................Passed
Fix End of Files.........................................................Passed
black................................................(no files to check)Skipped
docsig...............................................(no files to check)Skipped
DAYamlChecker............................................................Passed
[feature-branch 8a3f910] Add new interview screen
 1 file changed, 25 insertions(+)
```

To run every hook over the whole repository, without committing:

```bash
pre-commit run --all-files
```

---

## Option 2: a plain shell hook

If you would rather not add a dependency, write `.git/hooks/pre-commit` yourself:

```bash
#!/bin/bash
# Check staged interview files before committing
set -e

echo "Checking Python syntax..."
python3 -m compileall . -q

STAGED=$(git diff --cached --name-only --diff-filter=ACM \
  | grep -E '^docassemble/.*/data/(questions/.*\.ya?ml|templates/.*\.docx)$' || true)

if [ -n "$STAGED" ]; then
    echo "Running DAYamlChecker on:"
    echo "$STAGED"
    # shellcheck disable=SC2086
    dayamlchecker --no-url-check $STAGED
fi

echo "All pre-commit checks passed."
```

Then make it executable:

```bash
chmod +x .git/hooks/pre-commit
```

Unlike the `pre-commit` framework, a hook in `.git/hooks/` is local to your own clone and
is not shared with the rest of the team.

---

## Skipping the hooks

```bash
git commit --no-verify -m "WIP: save checkpoint"
```

:::warning
`--no-verify` only skips the local checks. The same checks run again on your pull
request, so anything you skipped will come back.
:::

---

## Related documentation

- **[DAYamlChecker](./dayamlchecker.md)**
- **[GitHub Actions](./github_actions.md)**
- **[pre-commit documentation](https://pre-commit.com/)** and
  **[Git hooks in the Git book](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)**
