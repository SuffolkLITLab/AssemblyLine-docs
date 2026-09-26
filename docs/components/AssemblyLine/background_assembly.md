---
id: background_assembly
title: |
  Assembling documents in the background
sidebar_label: |
  Assembling documents in the background
slug: background_assembly
---

Background assembly lets an [ALDocumentBundle](al_document.md) generate files while
the user sees a waiting screen. Use it when document generation or PDF conversion
is slow enough to risk a web request timeout, especially for large packets or
uploaded exhibits. Small, fast interviews can continue to assemble documents in
the foreground.

Collect all answers needed by the attachments before starting background assembly.
A background task cannot ask the user a question. A review screen before assembly
helps users finish their changes before the files are generated.

## Adding background assembly

Use a saved completion variable in your interview order. AssemblyLine starts the
task, shows the waiting screen, and continues when the task's callback has saved
the files to the interview.

| Output | Completion variable |
| --- | --- |
| Final PDFs | `al_user_bundle.downloads_ready` |
| Final PDFs and editable DOCX files, where available | `al_user_bundle.downloads_with_docx_ready` |
| Preview PDF | `al_user_bundle.preview_ready` |

### Interview order and download screen

After your existing question, review, and signature blocks, reference the
completion variable immediately before the download screen:

```yaml
mandatory: True
code: |
  # Keep your existing logic to collect all attachment inputs above these lines.
  al_user_bundle.downloads_with_docx_ready
  download_screen
---
event: download_screen
question: |
  Download your documents
subquestion: |
  ${ al_user_bundle.download_list_html(use_previously_cached_files=True, include_full_pdf=True) }
```

For PDF-only generation, replace `downloads_with_docx_ready` with `downloads_ready`.
Generating DOCX files does not require you to display them: the download table
shows PDFs by default. Add `format="docx"` to `download_list_html()` to offer the
editable versions where available.

Keep `use_previously_cached_files=True` on the download screen. This tells
`download_list_html()` to use the files saved by the background task. Without it,
the download screen can assemble documents again in the foreground.

:::warning Define attachment inputs first

Every variable needed to generate your documents must be defined before you
reference the completion variable. This includes variables used to decide which
documents are enabled. `skip undefined` can allow an attachment to omit undefined
values, but it does not collect missing answers or satisfy other assembly logic.
:::

### Optional preview

A preview uses the same pattern. Include it when users need to inspect the actual
document before continuing; omit it when a review of their answers is enough.
Preview generation adds another wait.

```yaml
mandatory: True
code: |
  # Collect the inputs required for the preview first.
  al_user_bundle.preview_ready
  preview_screen
  # Keep any signature or other final-answer blocks here.
  al_user_bundle.downloads_with_docx_ready
  download_screen
---
continue button field: preview_screen
question: |
  Preview your documents
subquestion: |
  ${ al_user_bundle._preview_file }
```

Use this interview order in place of the earlier one, with the same download
screen. For a runnable example with attachments, see
[`test_aldocument_background_assembly.yml`](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/main/docassemble/AssemblyLine/data/questions/test_aldocument_background_assembly.yml).

## Why the completion variable matters

Celery keeps task results temporarily, normally for one day. After the result
expires, a completed task's `.ready()` method can return `False` again. An
interview order that repeatedly calls `.ready()` can then send a returning user
to a waiting screen indefinitely, even though their documents were already saved.

AssemblyLine's completion variables check the files saved to the interview by the
background callback. They save `True` once those files exist and remain usable
after Celery's result expires. If the user leaves while generation is running,
the callback still saves the files. The completion block recognizes them when
the user returns, even if the task result expired before that first return.

### Updating an older interview

Replace this condition in your interview order:

```python
if not al_user_bundle.generate_downloads_with_docx_task.ready():
  al_download_waiting_screen
```

with:

```python
al_user_bundle.downloads_with_docx_ready
```

Use `downloads_ready` for the PDF-only task or `preview_ready` for the preview
task. Keep the download screen's `use_previously_cached_files=True` setting.
Existing sessions with files saved by the standard callback can use the new
completion variables without rerunning the expired task. Updating AssemblyLine
alone does not replace `.ready()` conditions in your interview YAML.

## Regenerating after edits

After a user changes an answer, the saved files still contain the previous
answers. Complete the edit workflow and collect any newly required attachment
inputs, then explicitly reconsider the corresponding task:

| Output to regenerate | Task to reconsider |
| --- | --- |
| Final PDFs | `al_user_bundle.generate_downloads_task` |
| Final PDFs and DOCX files | `al_user_bundle.generate_downloads_with_docx_task` |
| Preview PDF | `al_user_bundle.generate_preview_task` |

For example, an action can regenerate the final files:

```yaml
event: regenerate_downloads
code: |
  reconsider("al_user_bundle.generate_downloads_with_docx_task")
```

Link to that action from a completed download screen with:

```mako
${ action_button_html(url_action('regenerate_downloads'), label='Regenerate documents') }
```

Starting the task clears the saved download files and completion variables. The
interview order reaches `downloads_with_docx_ready` again and waits for the new
files. Reconsidering the preview task similarly clears `_preview_file` and
`preview_ready`. If your preview screen uses a continue-button variable such as
`preview_screen`, undefine that variable too when you want to show the screen
again.

Reconsidering **only** a completion variable rechecks the current saved files; it
does not regenerate them. Do not reconsider the task on every pass through a
mandatory block, because that would start another task on each reload.

Use one final-download mode per bundle at a time, and let an existing task finish
before starting another for the same bundle. The PDF and DOCX modes share the
saved download files. Starting either mode clears both download completion
variables and the other mode's task handle.

If your interview also assembled attachments in the foreground before an edit,
invalidate those attachment variables and any document or bundle caches as part
of your edit workflow. Restarting a background task clears its saved output; it
does not clear every foreground attachment cache. An Undo or edit button alone
is not enough to refresh background-generated files.

## Customizing background assembly

### Generation options

To change the files generated by the standard DOCX task, override the
`create_downloads_with_docx` event. Keep the standard task-start block so that
regeneration still clears its saved output and completion variables. For example,
this bundle-specific override omits the ZIP while preserving the combined PDF:

```yaml
event: al_user_bundle.create_downloads_with_docx
code: |
  download_response = al_user_bundle.get_cacheable_documents(
    key="final", pdf=True, docx=True, include_zip=False, include_full_pdf=True
  )
  background_response_action(
    al_user_bundle.attr_name("save_downloads"),
    download_response=download_response,
  )
```

The PDF-only task uses `create_downloads`. Both events send their results to
`save_downloads`, which persists `_downloadable_files` in the interview.
`get_cacheable_documents()` returns the per-document file information together
with the optional ZIP and combined PDF. Match the options on your download
screen to the files you generate; for the example above, add `include_zip=False`
to `download_list_html()`.

The preview task uses `generate_preview_event` and sends its result to
`save_preview`, which saves `_preview_file`. These saved outputs are what the
completion blocks check, so preserve the relevant callback when customizing the
standard workflow.

### Starting work before the waiting screen

You can reference `al_user_bundle.generate_downloads_with_docx_task` earlier in
your interview order to start generation while the user reads instructions or
completes an unrelated step. All attachment inputs must already be defined and
must stay unchanged while that task runs. Reference
`al_user_bundle.downloads_with_docx_ready` before the download screen to wait if
generation has not finished yet.

### Waiting screens

Override `al_download_waiting_screen` to change the final-document waiting screen,
or `al_preview_waiting_screen` for previews. Keep `reload: True` so the interview
periodically checks for the saved files:

```yaml
event: al_download_waiting_screen
question: |
  Please wait while we make your documents
subquestion: |
  This can take a few minutes.

  <div class="spinner-border text-primary d-flex justify-content-center" role="status">
    <span class="visually-hidden">Making documents...</span>
  </div>
reload: True
```

The default reload interval is ten seconds; this is a polling interval, not a
minimum assembly time. You can [set an explicit reload interval](https://docassemble.org/docs/modifiers.html#reload)
as low as four seconds.

### Custom tasks with different results

For a task that does not use the standard file callbacks, follow the same pattern:
start the task once, save its result with `background_response_action()`, and use
an intermediate completion block that waits until the saved result is defined.
Do not save a one-time `False` value as the completion variable while waiting.
When explicitly restarting the task, clear both the saved result and the
completion variable. See docassemble's
[background action documentation](https://docassemble.org/docs/background.html)
for how to persist results with a response action.

## Troubleshooting

If a returning user is stuck on a waiting screen, check for a direct `.ready()`
condition in the interview order and replace it with the appropriate completion
variable. On docassemble versions that expose `celery result retention days`,
increasing that setting only postpones this problem; the interview should rely
on saved results regardless of the retention period.

If a new task never saves its files, inspect
[`worker.log`](https://docassemble.org/docs/admin.html#logs). Missing attachment
inputs or other generation errors can prevent the callback from running. A
completion variable does not turn a failed task into a successful one. Correct
the underlying error, then explicitly reconsider the task to retry.
