# Table of Contents

* ALToolbox.llms
  * [chat\_completion](#ALToolbox.llms.chat_completion)
  * [extract\_fields\_from\_text](#ALToolbox.llms.extract_fields_from_text)
  * [match\_goals\_from\_text](#ALToolbox.llms.match_goals_from_text)
  * [classify\_text](#ALToolbox.llms.classify_text)
  * [synthesize\_user\_responses](#ALToolbox.llms.synthesize_user_responses)
  * [define\_fields\_from\_dict](#ALToolbox.llms.define_fields_from_dict)
  * [Goal](#ALToolbox.llms.Goal)
    * [response\_satisfies\_me\_or\_follow\_up](#ALToolbox.llms.Goal.response_satisfies_me_or_follow_up)
    * [get\_next\_question](#ALToolbox.llms.Goal.get_next_question)
  * [GoalDict](#ALToolbox.llms.GoalDict)
    * [satisfied](#ALToolbox.llms.GoalDict.satisfied)
  * [GoalQuestion](#ALToolbox.llms.GoalQuestion)
    * [complete](#ALToolbox.llms.GoalQuestion.complete)
  * [GoalSatisfactionList](#ALToolbox.llms.GoalSatisfactionList)
    * [mark\_satisfied\_goals](#ALToolbox.llms.GoalSatisfactionList.mark_satisfied_goals)
    * [keep\_going](#ALToolbox.llms.GoalSatisfactionList.keep_going)
    * [need\_more\_questions](#ALToolbox.llms.GoalSatisfactionList.need_more_questions)
    * [satisfied](#ALToolbox.llms.GoalSatisfactionList.satisfied)
    * [get\_next\_goal\_and\_question](#ALToolbox.llms.GoalSatisfactionList.get_next_goal_and_question)
    * [synthesize\_draft\_response](#ALToolbox.llms.GoalSatisfactionList.synthesize_draft_response)
    * [provide\_feedback](#ALToolbox.llms.GoalSatisfactionList.provide_feedback)
  * [IntakeQuestion](#ALToolbox.llms.IntakeQuestion)
    * [complete](#ALToolbox.llms.IntakeQuestion.complete)
  * [IntakeQuestionList](#ALToolbox.llms.IntakeQuestionList)
    * [need\_more\_questions](#ALToolbox.llms.IntakeQuestionList.need_more_questions)

---
sidebar_label: llms
title: ALToolbox.llms
---

#### chat\_completion(system\_message: Optional[str] = None, user\_message: Optional[str] = None, openai\_client: Optional[OpenAI] = None, openai\_api: Optional[str] = None, temperature: float = 0.5, json\_mode=False, model: str = "gpt-4o", messages: Optional[List[Dict[str, str]]] = None, skip\_moderation: bool = True, openai\_base\_url: Optional[str] = None, max\_output\_tokens: Optional[int] = None, max\_input\_tokens: Optional[int] = None) {#ALToolbox.llms.chat\_completion}

```python
def chat_completion(
    system_message: Optional[str] = None,
    user_message: Optional[str] = None,
    openai_client: Optional[OpenAI] = None,
    openai_api: Optional[str] = None,
    temperature: float = 0.5,
    json_mode=False,
    model: str = "gpt-4o",
    messages: Optional[List[Dict[str, str]]] = None,
    skip_moderation: bool = True,
    openai_base_url: Optional[str] = None,
    max_output_tokens: Optional[int] = None,
    max_input_tokens: Optional[int] = None
) -> Union[List[Any], Dict[str, Any], str]
```

A light wrapper on the OpenAI chat endpoint.

Includes support for token limits, minimal error handling, and moderation.

**Arguments**:

- `system_message` _str_ - The role the chat engine should play
- `user_message` _str_ - The message (data) from the user
- `openai_client` _Optional[OpenAI]_ - An OpenAI client object, optional. If omitted, will fall back to creating a new OpenAI client with the API key provided as an environment variable
- `openai_api` _Optional[str]_ - the API key for an OpenAI client, optional. If provided, a new OpenAI client will be created.
- `temperature` _float_ - The temperature to use for the GPT API
- `json_mode` _bool_ - Whether to use JSON mode for the GPT API. Requires the word `json` in the system message, but will add if you omit it.
- `model` _str_ - The model to use for the GPT API
- `messages` _Optional[List[Dict[str, str]]]_ - A list of messages to send to the chat engine. If provided, system_message and user_message will be ignored.
- `skip_moderation` _bool_ - Whether to skip the OpenAI moderation step, which may save seconds but risks banning your account. Only enable when you have full control over the inputs.
- `openai_base_url` _Optional[str]_ - The base URL for the OpenAI API. Defaults to value provided in the configuration or &quot;https://api.openai.com/v1/&quot;.
- `max_output_tokens` _Optional[int]_ - The maximum number of tokens to return from the API. Defaults to 16380.
- `max_input_tokens` _Optional[int]_ - The maximum number of tokens to send to the API. Defaults to 128000.
  

**Returns**:

  A string with the response from the API endpoint or JSON data if json_mode is True

#### extract\_fields\_from\_text(text: str, field\_list: Dict[str, str], openai\_client: Optional[OpenAI] = None, openai\_api: Optional[str] = None, temperature: float = 0, model="gpt-4o-mini") {#ALToolbox.llms.extract\_fields\_from\_text}

```python
def extract_fields_from_text(text: str,
                             field_list: Dict[str, str],
                             openai_client: Optional[OpenAI] = None,
                             openai_api: Optional[str] = None,
                             temperature: float = 0,
                             model="gpt-4o-mini") -> Dict[str, Any]
```

Extracts fields from text.

**Arguments**:

- `text` _str_ - The text to extract fields from
- `field_list` _Dict[str,str]_ - A list of fields to extract, with the key being the field name and the value being a description of the field
- `openai_client` _Optional[OpenAI]_ - An OpenAI client object. Defaults to None.
- `openai_api` _Optional[str]_ - An OpenAI API key. Defaults to None.
- `temperature` _float_ - The temperature to use for the OpenAI API. Defaults to 0.
- `model` _str_ - The model to use for the OpenAI API. Defaults to &quot;gpt-4o-mini&quot;.
  

**Returns**:

  A dictionary of fields extracted from the text

#### match\_goals\_from\_text(question: str, user\_response: str, goals: Dict[str, str], openai\_client: Optional[OpenAI] = None, openai\_api: Optional[str] = None, temperature: float = 0, model="gpt-4o-mini") {#ALToolbox.llms.match\_goals\_from\_text}

```python
def match_goals_from_text(question: str,
                          user_response: str,
                          goals: Dict[str, str],
                          openai_client: Optional[OpenAI] = None,
                          openai_api: Optional[str] = None,
                          temperature: float = 0,
                          model="gpt-4o-mini") -> Dict[str, Any]
```

Reads a user&#x27;s message and determines whether it meets a set of goals, with the help of an LLM.

**Arguments**:

- `question` _str_ - The question that was asked to the user
- `user_response` _str_ - The user&#x27;s response to the question
- `goals` _Dict[str,str]_ - A list of goals to extract, with the key being the goal name and the value being a description of the goal
- `openai_client` _Optional[OpenAI]_ - An OpenAI client object. Defaults to None.
- `openai_api` _Optional[str]_ - An OpenAI API key. Defaults to None.
- `temperature` _float_ - The temperature to use for the OpenAI API. Defaults to 0.
- `model` _str_ - The model to use for the OpenAI API. Defaults to &quot;gpt-4o-mini&quot;.
  

**Returns**:

  A dictionary of fields extracted from the text

#### classify\_text(text: str, choices: Dict[str, str], default\_response: str = "null", openai\_client: Optional[OpenAI] = None, openai\_api: Optional[str] = None, temperature: float = 0, model="gpt-4o-mini") {#ALToolbox.llms.classify\_text}

```python
def classify_text(text: str,
                  choices: Dict[str, str],
                  default_response: str = "null",
                  openai_client: Optional[OpenAI] = None,
                  openai_api: Optional[str] = None,
                  temperature: float = 0,
                  model="gpt-4o-mini") -> str
```

Given a text, classify it into one of the provided choices with the assistance of a large language model.

**Arguments**:

- `text` _str_ - The text to classify
- `choices` _Dict[str,str]_ - A list of choices to classify the text into, with the key being the choice name and the value being a description of the choice
- `default_response` _str_ - The default response to return if the text cannot be classified. Defaults to &quot;null&quot;.
- `openai_client` _Optional[OpenAI]_ - An OpenAI client object, optional. If omitted, will fall back to creating a new OpenAI client with the API key provided as an environment variable
- `openai_api` _Optional[str]_ - the API key for an OpenAI client, optional. If provided, a new OpenAI client will be created.
- `temperature` _float_ - The temperature to use for GPT. Defaults to 0.
- `model` _str_ - The model to use for the GPT API
  

**Returns**:

  The classification of the text.

#### synthesize\_user\_responses(messages: List[Dict[str, str]], custom\_instructions: Optional[str] = "", openai\_client: Optional[OpenAI] = None, openai\_api: Optional[str] = None, temperature: float = 0, model: str = "gpt-4o-mini") {#ALToolbox.llms.synthesize\_user\_responses}

```python
def synthesize_user_responses(messages: List[Dict[str, str]],
                              custom_instructions: Optional[str] = "",
                              openai_client: Optional[OpenAI] = None,
                              openai_api: Optional[str] = None,
                              temperature: float = 0,
                              model: str = "gpt-4o-mini") -> str
```

Given a first draft and a series of follow-up questions and answers, use an LLM to synthesize the user&#x27;s responses
into a single, coherent reply.

**Arguments**:

- `messages` _List[Dict[str, str]]_ - A list of questions from the LLM and responses from the user
- `custom_instructions` _str_ - Custom instructions for the LLM to follow in constructing the synthesized response
- `openai_client` _Optional[OpenAI]_ - An OpenAI client object, optional. If omitted, will fall back to creating a new OpenAI client with the API key provided as an environment variable
- `openai_api` _Optional[str]_ - the API key for an OpenAI client, optional. If provided, a new OpenAI client will be created.
- `temperature` _float_ - The temperature to use for GPT. Defaults to 0.
- `model` _str_ - The model to use for the GPT API
  

**Returns**:

  A synthesized response from the user.

#### define\_fields\_from\_dict(field\_dict: Dict[str, Any], fields\_to\_ignore: Optional[List] = None) {#ALToolbox.llms.define\_fields\_from\_dict}

```python
def define_fields_from_dict(field_dict: Dict[str, Any],
                            fields_to_ignore: Optional[List] = None) -> None
```

Assign values from a dictionary to corresponding docassemble interview fields.

docassemble and built-in keywords are never defined by this function. If
fields_to_ignore is provided, those fields will also be ignored.

**Arguments**:

- `field_dict` _Dict[str, Any]_ - A dictionary of fields to define, with the key
  being the field name and the value presumably taken from the output of
  extract_fields_from_text.
- `fields_to_ignore` _Optional[List]_ - A list of fields to ignore. Defaults to
  None. Should be used to ensure safety when defining fields from untrusted
  sources. E.g., [&quot;user_is_logged_in&quot;]

## Goal Objects {#ALToolbox.llms.Goal}

```python
class Goal(DAObject)
```

A class to represent a goal.

**Attributes**:

- `name` _str_ - The name of the goal
- `description` _str_ - A description of the goal
- `satisfied` _bool_ - Whether the goal is satisfied

#### response\_satisfies\_me\_or\_follow\_up(messages: List[Dict[str, str]], openai\_client: Optional[OpenAI] = None, model="gpt-4o-mini", system\_message: Optional[str] = None, llm\_assumed\_role: Optional[str] = "teacher", user\_assumed\_role: Optional[str] = "student") {#ALToolbox.llms.Goal.response\_satisfies\_me\_or\_follow\_up}

```python
def response_satisfies_me_or_follow_up(
        messages: List[Dict[str, str]],
        openai_client: Optional[OpenAI] = None,
        model="gpt-4o-mini",
        system_message: Optional[str] = None,
        llm_assumed_role: Optional[str] = "teacher",
        user_assumed_role: Optional[str] = "student") -> str
```

Returns the text of the next question to ask the user or the string &quot;satisfied&quot;
if the user&#x27;s response satisfies the goal.

**Arguments**:

- `messages` _List[Dict[str, str]]_ - The messages to check
- `openai_client` _Optional[OpenAI]_ - An OpenAI client object. Defaults to None.
- `model` _str_ - The model to use for the OpenAI API. Defaults to &quot;gpt-4o-mini&quot;.
- `system_message` _Optional[str]_ - The system message to use for the OpenAI API. Defaults to None.
- `llm_assumed_role` _Optional[str]_ - The role for the LLM to assume. Defaults to &quot;teacher&quot;.
- `user_assumed_role` _Optional[str]_ - The role for the user to assume. Defaults to &quot;student&quot;.
  

**Returns**:

  The text of the next question to ask the user or the string &quot;satisfied&quot;

#### get\_next\_question(thread\_so\_far: List[Dict[str, str]], openai\_client: Optional[OpenAI] = None, model="gpt-4o-mini") {#ALToolbox.llms.Goal.get\_next\_question}

```python
def get_next_question(thread_so_far: List[Dict[str, str]],
                      openai_client: Optional[OpenAI] = None,
                      model="gpt-4o-mini") -> str
```

Returns the text of the next question to ask the user.

**Arguments**:

- `thread_so_far` _List[Dict[str, str]]_ - The thread of the conversation so far
- `openai_client` _Optional[OpenAI]_ - An OpenAI client object. Defaults to None.
- `model` _str_ - The model to use for the OpenAI API. Defaults to &quot;gpt-4o-mini&quot;.
  

**Returns**:

  The text of the next question to ask the user.

## GoalDict Objects {#ALToolbox.llms.GoalDict}

```python
class GoalDict(DADict)
```

A class to represent a DADict of Goals.

#### satisfied() {#ALToolbox.llms.GoalDict.satisfied}

```python
def satisfied() -> bool
```

Returns True if all goals are satisfied, False otherwise.

**Returns**:

  True if all goals are satisfied, False otherwise.

## GoalQuestion Objects {#ALToolbox.llms.GoalQuestion}

```python
class GoalQuestion(DAObject)
```

A class to represent a question about a goal.

**Attributes**:

- `goal` _Goal_ - The goal the question is about
- `question` _str_ - The question to ask the user
- `response` _str_ - The user&#x27;s response to the question

#### complete() {#ALToolbox.llms.GoalQuestion.complete}

```python
@property
def complete()
```

Returns True if the goal, question, and response attributes are present.

## GoalSatisfactionList Objects {#ALToolbox.llms.GoalSatisfactionList}

```python
class GoalSatisfactionList(DAList)
```

A class to help ask the user questions until all goals are satisfied.

Uses an LLM to prompt the user with follow-up questions if the initial response isn&#x27;t complete.
By default, the number of follow-up questions is limited to 10.

This can consume a lot of tokens, as each follow-up has a chance to send the whole conversation
thread to the LLM.

By default, this will use the OpenAI API key defined in the global configuration under this path:


You can specify the path to an alternative configuration by setting the `openai_configuration_path` attribute.

This object does NOT accept the key as a direct parameter, as that will be leaked in the user&#x27;s answers.

```
open ai:
    key: sk-...
```

**Attributes**:

- `goals` _List[Goal]_ - The goals in the list, provided as a dictionary
- `goal_list` _GoalList_ - The list of Goals
- `question_limit` _int_ - The maximum number of follow-up questions to ask the user
- `question_per_goal_limit` _int_ - The maximum number of follow-up questions to ask the user per goal
- `initial_draft` _str_ - The initial draft of the user&#x27;s response
- `initial_question` _str_ - The original question posed in the interview

#### mark\_satisfied\_goals() {#ALToolbox.llms.GoalSatisfactionList.mark\_satisfied\_goals}

```python
def mark_satisfied_goals() -> None
```

Marks goals as satisfied if the user&#x27;s response satisfies the goal.
This should be used as soon as the user gives their initial reply.

#### keep\_going() {#ALToolbox.llms.GoalSatisfactionList.keep\_going}

```python
def keep_going() -> bool
```

Returns True if there is at least one unsatisfied goal and if the number of follow-up questions asked is less than the question limit, False otherwise.

**Returns**:

  True if there is at least one unsatisfied goal and if the number of follow-up questions asked is less than the question limit, False otherwise.

#### need\_more\_questions() {#ALToolbox.llms.GoalSatisfactionList.need\_more\_questions}

```python
def need_more_questions() -> bool
```

Returns True if there is at least one unsatisfied goal, False otherwise.

Also has the side effect of checking the user&#x27;s most recent response to see if it satisfies the goal
and updating the next question to be asked.

**Returns**:

  True if there is at least one unsatisfied goal, False otherwise.

#### satisfied() {#ALToolbox.llms.GoalSatisfactionList.satisfied}

```python
def satisfied() -> bool
```

Returns True if all goals are satisfied, False otherwise.

**Returns**:

  True if all goals are satisfied, False otherwise.

#### get\_next\_goal\_and\_question() {#ALToolbox.llms.GoalSatisfactionList.get\_next\_goal\_and\_question}

```python
def get_next_goal_and_question() -> tuple
```

Returns the next unsatisfied goal, along with a follow-up question to ask the user, if relevant.

**Returns**:

  A tuple of (Goal, str) where the first item is the next unsatisfied goal and the second item is the next question to ask the user, if relevant.
  If the user&#x27;s response to the last question satisfied the goal, returns (None, None).

#### synthesize\_draft\_response() {#ALToolbox.llms.GoalSatisfactionList.synthesize\_draft\_response}

```python
def synthesize_draft_response() -> str
```

Returns a draft response that synthesizes the user&#x27;s responses to the questions.

**Returns**:

  A draft response that synthesizes the user&#x27;s responses to the questions.

#### provide\_feedback(feedback\_prompt: str = "") {#ALToolbox.llms.GoalSatisfactionList.provide\_feedback}

```python
def provide_feedback(
        feedback_prompt: str = "") -> Union[List[Any], Dict[str, Any], str]
```

Returns feedback to the user based on the goals they satisfied.

**Arguments**:

- `feedback_prompt` _str_ - The prompt to use for the feedback. Defaults to &quot;&quot;.
  

**Returns**:

  Feedback to the user based on the goals they satisfied.

## IntakeQuestion Objects {#ALToolbox.llms.IntakeQuestion}

```python
class IntakeQuestion(DAObject)
```

A class to represent a question in an LLM-assisted intake questionnaire.

**Attributes**:

- `question` _str_ - The question to ask the user
- `response` _str_ - The user&#x27;s response to the question

#### complete() {#ALToolbox.llms.IntakeQuestion.complete}

```python
@property
def complete()
```

Returns True if the question and response attributes are present.

## IntakeQuestionList Objects {#ALToolbox.llms.IntakeQuestionList}

```python
class IntakeQuestionList(DAList)
```

Class to help create an LLM-assisted intake questionnaire.

The LLM will be provided a free-form set of in/out criteria (like that
provided to a phone intake worker), an initial draft question from the user,
and then guide the user through a series of follow-up questions to gather only
enough information to determine if the user meets the criteria.

In/out criteria are often pretty short, so we do not make or support
embeddings at the moment.

**Attributes**:

- `criteria` _Dict[str, str]_ - A dictionary of criteria to match, indexed by problem type
- `problem_type_descriptions` _Dict[str, str]_ - A dictionary of descriptions of the problem types
- `problem_type` _str_ - The type of problem to match. E.g., a unit/department inside the law firm
- `initial_problem_description` _str_ - The initial description of the problem from the user
- `initial_question` _str_ - The original question posed in the interview
- `question_limit` _int_ - The maximum number of follow-up questions to ask the user. Defaults to 10.
- `model` _str_ - The model to use for the GPT API. Defaults to gpt-4.1.
- `max_output_tokens` _int_ - The maximum number of tokens to return from the API. Defaults to 4096
- `llm_role` _str_ - The role the LLM should play. Allows you to customize the script the LLM uses to guide the user.
  We have provided a default script that should work for most intake questionnaires.
- `llm_user_qualifies_prompt` _str_ - The prompt to use to determine if the user qualifies. We have provided a default prompt.
- `out_of_questions` _bool_ - Whether the user has run out of questions to answer
- `qualifies` _bool_ - Whether the user qualifies based on the criteria

#### need\_more\_questions() {#ALToolbox.llms.IntakeQuestionList.need\_more\_questions}

```python
def need_more_questions() -> bool
```

Returns True if the user needs to answer more questions, False otherwise.

Also has the side effect of checking the user&#x27;s most recent response to see if it satisfies the criteria
and updating both the next question to be asked and the current qualification status.

**Returns**:

  True if the user needs to answer more questions, False otherwise.

