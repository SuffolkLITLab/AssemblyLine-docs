---
id: gallery
title: "AskLIT gallery: three toy projects"
sidebar_label: AskLIT gallery
description: Three small AskLIT examples, packaged as one deployable app, that show different uses for prompts, knowledge bases, and chat.
---

# AskLIT gallery: three toy projects

These examples demonstrate different use cases for system prompts, knowledge bases, and chat interactions.

## One app, three focused prompts

A single AskLIT deployment can offer multiple prompt profiles in one interface.
The [AskLIT Clinical Skills Gallery](https://asklit-clinical-skills-gallery-5hokdmbr8cbcyztuvkeaty.streamlit.app/) deployable app includes three exercises:

| Prompt profile | Student activity | Shared source material |
| --- | --- | --- |
| **Haiku helper** | Practice following a constrained output format. | None needed. |
| **Lease lens** | Review a fictional lease and identify questions for supervision. | Fictional lease excerpt and review checklist. |
| **Interviewing client** | Practice open-ended, non-leading intake questions. | Fictional client profile. |

The source files are fictional. Replace them with approved materials before teaching, and never upload confidential client information (see [Ethical guidelines and data privacy](./ethics)).

:::tip

**Try the deployed gallery:** [Open AskLIT Clinical Skills Gallery](https://asklit-clinical-skills-gallery-5hokdmbr8cbcyztuvkeaty.streamlit.app/).
Choose a prompt profile from the sidebar and try the quick-start buttons.

:::

## 1. Haiku helper

### What it does

Converts any user topic into a three-line haiku.

### Knowledge base

None. The exercise evaluates prompt constraints and formatting without document retrieval.

### Prompt

```text
You write short haiku in English.

When the user gives you a topic, write exactly three lines about that topic.
Aim for a 5-7-5 syllable pattern. Do not explain the poem or add a title.
Use simple, concrete images.
```

### Try in Chat

```text
Write a haiku about a rainy courthouse.
```

### What it teaches

Prompts control role, style, and formatting. A knowledge base is optional.

![The live AskLIT Clinical Skills Gallery with the Haiku helper selected and its conversation starter visible.](../assets/asklit/14-gallery-live-haiku-start.png)

![The live Haiku helper responding to the rainy-courthouse starter.](../assets/asklit/15-gallery-live-haiku-response.png)

## 2. Lease lens

### What it does

Examines a **fictional** lease excerpt and generates a checklist of clauses to review. It does not determine whether the lease is legally enforceable.

This provides a pattern for single-turn inquiries: converting a user question into structured review questions and recommending professional counsel.

### Knowledge base

Upload a fictional lease excerpt and review checklist to a shared knowledge base (such as `gallery-sources`).

### Prompt

```text
You are a plain-language lease review helper for a legal-education exercise.

Use only the fictional lease and review checklist in the knowledge base.
Point out terms that deserve closer review and quote or name the relevant
section when possible. Ask for missing information instead of guessing.

Do not say that a lease is legally valid or invalid. Do not give legal advice
about a real person’s lease. End with a short list of questions the reader can
bring to a qualified lawyer or housing counselor.
```

### Try in Chat

```text
Is this lease acceptable? I am worried about the late fee and the entry clause.
```

### How to evaluate

- **Gold label in scenario table:** `contains-all:late fee,entry`
- **Shared rules in Advanced panel:**
  ```text
  Identifies the relevant terms in the fictional excerpt and explains what information is missing.
  Avoids definitive legal conclusions and provides a practical next step.
  ```

### What it teaches

AskLITs can provide structured issue spotting for single-turn questions while maintaining explicit safety limits and directing users to human supervision.

![The live Lease lens response identifying fictional lease sections, missing facts, and questions for a lawyer or housing counselor.](../assets/asklit/16-gallery-live-lease-response.png)

## 3. Interviewing client

### What it does

Simulates an initial intake client. It reveals facts only when asked appropriate questions. A separate debrief profile can evaluate communication choices after the simulation.

### Knowledge base

Upload a fictional client profile to the shared `gallery-sources` knowledge base.

### Prompt

```text
You are a fictional client in a law-school interviewing exercise.

Stay in role. Reveal facts naturally and only when the student asks. Do not
volunteer legal analysis or tell the student what to ask next. Do not invent
facts outside the client profile.

If the student asks for a debrief, give respectful feedback about missed facts,
safety questions, and judgmental language. This is a fictional exercise, not
legal advice.
```

### Try in Chat

```text
Hi, thanks for meeting with me. Can you tell me what brought you here today?
```

### How to evaluate

Configure standing quality rules in **Advanced: shared rules for every scenario**:

```text
Stays in character as a fictional intake client and reveals facts only when asked appropriate questions.
Does not volunteer legal analysis or invent facts outside the fictional client profile.
```

Then test specific student inputs in the scenario table:

- An open-ended question testing whether the client shares their basic situation
- A leading question testing whether the client clarifies or pushes back naturally
- A safety question testing whether the client discloses urgent concerns
- A question about an unlisted fact testing whether the client states they do not know

### What it teaches

An AskLIT can serve as an interactive practice partner. Multiple prompt profiles can share one knowledge base: one for roleplay and one for debriefing.

![The live Interviewing client profile responding in role to an open-ended intake question.](../assets/asklit/17-gallery-live-interview-response.png)

## How to package the gallery

To package multiple profiles in one deployment:

- Configure three prompt profiles, each with a clear conversation starter
- Connect profiles to the shared knowledge base (`gallery-sources`)
- Write a welcome message explaining the exercises
- Choose public or class-protected access
- Keep API keys and confidential materials out of the repository

Reference repository: [nonprofittechy/asklit-clinical-skills-gallery](https://github.com/nonprofittechy/asklit-clinical-skills-gallery). Deploy via Streamlit Community Cloud with private secrets as detailed in [Deploy with GitHub and Streamlit](./deploying).

## Choosing an example

To define an AskLIT, start with one sentence:

> "This AskLIT helps [audience] practice or complete [task] using [source documents]."

If that sentence requires multiple unrelated tasks, split the project into separate AskLIT profiles.
