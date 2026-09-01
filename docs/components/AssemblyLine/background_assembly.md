---
id: background_assembly
title: |
  Assembling documents in the background
sidebar_label: |
  Assembling documents in the background
slug: background_assembly
---

Assembly Line `3.2.0` and later introduce a background processing option to the [ALDocumentBundle](al_document.md)
class.

Background processing:

* Is safer when your user may generate large documents that take more than 60 seconds to assemble or convert to PDF
* Prevents frustrating 504 gateway timeout errors

Negatives include:

* Requires more care from the developer
* Usually prevents you from using an "edit" button on the final screen
* Means assembling documents will always take at least 10 seconds

If your users currently have to wait a long time to get their finished documents, or if your users
ever see an error screen because the downloads took too long to make, you should use background processing.

If you have only a few small documents and there is no user-provided content (like photos or
other uploaded exhibits), you should try without using background processing first.

## Adding background processing to your interview

Background processing is a built-in feature of the ALDocumentBundle class. Using it involves:

1. Starting the built-in background assembly `task` in your interview order block
1. Setting conditions on when to display a waiting screen
1. Editing the download screen so it makes use of the background assembled documents

In most cases, when you use background processing, you should also:

1. Disable the preview screen
1. Show a review screen in-line before the download screen.

### Editing your interview order block

Find the line in your interview order block where you would like to start the background
assembly. In most cases, this should be just before the download screen.

Add a line like this:

```python
  if not al_user_bundle.generate_downloads_with_docx_task.ready():
    al_download_waiting_screen
```

:::warning Make sure all required variables are defined

Background assembly requires that all of the logic required to assemble your documents 
was triggered **before** the background processing starts. You cannot have any
undefined variables that are needed for the document to generate.

Note that if you use `skip undefined` this isn't usually a problem.
:::

In some cases, you may want to start the background assembly earlier than just before the download screen.
For example, you may want to show the user instructions, or get information for a task
that will not change the documents, such as eFiling.

### Editing the download screen

On the download screen, edit the reference to `download_list_html()` to let it use
the background assembled documents. Using cached files is disabled by default.

```yaml
---
id: download
event: download_screen
question: |
  Download the documents
subquestion: |
  Your documents are ready for download.

  If you need to make any changes, click the "Undo" button and click the button to edit
  the answer you want to change.

  ${ al_user_bundle.download_list_html(use_previously_cached_files=True, include_full_pdf=True) }
```

### And don't forget

* Remove the preview screen. A waiting screen before the preview isn't a good user experience for most interviews.
* Add the review screen to your interview order block. The user will not be able to click the "edit answers" button
  on the download screen.

### Customizing the user experience

#### What happens in the background task

You may want to provide a non-default set of options to the file generation step.

Override `al_user_bundle.generate_downloads_with_docx_task` or define a task with your
own name. The default contents of this task are:

```yaml
---
generic object: ALDocumentBundle
event: x.create_downloads_with_docx
code: |
  download_response = x.get_cacheable_documents(key="final", pdf=True, docx=True, include_full_pdf=True)
  background_response_action(x.attr_name('save_downloads'), download_response=download_response)
```

#### The waiting screen

Override `al_download_waiting_screen`, or define a screen with your own name. The default contents
of this question block are:

```
---
id: waiting screen
question: |
  Please wait while we make your documents
subquestion: |
  This can take a few minutes.
  <div class="spinner-border text-primary d-flex justify-content-center" role="status">
      <span class="sr-only">Making documents...</span>
  </div>
event: al_download_waiting_screen
reload: True
```

The default screen uses [standard Bootstrap components](https://getbootstrap.com/docs/5.2/components/spinners/)
to create the spinning circle. You can put anything you like here, although an animation is recommended.

If you would like the screen to reload more often than every 10 seconds, [you can set it as low as 4 seconds](https://docassemble.org/docs/modifiers.html#reload).

## Key methods and built-in task names

`al_download_waiting_screen` is a Assembly Line provided example of a generic waiting screen.

`generate_downloads_task` is the name of a [background task object](https://docassemble.org/docs/background.html#background_action) defined 
in the standard includes as an attribute of each ALDocumentBundle. It triggers a task to produce a full PDF of the bundle using the `final` 
key, a full ZIP, and it will not generate DOCX versions of the items, only downloadable (PDF) versions.

`create_downloads` is an event defined in the Assembly Line standard includes as an attribute for each ALDocumentBundle.
This event is triggered by `generate_downloads_task`.

`generate_downloads_with_docx_task` is an alternative to `generate_downloads_task` that does produce the DOCX
as well as PDF version of each document. You can safely use this even if you do not always want to display
the DOCX on the download screen.

In turn, `generate_downloads_with_docx_task` triggers the event `create_downloads_with_docx`

<!-- No documentation yet exists here for `.get_cacheable_documents()` -->

[get_cacheable_documents()](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/76ead20669674d1a458c15af99aeba44899866cd/docassemble/AssemblyLine/al_document.py#L1826) is a new method that generates
all **enabled** documents in the bundle and returns a list, where each item is a tuple of the DOCX and 
PDF versions of the document.

Optionally, it will also produce a .ZIP and a .PDF version of the full bundle.

This is called from a YAML block in the Assembly Line standard include files to define the `_downloadable_files`
attribute of a bundle.

[download_list_html()](al_document.md#AssemblyLine.al_document.ALDocumentBundle.download_list_html) has an optional parameter,
`use_previously_cached_files` which must be set to `True` to make use of the `_downloadable_files`
attribute of the bundle.

## Troubleshooting

If your background process has an error, the details of the error (typically a missing or undefined variable)
will be found in the [`worker.log` file](https://docassemble.org/docs/admin.html#logs)