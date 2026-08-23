---
id: pdf_templates
title: Working with PDF files
sidebar_label: Working with PDF files
slug: pdfs
---

:::tip
If strict layout is not important, consider whether to use a DOCX template instead.

**Reasons to use PDF:**

* PDF files are usually the best choice if you are automating an approved court form that already exists as a PDF
* PDF files are good for heavily formatted content that includes columns and multiple fields on a single line

**Reasons to avoid PDF:**

* PDF documents are rigid, and may not contain enough room for real-world information
* Conditional logic must be applied field-by-field
* Lists and repeated data must be labeled one field at a time
:::

## Edit your PDF

PDF templates can be edited in:

* Adobe Acrobat Professional
* [the Gavel online free PDF editor](https://start.gavel.io/pdf)
* many other PDF editors that support Acrobat Forms (mostly paid)

The free [Gavel PDF editor](https://start.gavel.io/pdf) will meet most people's needs. It will allow you to:

1. add text, checkbox, and digital signature fields
1. easily rename fields
1. edit existing field properties

Gavel has [a page that talks about its PDF
editor](https://help.gavel.io/articles/automating-pdf-documents?query=pdf).

Adobe Acrobat can still be helpful. The most important feature it has that
Gavel lacks is the ability to automatically recognize blank spaces and turn them into fields. You may decide to use a trial version of Adobe Acrobat for this feature, which is only needed at the beginning of your project.

Watch a 2 minute video segment on [how to edit a
PDF](https://help.gavel.io/articles/automating-pdf-documents?query=pdf) with Gavel's editor.
<iframe width="560" height="315" src="https://youtube.com/embed/HHGTWJ4r2hk?start=83" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen alt="How to edit a PDF with Gavel's editor">
</iframe>


## Use limited field types

Use **only** these field types in your PDF document:

* text fields
* checkboxes
* signature fields

Do not use:

* radio buttons
* drop-down menus

## Turn off "scroll long text"

For all PDF fields, turn off the "scroll long text" option, as this is only
useful if the PDF is viewed on screen. docassemble interviews usually produce
forms that can be printed and filed.

## Use auto-expanding text fields for name fields

It's important to use the right kind of text field for different kinds of
fields. On occasion people may have very long names, and it isn't appropriate to
send someone's name to an addendum. One good solution for variable length fields
that cannot be sent to an addendum is to use the Adobe Acrobat font size "Auto".
When you use "auto" sized text, use the height of the field to make sure that
the text does not exceed 12 pts. Otherwise the completed document can look very
odd.

Illinois Legal Aid Online uses a maximum field height of 0.17 inches to limit font
size on name fields to no more than 10 pt.

## Format long text boxes with multi-line text

* Draw the box so that it makes one contiguous box that can extend over multiple lines. 
  Don't try to fit it on a partial line. It's OK that a little less text will fit.
* Turn on the "**multi-line text**" option for text boxes that can fit more than one line.
* Set the background color of the field to white if the existing PDF has lines pre-drawn to help
  handwritten form filling.

## Use the Assembly Line's standard field labels for PDF templates

Use the [specific names for labels](doc_vars_reference.md) for full
compatibility with the Assembly Line framework.

If you don't use the Assembly Line conventions, make sure you use only letters, numbers, and `_` in
field names. Avoid using `[]` or `.` as these can have special meaning in the Adobe Acroform
standard, resulting in unexpected display results when the PDF is filled in.

Avoid starting a field name with a number.

## Delete extra pages
If you have a Google, Adobe, Facebook, or Apple account, or if you're willing to make a new account, [Adobe will let you delete PDF pages for free online](https://www.adobe.com/acrobat/online/delete-pdf-pages.html). All your fields will be left alone. The documents will be saved in your account.

## Troubleshooting

### Adobe Live Cycle
If the form was created in Adobe Live Cycle, you will not be able to add form
fields that are compatible with docassemble.

To work around this,

1. Open the PDF in your favorite PDF editor.
2. Print the file to PDF using a print driver **other** than the Adobe PDF print driver. On Windows, use the Microsoft Print to PDF driver.
3. Load the PDF back in to Adobe Acrobat or gavel.io and add the PDF fields again, either manually or with auto detection.

### Corrupted or locked PDFs

If you run into a problem with the PDF, the PDF might be corrupted in some way.
This happens infrequently but often enough to be troublesome.

A few methods you might try:

1. Run the PDF through [Gavel](https://www.gavel.io/pdf)'s PDF unlocker. This can fix some PDF issues and is quick and easy.
2. Try the [QPDF](http://qpdf.sourceforge.net/) tool, a command line tool that can fix more broken PDF problems. Once you install it, use
   it like this: `qpdf YOUR_FORM.PDF --replace-input`.
4. Try printing the PDF as a PDF (see instructions above for Adobe Live Cycle) and adding all fields fresh.

### Some fields won't fill in, or two fields have the same value

1. Look for duplicate field names. In Adobe Acrobat, duplicate fields are marked with a `#` at the end of the field name. Note: if you merge 2 PDFs 
with the same field names, for example, in a document bundle, you still may have this problem. You can avoid this by flattening the PDF before merging.
1. Make sure you aren't using any special characters, like `.` or `[]`, in the field name
3. Try deleting the troublesome fields and re-add them manually. Sometimes the field itself can be corrupt even if most of the document works.

## Quality control checklist

Many of the below checkbox items can be verified by uploading the PDF to the [Weaver](weaver/overview.md), 
installed on your own docassemble server. When you upload a PDF to the Weaver, it will try filling in all of the PDF's fields with dummy data,
allowing for a quick visual inspection.

- [ ] All expected fields have labels and can be completed in the PDF. 
- [ ] All of the expected standard field names are recognized by the Weaver (marked in bold)
- [ ] Custom field names are all properly spelled, without typos
- [ ] The fields are all properly visually aligned with existing lines and boxes in the PDF
- [ ] There are no overlapping fields, and long text areas use one large box rather than multiple small boxes
- [ ] Long text areas use a white background fill rather than transparent to ensure multiple lines of text aren't bisected by the existing lines 
    in the document.
- [ ] PDF field names are valid. Use only letters, numbers, and _ in field names.
        - [ ] No field name should start with a number
- [ ] There are no duplicate field names in the PDF. Duplicates are marked with a `#` at the end in Adobe Acrobat.
- [ ] Font size is set to a consistent 10 or 12 pts for all fields, except for name fields which can use auto expanding text
- [ ] Checkboxes all use a consistent fill-in style. We recommend using the cross (`X`) to fill in the checkbox (under the Checkbox Properties | Options dialog in Adobe Acrobat).
- [ ] Checkboxes use the export value "Yes" (less important, but can resolve some rare issues)
- [ ] Signature fields use the `digital signature` field type in Adobe Acrobat or Gavel, not a standard text field.
