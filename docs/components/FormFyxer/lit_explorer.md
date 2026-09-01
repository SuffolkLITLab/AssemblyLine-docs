# Table of Contents

* formfyxer.lit\_explorer
  * [recursive\_get\_id](#formfyxer.lit_explorer.recursive_get_id)
  * [spot](#formfyxer.lit_explorer.spot)
  * [re\_case](#formfyxer.lit_explorer.re_case)
  * [regex\_norm\_field](#formfyxer.lit_explorer.regex_norm_field)
  * [reformat\_field](#formfyxer.lit_explorer.reformat_field)
  * [norm](#formfyxer.lit_explorer.norm)
  * [vectorize](#formfyxer.lit_explorer.vectorize)
  * [normalize\_name](#formfyxer.lit_explorer.normalize_name)
  * [cluster\_screens](#formfyxer.lit_explorer.cluster_screens)
  * [InputType](#formfyxer.lit_explorer.InputType)
  * [field\_types\_and\_sizes](#formfyxer.lit_explorer.field_types_and_sizes)
  * [AnswerType](#formfyxer.lit_explorer.AnswerType)
  * [classify\_field](#formfyxer.lit_explorer.classify_field)
  * [get\_adjusted\_character\_count](#formfyxer.lit_explorer.get_adjusted_character_count)
  * [time\_to\_answer\_field](#formfyxer.lit_explorer.time_to_answer_field)
  * [time\_to\_answer\_form](#formfyxer.lit_explorer.time_to_answer_form)
  * [cleanup\_text](#formfyxer.lit_explorer.cleanup_text)
  * [text\_complete](#formfyxer.lit_explorer.text_complete)
  * [complete\_with\_command](#formfyxer.lit_explorer.complete_with_command)
  * [needs\_calculations](#formfyxer.lit_explorer.needs_calculations)
  * [tools\_passive](#formfyxer.lit_explorer.tools_passive)
  * [get\_passive\_sentences](#formfyxer.lit_explorer.get_passive_sentences)
  * [get\_citations](#formfyxer.lit_explorer.get_citations)
  * [get\_sensitive\_data\_types](#formfyxer.lit_explorer.get_sensitive_data_types)
  * [substitute\_phrases](#formfyxer.lit_explorer.substitute_phrases)
  * [substitute\_neutral\_gender](#formfyxer.lit_explorer.substitute_neutral_gender)
  * [substitute\_plain\_language](#formfyxer.lit_explorer.substitute_plain_language)
  * [transformed\_sentences](#formfyxer.lit_explorer.transformed_sentences)
  * [parse\_form](#formfyxer.lit_explorer.parse_form)
  * [form\_complexity](#formfyxer.lit_explorer.form_complexity)

---
sidebar_label: lit_explorer
title: formfyxer.lit_explorer
---

#### recursive\_get\_id(values\_to\_unpack: Union[dict, list], tmpl: Optional[set] = None) {#formfyxer.lit\_explorer.recursive\_get\_id}

```python
def recursive_get_id(values_to_unpack: Union[dict, list],
                     tmpl: Optional[set] = None)
```

Pull ID values out of the LIST/NSMI results from Spot.

#### spot(text: str, lower: float = 0.25, pred: float = 0.5, upper: float = 0.6, verbose: float = 0, token: str = "") {#formfyxer.lit\_explorer.spot}

```python
def spot(text: str,
         lower: float = 0.25,
         pred: float = 0.5,
         upper: float = 0.6,
         verbose: float = 0,
         token: str = "")
```

Call the Spot API (https://spot.suffolklitlab.org) to classify the text of a PDF using
the NSMIv2/LIST taxonomy (https://taxonomy.legal/), but returns only the IDs of issues found in the text.

#### re\_case(text: str) {#formfyxer.lit\_explorer.re\_case}

```python
def re_case(text: str) -> str
```

Capture PascalCase, snake_case and kebab-case terms and add spaces to separate the joined words

#### regex\_norm\_field(text: str) {#formfyxer.lit\_explorer.regex\_norm\_field}

```python
def regex_norm_field(text: str)
```

Apply some heuristics to a field name to see if we can get it to match AssemblyLine conventions.
See: https://assemblyline.suffolklitlab.org/docs/document_variables

#### reformat\_field(text: str, max\_length: int = 30, tools\_token: Optional[str] = None) {#formfyxer.lit\_explorer.reformat\_field}

```python
def reformat_field(text: str,
                   max_length: int = 30,
                   tools_token: Optional[str] = None)
```

Transforms a string of text into a snake_case variable close in length to `max_length` name by
summarizing the string and stitching the summary together in snake_case.
h/t https://towardsdatascience.com/nlp-building-a-summariser-68e0c19e3a93

#### norm(row) {#formfyxer.lit\_explorer.norm}

```python
def norm(row)
```

Normalize a word vector.

#### vectorize(text: Union[List[str], str], tools\_token: Optional[str] = None) {#formfyxer.lit\_explorer.vectorize}

```python
def vectorize(text: Union[List[str], str], tools_token: Optional[str] = None)
```

Vectorize a string of text.

**Arguments**:

- `text` - a string of multiple words to vectorize
- `tools_token` - the token to tools.suffolklitlab.org, used for micro-service
  to reduce the amount of memory you need on your machine. If
  not passed, you need to have `en_core_web_lg` installed. NOTE: this
  last bit is nolonger correct, you have to use the micor-service
  as we have had to remove SpaCY due to a breaking change

#### normalize\_name(jur: str, group: str, n: int, per, last\_field: str, this\_field: str, tools\_token: Optional[str] = None) {#formfyxer.lit\_explorer.normalize\_name}

```python
def normalize_name(jur: str,
                   group: str,
                   n: int,
                   per,
                   last_field: str,
                   this_field: str,
                   tools_token: Optional[str] = None) -> Tuple[str, float]
```

Normalize a field name, if possible to the Assembly Line conventions, and if
not, to a snake_case variable name of appropriate length.

HACK: temporarily all we do is re-case it and normalize it using regex rules.
Will be replaced with call to LLM soon.

#### cluster\_screens(fields: List[str] = [], damping: float = 0.7, tools\_token: Optional[str] = None) {#formfyxer.lit\_explorer.cluster\_screens}

```python
def cluster_screens(fields: List[str] = [],
                    damping: float = 0.7,
                    tools_token: Optional[str] = None) -> Dict[str, List[str]]
```

Groups the given fields into screens based on how much they are related.

**Arguments**:

- `fields` - a list of field names
- `damping` - a value &gt;= 0.5 and &lt; 1. Tunes how related screens should be
- `tools_token` - the token to tools.suffolklitlab.org, needed of doing
  micro-service vectorization
  
- `Returns` - a suggested screen grouping, each screen name mapped to the list of fields on it

## InputType Objects {#formfyxer.lit\_explorer.InputType}

```python
class InputType(Enum)
```

Input type maps onto the type of input the PDF author chose for the field. We only
handle text, checkbox, and signature fields.

#### field\_types\_and\_sizes(fields: Optional[Iterable[FormField]]) {#formfyxer.lit\_explorer.field\_types\_and\_sizes}

```python
def field_types_and_sizes(
        fields: Optional[Iterable[FormField]]) -> List[FieldInfo]
```

Transform the fields provided by get_existing_pdf_fields into a summary format.
Result will look like:
[
\{
&quot;var_name&quot;: var_name,
&quot;type&quot;: &quot;text | checkbox | signature&quot;,
&quot;max_length&quot;: n
\}
]

## AnswerType Objects {#formfyxer.lit\_explorer.AnswerType}

```python
class AnswerType(Enum)
```

Answer type describes the effort the user answering the form will require.
&quot;Slot-in&quot; answers are a matter of almost instantaneous recall, e.g., name, address, etc.
&quot;Gathered&quot; answers require looking around one&#x27;s desk, for e.g., a health insurance number.
&quot;Third party&quot; answers require picking up the phone to call someone else who is the keeper
of the information.
&quot;Created&quot; answers don&#x27;t exist before the user is presented with the question. They may include
a choice, creating a narrative, or even applying legal reasoning. &quot;Affidavits&quot; are a special
form of created answers.
See Jarret and Gaffney, Forms That Work (2008)

#### classify\_field(field: FieldInfo, new\_name: str) {#formfyxer.lit\_explorer.classify\_field}

```python
def classify_field(field: FieldInfo, new_name: str) -> AnswerType
```

Apply heuristics to the field&#x27;s original and &quot;normalized&quot; name to classify
it as either a &quot;slot-in&quot;, &quot;gathered&quot;, &quot;third party&quot; or &quot;created&quot; field type.

#### get\_adjusted\_character\_count(field: FieldInfo) {#formfyxer.lit\_explorer.get\_adjusted\_character\_count}

```python
def get_adjusted_character_count(field: FieldInfo) -> float
```

Determines the bracketed length of an input field based on its max_length attribute,
returning a float representing the approximate length of the field content.

The function chunks the answers into 5 different lengths (checkboxes, 2 words, short, medium, and long)
instead of directly using the character count, as forms can allocate different spaces
for the same data without considering the space the user actually needs.

**Arguments**:

- `field` _FieldInfo_ - An object containing information about the input field,
  including the &quot;max_length&quot; attribute.
  

**Returns**:

- `float` - The approximate length of the field content, categorized into checkboxes, 2 words, short,
  medium, or long based on the max_length attribute.
  

**Examples**:

  &gt;&gt;&gt; get_adjusted_character_count(\{&quot;type&quot;\}: InputType.CHECKBOX)
  4.7
  &gt;&gt;&gt; get_adjusted_character_count(\{&quot;max_length&quot;: 100\})
  9.4
  &gt;&gt;&gt; get_adjusted_character_count(\{&quot;max_length&quot;: 300\})
  230
  &gt;&gt;&gt; get_adjusted_character_count(\{&quot;max_length&quot;: 600\})
  115
  &gt;&gt;&gt; get_adjusted_character_count(\{&quot;max_length&quot;: 1200\})
  1150

#### time\_to\_answer\_field(field: FieldInfo, new\_name: str, cpm: int = 40, cpm\_std\_dev: int = 17) {#formfyxer.lit\_explorer.time\_to\_answer\_field}

```python
def time_to_answer_field(field: FieldInfo,
                         new_name: str,
                         cpm: int = 40,
                         cpm_std_dev: int = 17) -> Callable[[int], np.ndarray]
```

Apply a heuristic for the time it takes to answer the given field, in minutes.
It is hand-written for now.
It will factor in the input type, the answer type (slot in, gathered, third party or created), and the
amount of input text allowed in the field.
The return value is a function that can return N samples of how long it will take to answer the field (in minutes)

#### time\_to\_answer\_form(processed\_fields, normalized\_fields) {#formfyxer.lit\_explorer.time\_to\_answer\_form}

```python
def time_to_answer_form(processed_fields,
                        normalized_fields) -> Tuple[float, float]
```

Provide an estimate of how long it would take an average user to respond to the questions
on the provided form.
We use signals such as the field type, name, and space provided for the response to come up with a
rough estimate, based on whether the field is:
1. fill in the blank
2. gathered - e.g., an id number, case number, etc.
3. third party: need to actually ask someone the information - e.g., income of not the user, anything else?
4. created:
a. short created (3 lines or so?)
b. long created (anything over 3 lines)

#### cleanup\_text(text: str, fields\_to\_sentences: bool = False) {#formfyxer.lit\_explorer.cleanup\_text}

```python
def cleanup_text(text: str, fields_to_sentences: bool = False) -> str
```

Apply cleanup routines to text to provide more accurate readability statistics.

#### text\_complete(prompt: str, max\_tokens: int = 500, creds: Optional[OpenAiCreds] = None, temperature: float = 0) {#formfyxer.lit\_explorer.text\_complete}

```python
def text_complete(prompt: str,
                  max_tokens: int = 500,
                  creds: Optional[OpenAiCreds] = None,
                  temperature: float = 0) -> str
```

Run a prompt via openAI&#x27;s API and return the result.

**Arguments**:

- `prompt` _str_ - The prompt to send to the API.
- `max_tokens` _int, optional_ - The number of tokens to generate. Defaults to 500.
- `creds` _Optional[OpenAiCreds], optional_ - The credentials to use. Defaults to None.
- `temperature` _float, optional_ - The temperature to use. Defaults to 0.

#### complete\_with\_command(text, command, tokens, creds: Optional[OpenAiCreds] = None) {#formfyxer.lit\_explorer.complete\_with\_command}

```python
def complete_with_command(text,
                          command,
                          tokens,
                          creds: Optional[OpenAiCreds] = None) -> str
```

Combines some text with a command to send to open ai.

#### needs\_calculations(text: Union[str]) {#formfyxer.lit\_explorer.needs\_calculations}

```python
def needs_calculations(text: Union[str]) -> bool
```

A conservative guess at if a given form needs the filler to make math calculations,
something that should be avoided. If

#### tools\_passive(input: Union[List[str], str], tools\_token: Optional[str] = None) {#formfyxer.lit\_explorer.tools\_passive}

```python
def tools_passive(input: Union[List[str], str],
                  tools_token: Optional[str] = None)
```

Ping passive voice API for list of sentences using the passive voice

#### get\_passive\_sentences(text: Union[List, str], tools\_token: Optional[str] = None) {#formfyxer.lit\_explorer.get\_passive\_sentences}

```python
def get_passive_sentences(
    text: Union[List, str],
    tools_token: Optional[str] = None
) -> List[Tuple[str, List[Tuple[int, int]]]]
```

Return a list of tuples, where each tuple represents a
sentence in which passive voice was detected along with a list of the
starting and ending position of each fragment that is phrased in the passive voice.
The combination of the two can be used in the PDFStats frontend to highlight the
passive text in an individual sentence.

Text can either be a string or a list of strings.
If provided a single string, it will be tokenized with NTLK and
sentences containing fewer than 2 words will be ignored.

#### get\_citations(text: str, tokenized\_sentences: List[str]) {#formfyxer.lit\_explorer.get\_citations}

```python
def get_citations(text: str, tokenized_sentences: List[str]) -> List[str]
```

Get citations and some extra surrounding context (the full sentence), if the citation is
fewer than 5 characters (often eyecite only captures a section symbol
for state-level short citation formats)

#### get\_sensitive\_data\_types(fields: List[str], fields\_old: Optional[List[str]] = None) {#formfyxer.lit\_explorer.get\_sensitive\_data\_types}

```python
def get_sensitive_data_types(
        fields: List[str],
        fields_old: Optional[List[str]] = None) -> Dict[str, List[str]]
```

Given a list of fields, identify those related to sensitive information and return a dictionary with the sensitive
fields grouped by type. A list of the old field names can also be provided. These fields should be in the same
order. Passing the old field names allows the sensitive field algorithm to match more accurately. The return value
will not contain the old field name, only the corresponding field name from the first parameter.

The sensitive data types are: Bank Account Number, Credit Card Number, Driver&#x27;s License Number, and Social Security
Number.

#### substitute\_phrases(input\_string: str, substitution\_phrases: Dict[str, str]) {#formfyxer.lit\_explorer.substitute\_phrases}

```python
def substitute_phrases(
        input_string: str,
        substitution_phrases: Dict[str,
                                   str]) -> Tuple[str, List[Tuple[int, int]]]
```

Substitute phrases in the input string and return the new string and positions of substituted phrases.

**Arguments**:

- `input_string` _str_ - The input string containing phrases to be replaced.
- `substitution_phrases` _Dict[str, str]_ - A dictionary mapping original phrases to their replacement phrases.
  

**Returns**:

  Tuple[str, List[Tuple[int, int]]]: A tuple containing the new string with substituted phrases and a list of
  tuples, each containing the start and end positions of the substituted
  phrases in the new string.
  

**Example**:

  &gt;&gt;&gt; input_string = &quot;The quick brown fox jumped over the lazy dog.&quot;
  &gt;&gt;&gt; substitution_phrases = \{&quot;quick brown&quot;: &quot;swift reddish&quot;, &quot;lazy dog&quot;: &quot;sleepy canine&quot;\}
  &gt;&gt;&gt; new_string, positions = substitute_phrases(input_string, substitution_phrases)
  &gt;&gt;&gt; print(new_string)
  &quot;The swift reddish fox jumped over the sleepy canine.&quot;
  &gt;&gt;&gt; print(positions)
  [(4, 17), (35, 48)]

#### substitute\_neutral\_gender(input\_string: str) {#formfyxer.lit\_explorer.substitute\_neutral\_gender}

```python
def substitute_neutral_gender(
        input_string: str) -> Tuple[str, List[Tuple[int, int]]]
```

Substitute gendered phrases with neutral phrases in the input string.
Primary source is https://github.com/joelparkerhenderson/inclusive-language

#### substitute\_plain\_language(input\_string: str) {#formfyxer.lit\_explorer.substitute\_plain\_language}

```python
def substitute_plain_language(
        input_string: str) -> Tuple[str, List[Tuple[int, int]]]
```

Substitute complex phrases with simpler alternatives.
Source of terms is drawn from https://www.plainlanguage.gov/guidelines/words/

#### transformed\_sentences(sentence\_list: List[str], fun: Callable) {#formfyxer.lit\_explorer.transformed\_sentences}

```python
def transformed_sentences(
        sentence_list: List[str],
        fun: Callable) -> List[Tuple[str, str, List[Tuple[int, int]]]]
```

Apply a function to a list of sentences and return only the sentences with changed terms.
The result is a tuple of the original sentence, new sentence, and the starting and ending position
of each changed fragment in the sentence.

#### parse\_form(in\_file: str, title: Optional[str] = None, jur: Optional[str] = None, cat: Optional[str] = None, normalize: bool = True, spot\_token: Optional[str] = None, tools\_token: Optional[str] = None, openai\_creds: Optional[OpenAiCreds] = None, rewrite: bool = False, debug: bool = False) {#formfyxer.lit\_explorer.parse\_form}

```python
def parse_form(in_file: str,
               title: Optional[str] = None,
               jur: Optional[str] = None,
               cat: Optional[str] = None,
               normalize: bool = True,
               spot_token: Optional[str] = None,
               tools_token: Optional[str] = None,
               openai_creds: Optional[OpenAiCreds] = None,
               rewrite: bool = False,
               debug: bool = False)
```

Read in a pdf, pull out basic stats, attempt to normalize its form fields, and re-write the
in_file with the new fields (if `rewrite=1`). If you pass a spot token, we will guess the
NSMI code. If you pass openai creds, we will give suggestions for the title and description.

#### form\_complexity(stats) {#formfyxer.lit\_explorer.form\_complexity}

```python
def form_complexity(stats)
```

Gets a single number of how hard the form is to complete. Higher is harder.

