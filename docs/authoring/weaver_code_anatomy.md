---
id: yaml_anatomy
title: Anatomy of a YAML file
sidebar_label: Anatomy of a YAML file
slug: generated_yaml
---

The [Assembly Line Weaver](weaver/overview.md) generates code that is a starting point. It uses the [labels and variables you added to your documents](doc_vars_reference.md) to make an interview that uses questions and features from the AssemblyLine library.

This page breaks down what each of these "blocks" (the sections of text that appear between `---` separators) do individually, including a detailed reference for [interview metadata fields](#interview-metadata-and-metadata-for-publishing-on-courtformsonline). You don't have to think about every block as you develop your interview, but as you customize your interview or use more advanced features of [docassemble](https://docassemble.org/docs.html), knowing how these blocks fit together will help.

## Include

An `include` block incorporates content (code blocks, question blocks, etc.) from other YAML files. When you run the interview, docassemble acts as if all of the content in the YAML files listed below was copied and pasted right in this exact spot. This is described in more detail in the [docassemble documentation](https://docassemble.org/docs/initial.html#include).

This `include` block includes the core AssemblyLine package (`docassemble.AssemblyLine:assembly_line.yml`), giving you access to all of the pre-built questions and Python classes in AssemblyLine. It also adds any jurisdiction and organization packages that you picked in the Weaver (for example, `ALMassachusetts` and `MassAccess`).

:::note
Older interviews may include `docassemble.AssemblyLine:al_package.yml`, which is a legacy alias for `docassemble.AssemblyLine:assembly_line.yml`.
:::

```yml
include:
  - docassemble.AssemblyLine:assembly_line.yml
  - docassemble.ALMassachusetts:al_massachusetts.yml
  - docassemble.MassAccess:massaccess.yml
---
```

## Metadata

At minimum, [metadata block](https://docassemble.org/docs/initial.html#metadata) values control:

1. The text in this interview's browser tab (`title` / `short title`)
2. The name of the interview on a user's list of saved interviews if they are logged in
3. How the interview is indexed, categorized, and displayed on landing pages and form directories such as [CourtFormsOnline.org](https://courtformsonline.org)

You can explore additional standard docassemble metadata settings in the [docassemble documentation](https://docassemble.org/docs/initial.html#metadata).

## Interview metadata and metadata for publishing on CourtFormsOnline

Current AssemblyLine interviews use an expanded [metadata block](https://docassemble.org/docs/initial.html#metadata) that includes fields for user-facing landing pages, legal topic classification, jurisdiction, e-filing status, and maintenance tracking.

:::info
The `interview_metadata` dictionary variable used in early AssemblyLine interviews is deprecated. All metadata should be placed directly in the top-level `metadata:` block as shown below. You can also edit most of these fields visually in the Weaver via **More** $\to$ **AssemblyLine settings**.
:::

```yml
metadata:
  title: >-
    209A / 258E Motion for Impoundment
  short title: >-
    Motion for Impoundment
  description: |-
    This interview helps you fill out a form to ask the court to keep
    certain information in your 209A or 258E personal protection order
    or restraining order case private (impounded).
  can_I_use_this_form: |
    You can use this form if you want to ask the court to keep some
    information in your restraining order case private. This might include personal
    information or details about your case.
  before_you_start: |
    Before you start, gather information about what specific details
    you want the court to keep private and why this is necessary.
  when_you_are_finished: |
    When you are finished with this form, you need to download and file it with the
    court. The court will either let you know when you need to appear to argue
    your motion or they may decide based only on the paper that you file.
    Either way, you will wait about a week for a letter from the court.
  efiling_enabled: False
  integrated_efiling: False
  integrated_email_filing: False
  requires_notarization: False
  unlisted: False
  footer: >-
    Created by Suffolk LIT Lab and community partners.
  landing_page_url: >-
    https://courtformsonline.org/ma/forms/209a-258e-motion-for-impoundment
  maturity: production
  estimated_completion_minutes: 15
  estimated_completion_delta: 5
  LIST_topics:
    - "BE-04-00-00-00"
  # Keep legacy tags behavior for compatibility with downstream tools.
  tags:
    - "BE-04-00-00-00"
  authors:
    - Jane Doe
    - Suffolk LIT Lab
  approved_by:
    - name: Suffolk LIT Lab
      url: https://suffolklitlab.org
      logo: https://suffolklitlab.org/assets/logo.png
    - name: Massachusetts Trial Court
      url: https://www.mass.gov/info-details/trial-court
      logo: https://www.mass.gov/files/styles/organization_logo/public/2025-08/Trial-Court-Seal-Final-color.png?itok=tQKsUwsu
  original_form:
    - https://www.mass.gov/forms/motion-for-impoundment
  original_form_published_on: 2021-01-01
  help_page_url: >-
    https://www.mass.gov/info-details/impoundment
  help_page_title: >-
    Information about Impoundment
  allowed_courts:
    - "Boston Municipal Court"
    - "District Court"
    - "Probate and Family Court"
    - "Superior Court"
  typical_role: "plaintiff"
  al_weaver_version: "2.4.0"
  generated_on: "2026-01-15"
  languages:
    - en
  jurisdiction: "NAM-US-US+MA"
  review_date: 2026-01-15
  form_titles:
    - Motion for Impoundment
  form_numbers:
    - MPC-123
  fees:
    - Filing fee: 0.00
      description: "No filing fee for a motion for impoundment"
  update_notes: |
    Form created in 2021. Last reviewed 2026 with no changes needed.
---
```

### CourtFormsOnline metadata fields currently used

CourtFormsOnline currently reads and uses the following `metadata` keys from interview `/list?json=1` responses:

1. `title`
2. `short title`
3. `description`
4. `can_I_use_this_form`
5. `before_you_start`
6. `help_page_url`
7. `help_page_title`
8. `original_form`
9. `original_form_published_on`
10. `review_date`
11. `form_titles`
12. `form_numbers`
13. `fees`
14. `LIST_topics`
15. `jurisdiction`
16. `maturity`
17. `efiling_enabled`
18. `integrated_efiling`
19. `integrated_email_filing`
20. `requires_notarization`
21. `estimated_completion_minutes`
22. `estimated_completion_delta`
23. `languages`
24. `unlisted`
25. `footer`
26. `update_notes`

Newly supported metadata fields in CourtFormsOnline include:

1. `efiling_enabled`: Used for form status labels (for example, e-filing available).
2. `integrated_efiling`: Alternative key for e-filing availability; supported by CourtFormsOnline.
3. `integrated_email_filing`: Alternative key for email-filing availability; supported by CourtFormsOnline.
4. `requires_notarization`: Shows a notary warning and links to the jurisdiction-specific notary guide.
5. `unlisted`: Hides interviews from CourtFormsOnline listings.
6. `footer`: Reserved custom footer text (currently normalized and available to components).

### Expanded metadata fields reference

1. **Basic information and user guidance fields:**
   - `title`: The full name of the form. Shown on the interview's first screen, in the browser tab, in saved interview lists, and on directory listings such as CourtFormsOnline.
   - `short title`: A shorter name (up to ~25 characters) used in navigation bars or where the full title does not fit.
   - `description`: A plain-language summary of what the interview does and helps accomplish. Used on landing pages and search listings.
   - `can_I_use_this_form`: Explains when someone can and cannot use this form (eligibility conditions such as age, county, relationship, or case status).
   - `before_you_start`: Information, documents, or details users should gather before beginning. Also displayed by default on the interview's intro screen. Markdown lists and bullets work here.
   - `when_you_are_finished`: Instructions on what users should do after completing the interview (filing, service, what to expect). Used on landing pages and to guide the next-steps document.
   - `authors`: A list of people or organizations who authored or contributed to the interview. Shown in published metadata and the interview's "About" page.
   - `approved_by`: Optional list of organizations (with `name`, `url`, and `logo`) that officially approved or endorsed the interview, displayed on landing pages to convey authority and trust.

2. **Technical, filing, and administrative fields:**
   - `maturity`: Development status (`production`, `development`, or `testing`).
   - `estimated_completion_minutes`: How long most users take to complete the interview, in minutes.
   - `estimated_completion_delta`: Typical plus-or-minus variation in completion time (± minutes).
   - `languages`: List of ISO language codes for available translations (e.g., `en`, `es`).
   - `allowed_courts`: List of court departments/divisions where this form can be filed (e.g., `["Probate and Family Court", "District Court"]`, or `[]` if unrestricted). Editing this in the Weaver's AssemblyLine settings updates both `metadata:` and the `allowed_courts` variable in the interview code.
   - `typical_role`: Whether the person using the form normally starts the case or responds to one (`"plaintiff"`, `"defendant"`, `"unknown"`, or `"na"`).
   - `efiling_enabled`: Whether e-filing is available (`True`, `False`, or `"email"` for email filing workflows).
   - `integrated_efiling`: Boolean indicating whether integrated e-filing is enabled in the interview; accepted by CourtFormsOnline.
   - `integrated_email_filing`: Boolean indicating whether integrated email filing is enabled in the interview; accepted by CourtFormsOnline.
   - `requires_notarization`: Boolean indicating whether signing the completed form requires notarization.
   - `unlisted`: If `True`, excludes the interview from public CourtFormsOnline listings while keeping it reachable by direct link.
   - `footer`: Optional custom footer content for downstream display/integrations.
   - `al_weaver_version`: The version of `docassemble.ALWeaver` used to generate the draft interview (e.g., `"2.4.0"`).
   - `generated_on`: The date (`YYYY-MM-DD`) the draft interview YAML was originally generated by the Weaver.

3. **Help and reference fields:**
   - `help_page_url`: URL to official court instructions or legal aid help resources for this form.
   - `help_page_title`: Display label for the `help_page_url` link.
   - `original_form`: List of URLs (or a single URL string) pointing to the official blank PDF/DOCX form being automated.
   - `original_form_published_on`: Publication or revision date (`YYYY-MM-DD`) printed on the official blank form.
   - `landing_page_url`: Public URL for the form's landing page. If it is not a subdomain of `courtformsonline.org`, CourtFormsOnline will link directly to this URL from the form card instead of generating an internal landing page.

4. **Classification and organization:**
   - `LIST_topics`: [LIST / NSMI taxonomy](https://taxonomy.legal/) codes (e.g., `["BE-04-00-00-00"]`). Preferred method for legal issue categorization.
   - `tags`: Fallback taxonomy codes kept in sync with `LIST_topics` for compatibility with Docassemble's `/list` endpoint and downstream tools.
   - `jurisdiction`: Geographic scope using SALI/FOLIO jurisdiction codes (see https://openlegalstandard.org/), such as `"NAM-US-US+MA"` (adjust the two-letter state code at the end). Can also be a list, such as `["NAM-US-US+MA", "NAM-US"]`.
   - `form_titles`: List of human-readable names of the forms produced by the interview.
   - `form_numbers`: List of official court or agency form numbers (e.g., `["MPC-123"]`), or `[]` if none.
   - `fees`: List of filing fees or other costs (e.g., `- Filing fee: 0.00`), optionally with a `description` key on the item.

5. **Maintenance and updates:**
   - `review_date`: Date (`YYYY-MM-DD`) when the interview was last reviewed (or should next be reviewed) for legal/form updates.
   - `update_notes`: Changelog or record of review history and updates.

### Syndication tips

If you would like your state's forms to be syndicated on CourtFormsOnline.org, you should include at least the following metadata:

1. `title`
2. `short title`
3. `description`
4. `LIST_topics`
5. `jurisdiction`
6. `landing_page_url`

When `landing_page_url` is provided, we will index your forms on the landing page, an `all forms` page for your jurisdiction, and then link directly to your landing page from the individual form's card.

## Locale and repository settings

Immediately after `metadata:`, the Weaver generates small configuration blocks for address defaults and feedback integration:

```yml
code: |
  # This controls the default country and list of states in address field questions
  AL_DEFAULT_COUNTRY = "US"
---
code: |
  # This controls the default state in address field questions
  AL_DEFAULT_STATE = "MA"
---
code: |
  github_repo_name = 'docassemble-MotionForImpoundment'
  github_user = 'SuffolkLITLab'
---
```

1. `AL_DEFAULT_COUNTRY` and `AL_DEFAULT_STATE` pre-configure the country and state dropdowns in `address_fields()` questions.
2. `github_repo_name` and `github_user` tell the [GithubFeedbackForm](../components/GithubFeedbackForm/github_feedback.md) component which repository should receive user feedback and bug reports.

## Main intro page (`interview_short_title`)

Defines the call-to-action phrase inserted into the organization's intro page (`al_intro_screen`) at the very beginning of every interview. This lets your user know right away that they have reached the right (or wrong) form. It should be a direct call to action—such as `"File a 209A motion for impoundment"` or `"Ask the court to waive your filing fee"`—rather than a noun-phrase title.

New Weaver interviews generate `interview_short_title` as a `template:` block so it can be translated easily:

```yml
template: interview_short_title
content: |
  File a 209A or 258E motion for impoundment
---
```

:::note
In existing repositories, you will also frequently see `interview_short_title` defined in a `code:` block (`interview_short_title = "File a ..."`), which works identically.
:::

## Case type (`al_form_type`)

Changes the wording of shared AssemblyLine questions (such as party names and roles) and selects the appropriate Next Steps instruction template depending on its value:

- a court-case type: `"starts_case"`, `"existing_case"`, or `"appeal"`
- a letter: `"letter"`
- other: `"other"` or `"other_form"`

```yml
code: |
  al_form_type = "existing_case"
---
```

## AssemblyLine settings and Next Steps configuration (experimental)

:::caution Experimental feature in transition
Some Weaver-generated interviews include an `id: alweaver assemblyline settings` code block (with `initial: True`) that sets `al_next_steps_*` variables for a reusable Next Steps DOCX template or stores [magic variables](../components/AssemblyLine/magic_variables.md) edited through the Weaver's **AssemblyLine settings** panel. This mechanism is currently experimental and in transition, so its structure or how Next Steps and interview settings are stored may change in future Weaver releases.
:::

## People and custom objects (`objects`)

Declares the [`ALPeopleList`](../components/AssemblyLine/al_general.md#alpeoplelist) objects used in the interview (such as `users` and `other_parties`, or custom lists like `children`, `guardians`, or `witnesses`):

```yml
objects:
  - other_parties: ALPeopleList.using(there_are_any=True)
  - users: ALPeopleList.using(there_are_any=True)
---
```

- `.using(there_are_any=True)` tells AssemblyLine there is at least one person in the list and to ask if there are any additional people one at a time.
- `.using(ask_number=True, target_number=1)` tells AssemblyLine there is exactly one person in the list (skipping the "is there another?" question).
- `.using(ask_number=True)` asks the user upfront how many people are in the list.

Note that objects managed by AssemblyLine itself—such as `trial_court`, `courts`, `plaintiffs`, `defendants`, `petitioners`, `respondents`, `docket_numbers`, and `case_numbers`—are already declared by `assembly_line.yml` and do not need to be re-declared here.

## Navigation (`sections`)

[`sections`](https://docassemble.org/docs/initial.html#sections) works with [`nav.set_section()`](https://docassemble.org/docs/functions.html#DANav.show_sections) to display the left-hand navigation bar that shows users a roadmap of the interview and lets them jump to sections they have already completed.

The Weaver automatically organizes questions into logical sections, ending with a review section:

```yml
sections:
  - people: People
  - about_you: About You
  - case_details: Case Details
  - sign_and_submit: Sign and Submit
  - review_a_258e_motion_for_impoundment: Review your answers
---
```

## Interview order (and Main order)

Controls the order in which screens are shown and houses your interview's branching logic.

### Combined interview order block (default in new interviews)

By default, the Weaver generates a single `mandatory: True` interview order block (`id: interview_order_<form_name>`) that sequences the intro screens, your form-specific questions, analytics snapshot, preview, signature flow, and download screen:

```yml
#################### Interview order #####################
comment: |
  Controls order and branching logic for questions specific to this form
id: interview_order_a_258e_motion_for_impoundment
mandatory: True
code: |
  al_intro_screen
  a_258e_motion_for_impoundment_intro
  # Set the allowed courts for this interview
  allowed_courts = ["Boston Municipal Court", "District Court", "Probate and Family Court", "Superior Court"]
  user_role = "plaintiff"
  user_ask_role = "plaintiff"
  nav.set_section("people")
  users.gather()
  set_parts(subtitle=str(users))
  nav.set_section("case_details")
  impound_personal_information
  set_progress(25)
  trial_court
  docket_number
  set_progress(50)
  signature_date
  # Store anonymous data for analytics / statistics
  store_variables_snapshot(
      persistent=True,
      data={
          "zip": showifdef("users[0].address.zip"),
          "reached_interview_end": True,
      },
  )
  a_258e_motion_for_impoundment_preview_question
  basic_questions_signature_flow
  set_progress(100)
  a_258e_motion_for_impoundment_download
---
```

Here is what each part of the block does:

1. `al_intro_screen` and `a_258e_motion_for_impoundment_intro`: Show the organization-wide welcome screen and the form-specific introduction screen.
2. `allowed_courts`: Restricts which courts the user can pick from when selecting `trial_court`.
3. `user_role` and `user_ask_role`: Tell AssemblyLine whether the user is the party starting the case (`"plaintiff"`) or responding (`"defendant"`). If the typical role is `"unknown"`, the Weaver places `user_ask_role` on its own line so AssemblyLine asks the user their role.
4. `nav.set_section(...)`: Updates the active section in the left navigation bar. Placed after the intro screens so users cannot jump to review before answering questions.
5. `users.gather()` and custom question trigger variables: Trigger each question screen in order. You can reorder these lines or wrap them in Python `if` / `elif` / `else` blocks, either in code or visually in the [Interview order builder](weaver/interview_order.md).
6. `set_parts(subtitle=str(users))`: Adds the user's or client's name to the page subtitle and saved interview list. See [`set_parts` in the docassemble documentation](https://docassemble.org/docs/functions.html#set_parts).
7. `set_progress(...)`: Advances the progress bar at the top of the screen (from `0` to `100`).
8. `signature_date`: Prompts for (or sets) the date the form is signed.
9. `store_variables_snapshot(...)`: Saves anonymized session statistics. Using `showifdef("users[0].address.zip")` records the user's ZIP code if an address was already collected, without forcing the interview to ask for the user's address if it isn't otherwise needed.
10. `a_258e_motion_for_impoundment_preview_question`: Shows the [preview screen](#preview) before signing.
11. `basic_questions_signature_flow`: Runs the AssemblyLine signature flow (letting the user sign on their current device or text a link to sign on a phone) for every signature listed in `signature_fields`.
12. `a_258e_motion_for_impoundment_download`: Triggers the final [download screen](#download).

### Separate `interview_order` and `main_order` blocks

In older Weaver interviews, or when you enable the **Separate main order and interview order blocks** (`separate_main_order`) option to make it easier to [combine multiple interviews](combining_interviews.md), the Weaver splits the flow into two blocks:

1. **`id: interview_order_<form_name>`** (without `mandatory: True`), which contains only the form-specific questions and ends by setting `interview_order_<form_name> = True`.
2. **`id: main_order_<form_name>`** (with `mandatory: True`), which runs `al_intro_screen`, `<form_name>_intro`, `interview_order_<form_name>`, `signature_date`, `store_variables_snapshot(...)`, the preview and signature flow, and `<form_name>_download`.

## Your screens and questions

### Your interview's intro screen

Shown right after `al_intro_screen`. By default, the Weaver populates its `subquestion` using the `before_you_start`, `can_I_use_this_form`, and `estimated_completion_minutes` values from your metadata:

```yml
id: 209a 258e motion for impoundment intro
continue button field: a_258e_motion_for_impoundment_intro
question: |
  209A / 258E Motion for Impoundment
subquestion: |
  Before you start, gather information about what specific details
  you want the court to keep private and why this is necessary.

  You can use this form if you want to ask the court to keep some
  information in your restraining order case private.

  Most people take about 15 minutes to complete this interview.
---
```

### Custom question blocks

[Question blocks](https://docassemble.org/docs/questions.html) display the screens and fields specific to your form:

```yml
id: Information to be impounded
question: |
  Information to be impounded
subquestion: |
  Information that you impound will be kept private from the public record.
fields:
  - "Impound personal information": impound_personal_information
    datatype: yesno
  - "Impound case record information": impound_case_record_information
    datatype: yesno
  - "Case record information to be impounded": case_record_information_to_be_impounded
    maxlength: 340
  - "Impound information ex parte": impound_information_ex_parte
    datatype: yesno
---
```

### Copied Question Library blocks (`ql_baseline.yml`)

By default, the Weaver copies the AssemblyLine questions for the people lists used in your interview (`users`, `other_parties`, etc.) directly into your YAML file, replacing `generic object: ALPeopleList` (`x`) with your interview's specific object names:

```yml
comment: |
  The questions below are copies of the questions in AssemblyLine's
  ql_baseline.yml, rewritten to name this interview's own objects instead of the
  generic `x`. Edit them freely: they replace the AssemblyLine versions. Delete
  one to go back to the AssemblyLine wording.
---
id: users names
sets:
  - users[i].name.first
  - users[i].name.last
  - users[i].name.middle
  - users[i].name.suffix
question: |
  % if i == 0 and al_person_answering == "user":
  What is your name?
  % elif al_form_type in ['starts_case', 'existing_case', 'appeal']:
  Who is the ${ ordinal(i) } person on your side of the case?
  % else:
  What is the name of the ${ ordinal(i) } person who is adding their
  name to this form with you?
  % endif
fields:
  - code: |
      users[i].name_fields()
---
```

Because these blocks appear in your YAML file after `include:`, they override the generic library versions. You can edit their wording directly, or delete any block you don't need to customize so your interview falls back to the standard `ql_baseline.yml` question.

### Preview screen

Allows users to inspect an unsigned PDF preview of their completed packet and jump to the review screen to edit answers before signing:

```yml
id: preview a_258e_motion_for_impoundment
question: |
  Preview your form before you sign it
subquestion: |
  Here is a preview of the form you will sign on the next page.

  ${ al_court_bundle.as_pdf(key='preview') }

  Open the form preview in a new tab. Use the "Edit answers" button to edit your
  answers.

  ${ action_button_html(url_action('review_a_258e_motion_for_impoundment'), label=word('Edit answers'), color='info') }

  Return to this interview tab to continue and sign your form.
continue button field: a_258e_motion_for_impoundment_preview_question
---
```

:::note
For non-court forms (such as letters), the preview screen renders `${ al_recipient_bundle.as_pdf(key='preview') }` instead of `al_court_bundle`.
:::

### Signature fields and court-matching blocks

Following the preview screen, the Weaver generates helper code blocks for signatures and court venue lookup:

```yml
code: |
  signature_fields = ['users[0].signature']
---
code: |
  # This is a placeholder for the addresses that will be searched
  # for matching address to court. Edit if court venue is based on
  # a different address than the user's
  [user.address.address for user in users.complete_elements()]
  addresses_to_search = [user.address for user in users.complete_elements()]
---
```

- `signature_fields` lists the signature attributes that `basic_questions_signature_flow` will prompt for.
- `addresses_to_search` (generated for court-related interviews) tells the court locator which person's address determines court venue.

## Review screen

The browser's "Back" button rewinds the interview and deletes answers along the way. The [review screen](writing_review_screen.md) (`event: review_<form_name>`) lets users edit individual answers or lists of people without losing their progress:

```yml
id: a 258e motion for impoundment review screen
event: review_a_258e_motion_for_impoundment
question: |
  Review your answers
review:
  - Edit: users.revisit
    button: |
      **Users**

      % for item in users:
        * ${ item }
      % endfor
  - Edit: impound_personal_information
    button: |
      **Information to be impounded**

      Impound personal information: ${ word(yesno(impound_personal_information)) if defined('impound_personal_information') else '' }
---
id: edit users
continue button field: users.revisit
question: |
  Edit users
subquestion: |
  ${ users.table }

  ${ users.add_action() }
---
table: users.table
rows: users
columns:
  - Name: |
      row_item.name_full() if defined("row_item.name.first") else ""
edit:
  - name.first
confirm: True
---
```

For each list of people (`users`, `other_parties`, etc.), the Weaver generates a paired `continue button field: <list>.revisit` screen and `table: <list>.table` block so users can edit, add, or delete rows from the review screen.

## Download screen

The final screen of the interview (`event: <form_name>_download`), where users can view, download, print, or email their completed document packet:

```yml
id: download a_258e_motion_for_impoundment
event: a_258e_motion_for_impoundment_download
question: |
  All done
subquestion: |
  % if defined("users[0]"):
  Thank you ${ users }. Your form is ready to download and deliver.
  % else:
  Thank you. Your form is ready to download and deliver.
  % endif

  Use the options on this page to view, download and send your form. Use the
  "Edit answers" button to fix any mistakes.

  ${ action_button_html(url_action('review_a_258e_motion_for_impoundment'), label=word('Edit answers'), color='info') }

  ${ al_user_bundle.download_list_html() }

  ${ al_user_bundle.send_button_html(show_editable_checkbox=False) }

progress: 100
---
```

## Attachments and document bundles

### `ALDocument` objects

Each PDF or DOCX template in your interview is wrapped in an [`ALDocument`](../components/AssemblyLine/al_document_overview.md) object. Usually you need at least two versions of a document: an unsigned `"preview"` version and a signed `"final"` version. `ALDocument` manages both automatically and handles overflow addenda if a user's answers are too long to fit in a PDF field:

```yml
# ALDocument objects specify the metadata for each template
objects:
  - a_258e_motion_for_impoundment_Post_interview_instructions: ALDocument.using(filename="a_258e_motion_for_impoundment_next_steps.docx", title=str(a_258e_motion_for_impoundment_Post_interview_instructions_title), enabled=True, has_addendum=False)
  - a_258e_motion_for_impoundment_attachment: ALDocument.using(filename="a_258e_motion_for_impoundment", title=str(a_258e_motion_for_impoundment_attachment_title), enabled=True, has_addendum=False)
---
```

### `ALDocumentBundle` objects and title templates

[`ALDocumentBundle`](../components/AssemblyLine/al_document_overview.md) groups your `ALDocument` objects into two bundles:

- `al_user_bundle`: The packet shown on the download screen for the user's records (which includes the Next Steps instruction sheet by default).
- `al_court_bundle` (or `al_recipient_bundle` for non-court forms): The packet containing only the forms to be filed with the court or sent to the recipient (also used on the preview screen).

Document and bundle titles are defined in `template:` blocks so they can be translated:

```yml
# Bundles group the ALDocuments into separate downloads, such as for court and for the user
objects:
  - al_user_bundle: ALDocumentBundle.using(elements=[a_258e_motion_for_impoundment_Post_interview_instructions, a_258e_motion_for_impoundment_attachment], filename="a_258e_motion_for_impoundment", enabled=True, title=str(al_user_bundle_title))
  - al_court_bundle: ALDocumentBundle.using(elements=[a_258e_motion_for_impoundment_attachment], filename="a_258e_motion_for_impoundment", enabled=True, title=str(al_court_bundle_title))
---
template: a_258e_motion_for_impoundment_Post_interview_instructions_title
content: |
  Instructions
---
template: a_258e_motion_for_impoundment_attachment_title
content: |
  209A / 258E Motion for Impoundment
---
template: al_user_bundle_title
content: |
  All forms to download for your records
---
template: al_court_bundle_title
content: |
  All forms to deliver to court
---
```

### Attachment blocks

Each `ALDocument` has a corresponding [docassemble `attachment` block](https://docassemble.org/docs/documents.html#attachment) with `variable name: <document_var>[i]`. The index variable `i` is used as a placeholder for `"preview"` or `"final"` so signatures are only rendered when `i == "final"` (for example, via `users[0].signature_if_final(i)`):

```yml
# Each attachment defines a key in an ALDocument. We use `i` as the placeholder here so the
# same template is used for "preview" and "final" keys, and logic in the template checks
# the value of `i` to show or hide the user's signature
attachment:
  name: Post-interview-Instructions
  filename: a_258e_motion_for_impoundment_next_steps
  docx template file: a_258e_motion_for_impoundment_next_steps.docx
  variable name: a_258e_motion_for_impoundment_Post_interview_instructions[i]
  skip undefined: True
  tagged pdf: True
---
attachment:
  name: a 258e motion for impoundment
  filename: a_258e_motion_for_impoundment
  variable name: a_258e_motion_for_impoundment_attachment[i]
  skip undefined: True
  pdf template file: 209a_258e_motion_for_impoundment.pdf
  fields:
    - "signature_date": ${ signature_date.format() }
    - "user_signature": ${ users[0].signature_if_final(i) }
    - "impound_personal_information": ${ impound_personal_information }
    - "impound_case_record_information": ${ impound_case_record_information }
    - "case_record_information_to_be_impounded": ${ a_258e_motion_for_impoundment_attachment.safe_value("case_record_information_to_be_impounded") }
    - "impound_information_ex_parte": ${ impound_information_ex_parte }
---
```

### Overflow addendum configuration (optional)

When a PDF contains long text fields or repeated table rows that might exceed the space on the form (`has_addendum=True`), the Weaver generates an `overflow_fields` configuration block at the end of the file (and uses `.safe_value("field_name")` in the `attachment` block):

```yml
code: |
  a_258e_motion_for_impoundment_attachment.overflow_fields["case_record_information_to_be_impounded"].overflow_trigger = 340
  a_258e_motion_for_impoundment_attachment.overflow_fields["case_record_information_to_be_impounded"].label = "Case record information to be impounded"
  a_258e_motion_for_impoundment_attachment.overflow_fields.gathered = True
---
```
