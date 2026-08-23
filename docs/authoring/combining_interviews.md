---
id: combining-interviews
title: Combining multiple interviews
---

# Combining multiple docassemble interviews

When you use the [AssemblyLine Weaver](weaver/overview.md) to create an interview, it gives you a complete, standalone interview out of the box (like you see in [docassemble-ALWeaver](https://github.com/SuffolkLITLab/docassemble-ALWeaver)). But often, you need to combine several different forms or interviews into one unified, seamless user experience. 

For example, you might want to combine a "Petition for Guardianship" and a "Motion for Temporary Guardian" into a single flow, or bundle multiple housing code complaint forms.

This tutorial walks you through the step-by-step process of taking multiple standalone Weaver interviews and combining them.

## Key concepts

### 1. Repositories involved and merging strategies
When combining interviews, you are dealing with different logical components that may exist in one or more Docassemble packages (repositories):
- **The Umbrella Repo:** This repository contains the combined interview. It will have at least one `main_` YAML file that drives the entire combined process.
- **The Included Repos:** These are the repositories containing the individual forms. A well-structured included repo will have at least two YAML files: a `main_` file to run the document on its own, and the "included" file designed to be run in combination with a parent interview.

**Should you merge repos or leave them separate?**
You can keep the umbrella interview and included interviews in separate GitHub repositories. However, the main issue with leaving them separate is the extra complexity during installation. Before you can run the umbrella interview on a server, you must install all of the included repos. Merging them into a single repository simplifies deployment and maintenance, so consider merging unless the individual forms are heavily reused across many completely different projects.

- **Example of leaving separate (heavily reused):** The [Affidavit of Indigency](https://github.com/suffolklitlab/docassemble-ALAffidavitOfIndigency/) is a fee waiver form required in almost every court case where a user cannot afford fees. Because it is included in dozens of unrelated interviews, it lives in its own standalone repository.
- **Example of merging (combined packet):** The [Housing Code Checklist](https://github.com/SuffolkLITLab/docassemble-HousingCodeChecklist) involves multiple related letters and checklists that are almost exclusively used together in a housing context. These were merged into a single repository for ease of maintenance and deployment.

### 2. File naming conventions
To keep track of which files do what, we use a strict naming convention (note: you may see some older existing repos that do not follow this precisely, but you should adhere to this standard for new work):
- **Standalone and Umbrella files (`main_*.yml`):** Any interview that *can* run by itself should start with `main_`. This includes the umbrella interview (e.g., `main_joint_petition.yml`) and the standalone versions of individual forms (e.g., `main_repair_demand.yml`).
- **Included files:** The included version should just be named to follow the document itself, without `main_` and generally without `_included` or `_to_include` (e.g., `repair_demand.yml` or `petition_for_guardianship.yml`).

### 3. Managing includes and override patterns
When combining multiple files, the architecture of your `include:` blocks becomes very important. 

**Include order:**
Docassemble processes `include:` blocks from top to bottom. If two files define a question or code block for the exact same variable name, Docassemble will use the definition from the file that was included **last** (the one lower down in the list). You can use this to your advantage to purposely overwrite a generic question from a child interview with a more specific question for your umbrella interview.

**Override patterns:**
Sometimes you need to overwrite several questions from a child interview to make them fit the combined context. Rather than cluttering your umbrella `main_` YAML with these overrides, it often makes sense to create a dedicated `overrides.yml` file. You then include this file at the very bottom of your umbrella's `include:` block to ensure its questions take precedence over all others.

**Shared questions:**
If your umbrella interview and child interviews all need the same common questions or logic, consider using a `questions_shared.yml` pattern. You define the shared questions in this one file, and then all other files can include it. This pattern works best when your umbrella and child interviews exist in the same repository. If they live in separate repositories, sharing a single file is much harder, which is another reason we often recommend merging related forms into a single combined repository.

### 4. Main order vs interview order
Out-of-the-box ALWeaver creates two important driver blocks to run an interview:
- **The `main order` block:** This block has `mandatory: True`. It drives the UI experience for the user. It shows the intro screen, triggers the interview logic, handles the signature flow, and displays the final download screen.
- **The `interview order` block:** This block (usually prefixed with `id: interview_order_`) contains the variable dependencies and logic needed to fill out your specific form.

When you create an included file that will be part of a parent interview, in many cases you can simply delete the `main order` (the `mandatory: True` block) from the included file. It is typically the only mandatory block. The parent umbrella interview will provide its own `main order` block, which will then trigger the `interview order` block of your included file.

### 5. Modifying ALDocuments and ALDocumentBundles
Out-of-the-box, ALWeaver sets `enabled=True` directly inside the `ALDocument.using(...)` definition in the `objects` block. 

When including a file in a larger interview, you should **remove** `, enabled=True` from the included interview. Instead, set the `.enabled` attribute in independent code blocks in your umbrella `main_` interview using whatever logic is needed. We recommend using a single Python expression for robustness, so you can't accidentally forget a conditional.

**Important rule:** Crucially, adhere to the Docassemble best practice of using **one code block per task**. Do not put multiple `.enabled = ...` statements into a single `code:` block, as running code to enable multiple documents in one block could have unintended side effects. Each template should be explicitly enabled in its own distinct code block.

**How to ask the user which documents to turn on:**
You will often want to ask the user which forms they want to generate. Here are examples of how to do this in your umbrella `main_` interview:

*A single yes/no question:*
```yaml
id: ask for document
question: |
  Do you want to include a temporary motion?
fields:
  - no label: user_wants_temporary_motion
    datatype: yesnoradio
---
code: |
  motion_temporary_guardian_attachment.enabled = user_wants_temporary_motion
```

*Using a checkbox for multiple options:*
```yaml
id: choose forms to include
question: |
  Which forms do you want to prepare today?
fields:
  - no label: forms_to_prepare
    datatype: checkboxes
    choices:
      - Motion for Temporary Guardian: temporary_motion
      - Affidavit of Indigency: fee_waiver
---
# Notice the use of one code block per task to prevent side effects
code: |
  motion_temporary_guardian_attachment.enabled = forms_to_prepare["temporary_motion"]
---
code: |
  affidavit_of_indigency_attachment.enabled = forms_to_prepare["fee_waiver"]
```

*More complex logic (e.g., a defense is available, bypassing unnecessary questions):*

When determining if a document should be enabled based on multiple conditions, we highly recommend using a **single Python expression** instead of an `if/else` block. 

The primary benefit of a single expression is avoiding bugs: it is very common to write an `if` block and forget to define the `else` (or `False`) pathway. If Docassemble evaluates the block but doesn't hit a `True` condition and there is no `else`, the `.enabled` variable remains undefined, which will cause an error or trigger unwanted questions later.

You can turn multi-step `if` loops into a single Python expression by grouping logic with `and`, `or`, `not`, and parentheses:

```yaml
code: |
  # The document is enabled if the user explicitly wants it AND they have the valid defense.
  # This avoids showing questions that would lead to an outcome they don't qualify for.
  my_document_attachment.enabled = (
    forms_to_prepare["my_document"] 
    and user_has_valid_defense
  )
```

If you find an `if/else` block more readable for your specific scenario, you are free to use it! Just be extremely careful to test all pathways—especially when there are multiple nested lines of logic—and guarantee that `.enabled` is assigned a boolean value (`True` or `False`) no matter what path the user takes:

```yaml
code: |
  if forms_to_prepare["my_document"]:
    if user_has_valid_defense:
      my_document_attachment.enabled = True
    else:
      my_document_attachment.enabled = False
  else:
    # Do not forget this fallback!
    my_document_attachment.enabled = False
```

### 6. Managing the interview order and navigation blocks
Creating a unified flow requires careful management of navigation (`sections`), progress bars, and the `interview order` blocks.

**Creating a combined navigation block:**
The `sections` block defines the steps users see in the navigation bar. When combining interviews, you should define a single master `sections` block in your umbrella `main_` YAML that encompasses the steps for all included documents. Because combined interviews often involve optional forms, you may want to build a multi-level navigation block that dynamically turns sections on and off. See our [Dynamic navigation sections](../components/AssemblyLine/navigation.md) documentation for how to use `al_nav_sections` to gracefully hide steps for forms the user isn't completing.

Be sure to remove any `sections` definitions and `nav.set_section()` calls from the included files to avoid conflicts. Similarly, remove `set_progress()` calls from included files, as the progress percentages will change when forms are combined.

**Practical advice for logical ordering:**
How you trigger the logic depends on the user experience you want to create. You are relying on the [**named block pattern**](/docs/docassemble_intro/controlling-interview-order#triggering-code-and-then-continuing-using-named-blocks). Note that in Docassemble, **you cannot trigger a block by referencing its `id`**. Instead, the named block pattern involves defining a dummy variable at the very end of a code block. You trigger the block by referencing that *variable* in your main driver block. Because Docassemble is goal-oriented, it runs the entire code block just to find the definition of that variable.

- **Sequential chunks (General-purpose order block):** The easiest approach is to have the user answer all questions for Document A, and then all questions for Document B. A general-purpose `interview order` block included with the child form (e.g., `interview_order_document_a` followed by `interview_order_document_b`) works perfectly here, serving both the standalone and combined versions.
- **Interleaved questions (Multiple order blocks):** Sometimes it makes sense to ask questions about Document A, move to Document B, and then return to Document A later. For this, you should break the child's original `interview order` block into multiple sections (e.g., `interview_order_doc_a_part_1` and `interview_order_doc_a_part_2`), triggering them when appropriate in the umbrella interview.
- **Parent-defined ordering:** In highly complex combined interviews, it may be easier to abandon the child's `interview order` block entirely. Instead, the umbrella `main_` interview's order block simply lists all the required variables explicitly in the exact sequence needed for the unified flow.

**Duplicate interview order blocks:**
Because Docassemble prioritizes blocks in the main file over included files, you can define an `interview_order_*` block in the included file (without `set_progress` or `nav.set_section`), and redefine the exact same block `id` in your standalone `main_*.yml` file (with the progress and navigation steps added back) to offer the form by itself.

---

## Adding a new document to an existing combined interview

If you are joining a project that already has an umbrella interview set up (e.g., adding a new motion to an existing packet), you don't need to learn how to build the umbrella from scratch. Your pathway is much simpler. 

Here are the specific steps you need to take to add your document to the existing combined interview:

1. **Separate your global blocks:** Follow [Step 1](#step-1-clean-up-your-included-logic-file) below to remove global blocks (`metadata`, `mandatory`, magic variables, etc.) from your logic file so they don't conflict with the umbrella interview. 
2. **Include your logic file:** Open the umbrella `main_*.yml` file, find the `include:` block, and add your newly separated logic YAML file to the list.
3. **Add to the bundle:** Find the `ALDocumentBundle` definitions (usually `al_user_bundle` and `al_court_bundle`) in the umbrella `main_*.yml`. Add your `ALDocument` variable name (e.g., `my_new_motion_attachment`) to the `elements:` list so your form is included in the final downloadable packet.
4. **Trigger your logic:** Find the `interview_order` block in the umbrella `main_*.yml` (this is the `code` block triggered by the `mandatory` block). Add your form's trigger variable (e.g., `interview_order_my_new_motion`) to this list at the appropriate point in the sequence. If the user should have a choice whether to generate this form, trigger it conditionally (e.g., `if wants_new_motion: interview_order_my_new_motion`).
5. **Enable your document:** Add a new, independent `code` block to the umbrella `main_*.yml` to enable your document (e.g., `my_new_motion_attachment.enabled = True` or `my_new_motion_attachment.enabled = wants_new_motion`).
6. **Resolve conflicts:** Run the interview and make sure your form doesn't conflict with existing variables (like overwriting the `user_role` or using the same `docket_number` default). See [Step 4](#step-4-resolving-conflicts-and-finalizing) for more tips.

For a deeper dive into how this all works, read on.

---

## Step-by-step tutorial

### Step 1: Clean up your included logic file
Start by explicitly renaming your original driver file (e.g., `main.yml`) to follow conventions (e.g., `temporary_guardian.yml`). 

Then, separate out the global configuration blocks. You should remove the following blocks completely from your included logic file (if you want to keep a standalone version, you will move these to a new `main_` file in Step 2):
- The `metadata` block
- The `mandatory: True` block (the `main order` block)
- The `sections:` block (which defines the navigation menu)
- Any global configuration variables, such as:
  - `github_repo_name` or `github_user`
  - `template: interview_short_title`
  - `al_form_type`
  - Language variables (`al_interview_languages`, `al_user_default_language`, etc.)
  - `al_menu_items_custom_items`

If you leave these global blocks in your included file, they may conflict with or overwrite the desired settings of the parent umbrella interview. Your included file should instead primarily contain your questions, interview logic, and `ALDocument` definitions or `attachment` blocks (especially for PDFs).

**Remove redundant base includes:**
Find the `include:` block. If it includes base AssemblyLine files (like `docassemble.AssemblyLine:assembly_line.yml`, `al_massachusetts.yml`, etc.), remove those lines. Your umbrella `main_` file will handle importing the core libraries. While Docassemble handles double-includes safely, removing them keeps your code cleaner, prevents circular dependencies, and ensures the base libraries are loaded in the correct order exactly once by the main interview.

Then, find the `ALDocument` definition and remove `, enabled=True`.
**Change this:**
```yaml
objects:
  - motion_temporary_guardian_attachment: ALDocument.using(title="Motion for Temporary Guardian", filename="motion_temporary_guardian", enabled=True)
```
**To this:**
```yaml
objects:
  - motion_temporary_guardian_attachment: ALDocument.using(title="Motion for Temporary Guardian", filename="motion_temporary_guardian")
```

### Step 2: Create standalone versions (optional)
If you still want users to be able to run a single form by itself, create a `main_*.yml` file for it (e.g., `main_temporary_guardian.yml`). 

This standalone file should `include` the logic file from Step 1, and define the `metadata`, the global variables, the `mandatory: True` block, and enable the document. It is also where you can add back `set_progress()` and `nav.set_section()` calls by overriding the interview order block:

```yaml
---
include:
  - temporary_guardian.yml
---
metadata:
  title: Temporary Guardian
  # ...
---
#################### Interview order #####################
id: interview_order_temporary_guardian
code: |
  nav.set_section("review_temporary_guardian")
  set_progress(20) # Standalone adds progress back!
  # ...
  interview_order_temporary_guardian = True
---
code: |
  # Enable the document for the standalone version
  motion_temporary_guardian_attachment.enabled = True
---
# The Main Order
mandatory: True
code: |
  interview_order_temporary_guardian
  # ...
```

### Step 3: Create the umbrella `main_` YAML
Create your combined file (e.g., `main_joint_petition.yml`). 

This file will:
1. `include:` all your sub-interviews and the required base AssemblyLine libraries.
2. Define the global `metadata`.
3. Provide a master `interview_order` block that triggers the `interview_order_*` variables of the included forms.
4. Enable the `ALDocument` objects in **separate** code blocks using single Python expressions.
5. Create combined `ALDocumentBundles` that group the forms together.
6. Provide the `mandatory: True` block that drives the entire combined interview.

```yaml
---
include:
  - financial_statement.yml
  - divorce_joint_petition.yml
---
metadata:
  title: Joint 1A Divorce
  # ...
---
id: choose forms to include
question: |
  Which forms do you want to prepare today?
fields:
  - no label: forms_to_prepare
    datatype: checkboxes
    choices:
      - Financial Statement: financial_statement
---
# Enable documents using one code block per task to prevent side effects
code: |
  financial_statement_attachment.enabled = forms_to_prepare["financial_statement"]
---
code: |
  divorce_joint_petition_attachment.enabled = True
---
# Combine bundles
objects:
  - al_user_bundle: ALDocumentBundle.using(
      elements=[
        financial_statement_attachment, 
        divorce_joint_petition_attachment
      ], 
      filename="joint_petition_packet", 
      title="All forms to download", 
      enabled=True
    )
---
id: joint petition interview order
code: |
  forms_to_prepare # Ask the user which forms they want

  # Trigger the main divorce petition questions
  interview_order_divorcejointpetition

  # Conditionally trigger included interviews
  if forms_to_prepare["financial_statement"]:
    interview_order_financial_statement
    
  joint_petition_interview_order = True
---
mandatory: True
code: |
  al_intro_screen
  joint_petition_interview_order # Trigger the combined order block
  signature_date
  basic_questions_signature_flow
  divorcejointpetition_download
```

### Step 4: Resolving conflicts and finalizing
Review the combined interview to ensure a smooth user experience.

1. **Combine bundles:** To generate the final downloadable PDFs, you must combine the documents into a single packet. 
   - First, open each of your included YAML files and locate the `ALDocument` definitions inside their `objects:` blocks (e.g., `motion_temporary_guardian_attachment: ALDocument.using(...)`).
   - Copy just the variable name (the part before the colon, e.g., `motion_temporary_guardian_attachment`) for each document.
   - Then, in your umbrella `main_` YAML, locate or create the `al_user_bundle` and `al_court_bundle` inside an `objects:` block. 
   - Add the copied variable names to the `elements=[...]` list of these bundles. This tells Docassemble to include the documents from the child interviews in the final download screen of the parent interview. Example:
     ```yaml
     objects:
       - al_user_bundle: ALDocumentBundle.using(
           elements=[
             # Document from umbrella interview
             divorce_joint_petition_attachment, 
             # Document copied from included interview
             financial_statement_attachment
           ], 
           filename="joint_petition_packet", 
           title="All forms to download", 
           enabled=True
         )
     ```
2. **Resolving variable conflicts:** When combining forms from different sources, you will often run into overlapping or conflicting variables. Consider these common realistic conflicts:
   - **User vs. attorney:** Does the form expect to know if an attorney is completing it (`form_filled_by_attorney`)? If one form collects this but another assumes the user is pro se, you must align the logic across all forms.
   - **Fixed vs. flexible roles:** A source interview might be agnostic, allowing either a petitioner or respondent to complete it by asking a question to set `user_role`. But your umbrella interview might be *only* for a petitioner. In this case, you will need to align the variables (e.g., hardcode `user_role = 'petitioner'` in the `main_` YAML to bypass the role question) and ensure the templates reflect that logic appropriately.
   - **Default values:** If an included form sets `docket_numbers[0] = ''` by default, but the main interview expects to collect a docket number from the user, you must resolve this default initialization in the main YAML so it doesn't overwrite the user's input.
3. **Handling dependencies:** If your included interviews exist in separate repositories, you must add those repositories as dependencies in your umbrella repository's `setup.py` and `pyproject.toml` files so Docassemble pulls them in during installation.
4. **Smoothing shared routing logic:** Adjust text and logic to gracefully handle the combined context. For example, if a child interview assumes the user is only generating that specific form, you may need to open up the choices so the user can dynamically decide to create the form using the interview, upload an existing one, or wait until later.
5. **Handling large document packets:** Combined interviews often generate many documents. 
   - **Remove previews:** Remove document previews (e.g., `${ al_court_bundle.as_pdf(key='preview') }`) from signature screens. Generating a preview of a massive packet can be very slow or break the layout. Instead, use a simple confirmation message like *"Review your answers before you sign"*.
   - **Use background assembly:** If your interview generates more than ~3 documents, you should switch to background processing to prevent the server from timing out. Update your final download screen to use `al_user_bundle.download_list_html(use_previously_cached_files=True, include_full_pdf=True)`. See the [background assembly documentation](../components/AssemblyLine/background_assembly.md) for more details.
6. **Overriding attachment blocks:** Keep in mind that you can also override an attachment block (e.g., an `attachment:` block that generates a PDF) directly in the parent umbrella interview. Because Docassemble uses the last loaded block with a matching variable name, you aren't forced to make the included YAML totally reusable without changes. You can let the child interview define the base attachment block, and simply redefine it in your `main_` YAML if the combined context requires different formatting or logic.
7. **Document integration points:** It is crucial for the author to document the integration points of the child (included) interview. Clearly explain in comments or an external `README` what specific variables need to be set—especially those that might not be standard AssemblyLine variables—for the child interview to work properly when included in a parent interview.
8. **Test:** Run the main interview and verify that the sections flow logically, there are no missing variables, and progress bars or navigation menus behave smoothly.
