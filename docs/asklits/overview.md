---
id: asklits_overview
title: AskLIT basics
sidebar_label: AskLIT basics
slug: overview
description: What an AskLIT is, what it is for, and how a prompt, knowledge base, and chat work together.
---

# AskLIT basics

An **AskLIT is a simple, focused AI application built to do one task well**.
You give it instructions. You can also give it a small collection of documents.
People then use it through a chat-like screen.

The name describes the idea: an AskLIT is an AI application designed for a
particular question, task, audience, or learning exercise. The AskLit Project
Scaffolder helps you build one without writing a complete application from
scratch.

## What an AskLIT is (and is not)

An AskLIT is not a new AI model. It is a configured application that
uses an existing model, adding light structure:

1. A user asks a question or gives an instruction.
2. AskLIT finds relevant passages in the documents you uploaded, if any.
3. AskLIT sends the user’s message, your instructions, and those passages to
   the model.
4. The model writes a response in the role and format you requested.

The documents are optional. A Haiku writer does not need a knowledge base. A
housing-rights helper probably does. In both cases, the **system prompt** keeps
the app focused.

### Similar tools

| Tool or approach | Main job | What an AskLIT adds |
| --- | --- | --- |
| **General-purpose chat assistant** | Talk about almost anything. | A narrower role that is easier to explain, test, and teach. |
| **Document or search chatbot** | Find answers in a collection of documents. | The option to use documents while also simulating a person, coaching a skill, or following a special format. |
| **Form or workflow app** | Ask fixed questions and apply fixed rules. | Open-ended conversation that can respond to each user turn. |
| **Simulation tool** | Let someone practice a conversation. | A fictional role, a case packet, and a separate debrief or feedback role. |
| **AI evaluation tool** | Test whether an AI response meets expectations. | Evaluation built into the same project you are building. |

AskLITs work well for:

- Interactive Q&A about one source collection
- Single-turn questions (such as "Is this lease acceptable?") followed by a checklist of things to verify
- Simulated clients, opposing parties, mediators, or supervisors
- Practice coaches that ask follow-up questions instead of giving answers directly
- Tutors that explain a specific topic in a required format
- Rubric-based feedback on fictional student work product

They are not suitable for emergency response, confidential client files, unsupervised
legal advice, or tasks requiring strict deterministic calculations. Always involve a human
supervisor when an outcome affects real legal rights or safety.

## The three building blocks

### 1. A system prompt

A system prompt is the app’s standing set of instructions. It tells the model:

- What role to play
- Who it is helping
- What task to perform
- What sources to trust
- How to format the response
- What boundaries to respect

The prompt does not magically add facts. Telling a model "You know landlord-tenant law" is not
a substitute for uploading an approved source packet. The prompt controls
behavior; the knowledge base supplies selected facts.

#### What makes a system prompt good?

A good system prompt is:

- **Specific:** Gives the app one clear job.
- **Observable:** Describes behavior you can see and test.
- **Ordered:** Tells the app what to do before listing exceptions.
- **Bounded:** Explains what to do when a source does not contain the answer.
- **Concise:** Avoids conflicting or redundant rules.

Avoid starting with only "Be helpful." Instead, name the role, audience, task, response format, and key limits.
The [building page](/docs/asklits/building) provides a prompt checklist and clinical examples.

### 2. A knowledge base

A knowledge base is a searchable collection of uploaded documents. AskLIT supports
PDF, DOCX, TXT, and Markdown files. When you index a file, AskLIT extracts
its text and breaks it into searchable passages.

Use a knowledge base when answers should come from a particular handbook,
policy, fictional case packet, statute excerpt, or referral guide. Keep source
collections small and approved. Never upload confidential client information.

If a prompt points to an empty knowledge base, the app will answer using the
model’s general background knowledge. A fluent answer is not proof that the model
grounded its response in your documents.

### 3. A chat

Chat is how users interact with an AskLIT. The user asks a question, the app applies
the prompt, retrieves relevant passages if available, and the model
generates a response.

Chat is ideal for exploratory testing. It helps you notice if a prompt is too vague,
if a source is missing, or if the assistant adopts an unwanted tone. The [evaluation page](/docs/asklits/evaluating) explains how to turn those observations into repeatable tests.

## A small example: the Haiku AskLIT

Start with a simple example that demonstrates the core workflow without requiring legal source documents.

### Goal

Build an AskLIT called **Haiku helper** whose sole task is to turn a user’s topic
into a three-line haiku.

This is an effective first exercise because success is easy to evaluate visually. If the answer is
not a haiku, the issue lies in the prompt or model response rather than a missing document or complex legal rule.

### Try three prompt versions

In the **Prompt** screen, set **Prompt name** to `Haiku helper`. Then try each version:

**Version A: minimal**

```text
Write a haiku about the user's topic.
```

**Version B: more specific**

```text
You write short haiku in English. When the user gives you a topic, write
exactly three lines about it. Do not add a title or explanation.
```

**Version C: detailed**

```text
You write short haiku in English.

When the user gives you a topic, write exactly three lines about that topic.
Aim for a 5-7-5 syllable pattern. Do not explain the poem or add a title.
Use simple, concrete images.
```

Test each version with the same three inputs:

```text
Write a haiku about a lease.
Write a haiku about a rainy courthouse.
Write a haiku about a missed deadline.
```

Compare the responses:

- Exactly three lines
- Direct connection to the topic
- No extraneous introductory or concluding text
- Concrete imagery
- Approximate 5-7-5 syllable structure

The detailed version generally produces more consistent structure. However, longer prompts are not automatically better. The goal is the shortest prompt that reliably produces the desired behavior.

:::tip

**Turn prompt testing into an experiment.** Have students predict which prompt version will work best before testing. Keep the inputs, model, and evaluation criteria constant while changing only the prompt text.

:::

Leave the knowledge base empty. Add a conversation starter such as `Write a haiku about a rainy courthouse.`

### Example chat

Ask:

```text
Write a haiku about a lease.
```

Example response:

```text
Lease terms hold your home
Read the words before you sign
Ask what you don't know
```

The exact phrasing will vary. The key requirement is that the response contains three lines on topic without unrequested prose.

### Key takeaways

The Haiku AskLIT illustrates fundamentals used in complex applications:

- **The prompt controls behavior:** It establishes the role and response format.
- **Prompt iterations are experiments:** Add instructions to address observed flaws rather than adding unnecessary length.
- **Knowledge bases are optional:** Attach documents only when specific factual grounding is needed.
- **Chat is a preview tool:** Use it to discover edge cases.
- **Narrow tasks are easier to manage:** Single-purpose tools are easier to build, test, and evaluate.

Next, you can replace the haiku prompt with a simulated client, a housing handbook, or a supervisor review checklist. The [building page](/docs/asklits/building) walks through each Scaffolder step.

## Safe starting rules

For law school courses, clinical simulations, and public legal information tools, always use fictional case files, public authorities, or de-identified training materials. An AskLIT is an educational and workflow tool, not a substitute for a licensed supervising attorney.

See [Ethical guidelines and data privacy](./ethics) for details on API training policies, zero data retention (ZDR), HIPAA compliance, and data safety boundaries.
