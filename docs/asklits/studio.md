---
id: studio
title: Manage AskLITs in Studio
sidebar_label: Hosted Studio
description: Create, edit, evaluate, publish, and manage persistent AskLITs in the Suffolk LIT Lab hosted service.
---

# Manage AskLITs in Studio

[AskLit Studio](https://asklit.suffolklitlab.org) keeps your assistants, prompts,
knowledge bases, and published versions in one account. Use it to maintain an
assistant over time, collaborate within a school, or provide the backend for a
separate website such as Court Forms Online.

The [Streamlit scaffolder](building.md) remains an independent option. Its
exported apps run independently of Studio. Publishing in Studio does not deploy
or update an existing standalone Streamlit app.

## Sign in and obtain hosting approval

During the open-registration trial through December 2026, choose **Create account**
on the sign-in page to create a local account and workspace without approval or a
hosting fee. A configured Google sign-in also works where the provider permits it.
The trial is scheduled to end January 1, 2027 at 00:00 UTC unless extended.

Outside an open-registration period, hosting on `suffolklitlab.org` requires
approval and a small fee to recover hosting and AI usage costs. Email [litlab@suffolk.edu](mailto:litlab@suffolk.edu) with your
account email, school or organization, and intended use. The Lab arranges pricing
and usage allowances; Studio does not currently collect payments or enforce a
professor seat count.

Use the email/password form for a local Studio account, or an available Google or
Microsoft sign-in button. OAuth buttons depend on the deployment's configuration.
A local account does not require either provider. Using the same email with
multiple login methods does not automatically merge accounts.

An invitation from a service administrator can create your account in a specific
organization **with hosting approval included**. Follow the invitation, use the
specified email, and create a local password or use a configured sign-in provider.
Invitations expire after seven days and can be used once. If you already have a
local account, sign in; local accounts are managed by one organization, so ask the
Lab if an invitation targets a different school.

## Create and edit an assistant

1. On **Your AskLits**, select your organization and choose **New AskLit**.
2. Enter a display name. The initial URL name is derived from it.
3. In **Knowledge bases**, add reference documents and wait for indexing to finish.
   Keep separate knowledge bases for distinct source packets when useful.
4. In **Instructions**, define the assistant's task, boundaries, and prompt
   profiles. Use the relevant knowledge base for each profile.
5. In **Preview**, try questions, missing-information cases, and requests outside
   the assistant's scope. Preview uses the current draft and consumes AI usage.
6. In **Evaluate**, add scenarios and expected answers or rubrics. Select prompt
   profiles and models for a matrix when comparing alternatives. Review the
   displayed call count and service limit before running; model judges add calls.
7. Use **Save** to persist edits. Use **Publish** when the draft is ready for users.

Ordinary members can edit their own AskLits. Organization administrators can
manage all AskLits in their organization. Owners also manage administrator and
owner roles. Platform **Admin** access manages the service, approvals, and schools;
it does not automatically make an operator a member of every school.

## Drafts, publication, and updates

**Save** changes the draft. **Publish** creates a version for public users.
Changing a draft does not silently change the published version. New conversations
use the current published version; existing conversations can remain on the
version they started with. If sensitive material was published accidentally,
unpublish the assistant and contact the Lab rather than assuming a new publication
removes every previous conversation or stored record.

**Settings → Sharing → Version history** provides publication history.
**Unpublish** stops public access without deleting the saved draft. Archiving an
organization also pauses all its hosted AskLits. A frontend that already refers
to an AskLit ID continues to use that ID after you publish updates.

## Access, links, and galleries

In **Settings → Sharing**, choose an access mode, then use **Save access & link**.
These controls are separate from saving and publishing the content draft.

| Access mode | Who can open the assistant | Gallery behavior |
| --- | --- | --- |
| Public | Anyone | Eligible for listing when the organization gallery is enabled |
| Unlisted | Anyone with its link or ID | Not listed |
| Shared password | Visitors with an enabled per-AskLit password/code | Not listed |
| Organization sign-in | Authorized organization members or matching verified provider rules | Not listed |

**Unlisted is not private.** Use it for a public CFO assistant that should appear
only in CFO's own navigation. Use password or organization access when visitors
must be restricted. Shared passwords have no visitor usernames; you can create
multiple entries and disable them separately.

A stable link looks like `https://asklit.suffolklitlab.org/lit/housing-help`.
The organization controls `/lit/`; the author edits only `housing-help` in the
AskLit link field. URL names use lowercase letters, numbers, and dashes. Changing
the display name later need not change the established link.

Organization owners/admins configure the gallery in **Workspace → Members &
settings → Gallery, links & sign-in**. A saved draft alone does not appear:
the AskLit must be published, set to Public, and belong to an active organization
whose gallery is enabled. There is no intentional waiting period for listing.

For another frontend, use **Settings → Sharing → Integration → Copy bot ID**.
See [Connect Court Forms Online](court-forms-online.md).

## Run a simulation

Use **Settings → Student instructions** for the student’s role, exercise goals,
and preparation. This briefing can be up to 30,000 characters and appears above
the chat. It is separate from the opening message. Save and Publish to make it
visible to participants.

Uncheck **Show citations and reference excerpts to participants** when revealing
the source packet would spoil the simulation. Hidden excerpts are omitted by the
server, not merely concealed in the page. This setting does not guarantee that
the model cannot quote or paraphrase reference material it receives: put material
that the model must never see in Instructor notes instead of its knowledge base.

New AskLits retrieve at most three passages by default. Under **More settings**,
change **Maximum reference passages** when an exercise needs more context.
The maximum is a ceiling, not a quota: weak or duplicate matches are filtered.
Existing AskLits keep their saved limit. Visible references appear together under
**Sources**; they are retrieved passages, not a guarantee of which passages the
model relied on. Fewer passages reduce prompt size without an extra AI call,
but model generation and first-use embedding initialization also affect latency.

### Instructor notes

Under **Settings → Instructor notes**, enter teaching notes, assessment criteria,
or information that students should not see. These notes stay separate from
student instructions, published configuration, and the model's context. They are
not included in workspace downloads or Streamlit exports.

By default, only the author and authorized Studio collaborators can read them.
To share with instructors without Studio access, enable **Let instructors view
these notes with a separate password** and set a password of at least 12
characters. Instructors open **Instructor notes** on the chat page and enter that
password. Save applies note/password changes immediately, independently of
publishing the exercise. Leave the password field blank to retain it; uncheck
sharing to turn password access off.

The server checks the password before sending notes. Changing the password or
disabling sharing blocks subsequent requests, but cannot recall text someone has
already read or copied. A shared password can be passed to students; reserve
highly sensitive material for a system appropriate to that information.

## Visitor uploads and voice

In **Settings → File uploads**, enable chat attachments and optionally provide
instructions for interpreting them. Publish those changes. Visitors use the
paperclip control. Limits are three files, 5 MB each, 40 PDF pages, and 30,000
extracted characters per conversation. Supported converters and rejection rules
are enforced on the backend. Visitor attachments belong to that conversation;
they do not become the assistant's permanent knowledge base.

Browser speech input/output is the baseline voice option, subject to browser
support and microphone permission. In hands-free mode, the assistant can listen,
send a completed utterance, speak the answer, and listen again until stopped or
a session limit is reached. Browser speech recognition may use the browser
vendor's services; it is not a promise of offline processing.

Organization administrators can allow paid speech only when the deployment has
configured a suitable provider. The Suffolk monthly-budget configuration currently
disables paid speech; browser voice remains available. AI answers still incur
normal model usage even when speech itself is browser-based.

Public chat identifies the organization and AskLit ID and explains that AI can
make mistakes. Do not ask visitors to provide passwords, bank account numbers,
or identifying numbers. Consult the hosted [privacy policy](https://asklit.suffolklitlab.org/privacy)
and [terms](https://asklit.suffolklitlab.org/terms).

## Export and recovery

**Settings → Export** offers a workspace download and a Streamlit app export.
An export is a separate artifact: deploying it does not keep it synchronized with
Studio. Keep source documents and credentials according to your institution's
policies. Workspace import is intended for an empty AskLit and does not import
server credentials or execute uploaded application code.

For account, quota, or organization issues, see
[Administer hosted AskLITs](studio-administration.md).

For a short follow-up with no strong standalone match, retrieval keeps the best passage for continuity. Citation hiding applies to participant responses; authors and evaluation judges retain access to reference passages.
