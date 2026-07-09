# Table of Contents

* [AssemblyLine.al\_general](#AssemblyLine.al_general)
  * [safe\_subdivision\_type](#AssemblyLine.al_general.safe_subdivision_type)
  * [ALAddress](#AssemblyLine.al_general.ALAddress)
    * [address\_fields](#AssemblyLine.al_general.ALAddress.address_fields)
    * [formatted\_unit](#AssemblyLine.al_general.ALAddress.formatted_unit)
    * [block](#AssemblyLine.al_general.ALAddress.block)
    * [line\_one](#AssemblyLine.al_general.ALAddress.line_one)
    * [line\_two](#AssemblyLine.al_general.ALAddress.line_two)
    * [on\_one\_line](#AssemblyLine.al_general.ALAddress.on_one_line)
    * [normalized\_address](#AssemblyLine.al_general.ALAddress.normalized_address)
    * [state\_name](#AssemblyLine.al_general.ALAddress.state_name)
  * [ALAddressList](#AssemblyLine.al_general.ALAddressList)
    * [init](#AssemblyLine.al_general.ALAddressList.init)
    * [\_\_str\_\_](#AssemblyLine.al_general.ALAddressList.__str__)
  * [ALNameList](#AssemblyLine.al_general.ALNameList)
    * [init](#AssemblyLine.al_general.ALNameList.init)
    * [\_\_str\_\_](#AssemblyLine.al_general.ALNameList.__str__)
  * [ALPeopleList](#AssemblyLine.al_general.ALPeopleList)
    * [init](#AssemblyLine.al_general.ALPeopleList.init)
    * [names\_and\_addresses\_on\_one\_line](#AssemblyLine.al_general.ALPeopleList.names_and_addresses_on_one_line)
    * [familiar](#AssemblyLine.al_general.ALPeopleList.familiar)
    * [familiar\_or](#AssemblyLine.al_general.ALPeopleList.familiar_or)
    * [short\_list](#AssemblyLine.al_general.ALPeopleList.short_list)
    * [full\_names](#AssemblyLine.al_general.ALPeopleList.full_names)
    * [pronoun\_reflexive](#AssemblyLine.al_general.ALPeopleList.pronoun_reflexive)
  * [ALIndividual](#AssemblyLine.al_general.ALIndividual)
    * [init](#AssemblyLine.al_general.ALIndividual.init)
    * [signature\_if\_final](#AssemblyLine.al_general.ALIndividual.signature_if_final)
    * [phone\_numbers](#AssemblyLine.al_general.ALIndividual.phone_numbers)
    * [contact\_methods](#AssemblyLine.al_general.ALIndividual.contact_methods)
    * [merge\_letters](#AssemblyLine.al_general.ALIndividual.merge_letters)
    * [formatted\_age](#AssemblyLine.al_general.ALIndividual.formatted_age)
    * [normalized\_address](#AssemblyLine.al_general.ALIndividual.normalized_address)
    * [name\_fields](#AssemblyLine.al_general.ALIndividual.name_fields)
    * [address\_fields](#AssemblyLine.al_general.ALIndividual.address_fields)
    * [gender\_fields](#AssemblyLine.al_general.ALIndividual.gender_fields)
    * [pronoun\_fields](#AssemblyLine.al_general.ALIndividual.pronoun_fields)
    * [get\_pronouns](#AssemblyLine.al_general.ALIndividual.get_pronouns)
    * [list\_pronouns](#AssemblyLine.al_general.ALIndividual.list_pronouns)
    * [language\_fields](#AssemblyLine.al_general.ALIndividual.language_fields)
    * [language\_name](#AssemblyLine.al_general.ALIndividual.language_name)
    * [gender\_male](#AssemblyLine.al_general.ALIndividual.gender_male)
    * [gender\_female](#AssemblyLine.al_general.ALIndividual.gender_female)
    * [gender\_other](#AssemblyLine.al_general.ALIndividual.gender_other)
    * [gender\_nonbinary](#AssemblyLine.al_general.ALIndividual.gender_nonbinary)
    * [gender\_unknown](#AssemblyLine.al_general.ALIndividual.gender_unknown)
    * [gender\_undisclosed](#AssemblyLine.al_general.ALIndividual.gender_undisclosed)
    * [gender\_self\_described](#AssemblyLine.al_general.ALIndividual.gender_self_described)
    * [contact\_fields](#AssemblyLine.al_general.ALIndividual.contact_fields)
    * [initials](#AssemblyLine.al_general.ALIndividual.initials)
    * [address\_block](#AssemblyLine.al_general.ALIndividual.address_block)
    * [pronoun](#AssemblyLine.al_general.ALIndividual.pronoun)
    * [pronoun\_objective](#AssemblyLine.al_general.ALIndividual.pronoun_objective)
    * [pronoun\_possessive](#AssemblyLine.al_general.ALIndividual.pronoun_possessive)
    * [pronoun\_subjective](#AssemblyLine.al_general.ALIndividual.pronoun_subjective)
    * [pronoun\_reflexive](#AssemblyLine.al_general.ALIndividual.pronoun_reflexive)
    * [name\_full](#AssemblyLine.al_general.ALIndividual.name_full)
    * [name\_initials](#AssemblyLine.al_general.ALIndividual.name_initials)
    * [name\_short](#AssemblyLine.al_general.ALIndividual.name_short)
    * [familiar](#AssemblyLine.al_general.ALIndividual.familiar)
    * [\_\_str\_\_](#AssemblyLine.al_general.ALIndividual.__str__)
  * [section\_links](#AssemblyLine.al_general.section_links)
  * [will\_send\_to\_real\_court](#AssemblyLine.al_general.will_send_to_real_court)
  * [filter\_letters](#AssemblyLine.al_general.filter_letters)
  * [fa\_icon](#AssemblyLine.al_general.fa_icon)
  * [is\_sms\_enabled](#AssemblyLine.al_general.is_sms_enabled)
  * [is\_phone\_or\_email](#AssemblyLine.al_general.is_phone_or_email)
  * [github\_modified\_date](#AssemblyLine.al_general.github_modified_date)
  * [language\_name](#AssemblyLine.al_general.language_name)
  * [safe\_states\_list](#AssemblyLine.al_general.safe_states_list)
  * [has\_parsable\_pronouns](#AssemblyLine.al_general.has_parsable_pronouns)
  * [parse\_custom\_pronouns](#AssemblyLine.al_general.parse_custom_pronouns)
  * [get\_visible\_al\_nav\_items](#AssemblyLine.al_general.get_visible_al_nav_items)

---
sidebar_label: al_general
title: AssemblyLine.al_general
---

<a id="AssemblyLine.al_general.safe_subdivision_type"></a>

#### safe\_subdivision\_type(country\_code: str)

```python
def safe_subdivision_type(country_code: str) -> Optional[str]
```

Returns the subdivision type for the country with the given country code.
If no subdivision type is found, returns None.

**Arguments**:

- `country_code` _str_ - The ISO-3166-1 alpha-2 code for the country.
  

**Returns**:

- `Optional[str]` - The subdivision type for the country with the given country code.

<a id="AssemblyLine.al_general.ALAddress"></a>

## ALAddress Objects

```python
class ALAddress(Address)
```

This class is used to store addresses. The ALAddress class extends the Address
class with the `address_fields()` method and &quot;smarter&quot;
handling of the unit attribute when printing a formatted address.

**Attributes**:

- `address` _str_ - The street where the person lives.
- `unit` _str_ - The unit number where the person lives.
- `city` _str_ - The city where the person lives.
- `state` _str_ - The state where the person lives.
- `zip` _str_ - The zip code where the person lives.
- `country` _str_ - The country where the person lives.
- `impounded` _Optional[bool]_ - Whether the address is impounded.

<a id="AssemblyLine.al_general.ALAddress.address_fields"></a>

#### address\_fields(country\_code: Optional[str] = None, default\_state: Optional[str] = None, show\_country: bool = False, show\_county: bool = False, show\_if: Union[str, Dict[str, str], None] = None, allow\_no\_address: bool = False, ask\_if\_impounded: Optional[bool] = False, maxlengths: Optional[Dict[str, int]] = None, required: Optional[Dict[str, bool]] = None)

```python
def address_fields(
        country_code: Optional[str] = None,
        default_state: Optional[str] = None,
        show_country: bool = False,
        show_county: bool = False,
        show_if: Union[str, Dict[str, str], None] = None,
        allow_no_address: bool = False,
        ask_if_impounded: Optional[bool] = False,
        maxlengths: Optional[Dict[str, int]] = None,
        required: Optional[Dict[str, bool]] = None) -> List[Dict[str, Any]]
```

Return a YAML structure representing the list of fields for the object&#x27;s address.

Optionally, allow the user to specify they do not have an address. When using
`allow_no_address=True`, ensure to trigger the question with `users[0].address.has_no_address`
rather than `users[0].address.address`. If `show_if` is used, it will not be applied when
`allow_no_address` is also used. Ensure `country_code` adheres to ISO-3166-1 alpha-2 code standard.

NOTE: This function is stateful under specific conditions. Refer to the conditions mentioned below.

**Arguments**:

- `country_code` _Optional[str]_ - ISO-3166-1 alpha-2 code of the country. Defaults to None.
- `default_state` _Optional[str]_ - Default state to set. Defaults to None.
- `show_country` _bool_ - Whether to display the country field. Defaults to False.
- `show_county` _bool_ - Whether to display the county field. Defaults to False.
- `show_if` _Union[str, Dict[str, str], None]_ - Condition to display each field. Defaults to None.
- `allow_no_address` _bool_ - Allow users to specify they don&#x27;t have an address. Defaults to False.
- `ask_if_impounded` _Optional[bool]_ - Whether to ask if the address is impounded. Defaults to False.
- `maxlengths` _Optional[Dict[str, int]]_ - A dictionary of field names and their maximum lengths. Defaults to None.
- `required` _Dict[str, bool], optional_ - A dictionary of field names and if they should be required. Default is None (everything but unit and zip is required)
  

**Returns**:

  List[Dict[str, Any]]: A list of dictionaries representing address fields.
  

**Notes**:

  - The function will set the `country` attribute of the Address to `country_code` under these
  circumstances:
  1. The `country_code` parameter is used.
  2. The `show_country` parameter is not used.
  3. `country_code` differs from the value returned by `get_country()`.
  
  - Link to ISO-3166-1 alpha-2 codes:
  [Officially assigned code elements](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).

<a id="AssemblyLine.al_general.ALAddress.formatted_unit"></a>

#### formatted\_unit(language: Optional[str] = None, require: bool = False, bare: bool = False)

```python
def formatted_unit(language: Optional[str] = None,
                   require: bool = False,
                   bare: bool = False) -> str
```

Returns the unit, formatted appropriately.

**Arguments**:

- `language` _str, optional_ - The language in which to format the unit. Defaults to None (which uses system language).
- `require` _bool, optional_ - A flag indicating whether the unit is required. If set to True, the function will
  raise an error if the unit attribute does not exist. Defaults to False.
- `bare` _bool, optional_ - A flag indicating whether to add the word &#x27;Unit&#x27; before the unit number. If set to
  True, the function will not add &#x27;Unit&#x27; regardless of other conditions. Defaults to False.
  

**Returns**:

  str:
  The formatted unit. If the unit attribute does not exist and require is set to False, this will be an
  empty string. If the unit attribute exists and is not None or an empty string, the function will return
  the unit number, possibly prefixed with &#x27;Unit&#x27;. If the unit attribute exists and is None or an empty
  string, the function will return an empty string.

<a id="AssemblyLine.al_general.ALAddress.block"></a>

#### block(language: Optional[str] = None, international: bool = False, show\_country: Optional[bool] = None, bare: bool = False, long\_state: bool = False, show\_impounded: bool = False)

```python
def block(language: Optional[str] = None,
          international: bool = False,
          show_country: Optional[bool] = None,
          bare: bool = False,
          long_state: bool = False,
          show_impounded: bool = False) -> str
```

Returns a one-line formatted address, primarily for geocoding.

**Arguments**:

- `language` _str, optional_ - Language for the address format.
- `international` _bool_ - If True, formats the address as an international address. Defaults to False.
- `show_country` _bool, optional_ - If True, includes the country in the formatted address.
  If None, decides based on the country attribute.
- `bare` _bool_ - If True, excludes certain formatting elements. Defaults to False.
- `long_state` _bool_ - If True, uses the full state name. Defaults to False.
- `show_impounded` _bool_ - If True, shows the address even if impounded. Defaults to False.
  

**Returns**:

- `str` - The one-line formatted address.

<a id="AssemblyLine.al_general.ALAddress.line_one"></a>

#### line\_one(language: Optional[str] = None, bare: bool = False, show\_impounded: bool = False)

```python
def line_one(language: Optional[str] = None,
             bare: bool = False,
             show_impounded: bool = False) -> str
```

Returns the first line of the address, including the unit number if it exists.

**Arguments**:

- `language` _str, optional_ - Language for the address format.
- `bare` _bool_ - If True, excludes certain formatting elements. Defaults to False.
- `show_impounded` _bool_ - If True, shows the address even if impounded. Defaults to False.
  

**Returns**:

- `str` - The first line of the address.

<a id="AssemblyLine.al_general.ALAddress.line_two"></a>

#### line\_two(language: Optional[str] = None, long\_state: bool = False, show\_impounded: bool = False)

```python
def line_two(language: Optional[str] = None,
             long_state: bool = False,
             show_impounded: bool = False) -> str
```

Returns the second line of the address, including city, state, and postal code.

**Arguments**:

- `language` _str, optional_ - Language for the address format.
- `long_state` _bool_ - If True, uses the full state name. Defaults to False.
- `show_impounded` _bool_ - If True, shows the address even if impounded. Defaults to False.
  

**Returns**:

- `str` - The second line of the address.

<a id="AssemblyLine.al_general.ALAddress.on_one_line"></a>

#### on\_one\_line(include\_unit: bool = True, omit\_default\_country: bool = True, language: Optional[str] = None, show\_country: Optional[bool] = None, bare: bool = False, long\_state: bool = False, show\_impounded: bool = False)

```python
def on_one_line(include_unit: bool = True,
                omit_default_country: bool = True,
                language: Optional[str] = None,
                show_country: Optional[bool] = None,
                bare: bool = False,
                long_state: bool = False,
                show_impounded: bool = False) -> str
```

Returns a one-line formatted address.

**Arguments**:

- `include_unit` _bool_ - If True, includes the unit in the formatted address. Defaults to True.
- `omit_default_country` _bool_ - If True, doesn&#x27;t show the docassemble default country in the formatted address. Defaults to True.
- `language` _str, optional_ - Language for the address format.
- `show_country` _bool, optional_ - If True, includes the country in the formatted address.
  If None, decides based on the country attribute.
- `bare` _bool_ - If True, excludes certain formatting elements. Defaults to False.
- `long_state` _bool_ - If True, uses the full state name. Defaults to False.
- `show_impounded` _bool_ - If True, shows the address even if impounded. Defaults to False.
  

**Returns**:

- `str` - The one-line formatted address.

<a id="AssemblyLine.al_general.ALAddress.normalized_address"></a>

#### normalized\_address()

```python
def normalized_address() -> Union[Address, "ALAddress"]
```

Try geocoding the address, returning the normalized version if successful.

If geocoding is successful, the method returns the &quot;long&quot; normalized version
of the address. All methods, such as `my_address.normalized_address().block()`, are
still available on the returned object. However, note that the returned object will
be a standard Address object, not an ALAddress object. If geocoding fails, it returns
the version of the address as entered by the user.

Warning: currently the normalized address will not be redacted if the address is impounded.

**Returns**:

  Union[Address, &quot;ALAddress&quot;]:
  Normalized address if geocoding is successful, otherwise
  the original address.

<a id="AssemblyLine.al_general.ALAddress.state_name"></a>

#### state\_name(country\_code: Optional[str] = None)

```python
def state_name(country_code: Optional[str] = None) -> str
```

Returns the full state name based on the state abbreviation.

If a `country_code` is provided, it will override the country attribute of the Address
object. Otherwise, the method uses, in order:

1. The country code associated with the Address object, and then
2. The country set in the global config for the server.

**Arguments**:

- `country_code` _str, optional_ - ISO-3166-1 alpha-2 code to override the country attribute of
  the Address object. For valid codes, refer to:
  https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
  

**Returns**:

- `str` - The full state name corresponding to the state abbreviation. If an error occurs
  or the full name cannot be determined, returns the state abbreviation.

<a id="AssemblyLine.al_general.ALAddressList"></a>

## ALAddressList Objects

```python
class ALAddressList(DAList)
```

A class to store a list of ALAddress objects.

Extends the DAList class and specifically caters to ALAddress objects.
It provides methods to initialize the list and get a string representation
of the list in a formatted manner.

<a id="AssemblyLine.al_general.ALAddressList.init"></a>

#### init(\*pargs, \*\*kwargs)

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

<a id="AssemblyLine.al_general.ALAddressList.__str__"></a>

#### \_\_str\_\_()

```python
def __str__() -> str
```

Provide a string representation of the ALAddressList.

This method returns the addresses in the list formatted in a
comma-separated manner using the on_one_line method of ALAddress.

**Returns**:

- `str` - Formatted string of all addresses in the list.

<a id="AssemblyLine.al_general.ALNameList"></a>

## ALNameList Objects

```python
class ALNameList(DAList)
```

A class to store a list of IndividualName objects.

Extends the DAList class and is tailored for IndividualName objects.

<a id="AssemblyLine.al_general.ALNameList.init"></a>

#### init(\*pargs, \*\*kwargs)

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

<a id="AssemblyLine.al_general.ALNameList.__str__"></a>

#### \_\_str\_\_()

```python
def __str__() -> str
```

Provide a string representation of the ALNameList.

**Returns**:

- `str` - Formatted string of all names in the list.

<a id="AssemblyLine.al_general.ALPeopleList"></a>

## ALPeopleList Objects

```python
class ALPeopleList(DAList)
```

Class to store a list of ALIndividual objects, representing people.

For example, defendants, plaintiffs, or children.

<a id="AssemblyLine.al_general.ALPeopleList.init"></a>

#### init(\*pargs, \*\*kwargs)

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

<a id="AssemblyLine.al_general.ALPeopleList.names_and_addresses_on_one_line"></a>

#### names\_and\_addresses\_on\_one\_line(comma\_string: str = "; ", bare=False)

```python
def names_and_addresses_on_one_line(comma_string: str = "; ",
                                    bare=False) -> str
```

Provide names and addresses of individuals on one line.

**Arguments**:

- `comma_string` _str, optional_ - The string to use between name-address pairs. Defaults to &#x27;; &#x27;.
- `bare` _bool, optional_ - If True, prevents appending the word &quot;Unit&quot; to the unit attribute. Defaults to False.
  

**Returns**:

- `str` - Formatted string of names followed by addresses.

<a id="AssemblyLine.al_general.ALPeopleList.familiar"></a>

#### familiar(\*\*kwargs)

```python
def familiar(**kwargs) -> str
```

Provide a list of familiar forms of names of individuals.

**Arguments**:

- `**kwargs` - Keyword arguments to pass to the familiar method.

**Returns**:

- `str` - Formatted string of familiar names.

<a id="AssemblyLine.al_general.ALPeopleList.familiar_or"></a>

#### familiar\_or(\*\*kwargs)

```python
def familiar_or(**kwargs) -> str
```

Provide a list of familiar forms of names of individuals separated by &#x27;or&#x27;.

**Arguments**:

- `**kwargs` - Keyword arguments to pass to the familiar method.
  

**Returns**:

- `str` - Formatted string of familiar names separated by &#x27;or&#x27;.

<a id="AssemblyLine.al_general.ALPeopleList.short_list"></a>

#### short\_list(limit: int, truncate\_string: str = ", et. al.")

```python
def short_list(limit: int, truncate_string: str = ", et. al.") -> str
```

Return a subset of the list, truncated with &#x27;et. al.&#x27; if it exceeds a given limit.

**Arguments**:

- `limit` _int_ - The maximum number of items to display before truncating.
- `truncate_string` _str, optional_ - The string to append when truncating. Defaults to &#x27;, et. al.&#x27;.
  

**Returns**:

- `str` - Formatted string of names, truncated if needed.

<a id="AssemblyLine.al_general.ALPeopleList.full_names"></a>

#### full\_names(comma\_string=", ", and\_string=word("and"))

```python
def full_names(comma_string=", ", and_string=word("and")) -> str
```

Return a formatted list of full names of individuals.

**Arguments**:

- `comma_string` _str, optional_ - The string to use between names. Defaults to &#x27;,&#x27;.
- `and_string` _str, optional_ - The string to use before the last name in the list. Defaults to &#x27;and&#x27;.
  

**Returns**:

- `str` - Formatted string of full names.

<a id="AssemblyLine.al_general.ALPeopleList.pronoun_reflexive"></a>

#### pronoun\_reflexive(\*\*kwargs)

```python
def pronoun_reflexive(**kwargs) -> str
```

Returns the appropriate reflexive pronoun for the list of people, depending
on the `person` keyword argument and the number of items in the list.

If the list is singular, return the reflexive pronoun for the first item in the list.
If it is plural, return the appropriate plural reflexive pronoun (e.g., &quot;themselves&quot;)

**Arguments**:

- `**kwargs` - Additional keyword arguments that are defined [upstream](https://docassemble.org/docs/objects.html#language%20methods).
  - person (Optional[[Union[str,int]]): Whether to use a first, second, or third person pronoun. Can be one of 1/&quot;1p&quot;, 2/&quot;2p&quot;, or 3/&quot;3p&quot; (default is 3). See [upstream](https://docassemble.org/docs/objects.html#language%20methods) documentation for more information.
  - default (Optional[str]): The default word to use if the pronoun is not defined, e.g. &quot;the agent&quot;. If not defined, the default term is the user&#x27;s name.
  

**Returns**:

- `str` - The reflexive pronoun for the list.

<a id="AssemblyLine.al_general.ALIndividual"></a>

## ALIndividual Objects

```python
class ALIndividual(Individual)
```

Used to represent an Individual on the assembly line project.

This class extends the Individual class and adds more tailored attributes and methods
relevant for the assembly line project. Specifically, it has attributes for previous addresses,
other addresses, mailing addresses, previous names, aliases, and a preferred name.

**Attributes**:

- `previous_addresses` _ALAddressList_ - List of previous addresses.
- `other_addresses` _ALAddressList_ - List of other addresses.
- `mailing_address` _ALAddress_ - Current mailing address.
- `service_address` _ALAddress_ - Service address.
- `previous_names` _ALNameList_ - List of previous names.
- `aliases` _ALNameList_ - List of aliases.
- `preferred_name` _IndividualName_ - The preferred name.
  

**Notes**:

  Objects as attributes should not be passed directly to the constructor due to
  initialization requirements in the docassemble framework. See the `init` method.

<a id="AssemblyLine.al_general.ALIndividual.init"></a>

#### init(\*pargs, \*\*kwargs)

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

<a id="AssemblyLine.al_general.ALIndividual.signature_if_final"></a>

#### signature\_if\_final(i: str)

```python
def signature_if_final(i: str) -> Union[DAFile, str]
```

Returns the individual&#x27;s signature if `i` is &quot;final&quot;, which usually means we are assembling the final version of the document (as opposed to a preview).

**Arguments**:

- `i` _str_ - The condition which, if set to &quot;final&quot;, returns the signature.
  

**Returns**:

  Union[DAFile, str]: The signature if the condition is met, otherwise an empty string.

<a id="AssemblyLine.al_general.ALIndividual.phone_numbers"></a>

#### phone\_numbers(country: Optional[str] = None, show\_impounded: bool = False)

```python
def phone_numbers(country: Optional[str] = None,
                  show_impounded: bool = False) -> str
```

Fetches and formats the phone numbers of the individual.

Supports the following attributes:

- `mobile_number`: Mobile phone number
- `phone_number`: Other phone number
- `work_number`: Work phone number
- `other_number`: Any other phone number
- `home_number`: Home phone number (if applicable)

**Arguments**:

- `country` _str, optional_ - The country for phone number formatting. Defaults to the country of the docassemble server.
- `show_impounded` _bool_ - If True, shows the phone numbers even if impounded. Defaults to False.
  

**Returns**:

- `str` - Formatted string of phone numbers.

<a id="AssemblyLine.al_general.ALIndividual.contact_methods"></a>

#### contact\_methods()

```python
def contact_methods() -> str
```

Generates a formatted string of all provided contact methods.

**Returns**:

- `str` - A formatted string indicating the available methods to contact the individual.

<a id="AssemblyLine.al_general.ALIndividual.merge_letters"></a>

#### merge\_letters(new\_letters: str)

```python
def merge_letters(new_letters: str) -> None
```

If the Individual has a child_letters attribute, add the new letters to the existing list

Avoid using. Only used in 209A.

**Arguments**:

- `new_letters` _str_ - The new letters to add to the existing list of letters

<a id="AssemblyLine.al_general.ALIndividual.formatted_age"></a>

#### formatted\_age()

```python
def formatted_age() -> str
```

Calculates and formats the age of the individual based on their birthdate.

**Returns**:

- `str` - Formatted age string that shows the most relevant time unit; for example, if under 2 years, it will return &quot;X months&quot;.

<a id="AssemblyLine.al_general.ALIndividual.normalized_address"></a>

#### normalized\_address()

```python
def normalized_address() -> Union[Address, ALAddress]
```

Fetches the normalized version of the address.

**Returns**:

  Union[Address, ALAddress]: The normalized address object.

<a id="AssemblyLine.al_general.ALIndividual.name_fields"></a>

#### name\_fields(person\_or\_business: str = "person", show\_suffix: bool = True, show\_title: bool = False, title\_choices: Optional[Union[List[str], Callable]] = None, show\_if: Union[str, Dict[str, str], None] = None, maxlengths: Optional[Dict[str, int]] = None, suffix\_choices: Optional[Union[List[str], Callable]] = None, title\_options: Optional[Union[List[str], Callable]] = None)

```python
def name_fields(
    person_or_business: str = "person",
    show_suffix: bool = True,
    show_title: bool = False,
    title_choices: Optional[Union[List[str], Callable]] = None,
    show_if: Union[str, Dict[str, str], None] = None,
    maxlengths: Optional[Dict[str, int]] = None,
    suffix_choices: Optional[Union[List[str], Callable]] = None,
    title_options: Optional[Union[List[str], Callable]] = None
) -> List[Dict[str, str]]
```

Generates suitable field prompts for a name based on the type of entity (person or business)
and other provided parameters.

**Arguments**:

- `person_or_business` _str, optional_ - Specifies the entity type. It can either be &quot;person&quot; or &quot;business&quot;.
  Default is &quot;person&quot;.
- `show_suffix` _bool, optional_ - Determines if the name&#x27;s suffix (e.g., Jr., Sr.) should be included in the prompts.
  Default is True.
- `show_title` - (bool, optional): Determines if the name&#x27;s title (e.g., Mr., Ms.) should be included in the prompts.
  Default is False.
- `title_choices` _Union[List[str], Callable], optional_ - A list or callable of title options to use in the prompts. Default is defined as a list
  of common titles in English-speaking countries, or overridden by value of global `al_name_titles`.
- `show_if` _Union[str, Dict[str, str], None], optional_ - Condition to determine which fields to show.
  It can be a string, a dictionary with conditions, or None. Default is None.
- `maxlengths` _Dict[str, int], optional_ - A dictionary of field names and their maximum lengths. Default is None.
- `suffix_choices` _Union[List[str], Callable], optional_ - A list of suffix options or a callable to generate suffix options, or overridden by value of global `al_name_suffixes`.
- `title_options` - (Union[List[str], Callable], optional): Deprecated parameter, use `title_choices` instead. If provided, it will be used to set the title choices.
  

**Returns**:

  List[Dict[str, str]]: A list of dictionaries where each dictionary contains field prompt details.
  

**Notes**:

  If `person_or_business` is set to None, the method will offer the end user a choice
  and will set appropriate &quot;show ifs&quot; conditions for each type.

<a id="AssemblyLine.al_general.ALIndividual.address_fields"></a>

#### address\_fields(country\_code: str = "US", default\_state: Optional[str] = None, show\_country: bool = False, show\_county: bool = False, show\_if: Union[str, Dict[str, str], None] = None, allow\_no\_address: bool = False, ask\_if\_impounded: bool = False, maxlengths: Optional[Dict[str, int]] = None, required: Optional[Dict[str, bool]] = None)

```python
def address_fields(
        country_code: str = "US",
        default_state: Optional[str] = None,
        show_country: bool = False,
        show_county: bool = False,
        show_if: Union[str, Dict[str, str], None] = None,
        allow_no_address: bool = False,
        ask_if_impounded: bool = False,
        maxlengths: Optional[Dict[str, int]] = None,
        required: Optional[Dict[str, bool]] = None) -> List[Dict[str, str]]
```

Generate field prompts for capturing an address.

**Arguments**:

- `country_code` _str_ - The default country for the address. Defaults to &quot;US&quot;.
- `default_state` _Optional[str]_ - Default state if applicable. Defaults to None.
- `show_country` _bool_ - Whether to display the country field. Defaults to False.
- `show_county` _bool_ - Whether to display the county field. Defaults to False.
- `show_if` _Union[str, Dict[str, str], None]_ - Condition to determine if the field should be shown. Defaults to None.
- `allow_no_address` _bool_ - Whether to permit entries with no address. Defaults to False.
- `ask_if_impounded` _bool_ - Whether to ask if the address is impounded. Defaults to False.
- `maxlengths` _Dict[str, int], optional_ - A dictionary of field names and their maximum lengths. Default is None.
- `required` _Dict[str, bool], optional_ - A dictionary of field names and if they should be required. Default is None (everything but unit and zip is required)
  

**Returns**:

  List[Dict[str, str]]: A list of dictionaries with field prompts for addresses.

<a id="AssemblyLine.al_general.ALIndividual.gender_fields"></a>

#### gender\_fields(show\_help=False, show\_if: Union[str, Dict[str, str], None] = None, maxlengths: Optional[Dict[str, int]] = None, choices: Optional[Union[List[Dict[str, str]], Callable]] = None)

```python
def gender_fields(
    show_help=False,
    show_if: Union[str, Dict[str, str], None] = None,
    maxlengths: Optional[Dict[str, int]] = None,
    choices: Optional[Union[List[Dict[str, str]], Callable]] = None
) -> List[Dict[str, str]]
```

Generate fields for capturing gender information, including a
self-described option.

**Arguments**:

- `show_help` _bool_ - Whether to show additional help text. Defaults to False.
- `show_if` _Union[str, Dict[str, str], None]_ - Condition to determine if the field should be shown. Defaults to None.
- `maxlengths` _Dict[str, int], optional_ - A dictionary of field names and their maximum lengths. Default is None.
- `choices` _Optional[Union[List[Dict[str, str]], Callable]]_ - A list of choices of genders to use in the prompts, or a callable that returns such a list. Default set of choices includes male, female, nonbinary, prefer-not-to-say, self-described, and unknown.
  

**Returns**:

  List[Dict[str, str]]: A list of dictionaries with field prompts for gender.
  

**Notes**:

  self-described will provide an input that overrides the value of `gender` and is not persisted.

<a id="AssemblyLine.al_general.ALIndividual.pronoun_fields"></a>

#### pronoun\_fields(show\_help=False, show\_if: Union[str, Dict[str, str], None] = None, required: bool = False, shuffle: bool = False, show\_unknown: Optional[Union[Literal["guess"], bool]] = "guess", maxlengths: Optional[Dict[str, int]] = None, choices: Optional[List[Dict[str, str]]] = None)

```python
def pronoun_fields(
        show_help=False,
        show_if: Union[str, Dict[str, str], None] = None,
        required: bool = False,
        shuffle: bool = False,
        show_unknown: Optional[Union[Literal["guess"], bool]] = "guess",
        maxlengths: Optional[Dict[str, int]] = None,
        choices: Optional[List[Dict[str,
                                    str]]] = None) -> List[Dict[str, str]]
```

Generate fields for capturing pronoun information.

**Arguments**:

- `show_help` _bool_ - Whether to show additional help text. Defaults to False.
- `show_if` _Union[str, Dict[str, str], None]_ - Condition to determine if the field should be shown. Defaults to None.
- `required` _bool_ - Whether the field is required. Defaults to False.
- `shuffle` _bool_ - Whether to shuffle the order of pronouns. Defaults to False.
- `show_unknown` _Union[Literal[&quot;guess&quot;], bool]_ - Whether to show an &quot;unknown&quot; option. Can be &quot;guess&quot;, True, or False. Defaults to &quot;guess&quot;.
- `maxlengths` _Dict[str, int], optional_ - A dictionary of field names and their maximum lengths. Default is None.
- `choices` _Optional[List[Dict[str, str]]]_ - A list of custom pronoun choices. Defaults to None. If not provided, global magic variable `al_pronoun_choices` will be used.
  

**Returns**:

  List[Dict[str, str]]: A list of dictionaries with field prompts for pronouns.

<a id="AssemblyLine.al_general.ALIndividual.get_pronouns"></a>

#### get\_pronouns()

```python
def get_pronouns() -> set
```

Retrieve a set of the individual&#x27;s pronouns.

If the individual has selected the &quot;self-described&quot; option, it will use their custom input.

Can be formatted however the author likes.

**Returns**:

- `set` - A set of strings representing the individual&#x27;s pronouns.

<a id="AssemblyLine.al_general.ALIndividual.list_pronouns"></a>

#### list\_pronouns()

```python
def list_pronouns() -> str
```

Retrieve a formatted string of the individual&#x27;s pronouns, arranged with
the comma_list() function.

**Returns**:

- `str` - A formatted string of the individual&#x27;s pronouns.

<a id="AssemblyLine.al_general.ALIndividual.language_fields"></a>

#### language\_fields(choices: Optional[Union[List[Dict[str, str]], Callable]] = None, style: str = "radio", show\_if: Union[str, Dict[str, str], None] = None, maxlengths: Optional[Dict[str, int]] = None)

```python
def language_fields(
        choices: Optional[Union[List[Dict[str, str]], Callable]] = None,
        style: str = "radio",
        show_if: Union[str, Dict[str, str], None] = None,
        maxlengths: Optional[Dict[str, int]] = None) -> List[Dict[str, str]]
```

Generate fields for capturing language preferences.

**Arguments**:

- `choices` _Optional[Union[List[Dict[str, str]], Callable]]_ - A list or callable of language choices. Defaults to None.
- `style` _str_ - The display style of choices. Defaults to &quot;radio&quot;.
- `show_if` _Union[str, Dict[str, str], None]_ - Condition to determine if the field should be shown. Defaults to None.
- `maxlengths` _Dict[str, int], optional_ - A dictionary of field names and their maximum lengths. Default is None.
  

**Returns**:

  List[Dict[str, str]]: A list of dictionaries with field prompts for language preferences.

<a id="AssemblyLine.al_general.ALIndividual.language_name"></a>

#### language\_name()

```python
def language_name() -> str
```

Get the human-readable version of the individual&#x27;s selected language.

**Returns**:

- `str` - The human-readable version of the language. If &#x27;other&#x27; is selected,
  it returns the value in `language_other`. Otherwise, it uses the
  `language_name` function.

<a id="AssemblyLine.al_general.ALIndividual.gender_male"></a>

#### gender\_male()

```python
@property
def gender_male() -> bool
```

Returns True only if the gender is male.

Used to assist with checkbox filling in PDFs with &quot;skip undefined&quot;
turned on.

<a id="AssemblyLine.al_general.ALIndividual.gender_female"></a>

#### gender\_female()

```python
@property
def gender_female() -> bool
```

Returns True only if the gender is female.

Used to assist with checkbox filling in PDFs with &quot;skip undefined&quot;
turned on.

<a id="AssemblyLine.al_general.ALIndividual.gender_other"></a>

#### gender\_other()

```python
@property
def gender_other() -> bool
```

Returns True only if the gender is not male or female.

Used to assist with checkbox filling in PDFs with &quot;skip undefined&quot;
turned on.

<a id="AssemblyLine.al_general.ALIndividual.gender_nonbinary"></a>

#### gender\_nonbinary()

```python
@property
def gender_nonbinary() -> bool
```

Returns True only if the gender is nonbinary.

Used to assist with checkbox filling in PDFs with &quot;skip undefined&quot;
turned on.

<a id="AssemblyLine.al_general.ALIndividual.gender_unknown"></a>

#### gender\_unknown()

```python
@property
def gender_unknown() -> bool
```

Returns True only if the gender is unknown.

Used to assist with checkbox filling in PDFs with &quot;skip undefined&quot;
turned on.

<a id="AssemblyLine.al_general.ALIndividual.gender_undisclosed"></a>

#### gender\_undisclosed()

```python
@property
def gender_undisclosed() -> bool
```

Returns True only if the gender is not disclosed (&quot;prefer-not-to-say&quot;)

Used to assist with checkbox filling in PDFs with &quot;skip undefined&quot;
turned on.

<a id="AssemblyLine.al_general.ALIndividual.gender_self_described"></a>

#### gender\_self\_described()

```python
@property
def gender_self_described() -> bool
```

Returns True only if the gender is self described.

Used to assist with checkbox filling in PDFs with &quot;skip undefined&quot;
turned on.

<a id="AssemblyLine.al_general.ALIndividual.contact_fields"></a>

#### contact\_fields()

```python
def contact_fields() -> None
```

Return field prompts for other contact info

<a id="AssemblyLine.al_general.ALIndividual.initials"></a>

#### initials()

```python
@property
def initials() -> str
```

Returns the initials of the individual as a string.

For example, &quot;Quinten K Steenhuis&quot; would return &quot;QKS&quot;.

<a id="AssemblyLine.al_general.ALIndividual.address_block"></a>

#### address\_block(language=None, international=False, show\_country=False, bare=False, show\_impounded=False)

```python
def address_block(language=None,
                  international=False,
                  show_country=False,
                  bare=False,
                  show_impounded=False) -> str
```

Generate a formatted address block for mailings.

**Arguments**:

- `language` _Optional_ - The language in which the address is written.
- `international` _bool_ - If True, format for international mailing. Defaults to False.
- `show_country` _bool_ - If True, include the country in the address. Defaults to False.
- `bare` _bool_ - If True, produce the address without additional formatting. Defaults to False.
- `show_impounded` _bool_ - If True, show the address even if it is impounded. Defaults to False.
  

**Returns**:

- `str` - The formatted address block.

<a id="AssemblyLine.al_general.ALIndividual.pronoun"></a>

#### pronoun(\*\*kwargs)

```python
def pronoun(**kwargs) -> str
```

Returns an objective pronoun as appropriate, based on the user&#x27;s `pronouns` attribute or `gender` attribute.

The pronoun could be &quot;I&quot;, &quot;you,&quot; &quot;her,&quot; &quot;him,&quot; &quot;it,&quot; or &quot;them&quot;, or a user-provided pronoun.
If the user has selected multiple pronouns, each will appear, separated by a &quot;/&quot;.

This method will not trigger the definition of `gender` or `pronouns`, but it will use them if they are defined,
with `pronouns` taking precedence. As a default, it will either use the value of `default` or the individual&#x27;s full name.

**Arguments**:

- `**kwargs` - Additional keyword arguments that are defined [upstream](https://docassemble.org/docs/objects.html#language%20methods).
  - person (Optional[[Union[str,int]]): Whether to use a first, second, or third person pronoun. Can be one of 1/&quot;1p&quot;, 2/&quot;2p&quot;, or 3/&quot;3p&quot; (default is 3). See [upstream](https://docassemble.org/docs/objects.html#language%20methods) documentation for more information.
  - default (Optional[str]): The default word to use if the pronoun is not defined, e.g. &quot;the agent&quot;. If not defined, the default term is the user&#x27;s name.

**Returns**:

- `str` - The appropriate pronoun.

<a id="AssemblyLine.al_general.ALIndividual.pronoun_objective"></a>

#### pronoun\_objective(\*\*kwargs)

```python
def pronoun_objective(**kwargs) -> str
```

Returns the same pronoun as the `pronoun()` method.

**Arguments**:

- `**kwargs` - Additional keyword arguments.
  

**Returns**:

- `str` - The appropriate objective pronoun.

<a id="AssemblyLine.al_general.ALIndividual.pronoun_possessive"></a>

#### pronoun\_possessive(target, \*\*kwargs)

```python
def pronoun_possessive(target, **kwargs) -> str
```

Returns a possessive pronoun and a target word, based on attributes.

This method will not trigger the definition of `gender` or `pronouns`, but it will use them if they are defined,
with `pronouns` taking precedence. As a default, it will either use the value of `default` or the individual&#x27;s full name.

Given a target word, the function returns &quot;\{pronoun\} \{target\}&quot;. The pronoun could be
&quot;my&quot;, &quot;her,&quot; &quot;his,&quot; &quot;its,&quot; or &quot;their&quot;. It depends on the `gender` and `person_type` attributes
and whether the individual is the current user.

**Arguments**:

- `target` _str_ - The target word to follow the pronoun.
- `**kwargs` - Additional keyword arguments that can be passed to modify the behavior. These might include:
  - `default` (Optional[str]): The default word to use if the pronoun is not defined, e.g., &quot;the agent&quot;. If not defined, the default term is the user&#x27;s name.
  - `person` (Optional[Union[str, int]]): Whether to use a first, second, or third person pronoun. Can be one of 1/&quot;1p&quot;, 2/&quot;2p&quot;, or 3/&quot;3p&quot; (default is 3). See [upstream documentation](https://docassemble.org/docs/objects.html#language%20methods) for more information.
  

**Returns**:

- `str` - The appropriate possessive phrase, e.g., &quot;her book&quot;, &quot;their document&quot;.

<a id="AssemblyLine.al_general.ALIndividual.pronoun_subjective"></a>

#### pronoun\_subjective(\*\*kwargs)

```python
def pronoun_subjective(**kwargs) -> str
```

Returns a subjective pronoun, based on attributes.

The pronoun could be &quot;you,&quot; &quot;we&quot;, &quot;she,&quot; &quot;he,&quot; &quot;it,&quot; or &quot;they&quot;. It depends
on the `gender` and `person_type` attributes and whether the individual
is the current user.

**Arguments**:

- `**kwargs` - Additional keyword arguments that are defined [upstream](https://docassemble.org/docs/objects.html#language%20methods).
  - person (Optional[[Union[str,int]]): Whether to use a first, second, or third person pronoun. Can be one of 1/&quot;1p&quot;, 2/&quot;2p&quot;, or 3/&quot;3p&quot; (default is 3). See [upstream](https://docassemble.org/docs/objects.html#language%20methods) documentation for more information.
  - default (Optional[str]): The default word to use if the pronoun is not defined, e.g. &quot;the agent&quot;. If not defined, the default term is the user&#x27;s name.

**Returns**:

- `str` - The appropriate subjective pronoun.

<a id="AssemblyLine.al_general.ALIndividual.pronoun_reflexive"></a>

#### pronoun\_reflexive(\*\*kwargs)

```python
def pronoun_reflexive(**kwargs) -> str
```

Returns the appropriate reflexive pronoun (&quot;herself&quot;, &quot;themself&quot;, &quot;myself&quot;), based on the user&#x27;s pronouns or gender and whether we are asked
to return a 1st, 2nd, or 3rd person pronoun.

Note that if the person has pronouns of they/them/theirs or a nonbinary gender, we return &quot;themself&quot; as the singular non-gendered
reflexive pronoun and not &quot;themselves&quot;. This has growing acceptance although some consider it nonstandard.
See: https://www.merriam-webster.com/wordplay/themself

**Arguments**:

- `**kwargs` - Additional keyword arguments that are defined [upstream](https://docassemble.org/docs/objects.html#language%20methods).
  - person (Optional[[Union[str,int]]): Whether to use a first, second, or third person pronoun. Can be one of 1/&quot;1p&quot;, 2/&quot;2p&quot;, or 3/&quot;3p&quot; (default is 3). See [upstream](https://docassemble.org/docs/objects.html#language%20methods) documentation for more information.
  - default (Optional[str]): The default word to use if the pronoun is not defined, e.g. &quot;the agent&quot;. If not defined, the default term is the user&#x27;s name.
  

**Returns**:

- `str` - The appropriate reflexive pronoun.

<a id="AssemblyLine.al_general.ALIndividual.name_full"></a>

#### name\_full()

```python
def name_full() -> str
```

Returns the individual&#x27;s full name.

If the person has the attribute person_type and it is defined
as either `business` or `organization`, it will only return
the first name, even if middle, last, or suffix are defined.

**Returns**:

- `str` - The individual or business&#x27;s full name.

<a id="AssemblyLine.al_general.ALIndividual.name_initials"></a>

#### name\_initials()

```python
def name_initials() -> str
```

Returns the individual&#x27;s name with the middle name as an initial.
Equivalent to `name.full(middle="initial")`, which is also the default.
Defined only to make it possible to be explicit about the name form.

If the person has the attribute person_type and it is defined
as either `business` or `organization`, it will only return
the &quot;initials&quot; of the first name, even if middle, last, or suffix are defined.

**Returns**:

- `str` - The individual&#x27;s name with the middle name as an initial.

<a id="AssemblyLine.al_general.ALIndividual.name_short"></a>

#### name\_short()

```python
def name_short() -> str
```

Returns the individual&#x27;s name without any middle name.

Equivalent to self.name.firstlast()

If the person has the attribute person_type and it is defined
as either `business` or `organization`, it will only return
the first name, even if middle, last, or suffix are defined.

**Returns**:

- `str` - The individual&#x27;

<a id="AssemblyLine.al_general.ALIndividual.familiar"></a>

#### familiar(unique\_names: Optional[List[Any]] = None, default: Optional[str] = None)

```python
def familiar(unique_names: Optional[List[Any]] = None,
             default: Optional[str] = None) -> str
```

Returns the individual&#x27;s name in the most familiar form possible.

The purpose is to allow using a short version of the individual&#x27;s name in an unambiguous
way in the interview. For example: referring to the child in a guardianship petition
by first name instead of &quot;the minor&quot;. But there may be a problem if context doesn&#x27;t make
it clear if you are talking about the child or their parent when they share a name.

In order, it will try to use:

* just the first name
* the first name and suffix
* the first and middle name
* the first and last name
* the full name
* the default value, e.g., &quot;the minor&quot;, if provided
* the full name

If the person has the attribute `person_type` and it is defined
as either `business` or `organization`, it will only return
the first name, even if middle, last, or suffix are defined.

**Arguments**:

- `unique_names` _Optional[List[Any]]_ - A list of unique names to compare against. Defaults to None.
- `default` _Optional[str]_ - The default name to return if no unique name is found. Defaults to None.
  

**Returns**:

- `str` - The individual&#x27;s name in the most familiar form possible.
  

**Example**:

    ```mako
    Who do you want to take care of $\{ children.familiar(unique_names=parents + petitioners, default="the minor") \}
    ```

<a id="AssemblyLine.al_general.ALIndividual.__str__"></a>

#### \_\_str\_\_()

```python
def __str__() -> str
```

Returns a string representation of the individual, which is their full name with the
middle name shortened to one letter.

If the individual has the attribute `person_type` and it is defined
as either `business` or `organization`, it will only return
the first name, even if middle, last, or suffix are defined.

**Returns**:

- `str` - The individual&#x27;s name.

<a id="AssemblyLine.al_general.section_links"></a>

#### section\_links(nav)

```python
def section_links(nav) -> List[str]
```

Returns a list of clickable navigation links without animation.

**Arguments**:

- `nav` - The navigation object.
  

**Returns**:

- `List[str]` - A list of clickable navigation links without animation.

<a id="AssemblyLine.al_general.will_send_to_real_court"></a>

#### will\_send\_to\_real\_court()

```python
def will_send_to_real_court() -> bool
```

For legacy email to court forms, this checks to see if the form
is being run on the dev, test, or production server.

The text &quot;dev&quot; or &quot;test&quot; needs to be in the URL root in the DA config: can change in `/config`.

**Returns**:

- `bool` - True if the form is being run on the dev, test, or production server.

<a id="AssemblyLine.al_general.filter_letters"></a>

#### filter\_letters(letter\_strings: Union[List[str], str])

```python
def filter_letters(letter_strings: Union[List[str], str]) -> str
```

Used to take a list of letters like [&quot;A&quot;,&quot;ABC&quot;,&quot;AB&quot;] and filter out any duplicate letters.

Avoid using, this is created for 209A.

**Arguments**:

- `letter_strings` _Union[List[str], str]_ - A list of letters.
  

**Returns**:

- `str` - A string of unique letters.

<a id="AssemblyLine.al_general.fa_icon"></a>

#### fa\_icon(icon: str, color: str = "primary", color\_css: Optional[str] = None, size: str = "sm")

```python
def fa_icon(icon: str,
            color: str = "primary",
            color_css: Optional[str] = None,
            size: str = "sm") -> str
```

Return HTML for a font-awesome icon of the specified size and color. You can reference
a CSS variable (such as Bootstrap theme color) or a true CSS color reference, such as &#x27;blue&#x27; or
&#x27;`DDDDDD`&#x27;. Defaults to Bootstrap theme color &quot;primary&quot;.

**Arguments**:

- `icon` _str_ - The name of the icon to use. See https://fontawesome.com/icons for a list of icons.
- `color` _str_ - The color of the icon. Defaults to &quot;primary&quot;.
- `color_css` _Optional[str]_ - A CSS variable or color reference. Defaults to None.
- `size` _str_ - The size of the icon. Defaults to &quot;sm&quot;.
  

**Returns**:

- `str` - HTML for the icon.

<a id="AssemblyLine.al_general.is_sms_enabled"></a>

#### is\_sms\_enabled()

```python
def is_sms_enabled() -> bool
```

Checks if SMS (Twilio) is enabled on the server. Does not verify that it works.

See https://docassemble.org/docs/config.html#twilio for more info.

**Returns**:

- `bool` - True if there is a non-empty Twilio config on the server, False otherwise

<a id="AssemblyLine.al_general.is_phone_or_email"></a>

#### is\_phone\_or\_email(text: str)

```python
def is_phone_or_email(text: str) -> bool
```

Returns True if the string is either a valid phone number or a valid email address.
If SMS is not enabled on the server (through the Twilio config), only accepts emails.
Email validation is extremely minimal--just checks for an @ sign between two non-zero length
strings.

**Arguments**:

- `text` _str_ - The string to check.
  

**Returns**:

- `bool` - True if the string is either a valid phone number or a valid email address.
  

**Raises**:

  DAValidationError if the string is neither a valid phone number nor a valid email address.

<a id="AssemblyLine.al_general.github_modified_date"></a>

#### github\_modified\_date(github\_user: str, github\_repo\_name: str, auth=None)

```python
def github_modified_date(github_user: str,
                         github_repo_name: str,
                         auth=None) -> Union[DADateTime, None]
```

Returns the date that the given GitHub repository was modified or None if API call fails.

Will check for the presence of credentials in the configuration labeled &quot;github issues&quot;
in this format:

github issues:
username: YOUR_GITHUB_USERNAME
token: YOUR_GITHUB_PRIVATE_TOKEN

If those credentials aren&#x27;t found, it will then search for credentials in this format (deprecated):

github readonly:
username: YOUR_GITHUB_USERNAME
password: YOUR_GITHUB_PRIVATE_TOKEN
type: basic

If no valid auth information is in the configuration, it will fall back to anonymous authentication.
The GitHub API is rate-limited to 60 anonymous API queries/hour.

**Arguments**:

- `github_user` _str_ - The GitHub username of the repository owner.
- `github_repo_name` _str_ - The name of the repository.
- `auth` _Optional[dict]_ - A dictionary containing authentication information. Defaults to None.
  

**Returns**:

  Union[DADateTime, None]: The date that the given GitHub repository was modified or None if API call fails.

<a id="AssemblyLine.al_general.language_name"></a>

#### language\_name(language\_code: str)

```python
def language_name(language_code: str) -> str
```

Given a 2 digit language code abbreviation, returns the full
name of the language. The language name will be passed through the `word()`
function.

**Arguments**:

- `language_code` _str_ - A 2 digit language code abbreviation.
  

**Returns**:

- `str` - The full name of the language.

<a id="AssemblyLine.al_general.safe_states_list"></a>

#### safe\_states\_list(country\_code: str)

```python
def safe_states_list(country_code: str) -> List[Dict[str, str]]
```

Wrapper around states_list that doesn&#x27;t error if passed
an invalid country_code (e.g., a country name spelled out)

**Arguments**:

- `country_code` _str_ - A 2 digit country code abbreviation.
  

**Returns**:

  List[Dict[str, str]]: A list of dictionaries with field prompts for states.

<a id="AssemblyLine.al_general.has_parsable_pronouns"></a>

#### has\_parsable\_pronouns(pronouns: str)

```python
def has_parsable_pronouns(pronouns: str) -> bool
```

Returns True if the pronouns string can be parsed into a dictionary of pronouns.

**Arguments**:

- `pronouns` - a string of pronouns in the format &quot;objective/subjective/possessive&quot;
  

**Returns**:

  True if the pronouns string can be parsed into a dictionary of pronouns, False otherwise

<a id="AssemblyLine.al_general.parse_custom_pronouns"></a>

#### parse\_custom\_pronouns(pronouns: str)

```python
def parse_custom_pronouns(pronouns: str) -> Dict[str, str]
```

Parses a custom pronoun string into a dictionary of pronouns.

**Arguments**:

- `pronouns` - a string of pronouns in the format &quot;objective/subjective/possessive&quot;
  

**Returns**:

  a dictionary of pronouns in the format \{&quot;o&quot;: objective, &quot;s&quot;: subjective, &quot;p&quot;: possessive\}

<a id="AssemblyLine.al_general.get_visible_al_nav_items"></a>

#### get\_visible\_al\_nav\_items(nav\_items: List[Union[str, dict]])

```python
def get_visible_al_nav_items(
        nav_items: List[Union[str, dict]]) -> List[Union[str, dict]]
```

Processes a list of nav items and returns only the ones that are not hidden.
Can be used to control the visible nav items in a more declarative way while keeping
the navigation dynamic.

Expects a list like this:

data = [
\{&quot;key&quot;: &quot;value&quot;, &quot;hidden&quot;: True\},
&quot;top level item&quot;,
\{&quot;key2&quot;: [\{&quot;subkey&quot;: &quot;subvalue&quot;, &quot;hidden&quot;: False\}, \{&quot;subkey&quot;: &quot;subvalue2&quot;, &quot;hidden&quot;: True\}]\},
]

**Arguments**:

- `nav_items` - a list of nav items
  

**Returns**:

  a list of nav items with hidden items removed

