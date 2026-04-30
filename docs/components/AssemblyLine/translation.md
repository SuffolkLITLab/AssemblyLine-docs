---
id: translation 
title: Translating your interview
sidebar_label: Translating your interview
slug: translation
---

The Assembly Line has several tools that build on Docassemble's native translation system
to help you offer your interview in multiple languages:

1. Widgets that you can display to allow the user to switch languages
1. A tool to generate blank translation XLSX files and a tool to help get translation quotes
1. Special variables to turn translation on and off and make it more convenient to list the available languages in your interview.

<details>
  <summary>Workshop: The Assembly Line’s AI-assisted interview translation workflow</summary>

  <iframe width="560" height="315" src="https://www.youtube.com/embed/oJoasdia2c4?si=1GejSB44IUoaFeuV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</details>

## Core concepts

### Language Codes

In Docassemble, you reference the language you are using with a short name of
your choice.

Most authors use 2-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 
language codes to name their languages. If there is no appropriate
2-letter code, you should consider using [ISO 639-3](https://en.wikipedia.org/wiki/ISO_639-3).

Some system phrases are already translated and keyed to the two-letter ISO 639-1
code. So it's a good idea to stick with this convention. But if you need to 
translate into a dialect and you can't find an official name, feel free to use
one of your own invention, as long as you use the same one everywhere for that dialect. The official code is just a convention.

### XLSX File format

Docassemble interviews can be translated by adding a special Excel spreadsheet (XLSX format)
in the `sources` folder of your package. Docassemble's translation system
works without requiring you to maintain multiple YAML files. The translated phrases are loaded
"live" when you run your interview.

### What the translator sees

In the XLSX file, the translator sees two columns: one with English (or your source language)
phrases, and an empty column where they can write the translated phrases.

Any mako tags that you used, for example, `${ variable }`, will be visible in the English
version of the cell, but will be highlighted in a distinct color. Similarly, HTML will also
be highlighted.

### Text that isn't translated using the XLSX translation system

Some parts of the interview require special handling:

* Buttons and system phrases need to be translated in a `words.yml` file.
    * At this writing, the AssemblyLine has words.yml translation files for Spanish, Arabic, French, and Nepali, named es-words.yml, ar-words.yml, etc.
* Blocks that do not use Mako, like the `sections` block, need to be translated
  in-place with the `language` modifier.
* Literal Python strings, like you might use in a call to `validation_code()`

When a phrase has not been translated yet, the user will not get an error. Instead, Docassemble will show the default language.

Translation works off of an exact match. When you change the original language
of a question, the translation will no longer be valid. Even changes to 
punctuation and white space will cause Docassemble to ignore the translation and
show the page in its original language.

## Making a translation file

Use the ALDashboard's "Prepare Translation Files" menu item to make a new translation file,
ready to send to your translator.

The tool also will calculate how many words in the given language need to be translated,
without counting Mako and HTML code. The number it provides is suitable for you to share
with a translation vendor.

Note that if you have several YAML pathways in your interview, you may encounter duplicate
phrases across the translation files. Most vendors will have an automated method to detect
this.

## Variables used in translated interviews

These variables control the Assembly Line's language system. For a complete list of
all Assembly Line special variables, see [Special variables](magic_variables.md).

* `enable_al_language`: defaults to True, turning it off can partially ensure the language system in AssemblyLine doesn't interfere with existing language systems. It should be relatively easy for authors to migrate to this new system though.
* `al_user_default_language`: can be controlled by interview author, this determines the language when the user makes no selection of their own. Defaults to "en".
* `al_interview_languages`: a list of language codes, presumably ISO-639-1 (Alpha-2), like ["en","es"] etc. The Assembly Line also contains a translation of several common language codes into the native-language version of the language (e.g., `es` is translated as `Español`).
* `al_user_language`: normally set via a URL argument, a language question, or the inline language list. This stores the interview-wide language choice.
* `session_local.al_user_language`: an optional browser-session override used by the navigation dropdown. If it is set, the interview will use this value before falling back to `al_user_language`.

## Session-local and interview-wide language choices

Assembly Line now supports two layers of language selection:

1. `al_user_language` is the interview-wide language. Use it when you want the primary user's language choice to remain the default for the interview, such as from a landing page, an early language question, or the inline `get_language_list()` helper.
1. `session_local.al_user_language` is a per-session override. The navigation dropdown uses it so one browser session can switch languages without changing the language another user sees in the same interview.

This is especially useful in multi-user interviews. For example, one signer can keep the interview in Spanish while an advocate or a second signer views the same interview in English.

## Make the translation file available in your interview

1. Add the new XLSX file into `sources` folder in your package.
2. Add a `translations` block

```yaml
translations:
  - MyPackage.xlsx
```

:::caution Add the translation block up top

Because of the way translations are loaded,
you need to add the translations block **before**
any other questions or includes in your interview.

If you have the `translations` block later in your
file, it won't have any effect on questions defined
closer to the top of the file.
:::

## Methods to change interview language

### Drop-down menu selector with `get_language_list_dropdown()`

When `al_interview_languages` is defined (which is the default) and has at least 2 items,
the Assembly Line will add a drop-down menu item in the top right that allows the user
to switch languages at any time.

The drop-down menu now changes language only for the current browser session by setting
`session_local.al_user_language`. This makes it a good fit for live help, advocate review,
and multi-user interviews where different people may need different languages at the same time.

You can customize this drop-down menu with a block like this:

```yaml
---
default screen parts:
  navigation bar html: |
    % if enable_al_language and len(al_interview_languages) > 1:
    ${ get_language_list_dropdown(al_interview_languages, current=session_local.attr("al_user_language") or al_user_language, extra_class="text-dark", icon="fa-solid fa-language fa-xl") }
    % endif
```

By using your own `navigation bar html` block, you can customize the `icon` and `extra_class` parameters.
Use `extra_class` `text-dark` if your navigation bar is light, rather than the default dark navigation bar
color. This class applies to the `anchor` tag that surrounds the icon.

By default the icon is the [FontAwesome `language` icon](https://fontawesome.com/search?q=language&o=r)
at size `xl` (extra large). You can customize the `icon` parameter with a unique icon name and any other 
FontAwesome custom [styling options](https://docs.fontawesome.com/web/style/styling).

### In-line language list with `get_language_list`

On the first screen of the interview, you may want to just show the user a list of the languages directly in the `subquestion` area, where it is more visible,
rather than directing them to the dropdown menu.

You can call `get_language_list()` to achieve this.

This helper uses the `al_get_language_list_change_language` event by default, so it updates
the interview-wide `al_user_language` instead of the session-local override.

Example:

```yaml
subquestion: |
  ${ get_language_list(lang_codes=al_interview_languages, current=al_user_language) }
```

### Ask the user a question

If you want to be absolutely sure that the user encounters the language
question, you can directly ask the user a question. Setting `al_user_language`
this way updates the interview-wide language choice:

```yaml
id: language
question: |
    What language / que idioma?
fields:
    - Language/idioma: al_user_language
      datatype: radio
      choices:
        - English: en
        - Español: es
```

### Switching language on the fly

Make sure that expert users of your tool, like advocates
shadowing or looking over the shoulder of an unrepresented
litigant, know that they can use the dropdown menu to switch
language "live."

For example, the SRL can work through the interview on their own
until a point at which they get stuck. Then the helper can change 
to English to understand what is happening on the screen, and speak
with an interpreter to give the SRL instructions.

This can be helpful for bilingual assistance
settings.

### Pre-launch in a specific language with special url parameter `lang`

If you would like to share the interview in a bilingual landing
page rather than forcing the user to change the language 
dynamically, use the `lang=CODE` URL argument.

E.g.,

`https://apps.suffolklitlab.org/start/uptocode/?lang=es`

The interview will launch in the language specified by
the language code (if it is translated into that language).

This sets the interview-wide `al_user_language`, so it is still the best choice
for language-specific landing pages and other entry points where you want the
language choice to be sticky.

:::note
If the URL already has a `?` in it, replace the `?` with an `&`.

(this is a standard part of URL arguments).
:::

## The `al_change_language` and `al_get_language_list_change_language` events

Assembly Line now uses two language-switching events:

1. `al_change_language` is used by `get_language_list_dropdown()`. It stores the selected language in `session_local.al_user_language`, so the change only affects the current browser session.
1. `al_get_language_list_change_language` is used by `get_language_list()`. It updates `al_user_language`, so the change becomes the interview-wide language choice.

On each request, the built-in `initial: True` block checks for `session_local.attr("al_user_language")`
first. If that value exists, Assembly Line applies it. Otherwise it falls back to `al_user_language`.

You normally do not need to define either event yourself, but this is the current built-in logic:

```yaml
---
initial: True
code: |
  if enable_al_language:
    if session_local.attr("al_user_language"):
      set_language(session_local.attr("al_user_language"))
    else:
      set_language(al_user_language)
  process_action()
---
event: al_change_language
code: |
  # Set browser-specific language for this interview session
  if "lang" in action_arguments():
    session_local.al_user_language = action_argument("lang")
    set_language(session_local.al_user_language)
---
event: al_get_language_list_change_language
code: |
  # Set the interview-wide language
  if "lang" in action_arguments():
    al_user_language = action_argument("lang")
    set_language(al_user_language)
```

## A complete example

```yaml
---
translations:
  - my_interview_es.xlsx # The translation file list should be the first section of the interview
---
include:
  - docassemble.AssemblyLine:assembly_line.yml
---
metadata:
  title: My interview
---
code: |
  al_interview_languages = ["en", "es"]  # List each available language, including English, using the ISO code
---
default screen parts:
  # Customizing this section isn't required. Here
  navigation bar html: |
    % if enable_al_language and len(al_interview_languages) > 1:
    ${ get_language_list_dropdown(al_interview_languages, current=session_local.attr("al_user_language") or al_user_language, extra_class="text-dark", icon="fa-solid fa-language fa-xl") }
    % endif
---
sections:
  - section_intro: Getting started
  - section_you: About you
  - section_case: About your court case
  - section_defenses: Claims and defenses
  - review_eviction_answer: Review your answers
  - section_download: Download, print, deliver, and file
---
language: es # The sections block is NOT in the interview translation XLSX file
sections:
  - section_intro: Empezar
  - section_you: Sobre usted
  - section_case: Sobre su caso judicial
  - section_defenses: Reclamaciones y defensas
  - review_eviction_answer: Revisar sus respuestas
  - section_download: Descargar, imprimir, entregar y presentar  
---
id: intro
question: |
  File a My Interview document
subquestion: |
  Use this interview to file a "MyInterview" document in 3 steps:

  1. ...
  2. ...
  3. ...
pre: |
  ${ get_language_list(lang_codes=al_interview_languages, current=al_user_language) }
```

## Customizing the native-language display of a language code by duplicating and editing `data/sources/languages.yml`

When it is possible, the dropdown menu of languages provided by the Assembly Line will display the language name in the native
name for that language. E.g.,  `es` is translated as `Español`.
We didn't find a standard Python library that provides this functionality, so this functionality is provided by a file named
["languages.yml"](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/main/docassemble/AssemblyLine/data/sources/languages.yml).
We manually translated the codes for about 45 common first languages for migrants to the United States.

If you have a language your interview is available in that isn't contained in this file, you can copy
and customize the ["languages.yml"](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/blob/main/docassemble/AssemblyLine/data/sources/languages.yml).
**Be sure to place the customized file in the `data/sources/` folder in your Docassemble package, not in the normal `questions` folder.** 
The custom version will be substituted
for the built-in version. Most US-based legal aid providers won't find it necessary to customize this
file. We also welcome pull requests to add to the list of supported languages.

If a language code is not listed in `languages.yml`, the Assembly Line functions try the following strategies, in order:

1. Uses an English-language translation of the language code. E.g., `es` is listed as `Spanish`.
1. Displays the literal language code. E.g., `es` stays `es`.

## Read more

You can read more about the stock language features in the official Docassemble [language features documentation](https://docassemble.org/docs/language.html).

Also, see the documentation for the [AL language module](language.md) for complete API documentation of all language-related functions.

### More complex multi-lingual interviews you can inspect

* [MADE](https://gbls.org/MADE), ([GitHub source code](https://github.com/GBLS/docassemble-maevictiondefense))
* [UpToCode](https://getuptocode.org), ([GitHub source code][https://github.com/LemmaLegalConsulting/docassemble-HousingCodeChecklist])
* [Massachusetts 209A Abuse Prevention Petition](https://courtformsonline.org/dv/#209A), ([GitHub source code](https://github.com/suffolklitlab/docassemble-MA209AProtectiveOrder))
