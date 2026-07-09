---
id: al_document_overview
title: Python Classes to simplify working with multiple templates
sidebar_label: Working with multiple templates
slug: ALDocument/overview
---

## Overview

The `ALDocument` class was created to solve these problems in docassemble interviews:

1. handling apps that can assemble multiple forms, with the final list of forms
   depending on the answers that the user gives
1. handling a way to display a "preview" and "final" version of a document with
   and without a signature (to allow the user to confirm information before
   signing)
1. handling text in PDF templates that doesn't fit and needs to be sent to an addendum

This collection of classes has some other nice benefits:

1. a compact, neat and easily customizable list of downloads at the end, with
   both `view` and `download` buttons
1. a more customizable email-sending input than the stock docassemble input that
   can be displayed on the final screen
1. always-fresh documents that will be updated when the user changes or edits a
   response
1. a helper class and model questions to allow the user to upload evidence,
   including generating a table of contents and adding exhibit cover pages
1. helper classes to include not just templates but static documents and tables
   in XLSX format as download options

The primary classes that developers interact with are the `ALDocument` class,
which represents a template that is filled in with the user's answers during the
course of the interview, and the `ALDocumentBundle` class, which provides a way
to group documents together to be emailed, downloaded, or delivered to a court
or opposing party.

`ALDocumentBundle` objects can be nested to allow you to group multiple individual
template files into one document that the user can download.

Both `ALDocument` and `ALDocumentBundle` objects can be either `enabled` or not.
The docassemble interview will seek logic that defines when the document should
be included in the final output, letting you easily create interviews that have
contingent documents.

## ALDocument class

An `ALDocument` is a
[`DADict`](https://docassemble.org/docs/objects.html#DADict)  that has top level
attributes and points to one or more docassemble [`attachment`
blocks](https://docassemble.org/docs/documents.html#attachment).

There are usually exactly two keys in the dictionary: `preview` and `final`,
with the only difference being the presence or absence of a signature. Conditional
logic inside the template or attachment block can be used to show or hide the signature
depending on the value of the `key` so that the template does not need to be created
twice.

The `signature_if_final` method of an
[ALIndividual](al_general_overview.md#ALIndividual) was created to simplify this
common use case.

Here's how to use an ALDocument:

1. Create `ALDocument` objects in an objects block.
1. Set any required attributes, like `enabled`, in the object block or in a
   separate code block. If you set `enabled=True` in the object block, your
   document will always be enabled.
1. Define the key of the `ALDocument` in an `attachment` block using the
   `variable name` modifier. Usually, use one attachment block and define the variable name
   like this: `variable name: some_al_document[i]`.
1. Optionally, reference the `ALDocument` inside an `ALDocumentBundle`.

Example:

```yaml
---
objects:
  - letter: ALDocument.using(title="Letter to Social Security", filename="ssa_letter", enabled=True, has_addendum=False)
---
attachment:
  - pdf template file: ssa_letter.pdf
    variable name: letter[i]
    fields:
      - "users1_name": ${ users[0] }
      - "users1_signature": ${ users[0].signature_if_final(i) }
```

### Enabled Example

If other variables in your interview determine if your document is
`enabled`, you should define the `enabled` attribute in a code block, like this:

```yaml
---
objects:
  - main_document: ALDocument.using(title="Letter to Social Security", filename="main_document", enabled=True, has_addendum=False)
  - insurance_rider: ALDocument.using(title="Letter to Social Security", filename="rider", has_addendum=False)
---
attachments:
  - pdf template file: main_document.pdf
    variable name: main_document[i]
    fields:
      - "users1_name": ${ users[0] }
      - "users1_signature": ${ users[0].signature_if_final(i) }
  - pdf template file: rider.pdf
    variable name: rider[i]
    fields:
      - "users1_name": ${ users[0] }
      - "users1_signature": ${ users[0].signature_if_final(i) }
---
code: |
  if total_cost > 1000:
    insurance_rider.enabled = True
  else:
    insurance_rider.enabled = False
  # or more concise but slightly harder to read:
  # insurance_rider.enabled = total_cost > 1000
```

In the example above, the `insurance_rider` document is only included in any bundles if the
total cost of the project is over $1,000. Note that the `enabled` value is global for the
interview session. If you want to use different logic in different bundles, you can easily
create a separate `ALDocument` that references the same template file and attachment block.

Attributes:

* `filename`: the **display** filename used for the document when it is downloaded
* `title`: the title shown on the download screen
* `enabled`: whether the document should be "turned on" when it is referenced in an `ALDocumentBundle`
* `addendum`: points to a variable representing an `attachment` block with a
  formatted addendum. The Assembly Line provides a good default addendum
  template that is flexible enough to work with many fields.
* `overflow_fields`: an `ALAddendumFieldDict` with each representing a field
  that has potential to be sent to the addendum if exceeds a pre-set length.
* `has_addendum`: set this to True or False to control whether the
  `overflow_fields` dictionary will be checked to decide whether or not to
  generate an addendum file. Optional; defaults to `False`.

Methods:

* `as_pdf(key:str='final', refresh:bool=True)`: returns a PDF version of the
  completed template and any addendum. `key` is normally `preview` or `final`
* `as_docx(key:str='final', refresh:bool=True)`: returns a DOCX version of the
  completed template and any addendum if the original is a DOCX template. `key`
  is normally `preview` or `final`.
* `as_list(key:str='final', refresh:bool=True)`: returns a 1 or 2 item list
  which contains the template and its addendum, if any.
* `need_addendum()`: returns `True` if the addendum exists and there are
  overflow fields.
* `has_overflow()`: returns `True` if there are fields that trigger the
  addendum.
* `overflow()`: returns a list of just the fields that triggered the addendum.
* `safe_value(field_name:str, overflow_message:str=None, preserve_newlines:bool=False, input_width:int=80)`:
  returns the "safe" value
  of `field_name` (the amount that is less than `overflow_trigger`) plus an
  overflow message. Used in an attachment block.
* `overflow_value(field_name:str, overflow_message:str=None, preserve_newlines:bool=False, input_width:int=80)`:
  returns the "unsafe" value of `field_name`--the amount that exceeds the `overflow_trigger`. Potentially used
  inside an addendum document.

## ALDocumentBundle class

An `ALDocumentBundle` is a
[`DAList`](https://docassemble.org/docs/objects.html#DAList) that provides
developers a way to conveniently group documents and treat them as a single set,
even if the exact list of documents might change depending on the user's
answers.

Here's how to use an `ALDocumentBundle`:

1. Create the `ALDocumentBundle` in an `objects` block.
1. Add each `ALDocument` or nested `ALDocumentBundle` that your interview will
   sometimes produce to the bundle. Because the list is usually known in advance,
   it's common to include this in the object definition.
1. Use the `as_pdf()` method on your preview screen to display a preview of the
   output without any signature.
1. Use the `download_list_html()` and `send_button_html()` methods on your `download`
   screen.

You can have as many or as few bundles as you would like. The Assembly Line convention
is to use the following two bundles:

1. `al_user_bundle` which should include a **next steps** document with
   instructions for your user
1. `al_court_bundle` which leaves out the instructions and should have every
   document that you want the clerk to receive

Stick with this convention if you expect to integrate with E-filing.

Example:

```yaml
---
objects:
  - al_user_bundle: ALDocumentBundle.using(title="Forms to download", filename="ssa_documents", elements=[ssa_next_steps, letter])
  - al_court_bundle: ALDocumentBundle.using(title="Forms to download", filename="ssa_documents", elements=[letter])
```

:::note
You can **nest** `ALDocumentBundle`s! Just create your bundle in a separate `objects` block and add it directly
into the list of `elements`. This lets you create a document from multiple templates that you want the user
to be able to open and print as one file.
:::

Attributes:

* `enabled` (optional): define this if the bundle is included inside another `ALDocumentBundle`. If other variables in your interview determine if it's enabled, you should define the attribute in a code block, like in [this earlier example](#enabled-example)
* `title`: this is displayed on the download screen
* `filename`: used to construct the display filename for a `pdf` version of the bundle

Methods:

* `as_pdf(key:str='final', refresh:bool=True) -> DAFile`: return a single concatenated PDF of the bundle's attachments
* `as_zip(self, key:str = 'final', refresh:bool = True, title:str = '') -> DAFile`: 
  returns a compressed ZIP archive with separate documents for each item.
* `enabled_documents(self, refresh:bool=True) -> List[Any]`: return a list of only the "enabled" documents in the bundle
* `as_flat_list(self, key:str='final', refresh:bool=True) -> List[DAFile]`:
* `get_titles(self, key:str='final', refresh:bool=True) -> List[str]`:
* `as_pdf_list(self, key:str='final', refresh:bool=True) -> List[DAFile]`:
* `as_editable_list(self, key:str='final', refresh:bool=True) -> List[DAFile]`:
* `download_list_html(self, key:str='final', format:str='pdf', view:bool=True
      refresh:bool=True, include_zip:bool = True, view_label="View", view_icon:str="eye",
      download_label:str="Download", download_icon:str="download", zip_label:str=None,
      zip_icon:str="file-archive") -> str`: returns HTML for a table with download and view buttons, as for a download screen
* `send_button_html(self, key:str='final', show_editable_checkbox:bool = True)->str`:
* `send_email(self, to:any=None, key:str='final', editable:bool=False, template:any=None, **kwargs) -> bool`:

Example of a download screen that uses an `ALDocumentBundle`:

```yaml
---
progress: 100
id: download
event: petition_to_change_name_of_adult_download
question: |
  Your form is ready to download.
subquestion: |
  Thank you ${ user_name_first_new }. Your form is ready to download and deliver.
  
  View, download and send your form below. Click the "Make changes" button to fix any mistakes. 
  
  1. Download each of the documents below. Print at least two copies.
  2. Call the ${ trial_court } at ${ bold(trial_court.phone) } to find out how
  to deliver these forms. You can mail a copy to ${ trial_court.address.on_one_line() }.
  3. Get a **certified** copy of your birth certificate from the town hall
  where you were born.
  4. File one of the copies with the court. Keep the other for your records.
  
  ${ action_button_html(url_action('review_petition_to_change_name_of_adult'), label='Make changes', color='info', icon='pencil-alt') } 
  
  ${ action_button_html(al_user_bundle.as_pdf().url_for(), label="Download a copy as a single PDF", icon='download') }
  
  ${ al_user_bundle.download_list_html() }
  
  ${ al_user_bundle.send_button_html() }
```

### Using the `download_list_html()` method

```python
download_list_html(self, key:str='final', format:str='pdf', view:bool=True,
      refresh:bool=True, include_zip:bool = True, view_label="View", view_icon:str="eye",
      download_label:str="Download", download_icon:str="download", zip_label:str=None,
      zip_icon:str="file-archive") -> str
```

The default download table displays a row with a title, a "view" button which 
allows opening a PDF in-browser, and a "download" button that allows downloading
the PDF with one block. A row with a "Download as zip" button is also added
by default if there is more than 1 document in the table.

These defaults can be customized quite a bit. In addition to the parameters listed below,
the appearance can be controlled by editing CSS files. Take a look at the values in
[`aldocument.css`](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/main/docassemble/AssemblyLine/data/static/aldocument.css) 
and customize to match your needs.

It is also not necessary to use the `download_list_html()` method. If you
prefer, you can directly reference `enabled_documents` and create your own
download table format.

Parameters:

* `key`: either "final" or "preview"
* `format`: either "pdf", "docx", or "original", used to control the file linked to the "download" button
* `view`: display a button that links to a PDF version of the document, if possible
* `refresh`: controls whether the file should be cached
* `include_zip`: controls whether a "Download zip" button is added to a download list with more than 1 document
* `view_label`: label used for the "View" button
* `view_icon`: icon from [fontawesome](https://fontawesome.com)'s "free" library
* `download_label`: label used for the "Download" button
* `download_icon`: icon from [fontawesome](https://fontawesome.com)'s "free" library
* `zip_label`: text used for the row with the "zip" button. If not provided,
  this will refer to the value of `self.zip_label` which should be defined in a
  docassemble `template` block. This is to aid translation.
* `zip_icon`: icon from [fontawesome](https://fontawesome.com)'s "free" library

Example: customizing the text on the "zip_label" interview-wide:

```yaml
---
generic object: ALDocumentBundle
template: x.zip_label
content: |
  Download as one ZIP file
```

### Using the `send_button_html()` method

```python
  def send_button_html(self, key:str='final', show_editable_checkbox:bool = True, template_name: str = "")->str:
```

`send_button_html()` is used to display an HTML input that the user can interact
with to send themselves a copy of the contents of a bundle.

`send_button_html()` has two parameters:
  * `show_editable_checkbox` controls whether a checkbox will be displayed that allows the user to toggle including the DOCX version of templates in the email that they receive.
  * `template_name` controls the actual contents of the email sent to the user. By default,
    the value of the `send_email_template` attribute of this ALDocumentBundle is used (see
    below). This parameter is useful if you want to have two emails for the same bundle.

All of the text shown to the user, on the screen or in the email, can be customized. Copy each YAML block
below into your own interview to edit and customize the text.
It can be edited interview-wide (shown) or on a per-bundle basis.

Customize the text "Get a copy of the documents in email":

```yaml
---
generic object: ALDocumentBundle
template: x.get_email_copy
content: |
  Get a copy of the documents in email
```

Customize the text "Include an editable copy":

```yaml
---
generic object: ALDocumentBundle
template: x.include_editable_documents
content: |
  Include an editable copy
```

Customize the text "Download zip":

```yaml
---
generic object: ALDocumentBundle
template: x.zip_label
content: |
  Download zip
```

The subject and contents of the email can also be customized:

```yaml
---
generic object: ALDocumentBundle
template: x.send_email_template
subject: |
  % if len(x) > 1:
  Your ${ x.title } document is ready
  % else:
  Your "${ x.title }" documents are ready
  % endif
content: |
  Thank you for using our app!

  Please find the document for ${ users } attached.
```

## Working with overflow text, ALAddendumField and ALAddendumFieldDict

The `ALDocument` class has a special Addendum feature for working with fields
that may not fit into a PDF. For example: the PDF may have room for 3 lines, but
the user may have a longer story to tell.

Addenda can be used for both text fields and lists of items, such as children,
where the original form may not allow enough room.

The default addendum file for an AssemblyLine interview uses a special
attribute, `label`, to decide how to format the text in the addendum. It will
put objects, such as people, that are in a list into a table in the output.

### Overview

Each `ALDocument` has a dictionary attribute named `overflow_fields`. The
dictionary will contain a complete list of each field in the document that may
trigger the addendum. The length of each field will be evaluated to decide if
the addendum needs to be generated, based on the user's answers in the
interview. If there are no `overflow_fields` or each `overflow_field` is below
the specified limit for that field, no addendum will be generated.

You can use the AssemblyLine's default addendum template, which works well for a
court form, or you can supply your own template file to use for the addendum.
Usually, the addendum will be a Word document so it can expand to fit all of the
content.

Here is the basic process of using an addendum:

1. set the `has_addendum` attribute of the `ALDocument` to `True`
1. add an `ALAddendumField` object to the `overflow_fields` dictionary attribute
   of the `ALDocument` for each field that you want to handle in the addendum
1. set the `overflow_trigger` attribute of the `ALAddendumField` to match the
  maximum number of _characters_ or _items_ that may appear in that field
1. optionally, set the value of the `label` attribute of the `ALAddendumField`
   (this is used in the default addendum file)
1. Also optionally, se the value of the `headers` attribute of the `ALAddendumField`
   (used to control the order of columns in the default addendum's table)
1. optionally, specify the template file that you want to use for the addendum

### Assumptions and changes to whitespace

The addendum code does not preserve whitespace; both repeated spaces and
new lines will always be condensed.

### Customizing the order of columns in the default addendum

By default, the addendum provided with the Assembly Line will display
the column for every attribute of the object in a list. You may want to
control both the order and the set of attributes that is displayed. You can
do so by defining the `headers` attribute for the field.

`headers` should be a list of dictionaries in the order that you want the
column to appear, with the `key` being the name of the attribute and the `value`
being the column's label.

```yaml
---
code: |
  my_attachment.overflow_fields['attorneys'].headers = [
    {"name": "Name"},
    {"bbo_number": "Bar number"},
    {"firm": "Firm name"}
  ]
```

### Example

Below is a complete example that demonstrates how to use a custom addendum.

1. the addendum is enabled
1. we specify a custom addendum template
1. we add the `reasons_for_request` variable to the fields that will be checked
   for the addendum and say it can contain at most 640 characters
1. we limit the number of characters that will go onto the main PDF form to the "safe" number of characters   

```yaml
---
objects:
  # highlight-start
  - CRA_Motion_to_Dismiss_attachment: ALDocument.using(filename="CRA_Motion_to_Dismiss", title="Motion to Dismiss CRA", enabled=True, has_addendum=True, default_overflow_message="[See addendum]")  
  # highlight-end
---
objects:
  - al_user_bundle: ALDocumentBundle.using(elements=[CRA_Motion_to_Dismiss_attachment], title="Forms to download and deliver to court", filename="motion_to_dismiss_CRA.pdf")
---
attachment:
  # highlight-start
  variable name: CRA_Motion_to_Dismiss_attachment.addendum
  # highlight-end
  docx template file: CRA_Motion_to_Dismiss_addendum.docx
---
# highlight-start
code: |
  CRA_Motion_to_Dismiss_attachment.overflow_fields['reasons_for_request'].overflow_trigger = 640
  CRA_Motion_to_Dismiss_attachment.overflow_fields['reasons_for_request'].label = "Reasons for request"
  CRA_Motion_to_Dismiss_attachment.overflow_fields['children'].overflow_trigger = 3
  CRA_Motion_to_Dismiss_attachment.overflow_fields['children'].label = "Children"
  CRA_Motion_to_Dismiss_attachment.overflow_fields['children'].headers = [
    {"name": "Name"},
    {"birthdate": "Birthdate"},
    {"address": "Address"},
  ]
  CRA_Motion_to_Dismiss_attachment.overflow_fields.gathered = True  
# highlight-end  
---
attachment:
    variable name: CRA_Motion_to_Dismiss_attachment[i]
    name: CRA Motion to Dismiss
    filename: CRA_Motion_to_Dismiss
    skip undefined: True
    pdf template file: CRA_Motion_to_Dismiss.pdf
    fields: 
      # highlight-start
      - "reasons_for_request": ${ CRA_Motion_to_Dismiss_attachment.safe_value('reasons_for_request') }
      # highlight-end
      - "docket_number": ${ docket_number }
      - "user_signature": ${ users[0].signature_if_final(i) }
      - "signature_date": ${ signature_date }
```      

If you would like to make your own custom Addendum file, you can start by
examining the [generic
addendum](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/main/docassemble/AssemblyLine/data/templates/al_basic_addendum.docx)
file included in the AssemblyLine repository. This example is very flexible, and may have more features
than you need for your addendum.

### Custom parameters for the addendum code

The `safe_value()` method is used to control the options for putting text into the PDF.
The mirror, `overflow_value()` method can be used to control the text that is sent to
addendum. The options for both methods are the same. When you use `safe_value()`
and `overflow_value()`, you must use the same choices for each parameter to get consistent
results.

* `input_width: int` should equal the approximate width, in characters, of the input box on the PDF.
  We default to 80 characters, which is a typical of PDF field width. A full page-width PDF field at 12
  points Helvetica is about 99 characters. `input_width` is used to calculate the total number of 
  lines of text that fit in a multi-line input. It should be a whole divisor of the `overflow_trigger`.
* `preserve_newlines: bool` defaults to `False`. When `False`, all whitespace will be condensed to
  a single space. If `True`, repeated newlines will be replaced with a single newline. Repeated spaces 
  will be condensed to a single space. When the limit is less than or equal to one line, whitespace
  is always condensed.
* `preserve_words: bool` defaults to `True`. When `True`, the addendum code will not cut off words
  in the middle. Instead, the text will be shortened so the `safe_value()` ends with a complete word.
  When `False`, text may be cut off in the middle of a word, but only for fields that are less than
  one full line wide. Words will always be kept whole when the input exceeds one line in length.
* `overflow_message` can be used to provide a custom message when text is sent to the addendum. The
  AssemblyLine interviews default to an overflow message of `...`, but no default is provided in the
  addendum code itself.


## Handling uploaded documents

If you want to allow your user to upload a document, you have at least 3 options:

1. Insert the uploaded image or document into the template, using `Jinja2` tags
   in a DOCX file or using a `signature` field in a PDF. 
1. The `ALExhibitDocument` class, or
1. The `ALDocumentUpload` class.

### Choosing the right file upload method

Use a simple file field when someone needs to upload a single page or smaller
image that can be inserted into the middle of an existing template.

Use the `ALExhibitDocument` when you need to handle a set of multiple exhibits
of an unknown class and you want features like document titles, pagination, OCR,
and a table of contents.

Use the `ALDocumentUpload` class when someone needs to upload a full page document,
but you already know the title and you want it to be a standalone document in the
final download, or if you want to append it to an existing download at the end of
the interview.

### Using a simple file field

In a Word document, you can use a [`datatype:
file`](https://docassemble.org/docs/fields.html#file) field. Then,
put the field representing the file upload in your document with ordinary
`Jinja2` tags.

```yaml
---
question: |
  Upload a picture of your favorite pet
fields:
  - Pet picture: pet_picture
    datatype: file
    accept: |
      "image/*"
```

And the DOCX template would include something like this:

```
The user's favorite pet picture looks like this:

{{ pet_picture }}
```

You can also insert images into PDFs! When you prepare the PDF template,
use the `digital signature` field type. Then, use the `fields` statement
in the attachment block to assign the field to the PDF.

```
attachment:
  pdf template file: my_file.pdf
  fields:
    - "my_image_field": ${ pet_picture }
```

### Handling basic file attachments with the ALDocumentUpload class

The `ALDocumentUpload` class is the right choice when you:

1. need just one or a small number of documents uploaded
1. want the uploaded document to be attached as-is to your final output
1. don't need any of the special features of the `ALExhibitDocument` class.

`ALDocumentUpload` provides a simple wrapper around the `file` upload type
that just makes it compatible with the `ALDocumentBundle` class.

Documents uploaded using this class will be added as a standalone file inside
the bundle. They will typically fill the full page. This is perfect, for
example, if you need the user to upload some critical document and you know
exactly which document it is in advance. For example: a notice or letter that
you know the user should have received.

When the user needs to upload multiple documents and you want to provide flexibility
about which documents they upload and what order they are in, it may make more sense
to use the `ALExhibitDocument` class.

Example:

```yaml
---
objects:
  - eviction_notice_attachment: ALDocumentUpload.using(
          title="Eviction notice",
          filename="eviction_notice",
        )
---
depends on:
  - has_eviction_notice
code: |
  eviction_notice_attachment.enabled=has_eviction_notice
---
id: interview order
mandatory: True
code: |
  al_intro_screen
  # ...
  # highlight-start
  if has_eviction_notice:
    eviction_notice_attachment.file
  # highlight-end
  # ...
---
objects:
  # highlight-start
  - al_user_bundle: ALDocumentBundle.using(elements=[my_instructions, my_main_attachment, eviction_notice_attachment], filename="user_bundle.pdf", title="All forms to download for your records")  
  # highlight-end
---
id: eviction notice
question: |
  Eviction notice
subquestion: |
  If you have a copy of the notice you got from your landlord, upload it now.
fields:
  - Do you have the eviction notice available now?: has_eviction_notice
    datatype: yesnoradio
  - Upload it now: eviction_notice_attachment.file
    datatype: file
    accept: |
      "image/*"
    show if: has_eviction_notice
```


### Using the full power of ALExhibitDocument

Uploaded documents can raise a lot of complex issues, from validating specific
file formats and limiting size to a figure the server can process, to gathering,
organizing, and grouping pages. If you would like to handle files that are
uploaded by the interview user during the course of the interview, the
`ALExhibitDocument` class can handle some of the complexity for you.

`ALExhibitDocuments` have:

1. pre-written questions
1. validation of uploads for both size and valid image or document formats
1. the ability to add a document one page at a time, such as with a smartphone camera
1. the ability to add multiple labeled documents in one go
1. the ability to rearrange pages
1. an optional table of contents
1. an optional cover page for each document
1. optional page numbering
1. optional OCRing

To trigger asking for the user to upload documents at a specific time in your
interview, you can use the `.gather()` method of  `your_document.exhibits`.

You may want to
[customize](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/a652df44f9cc9ea87f81fe2d88053d2c1f773d97/docassemble/AssemblyLine/data/questions/ql_baseline.yml#L1469)
this screen by copying and pasting the block linked above into your interview.
This feature is fairly complex, so try just changing the wording and leave the
validation code alone.

You can use an `ALExhibitDocument` by creating an `ALExhibitDocument` in an 
`objects` block and adding that object to an `ALDocumentBundle`.

Below is a simple snippet that demonstrates how to use an `ALExhibitDocument`.

1. we use the default options, which include adding sequential Bates numbers to
pages, generating a table of contents, and adding individual cover pages for
each exhibit.
1. we trigger the questions about exhibits at a specific point in the interview.
1. we also add the `exhibit_attachment` document into the ALDocumentBundle
by adding it to the `elements=[...]` list inside the bundle's definition

```yaml
---
objects:
  - exhibit_attachment: ALExhibitDocument.using(
          title="Exhibits",
          filename="exhibits",
          # highlight-start
          add_page_numbers=True,
          include_table_of_contents=True,
          include_exhibit_cover_pages=True,
          # highlight-end
        )
---
id: interview order
mandatory: True
code: |
  al_intro_screen
  # ...
  # highlight-start
  if exhibit_attachment.exhibits.has_exhibits:
    exhibit_attachment.exhibits.gather()
  # highlight-end
  # ...
---
objects:
  # highlight-start
  - al_user_bundle: ALDocumentBundle.using(elements=[my_instructions, my_main_attachment, exhibit_attachment], filename="user_bundle.pdf", title="All forms to download for your records")  
  # highlight-end
```

### Customizing Exhibits

You can add your own template for the table of contents by customizing
`your_document.cover_page`. Use [the stock table of
contents](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/main/docassemble/AssemblyLine/data/templates/exhibit_table_of_contents.docx)
template as a model. It has some fancy math to figure out what page number to
start the exhibits at, based on whether it thinks the table of contents itself
will spill onto a second page.

You can add your own template for the individual cover pages for each document,
too. Use the [stock cover page
template](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/main/docassemble/AssemblyLine/data/templates/exhibit_table_of_contents.docx)
as a model.

By default, exhibits are labeled sequentially as `A`, `B,` and so on. You can supply your own method for 
labeling each exhibit by defining the `auto_labeler` attribute of the `your_document.exhibits` object
to be a Python function that accepts an integer and returns a string. The default labeler is just the 
docassemble function [`alpha`](https://docassemble.org/docs/functions.html#alpha). If, for example,
you wanted to use Roman numerals:

```yaml
mandatory: True
code: |
  exhibit_attachment.exhibits.auto_labeler = roman
```

where `roman` is referring to the [docassemble
function](https://docassemble.org/docs/functions.html#roman).

You can also define your own labeling function, like:

```yaml
mandatory: True
code: |
  exhibit_attachment.exhibits.auto_labeler = lambda y: str(y+1)
```

Which would make the exhibit labels `1`, `2`, and so on. You need to ensure that
your label override gets triggered, which is demonstrated above by adding the
`mandatory: True` modifier to the block that defines it.

### Using advanced OCR settings

OCR, or Optical Character Recognition, adds a layer of searchable text. This may be useful
if you expect users to take photographs of documents. Searchable text may also be a 
requirement for electronically filed documents in your jurisdiction.

By default, `ALExhibit` will be OCRed using docassemble's native code, which converts
images to gray-scale and is somewhat slow.

Optionally, you can tell AssemblyLine interviews to use an improved OCR system, OCRMyPDF.
To turn on OCRMyPDF:

1. Install OCRMyPDF as a Debian package inside your docker container.
2. Update your global configuration.

#### Installing OCRMyPDF

Edit your global configuration and find an entry labeled `debian packages`. Edit
or add it so that it includes `ocrmypdf`, like this:

```yaml
debian packages:
- ocrmypdf
```

Next, you can **either** start and then stop your docassemble docker container on the command
line, or manually install the application as follows:

```bash
docker exec -ti [TAB] /bin/bash
apt update
apt install ocrmypdf
```

#### Setting OCRMyPDF as the default OCR engine in AssemblyLine interviews

Find and edit the `assembly line` directive in your configuration so that it includes this line:

```yaml
assembly line:
  ocr engine: ocrmypdf
```

If this setting is missing or the `ocr engine` is set to anything other than `ocrmypdf`, the
default docassemble OCR engine will be used instead.

## ALStaticDocument

The `ALStaticDocument` class is provided to give you a simple method to include
plain PDF or Word instructions that do not have any variables included in them
and have only one version (rather than a preview and final version). It can also
work for image files or any file that can be converted to PDF.

To use an `ALStaticDocument` in your bundle, upload the desired PDF, Word,
or image file to the `static` folder in your docassemble package, and 
initialize it like this:

```yaml
objects:
  - my_static_file: ALStaticDocument.using(filename="my_static_file.pdf", title="Instructions", enabled=True)
---
objects:
  - al_court_bundle: ALDocumentBundle.using(elements=[my_static_file], title="Forms to download")
```

## Creating XLSX files with ALTableDocument

:::note

In progress!

:::

## ALUntransformedDocument

:::note

In progress!

:::