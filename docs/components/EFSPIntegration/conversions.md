# Table of Contents

* [EFSPIntegration.conversions](#EFSPIntegration.conversions)
  * [error\_notification](#EFSPIntegration.conversions.error_notification)
  * [log\_error\_and\_notify](#EFSPIntegration.conversions.log_error_and_notify)
  * [convert\_court\_to\_id](#EFSPIntegration.conversions.convert_court_to_id)
  * [choices\_and\_map](#EFSPIntegration.conversions.choices_and_map)
  * [pretty\_display](#EFSPIntegration.conversions.pretty_display)
  * [debug\_display](#EFSPIntegration.conversions.debug_display)
  * [tyler\_daterep\_to\_datetime](#EFSPIntegration.conversions.tyler_daterep_to_datetime)
  * [tyler\_timestamp\_to\_datetime](#EFSPIntegration.conversions.tyler_timestamp_to_datetime)
  * [validate\_tyler\_regex](#EFSPIntegration.conversions.validate_tyler_regex)
  * [parse\_service\_contacts](#EFSPIntegration.conversions.parse_service_contacts)
  * [parse\_case\_info](#EFSPIntegration.conversions.parse_case_info)
  * [fetch\_case\_info](#EFSPIntegration.conversions.fetch_case_info)
  * [filter\_payment\_accounts](#EFSPIntegration.conversions.filter_payment_accounts)
  * [payment\_account\_labels](#EFSPIntegration.conversions.payment_account_labels)
  * [filing\_id\_and\_label](#EFSPIntegration.conversions.filing_id_and_label)
  * [get\_tyler\_roles](#EFSPIntegration.conversions.get_tyler_roles)

---
sidebar_label: conversions
title: EFSPIntegration.conversions
---

Functions that help convert the JSON-ized XML from the proxy server into usable information.

<a id="EFSPIntegration.conversions.error_notification"></a>

#### error\_notification(err, message=None, trace=None, referer=None, the\_vars=None)

```python
def error_notification(err,
                       message=None,
                       trace=None,
                       referer=None,
                       the_vars=None)
```

Copied from docassemble.webapp.server.error_notification, since:
1) things from webapp.* are unstable
2) it breaks the unit tests and the mypy

Some slight modifications to work without server backends

<a id="EFSPIntegration.conversions.log_error_and_notify"></a>

#### log\_error\_and\_notify(context: str, resp: Optional[ApiResponse] = None)

```python
def log_error_and_notify(context: str, resp: Optional[ApiResponse] = None)
```

Similar to docassemble.webapp.server.error_notification, which will send an email to
the `error_notification_email` in the config.

<a id="EFSPIntegration.conversions.convert_court_to_id"></a>

#### convert\_court\_to\_id(trial\_court)

```python
def convert_court_to_id(trial_court) -> str
```

Converts a court type to the specific id string expected by Tyler.

A fairly ad-hoc function; it will check if the object has several attributes
(&quot;tyler_court_code&quot;, &quot;tyler_code&quot;, or &quot;name&quot;), or if it&#x27;s already a string, it
tries to just make a lower case on the string. We strongly recommend that
your court object use the &quot;tyler_court_code&quot; attribute though.

**Arguments**:

- `trial_court` - the court object
  

**Returns**:

  the string that should be the Tyler EFM court id, i.e. `adams` or `peoria:cr`

<a id="EFSPIntegration.conversions.choices_and_map"></a>

#### choices\_and\_map(codes\_list: List[Dict[str, Any]], display: str = None, backing: str = None)

```python
def choices_and_map(codes_list: List[Dict[str, Any]],
                    display: str = None,
                    backing: str = None) -> Tuple[List[Any], Dict]
```

Takes the responses from the &#x27;codes&#x27; service and make a DA ready list of choices and a map back
to the full code object

**Arguments**:

- `codes_list` - should be the direct response from a &#x27;codes&#x27; service, i.e. `proxy_conn.get_case_categories(court_id).data`
- `display` - a python format string, where the input variables are the keys of the individual code elements. By
  default, it&#x27;s &quot;\{name\}&quot;, but could be something else like &quot;\{name\} (\{code\})&quot;
- `backing` - the key to each dict element in the codes_list that you want to use as the &quot;canonical&quot; representation
  of the code, i.e. each is unique, and there aren&#x27;t conflicts

**Returns**:

  a tuple; first, a list of the codes that can be used at the `choices` in a docassemble field,
  second, a map of each code, from the backing key to the full code element. Useful for getting
  all of the information about a code after a user has selected it.

<a id="EFSPIntegration.conversions.pretty_display"></a>

#### pretty\_display(data, tab\_depth=0, skip\_xml=True, item\_name=None)

```python
def pretty_display(data, tab_depth=0, skip_xml=True, item_name=None) -> str
```

Given an arbitrarily nested JSON structure, print it nicely as markdown.
Recursive, for subsequent calls `tab_depth` increases.

**Arguments**:

- `data` - the JSON structure (python dicts, lists, strings and ints) to print
- `tab_depth` - how many spaces to add before each new line, to make the markdown correct
- `skip_xml` - this function is mostly for printing responses from the EfileProxyServer, which
  lazily returns XML as JSON. If this is true, we won&#x27;t show the useless XML cruft
- `item_name` - when recursing, will show the parent&#x27;s name when showing elements in a list
  

**Returns**:

  The string of markdown text that displays info about the given JSON structure

<a id="EFSPIntegration.conversions.debug_display"></a>

#### debug\_display(resp: ApiResponse)

```python
def debug_display(resp: ApiResponse) -> str
```

Returns a string with either the error of the response,
or it&#x27;s data run through [pretty_display](#pretty_display)

<a id="EFSPIntegration.conversions.tyler_daterep_to_datetime"></a>

#### tyler\_daterep\_to\_datetime(tyler\_daterep: Mapping)

```python
def tyler_daterep_to_datetime(tyler_daterep: Mapping) -> DADateTime
```

Takes an jsonized-XML object of &quot;\{http://niem.gov/niem/niem-core/2.0\}ActivityDate,
returns the datetime it represents.

<a id="EFSPIntegration.conversions.tyler_timestamp_to_datetime"></a>

#### tyler\_timestamp\_to\_datetime(timestamp\_ms: int)

```python
def tyler_timestamp_to_datetime(timestamp_ms: int) -> DADateTime
```

Given a timestamp in milliseconds from epoch (in UTC), make a datetime from it

<a id="EFSPIntegration.conversions.validate_tyler_regex"></a>

#### validate\_tyler\_regex(data\_field: Mapping)

```python
def validate_tyler_regex(data_field: Mapping) -> Callable[[str], Any]
```

Return a function that validates a given input with the provided regex,
suitable for use with docassemble&#x27;s `validate:` question modifier

<a id="EFSPIntegration.conversions.parse_service_contacts"></a>

#### parse\_service\_contacts(service\_list)

```python
def parse_service_contacts(service_list)
```

We&#x27;ll take both Tyler service contact lists and Niem service contact lists.
Tyler&#x27;s are just `\{&quot;firstName&quot;: &quot;Bob&quot;, &quot;middleName&quot;: &quot;P&quot;, ..., &quot;serviceContactId&quot;: &quot;abcrunh-13...&quot;
Niem&#x27;s are more complicated

<a id="EFSPIntegration.conversions.parse_case_info"></a>

#### parse\_case\_info(proxy\_conn: ProxyConnection, new\_case: DAObject, entry: dict, court\_id: str, \*, fetch: bool = True, roles: dict = None)

```python
def parse_case_info(proxy_conn: ProxyConnection,
                    new_case: DAObject,
                    entry: dict,
                    court_id: str,
                    *,
                    fetch: bool = True,
                    roles: dict = None)
```

Given sparse information about a case, gets the full details about it

**Arguments**:

- `proxy_conn` - the connection to the EFileProxyServer
- `new_case` - the object to hold all of the information about the case
- `entry` - the information we have about the case, usually from a call to `get_cases`
- `court_id` - the id of the court that we searched in to get this info
- `fetch` - if true, will fetch more detailed information about the case,
  include the case title
- `roles` - a dictionary of the party type codes to the party type name.
  Used so we can filter and sort participants later

<a id="EFSPIntegration.conversions.fetch_case_info"></a>

#### fetch\_case\_info(proxy\_conn: ProxyConnection, new\_case: DAObject, roles: Optional[dict] = None)

```python
def fetch_case_info(proxy_conn: ProxyConnection,
                    new_case: DAObject,
                    roles: Optional[dict] = None) -> None
```

Fills in these attributes with the full case details:
* attorneys
* party_to_attorneys
* case_details_worked
* case_details
* case_type
* title
* date
* participants

<a id="EFSPIntegration.conversions.filter_payment_accounts"></a>

#### filter\_payment\_accounts(account\_list, allowable\_card\_types: List)

```python
def filter_payment_accounts(account_list, allowable_card_types: List) -> List
```

Gets a list of all payment accounts and filters them by if the card is
accepted at a particular court.

**Arguments**:

  account_list:
- `allowable_card_types` - a list of the accepted card types at a court, usually
  from the &#x27;allowablecardtypes&#x27; dict entry in
  [get_full_court_info](interview_logic#get_full_court_info)&#x27;s response
  

**Returns**:

  the list of payment account choices that are valid for a particular court

<a id="EFSPIntegration.conversions.payment_account_labels"></a>

#### payment\_account\_labels(resp: ApiResponse)

```python
def payment_account_labels(resp: ApiResponse) -> Optional[List[Dict]]
```

Returns all payment accounts as choices, without filters.

<a id="EFSPIntegration.conversions.filing_id_and_label"></a>

#### filing\_id\_and\_label(case: Mapping, style: str = "FILING\_ID")

```python
def filing_id_and_label(case: Mapping,
                        style: str = "FILING_ID") -> Dict[str, str]
```

Converts a raw case information from [proxy_conn.get_filing_list()](py_efsp_client#get_filing_list)
into a key-value pair, where the key is the filing id and the value is the user-facing label
for that filing.

<a id="EFSPIntegration.conversions.get_tyler_roles"></a>

#### get\_tyler\_roles(proxy\_conn: ProxyConnection, login\_data: Optional[Mapping], user\_details: Optional[ApiResponse] = None)

```python
def get_tyler_roles(
        proxy_conn: ProxyConnection,
        login_data: Optional[Mapping],
        user_details: Optional[ApiResponse] = None) -> Tuple[bool, bool]
```

Gets whether or not the user of this interview is a Tyler Admin, and a &#x27;global&#x27; admin.
The global admin means that they are allowed to change specific Global payment methods,
and can be listed under the &#x27;global server admins&#x27; section of the &#x27;efile proxy&#x27; settings in the
DAConfig

