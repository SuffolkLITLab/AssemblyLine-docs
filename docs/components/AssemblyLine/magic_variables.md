---
id: magic_variables
title: Special variables for Document Assembly Line interviews
sidebar_label: Special variables
slug: magic_variables
---

## Server-wide configuration options

These are settings that can be configured by editing the global server
configuration. They are not configurable on a per-interview basis.

### Enable or disable answer sets

Add the following entry in your global
[config.yml](https://docassemble.org/docs/config.html#edit) to turn on the
[Answer Set](components/AssemblyLine/answer_sets.md) feature that allows users to save answers for reuse in other
interviews.

```yaml
assembly line:
  enable answer sets: True
  enable answer set imports: True
```  

The `enable answer set imports` feature separately controls whether users can
import answers from a JSON file that is uploaded to the server. While this
allows user control over their data and can be especially helpful for tests,
this feature carries some risk and is disabled by default.

### Use the AssemblyLine interview list replacement

The AssemblyLine framework includes a replacement for Docassemble's "stock"
list of in-progress interviews. It has the following improvements:

1. It is significantly faster to load
1. Results are sorted so the most recent interview is on top
1. It displays answer sets on their own tab
1. It hides the "tag" feature
1. It includes a "start new form" button

If the information is available, the replacement interview list feature can also show a percent
complete for each interview in the list.

If you would like to use the AssemblyLine interview list instead of Docassemble's
stock list, edit your configuration to add the following line:

```yaml
session list interview: docassemble.AssemblyLine:data/questions/interview_list.yml
```

#### Customize the interface of the interview list replacement

If you like, you can customize the appearance of the interview list page
by editing your global configuration.

Here is a complete list of the settings you can customize:

```yaml
  app homepage: https://courtformsonline.org # link you visit when you click on the logo
  assembly line:
    enable answer sets: True
    interview list:
      page title: In progress forms # Title of the tab in your browser
      page question: In progress forms # Title in the "question" area of the page
      page subquestion: null # custom text below the "question" area
      new form label: Start a new form # button label to start a new interview
      new form url: https://courtformsonline.org # link that button will visit
      logo url: null # Defaults to `app homepage`
      logo image url: https://app.yourserver.org/packagestatic/docassemble.AssemblyLine/ma_logo.png # needs to be the URL to an image, but it can be a relative one, like /packagestatic/...
      logo image alt: Logo
      answer sets title: Answer sets
      logo title row 1: null # Defaults to same value as `page title`
      logo title row 2: null # Defaults to same value as `page heading`
      exclude from interview list:
        - docassemble.AssemblyLine:data/questions/al_saved_sessions_store.yml
        - docassemble.AssemblyLine:data/questions/interview_list.yml
```

To use this in your global configuration, you should skip anything you do not want to configure.

If you would prefer, you can make a copy of the interview_list.yml file, override each
of these variables as needed, and point to your custom copy instead.

#### Enhance the custom interview list feature
If you use the custom interview list feature and you would like to have
all of your interviews:

1. Save a descriptive name to the database, and
1. Save their progress to the database

So that both a name like "Smith v. Jones" and a progress like "50%" can
be displayed on the interview list page, add the following entry to the
global configuration's `assembly line` directive:

```yaml
assembly line:
  update session metadata: True
```

This option is enabled by default in Assembly Line 2.25.0 and higher, and
disabled by default in older versions.

#### Filter the sessions that appear in the session list

If you want to exclude some interviews from ever appearing in the session list,
you can add them to a list in the configuration's `assembly line` directive like
this:

```yaml
assembly line:
  interview list:
    exclude from interview list:
      - docassemble.MyAdministrativeInterview:menu.yml
```

#### Change the link used by the "Start a new form" button on the session list page

Edit the `assembly line` directive in the global configuration to look like this:

```yaml
assembly line:
  interview list:
    new form url: https://courtformsonline.org
```

#### Use a more performant OCR engine with ALExhibitDocuments

Edit the `assembly line` directive in the global configuration to look like this:

```yaml
assembly line:
  ocr engine: ocrmypdf
```

You must have ocrmypdf installed on your server.

## Organization-level configuration options

These variables are recommended to be set in a package that all of your
interviews include. Usually, they are the same for all interviews created by one
organization or for one jurisdiction.

They can be set in a code block like this:

```yaml
code: |
  SOME_OPTION = "some value"
```

Docassemble will use the code block that is "latest" (closest to the bottom) of
your main interview file. This way, you can include a default in a global file
and then override it as needed in an individual interview.


### `AL_ORGANIZATION_TITLE`

Used to set the organization title (which appears above the form title) in the
navigation bar.

By default, this variable is set to the value of
[`appname`](https://docassemble.org/docs/config.html#appname) in the system-wide
configuration.

```yaml
code: |
  AL_ORGANIZATION_TITLE = "CourtFormsOnline"
```

### `AL_ORGANIZATION_HOMEPAGE`

Used to set the `exit url` and the url that you will be taken to if you click
the title in the navigation bar.

### `al_logo`

Used to set a small icon (ideally 40px high, max) that will be displayed next to
the form title and brand name in the navigation bar.

Example:

```yaml
---
objects:
  - al_logo: DAStaticFile.using(filename="lit_logo_light.png")
```

If your logo is taller than 40px, you can add a CSS rule to limit the maximum
height, like this:

```css
.al-logo img {
  max-height: 40px;
}
```

Add this to a CSS file in your `data/static` folder that you then include in
your interviews directly or via a shared YAML file.

### Localization and translation variables

These variables are used for basic address and language configuration.
For the Assembly Line's advanced language switching system, see the
[Assembly Line language system variables](#assembly-line-language-system-variables)
section below and the [translation documentation](translation.md).

* `AL_DEFAULT_COUNTRY`: [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166) 2
  letter code representing the default country of the interview user for address
  questions. E.g., `US` for United States of America, `UK` for United Kingdom of
  Great Britain and Northern Ireland.
* `AL_DEFAULT_STATE`: [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)
  (usually 2 or 3 letter) code representing the abbreviation for the state,
  territory, or sublocality, used in address questions
* `AL_DEFAULT_LANGUAGE`: [ISO
  639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 2 letter code
  (or alternative, such as ISO-639-3) that matches a language for which you have
  either a `words.yml` translation file, a translation `XLSX` or `XLIFF` file,
  or both and is mentioned in a `language` block in your interview. Used to
  specify the default language of your interview.

### Terms of use specific variables

These appear only in the inline terms of use added in Assembly Line version `2.25.0`.


* `server administrator contact address`: Contact information for the terms of use. Defaults to the global config `server administrator email` if not defined. It can be defined in the global configuration as a "top level" configuration option.
* `default title`: Name of the organization that hosts your site. Defaults to `AL_ORGANIZATION_TITLE` if `default title` was not set to a custom value in the global configuration.
* The governing jurisdiction for the terms of use of your site defaults to the name of `AL_DEFAULT_STATE` or the name of `AL_DEFAULT_COUNTRY` if `AL_DEFAULT_STATE` is not defined. There is no corresponding global configuration variable.

## Interview-specific options

### `interview_metadata`

`interview_metadata` is a
[`DADict`](https://docassemble.org/docs/objects.html#DADict). Each key in
`interview_metadata` is itself a `DADict` and should be used for a specific
interview. This allows you to combine interviews into one "umbrella" interview
and still look up information that applies to just one interview. E.g., one
"child" interview might be available in English and Spanish, and a second only
in English.

Because the "umbrella" pattern is not widely used on CourtFormsOnline, this
block is not widely used at runtime. It is essentially optional although it is
produced in all interviews that are run through the Weaver. It is most useful as
a record of what the author intended when the form was run through the Weaver,
and is also available for you to make use of in more complex "umbrella"
interviews of your own. Keep in mind that you may need to make an upstream fix
to an interview to fix the `interview_metadata` because it is not likely the
upstream author kept this up to date with later changes to the interview.

Example:

```python
interview_metadata['my_interview']['al_weaver_version'] = "0.82.1"
interview_metadata['interview_i_included_in_this_umbrella_file']['al_weaver_version'] = "1.6.11"
```

Common keys:

Key                  |            Purpose     |     Example
---------------------|------------------------|----------------------
`al_weaver_version`  | documents the version of the Weaver the form was created with | 0.82
`generated on` |  documents the date the interview was created with the Weaver | 2021-05-28
`title` | The title of the form | 209a 258e motion for impoundment
`short title` | A shorter version of the title, appropriate for smaller windows | Impoundment motion
`description` | Narrative description | Use this motion for impoundment in a 209A or 258E restraining order case when you need to keep information on the form private.
`original_form` | Link to the original PDF/DOCX form, unfilled (not commonly used) | https://mass.gov/my_pdf.pdf
`allowed courts` |  A list of the courts the case may be filed in. Mostly relevant in Massachusetts; doesn't make sense in other states. | ["Superior Court", "Probate and Family"]
`categories` | Taxonomy classifiers that explain the type of form this is (usually from the LIST taxonomy at taxonomy.legal) | ["BE-04-00-00-00"]
`logic block variable`| Name of the interview order block | a_258e_motion_for_impoundment
`attachment block variable`| Name of the attachment block variable | a_258e_motion_for_impoundment_attachment
`typical role`| Common role that the form user has in the case | plaintiff

Some of these values are checked for emailed and e-filed pleadings.

### `AL_DEFAULT_OVERFLOW_MESSAGE`

Used to control the text displayed in an input box when text is too long to fit on a PDF.
The default is `...` if not specified.

### `addresses_to_search`

`addresses_to_search` should contain a list of `Address` or `ALAddress` objects that will
be used to locate the correct court for the user to file in.

By default, this will be a list of the addresses of each member of the `users` list.

### `al_intro_screen`

`al_intro_screen` should be a `continue button field` on your organization's
standard intro screen. We use this screen to help orient people who arrive at
the interview directly from a deep link and to briefly explain what
CourtFormsOnline.org is.

### `allowed_courts`

This is mostly relevant in Massachusetts. It should be a list of the names of
the Trial Court departments that accept this kind of pleading. It is used to
display the list of courts in interviews that use the court question contained
in the `docassemble.MassAccess` package.

Example:

```yaml
code: |
  allowed_courts = [
    "Housing Court",
    "Superior Court"
  ]
```

Massachusetts has a unified court system, with jurisdiction depending on the
court department. In other states, there may be a single court per county of
general jurisdiction, with adhoc assignment of case types to different branches
of the court in that county. Because of this, it's not likely that filtering
courts this way makes sense in other states.

### `al_form_requires_digital_signature`

This variable controls whether a third, "Sign after I print" option appears when
the user reaches a signature screen. If this variable is set to `True`, the only
options the user will see are "Sign on a phone with my finger" and "Sign on this computer with my
mouse".

```yaml
code: |
  al_form_requires_digital_signature = False
```

### `al_typed_signature_prefix`

Defaults to `/s/`. Controls the prefix when user decides to use a typed signature.

### `al_typed_signature_font`

Defaults to `"/usr/share/fonts/truetype/google-fonts/BadScript-Regular.ttf"`.

Can be the exact path to a font installed on the server. If it is not an exact path,
the font name will be searched for in `/usr/share/fonts` and `/var/www/.fonts`, with `.ttf`
appended to the filename.

### `al_form_type`

`al_form_type` is used to control some dynamic questions to give more specific
help information and to give some variables, like `user_started_case`, a smart default.

Valid values:

- Starts a new court case: `'starts_case'`. This will set `user_started_case` to `True`.
- Filed in or responding to an existing court case: `'existing_case'`
- Part of an appeal of a court case: `'appeal'`
- Form that is not filed in a court: `'other_form'`
- Letter: `'letter'`
- Other: `'other'`

### `al_person_answering`

Defines who is sitting in front of the screen--for example: the user or an attorney.

Defaults to `"user"`.

When the value is not `"user"`, will update the text in some questions in `ql_baseline.yml` so
that they say `${ users[0] }` instead of "you".

If you want to let the person sitting in front of the computer answer to say who they are, you
need to add your own question. For example:

```yaml
id: who is using this form
question: |
  Are you filling this out for yourself, or someone else?
fields:
  - I am filling this out for: al_person_answering
    datatype: radio
    choices:
      - Myself: user
      - As an attorney for someone else: attorney
```

### `github_repo_name`

Set this value to the name of the interview's GitHub repository, without the
owner name.

This variable is used to make the `about` page display the correct "last modified"
date and to let the GithubFeedbackForm add an issue to the correct repository when
someone wants to provide feedback.

If you leave this value blank, AssemblyLine will guess the value from your
installed package's name. However, it cannot guess the value when you run the
package from the playground. It is best to define it explicitly.

For example, if the URL to your package is
https://github.com/suffolklitlab/docassemble-AssemblyLine, then the value of
`github_repo_name` should be defined like this:

```yaml
code: |
  github_repo_name = "docassemble-AssemblyLine"
```

### `github_user`

Set this value to the name of the GitHub organization or user that owns the
interview's repository to make sure that feedback and the `about` page point to
the right place.

For example, if the URL to your package is
https://github.com/suffolklitlab/docassemble-AssemblyLine, then the value of
`github_user` should be defined like this:

```yaml
code: |
  github_user = "suffolklitlab"
```

If all of your packages are kept in a single GitHub organization, you might
choose to define this value on an organization-wide basis by placing it in a
shared YAML file, such as the YAML that defines your theme or other branding
elements.

### Assembly Line language system variables

These variables control the Assembly Line's built-in language switching system
defined in `al_language.yml`. See the [translation documentation](translation.md)
for complete usage examples.

#### `enable_al_language`

Controls whether the Assembly Line language system is active. Defaults to `True`.
Set to `False` to disable the language switching functionality if you need to use
a custom language system.

```yaml
code: |
  enable_al_language = True
```

#### `al_user_default_language`

The default language code (ISO 639-1 format) to use when a user hasn't selected
a specific language. Defaults to `"en"` (English).

```yaml
code: |
  al_user_default_language = "es"  # Default to Spanish
```

#### `al_interview_languages`

A list of language codes (ISO 639-1 format) that your interview supports.
When this list contains more than one language, the Assembly Line will
automatically show a language selection dropdown in the navigation bar.

```yaml
code: |
  al_interview_languages = ["en", "es", "fr"]  # English, Spanish, French
```

#### `al_user_language`

The interview-wide language choice. This is typically set automatically through
URL parameters, an early language question, or the inline language list, but can
be set directly if needed.

If `session_local.al_user_language` is set, Assembly Line will use that
browser-session value first and only fall back to `al_user_language` when no
session-local override exists.

#### `al_change_language` (event)

An event triggered when the user clicks a language selection link from the
navigation dropdown. The event handler stores the selected language in
`session_local.al_user_language` and calls Docassemble's `set_language()`
function.

This event is used internally by `get_language_list_dropdown()` so one browser
session can switch languages without changing the interview-wide language for
other users.

#### `al_get_language_list_change_language` (event)

An event triggered by the inline `get_language_list()` helper. The event handler
updates `al_user_language` from the `lang` action argument and calls
Docassemble's `set_language()` function.

Use this behavior when you want the language choice to become the shared,
interview-wide default for the current run of the interview.

### Screen reader control

#### `speak_text`

Controls whether the screen reader functionality is enabled.
The screen reader feature was added not primarily for blind users, but for people with
low literacy and users on shared workstations or when borrowing mobile devices.

Currently defaults to `True` (screen reader enabled). Set to `False` in a `mandatory` block to disable the text-to-speech functionality for the interview. This block must be before the `mandatory` block that runs your interview order.

```yaml
mandatory: True
code: |
  speak_text = False
```

## Run-time options

These options are ones that you can sometimes configure when you author the
interview, but they can also depend on questions that are asked during the
course of the interview.


### `al_user_bundle` and `al_court_bundle`

If your interview will be electronically filed or email filed, it should also define
2 `ALDocumentBundle` objects: `al_user_bundle` and `al_court_bundle`.

Use these exact names for the bundles, which are also created for you by the
Weaver. The e-filing code expects to see the `al_court_bundle` object defined.
The `al_user_bundle` object is used on error handling screens.

### `signature_fields`

`signature_fields` should be a list with the name of each signature field
that you want the interview to trigger in the signature flow as a string.

You can use a `code` block to define this in a way that reflects the user's
choices.

Example:

```yaml
code: |
  if has_attorney:
    signature_fields = ["users[0].signature", "attorneys[0].signature"]
  else:
    signature_fields = ["users[0].signature"]
```

### `trial_court`

`trial_court` should be an `MACourt` or `ALCourt` object representing the
court that the user has chosen to file the case in. This may be used
in some automatically gathered statistics as well as in e-filing code.

### `user_ask_role`

Several questions depend on the value of `user_ask_role` directly to address the
`user` correctly as either the party initiating or responding to a case.

`user_ask_role` should be exactly one of "plaintiff" or "defendant". Use "plaintiff"
when you mean "petitioner", and use "defendant" even if you mean "respondent". This
is just the internal shorthand for starting or responding to the case.

The Weaver will set `user_ask_role` directly if it can be, otherwise,
it will be asked to the user.

### `user_role`

`user_role` is set by set in a code block directly in interviews, or set by [`user_ask_role`](#user_ask_role).
It serves the same purpose as `user_ask_role`. However to simplify interviews, we suggest you
use `user_ask_role` instead.


### `user_started_case`

`user_started_case` is not intended to be defined directly. It is created based
on the value of `al_form_type` and if that doesn't provide enough information,
the value of `user_ask_role` is checked.

It is then used to make the question about `other_parties` dynamic.

### `al_menu_items_custom_items`

`al_menu_items_custom_items` allows you to add custom menu items to the dropdown/hamburger menu that appears in the interview navigation. Custom items are displayed before the default Assembly Line menu items (such as "Start over", "Exit and delete my answers", etc.).

This variable should be a list of dictionaries, where each dictionary represents a menu item. Each menu item should follow the standard Docassemble menu item format with these keys:

- `url` (required): The URL that the menu item should link to
- `label` (required): The text displayed for the menu item  
- `hidden` (optional): A boolean value that controls whether the menu item is visible. If `True`, the menu item will not be shown

#### Basic static menu items

For simple static menu items, you can use a `data` block:

```yaml
---
variable name: al_menu_items_custom_items
data:
  - url: https://example.com/help
    label: Help and Support
  - url: https://example.com/about
    label: About this form
```

#### Dynamic menu items with show/hide logic

For menu items that should appear or disappear based on user choices, use a `data from code` block with the `reconsider` modifier:

```yaml
---
reconsider: True
variable name: al_menu_items_custom_items
data from code:
  - url: |
      "https://example.com/help"
    label: |
       "Help and Support"
  - url: |
      url_ask(['download_progress'])
    label: |
       "Download my progress"
    hidden: not user_logged_in()
  - url: |
      "https://example.com/advanced"
    label: |
       "Advanced options"
    hidden: not showifdef("user_is_advanced")
```

#### Tips for dynamic menu items

When using dynamic menu items:

1. **Use `reconsider: True`** to ensure the menu items are re-evaluated on each page
2. **Avoid triggering undefined variables** by using functions like `showifdef()`, `defined()`, or `hasattr()` in your `hidden` conditions
3. **Use `data from code` for complex logic** since labels need to be Python string expressions (hence the `|` and quotes)
4. **Consider using `_internal.get('steps') < 2`** to hide items until the user has progressed past the first page

#### Example: Context-sensitive help menu

```yaml
---
reconsider: True  
variable name: al_menu_items_custom_items
data from code:
  - url: |
      "https://example.com/general-help"
    label: |
       "General help"
  - url: |
      "https://example.com/income-help"  
    label: |
       "Help with income questions"
    hidden: not showifdef("asking_about_income")
  - url: |
      url_action('save_progress')
    label: |
       "Save my progress"
    hidden: not user_logged_in() or (_internal.get('steps') < 2)
```

By default, `al_menu_items_custom_items` is set to an empty list, so no custom menu items will appear unless you define them.

### `users` and `other_parties`

The variables `users` and `other_parties` can be used directly in your template,
but they also have a special meaning in Assembly Line interviews.

The variable `users` should always contain the name of the party who the form
is for. Do not use it to store the name of an advocate or attorney, unless the
advocate or attorney is filing something on their own behalf, like an appearance.

The variable `other_parties` is reserved to represent the name of the opposing party
in the lawsuit. Not all forms contain a second party, so this variable is optional.

The Assembly Line runtime packages will assign the value of `users` or `other_parties`
to `plaintiffs`, `petitioners`,  `defendants`, and `respondents` dynamically.

## See also

- [List of reserved variable names](reserved_keywords.md)
