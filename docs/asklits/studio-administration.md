---
id: studio-administration
title: Administer hosted AskLITs
sidebar_label: Studio administration
description: Manage school organizations, invitations, approvals, usage, archives, and permanent deletion.
---

# Administer hosted AskLITs

The **Admin** button is available to platform operators. Organization owners and
administrators instead manage their own school through **Workspace → Members &
settings**. A school administrator is not automatically a platform operator.

For a new installation, see [Bootstrap an administrator](studio-deployment.md#bootstrap-an-administrator).
For the Suffolk service, request access from [litlab@suffolk.edu](mailto:litlab@suffolk.edu).

## Add a school and invite its initial professors

1. Open **Admin → Organizations → Add organization**.
2. Enter the school name and URL prefix, such as `example-law`. The prefix is
   unique across the service and uses lowercase letters, numbers, and dashes.
3. Open **Members, invitations & usage** for the school.
4. Enter the professor's email and select Author, Administrator, or Owner.
5. Create the invitation link and share it with the recipient. **Studio does not
   send the email for you.**

An Admin-issued invitation is tied to the email and organization, expires in
seven days, can be used once, and includes hosting approval. Pending invitations
can be revoked. Ordinary invitations created by school administrators do not
independently grant service-wide hosting approval.

Provisioning a school does not add the service operator to it. Invite an owner
who will manage that school's AskLits. Local accounts are managed by one school;
do not create a second local account with the same email or expect a cross-school
invitation to move an existing one automatically.

The member list and usage table support arrangements for a few professors at a
school, but there is no enforced seat limit, billing subscription, or automatic
invoice. Agree on fees and allowances separately.

## Open registration

During the December 2026 trial, authors can create local accounts without hosting
approval. The hosting-approval panel and approval status labels are hidden while
this policy is active. Usage reports, organization controls, and the $100 monthly
AI allowance remain available. Existing approvals are preserved; trial accounts
are not permanently approved. When the trial expires, unapproved authors need
approval to continue authoring and serving model answers.

Operators can extend or disable the trial using Fly settings; see
[Registration policy](studio-deployment.md#registration-policy).

## Approve accounts and manage local logins

Use **Admin → Hosting approvals** to search by name, email, or account ID and
filter pending, approved, or deleted requests. Review requests before approving
hosting. An OAuth login by itself does not authorize someone to incur hosted AI
costs. Approving hosting is separate from assigning a school role.

**Delete request** hides a pending request; it does not delete the account or
historical records. Find it under **Deleted requests** to restore it. Approved
accounts and operator accounts are protected from this action.

When local accounts are enabled for a school, its administrators can create,
disable, and reset them under **Workspace → Members & settings → Local accounts**.
Administrator-created initial passwords must be changed by the recipient.
Disabling or resetting an account revokes access as appropriate. Keep local
passwords out of shared documentation and public issue trackers.

For organization-restricted visitor access, configure verified Google Workspace
domains or Microsoft tenant IDs in **Gallery, links & sign-in**. You can enter
multiple domains. Microsoft authorization uses tenant IDs rather than trusting
an email suffix. These rules govern visitor access; they are not a blanket
hosting approval for everyone at the university.

## Monitor requests and cost

**Admin → Organizations** shows member counts, request volume, and estimated AI
cost for each school over the chosen period. **Members, invitations & usage**
provides school details. **Service usage** gives the overall view and monthly AI
allowance. Organization administrators can view their own school's usage from
workspace settings.

Usage includes provider attempts from public chat, preview, and evaluation,
including model judging. Reports distinguish successful, failed, unfinished,
and unknown-cost calls. Estimates use recorded token counts and configured
rates. They are not invoices and do not include Fly/Supabase hosting charges.
Usage reports do not expose visitors' prompts or answers to school administrators.

The Suffolk deployment starts with a **$100 monthly AI allowance**, measured by
UTC calendar month. The application reserves a conservative amount before a
model call; an unfinished or unknown-cost call can retain that reservation.
An AWS budget also sends alerts and can deny model invocation to the runtime
identity. AWS billing data is delayed, so the cloud budget alone is not an
instantaneous hard spending cap.

| Visible reference | Meaning and operator response |
| --- | --- |
| `monthly_ai_budget_exceeded` | Application monthly allowance reached. Check committed and held amounts; wait for the next UTC month or explicitly adjust the allowance. |
| `ai_model_pricing_missing` | A selected model lacks valid pricing for the budget guard. Correct its server preset. |
| `ai_provider_access_denied` | AWS denied model access. Check the budget action, runtime IAM policy, and model permissions. |
| `ai_provider_quota_exceeded` | Provider quota reached. Inspect AWS service quotas and relevant usage. |

Increasing the application limit does not undo an AWS denial. Investigate both
controls before resuming traffic. Do not ask a user to repeatedly retry a billing
failure as a troubleshooting step.

## Archive or restore an organization

Choose **Archive** on its row in **Admin → Organizations**. Archiving:

- Hides the school from active organization lists and authors' workspace selectors.
- Pauses its public AskLits, invitations, and new AI work.
- Cancels queued tasks; already-running work may finish.
- Preserves accounts, documents, versions, and usage history.

Select **Archived organizations** to find it later, inspect its records, or
**Restore** it. Restoring resumes access to published assistants. Canceled tasks
need to be started again, and previously revoked chat access does not revive.

## Delete an organization permanently

Archive it first, then select **Delete permanently** in the archived list. The
in-app confirmation explains the consequences and requires the organization name.
This is appropriate only when you accept losing its history.

Deletion removes the school's AskLits, revisions, knowledge bases, conversations,
attachments, invitations, membership records, and per-school usage history.
Managed local logins are removed; shared OAuth identities remain. Private original
files and export ZIPs are queued for background removal. A storage outage leaves
the cleanup queued for retry rather than making the deleted school restorable.
Keep the worker running to finish cleanup. Backups follow the deployment's
separate backup-retention policy; this action does not rewrite old backups.

Deletion waits for active work to finish. It is refused if the school manages a
platform administrator's local login or a local login used by another school;
resolve that account relationship first with the operator. There is no automatic
transfer or recovery button for a deleted organization.

Anonymous monthly spending totals remain so deleting a school cannot reset the
AI budget. A minimal service audit retains the deletion action, actor, and resource
ID. Those records do not preserve the deleted school's chat or usage history.
