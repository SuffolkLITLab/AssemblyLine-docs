---
id: signatures 
title: Collecting signatures
sidebar_label: Signatures
slug: signatures
---

## Triggering the gathering of a signature

In the AssemblyLine, you can gather signatures by triggering the variable
`basic_questions_signature_flow`. This sets off a gathering process which
allows the user to decide how they want to sign and then to gather a list of
signatures, one at a time.

Typically, this variable is mentioned in the `interview order` or `main order`
block of your interview. Make sure to mention it somewhere in the interview's
mandatory logic.

Example:

```yaml {12}
---
###################### Main order ######################
comment: |
  This block includes the logic for standalone interviews.
  Delete mandatory: True to include in another interview
mandatory: True
code: |
  al_intro_screen
  satisfaction_of_judgment_intro
  interview_order_satisfaction_of_judgment
  signature_date
  basic_questions_signature_flow
  satisfaction_of_judgment_download
```

## Deciding which signatures to gather

The AssemblyLine looks for the definition of a `list` of `strings` named
`signature_fields` to decide which variable names to gather during the signature flow.

Example:

```yaml
code: |
  signature_fields = ["users[0].signature"]
```

You do not need to know the definition in advance. You can make use of
normal Python logic to help build this list. The `attr_name()` method might
be especially helpful. For example:

```yaml
code: |
  signature_fields = [p.attr_name("signature") for p in people]
```

Creates a list of strings like `["people[0].signature", "people[1].signature"]`

:::note

The signature fields must be listed as strings, not as plain Python variables.

:::

## Customizing the kind of signature to gather

The `basic_questions_signature_flow` can trigger 4 kinds of signatures:

* Signature on a phone, with an option to text the user a link to sign or use a QR code.
* Signature on the same device by drawing it with a mouse.
* Signature by adding /s/, using a customizable font.
* No signature--that is, letting the user print and add a signature manually.

By default, the AssemblyLine requires the user to add a digital
signature when the `basic_questions_signature_flow` is triggered.

If you do not want to require a digital signature, you can set `al_form_requires_digital_signature`
to `False`. This lets the user sign after printing.

The `/s/` option is currently always offered.

You can make further customizations by making your own version of the
[`id: signature choice`](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/f4d50140cf6e274a8c5ad12d3f484762d8989a2f/docassemble/AssemblyLine/data/questions/ql_baseline.yml#L1417)
screen.

:::note

The AssemblyLine's text to sign feature can be handy for remote signing, but it only allows
you to text one person a link to sign the document. It is also "blocking."
You won't get notified when a signature is added, and if you click continue
before the signature is added, you'll see the signature screen yourself.

:::

### Limitation of `/s/` signature variable name

Currently, the AssemblyLine only provides a way to define a `/s/` signature when the variable name ends with
`signature`.

You can directly call `docassemble.AssemblyLine.sign.create_signature()` if you need a `/s/` signature
with a different variable name.

### Customizing `/s/` font or changing `/s/` to a different prefix

You can customize the simulated signature for jurisdiction-specific reasons, or
change the font by redefining `al_typed_signature_prefix` and `al_typed_signature_font`.

`al_typed_signature_prefix` defaults to `/s/`, and `al_typed_signature_font` defaults to
`"/usr/share/fonts/truetype/google-fonts/BadScript-Regular.ttf"`. 

A custom font can be given as the exact path to a font installed on the server. If it is not a path,
the font name will be searched for in `/usr/share/fonts` and `/var/www/.fonts`, with `.ttf` appended
to the filename.

## Using the signature inside a template

Signatures are always `DAFile` objects: even the `/s/` signature variation. This makes it easy
to have only one way to use them.

In a DOCX file, simply enclose the variable in Jinja2 tags, like: `{{ users[0].signature }}`. You may need to adjust spacing
for it to look right. A table can be helpful. For slightly
better safety, and any time that you have `skip undefined: False`, you can use `{{ users[0].signature_if_final(i) }}` to skip
rendering the signature on the preview page.

In a PDF document: make sure that the field where you want to add the digital signature is a [digital signature field](https://helpx.adobe.com/sign/authoring/fields/e-signature.html).
Then, add the field normally, like:

```yaml
attachment:
    ...
    fields:
        ...
        - "users1_signature": ${ users[0].signature_if_final(i) }
```

You can test whether you have the right kind of field by using the AssemblyLine Weaver tool. The preview it makes of your uploaded form will
have John Hancock in place of the correct kind of signature field.

:::note

Adobe has changed the name of the "digital signature field" several times, but the functionality still exists when you
click around. It's in different places in different versions of Acrobat.
[Gavel.io/pdf](https://gavel.io/pdf) makes the right kind of field and has only the one option.

:::

## docassemble's documentation

* [Gathering the user’s signature into a file variable](https://docassemble.org/docs/fields.html#signature)