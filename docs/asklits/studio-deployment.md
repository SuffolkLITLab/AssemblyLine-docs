---
id: studio-deployment
title: Deploy and operate AskLIT Studio
sidebar_label: Studio deployment
description: Run the Python service and worker locally or with Fly.io, Supabase, OAuth, and static Next.js clients.
---

# Deploy and operate AskLIT Studio

The hosted implementation lives in the
[AskLit repository](https://github.com/SuffolkLITLab/asklit). It uses FastAPI and
Jinja templates for Studio, PostgreSQL for hosted metadata, and a separate Python
worker for indexing, evaluations, exports, and deletion cleanup. A Next.js client
such as CFO can remain a static export. The older Streamlit workflow remains
independent.

These instructions describe the implementation and Suffolk deployment. The
repository's [hosted deployment guide](https://github.com/SuffolkLITLab/asklit/blob/main/docs/hosted-deployment.md),
[Supabase guide](https://github.com/SuffolkLITLab/asklit/blob/main/docs/supabase-deployment.md),
and [Fly runbook](https://github.com/SuffolkLITLab/asklit/blob/main/docs/fly-hosted-deployment.md)
contain the detailed configuration reference. Treat old verification counts in
those guides as historical evidence, not the current deployment status.

## Fast local development

From the AskLit repository, use a Python virtual environment and install
`requirements-hosted.txt`. For a fresh local configuration:

```sh
cp -n .env.hosted.dev.example .env.hosted
python -m asklit.hosted init-db
uvicorn asklit.hosted.app:create_app --factory --reload --port 8000 --no-access-log
```

In another terminal using the same environment:

```sh
python -m asklit.hosted.worker
```

Open `http://localhost:8000`. Development credentials default to
`dev@asklit.local` / `asklit`; override them with `ASKLIT_DEV_USERNAME` and
`ASKLIT_DEV_PASSWORD`. `cp -n` preserves an existing `.env.hosted`, so inspect
existing configuration before expecting these defaults.

Development mode supports SQLite at `sqlite:///hosted-data/hosted.sqlite3`, one
API process, and one worker. It is restricted to loopback deployment. Editing
and saving do not need a provider key; actual chat/evaluation needs a configured
provider. Automated hosted tests use fake model responses and do not charge an
AI account. Never enable development login on the public service.

## Docker Compose database choices

Configure `.env.hosted`, then run:

```sh
docker compose --env-file .env.hosted -f compose.hosted.yml up --build -d
docker compose --env-file .env.hosted -f compose.hosted.yml logs -f api worker
```

| Database | Configuration |
| --- | --- |
| Bundled PostgreSQL | `COMPOSE_PROFILES=postgres`; set `POSTGRES_PASSWORD`; leave `ASKLIT_DATABASE_URL` unset for the Compose-generated connection. |
| SQLite for local development | Empty `COMPOSE_PROFILES`, `ASKLIT_DEV_MODE=true`, and `ASKLIT_DATABASE_URL=sqlite:////var/lib/asklit/hosted.sqlite3`. |
| External PostgreSQL/Supabase | Empty `COMPOSE_PROFILES` and the server-only `postgresql+psycopg://…` connection URL. Disable dev mode for public deployment. |

The migration service runs before the API and worker. Switching database settings
does not migrate data between databases. Stop the old stack before changing
profiles, and retain backups when replacing persistent storage.

## Bootstrap an administrator

A production local account does not require Google or Microsoft. After migrating
the intended database, run the operator command from a trusted backend environment:

```sh
python -m asklit.hosted create-local-admin \
  --email admin@example.edu \
  --name "School administrator" \
  --organization "Example Law School" \
  --slug example-law
```

The command prompts for a password rather than putting it in shell history.
This creates a local organization owner with hosting approval. Sign in using the
local email/password form and complete any password-change requirement.

Platform Admin is a separate privilege. Obtain the intended user's ID from
`GET /api/me` while signed in (or a trusted database inspection), verify the
account, and explicitly grant it:

```sh
python -m asklit.hosted set-operator --user-id VERIFIED_USER_ID
```

Run this against the deployment database, not a disposable SQLite file. There is
no public bootstrap endpoint. Do not create another bootstrap account simply to
reset an existing password. Existing organization administrators can manage local
accounts when that feature is enabled; the CLI also provides
`enable-local-accounts --organization-id ORGANIZATION_ID` for initial setup.

## Registration policy

`ASKLIT_REQUIRE_AUTHOR_APPROVAL=true` is the base production setting. The optional
Fly secret `ASKLIT_OPEN_REGISTRATION_UNTIL=2027-01-01` waives approval until
January 1, 2027 at 00:00 UTC. That gives a trial through December. The application
checks the date dynamically, so expiry does not need a deployment.

Extend the trial without editing code, for example through January:

```sh
fly secrets set --app asklit-studio ASKLIT_OPEN_REGISTRATION_UNTIL=2027-02-01
```

Set `ASKLIT_REQUIRE_AUTHOR_APPROVAL=false` for indefinite open registration. To
end a trial immediately with the base setting still true, unset
`ASKLIT_OPEN_REGISTRATION_UNTIL`. If the base flag was changed to false, restore it
to true too. Secret changes restart Fly machines; the automatic date boundary
does not. Keep private deployment configuration files in sync with these settings.

Open registration enables a local **Create account** form, changes the approval
and fee messaging, and hides hosting-approval controls and status labels in Admin.
It does not grant permanent approval, verify local email addresses, bypass school
membership, or disable spending limits. Existing explicit approvals survive
policy changes. Trial accounts need approval after the trial ends; saved work is
preserved, but unapproved authors' model calls and editing are blocked.

## Supabase and private storage

Use PostgreSQL for production and multiple workers. Set these server-side values:

```dotenv
ASKLIT_DATABASE_URL=postgresql+psycopg://USER:PASSWORD@POOLER:6543/postgres?sslmode=require
ASKLIT_STORAGE_BACKEND=supabase
SUPABASE_URL=https://PROJECT.supabase.co
SUPABASE_STORAGE_BUCKET=asklit-private
SUPABASE_SERVICE_ROLE_KEY=SERVER_ONLY_SECRET
```

Use the actual connection string from your project rather than the placeholders.
The adapter disables prepared statements for transaction pooling. Create a
**private** bucket, with file-size limits sufficient for export ZIPs. Original
documents and exports must be shared by API and workers; separate machine-local
upload directories are not suitable for a multi-machine deployment.

Run `python -m asklit.hosted init-db` for each release before new code serves
requests. Migrations protect `hosted_*` tables with RLS and revoke browser-role
access. Supabase Auth is not required; Studio handles its own account sessions
and OAuth. Neither Supabase service credentials nor direct database access belongs
in the static frontend.

Back up database records and private objects together. Transcript expiration does
not delete permanent knowledge-base files. Permanent organization deletion queues
its tracked objects for worker cleanup; monitor that worker and storage health.
A cleanup failure retains the queued key for retry. Backups require their own
retention and access policy.

## HTTPS, domains, and OAuth

Use `https://asklit.suffolklitlab.org` as the Suffolk Studio and API origin.
`ASKLIT_BASE_URL` must match the external HTTPS origin. Configure DNS and a valid
certificate at the hosting/proxy layer; enabling Cloudflare proxying does not
substitute for a working origin configuration. The static client also uses HTTPS.

Register provider callback URIs exactly:

```text
https://asklit.suffolklitlab.org/auth/google/callback
https://asklit.suffolklitlab.org/auth/microsoft/callback
```

Google uses `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`; Microsoft uses
`MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, and the configured
`MICROSOFT_TENANT`. Keep credentials server-side. For Google's consent screen,
configure the application homepage, the hosted `/privacy` and `/terms` URLs, and
the required domain verification. A client in Testing is not generally available
just because its callback works for listed test users. Confirm provider
publication and permitted account types separately before announcing SSO.

For a static CFO origin, configure `ASKLIT_CORS_ORIGINS` as described in the
[CFO integration guide](court-forms-online.md). Provider callback URIs return to
the Python backend, not to CFO's static page. Keep proxy logs from recording
cookies, authorization headers, callback query strings, or chat bodies.

## Suffolk deployment and model configuration

The Studio Fly app is `asklit-studio` in `suffolk-lit-lab`. Its
`fly.hosted.toml` defines API and worker processes and a migration release command.
Supabase provides PostgreSQL and private Storage. The separate static frontend's
Fly configuration lives in the CFO repository; deploying Studio does not redeploy
CFO.

In the AskLit repository, merging to `main` triggers the Fly deployment workflow.
Hosted tests must pass before Studio deploys. Check the workflow, migration result,
API health, and worker health after merging. The workflow uses an app-scoped
`FLY_STUDIO_API_TOKEN` secret. Renew deployment tokens before expiry and keep
production environment files outside version control.

The Suffolk model runtime uses **Suffolk AWS**, not Lemma AWS. Select the Suffolk
CLI profile when performing operator tasks. Server-only runtime credentials are
restricted to configured Bedrock models. The model menu comes from
`ASKLIT_MODELS_JSON`; the repository's `docs/bedrock-models.json` supplies the
production presets. Do not infer the upstream provider from a legacy preset ID.
Adding a model requires valid pricing, runtime IAM/model access, and a bounded
smoke test as well as a menu entry.

`ASKLIT_MONTHLY_AI_BUDGET_USD=100` sets the initial application allowance.
The application reserves spending before calls, and retains unknown-cost
reservations conservatively. Separate AWS budget alerts go to
`litlab@suffolk.edu`; the configured budget action can deny invocation for the
runtime IAM identity. Review the [cost and error guide](studio-administration.md#monitor-requests-and-cost)
before changing either control. These controls do not constitute a guaranteed
cap on every cloud invoice.

## Release verification and troubleshooting

Run the hosted suite locally without provider calls:

```sh
python -m pytest tests/hosted -q
```

Use a disposable PostgreSQL database with `ASKLIT_TEST_DATABASE_URL` to exercise
PostgreSQL transaction behavior. Tests create isolated schemas; do not point a
test harness at production. Optional live integration checks have separate setup.

After deploying, check `/health`, sign in, open Admin, and verify an existing
organization's member and usage views. With synthetic data, test creating an
AskLit, indexing a document, previewing, publishing, and opening it through CFO.
For a real model smoke test, choose `tiny` and one short query; most regressions
should use the fake-provider tests instead.

If indexing or evaluations remain queued, check the worker before changing model
settings. If migrations fail, fix the release rather than serving new code against
an old schema. If a frontend chat fails, distinguish unavailable publication,
CORS/HTTPS, authentication, and billing errors using their response codes. Avoid
logging credentials or real conversation content while diagnosing the issue.
