# Table of Contents

* EFSPIntegration.py\_efsp\_client
  * [EfspConnection](#EFSPIntegration.py_efsp_client.EfspConnection)
    * [\_\_init\_\_](#EFSPIntegration.py_efsp_client.EfspConnection.__init__)
    * [authenticate\_user](#EFSPIntegration.py_efsp_client.EfspConnection.authenticate_user)
    * [register\_user](#EFSPIntegration.py_efsp_client.EfspConnection.register_user)
    * [get\_password\_rules](#EFSPIntegration.py_efsp_client.EfspConnection.get_password_rules)
    * [get\_notification\_options](#EFSPIntegration.py_efsp_client.EfspConnection.get_notification_options)
    * [get\_firm](#EFSPIntegration.py_efsp_client.EfspConnection.get_firm)
    * [update\_firm](#EFSPIntegration.py_efsp_client.EfspConnection.update_firm)
    * [get\_courts](#EFSPIntegration.py_efsp_client.EfspConnection.get_courts)
    * [get\_court](#EFSPIntegration.py_efsp_client.EfspConnection.get_court)
    * [get\_court\_list](#EFSPIntegration.py_efsp_client.EfspConnection.get_court_list)
    * [get\_filing\_list](#EFSPIntegration.py_efsp_client.EfspConnection.get_filing_list)
    * [get\_service\_types](#EFSPIntegration.py_efsp_client.EfspConnection.get_service_types)
    * [get\_cases\_raw](#EFSPIntegration.py_efsp_client.EfspConnection.get_cases_raw)

---
sidebar_label: py_efsp_client
title: EFSPIntegration.py_efsp_client
---

The base python client used to communicate with the E-file proxy server.

Doesn&#x27;t include anything from docassemble, and can be used without having it installed.

## EfspConnection Objects {#EFSPIntegration.py\_efsp\_client.EfspConnection}

```python
class EfspConnection()
```

A python client that communicates with the E-file proxy server.

#### \_\_init\_\_(\*, url: str, api\_key: str, default\_jurisdiction: str = None) {#EFSPIntegration.py\_efsp\_client.EfspConnection.\_\_init\_\_}

```python
def __init__(*, url: str, api_key: str, default_jurisdiction: str = None)
```

**Arguments**:

  url (str)
  api_key (str)
  default_jurisdiction (str)

#### authenticate\_user(\*, tyler\_email: Optional[str] = None, tyler\_password: Optional[str] = None, jeffnet\_key: Optional[str] = None, jurisdiction: str = None) {#EFSPIntegration.py\_efsp\_client.EfspConnection.authenticate\_user}

```python
def authenticate_user(*,
                      tyler_email: Optional[str] = None,
                      tyler_password: Optional[str] = None,
                      jeffnet_key: Optional[str] = None,
                      jurisdiction: str = None) -> ApiResponse
```

Authenticates the user with the EFM server (not the E-file proxy).

#### register\_user(person: dict, registration\_type: str, \*, password: str = None, firm\_name\_or\_id: str = None) {#EFSPIntegration.py\_efsp\_client.EfspConnection.register\_user}

```python
def register_user(person: dict,
                  registration_type: str,
                  *,
                  password: str = None,
                  firm_name_or_id: str = None) -> ApiResponse
```

registration_type needs to be INDIVIDUAL, FIRM_ADMINISTRATOR, or FIRM_ADMIN_NEW_MEMBER.
If registration_type is INDIVIDUAL or FIRM_ADMINISTRATOR, you need a password.
If it&#x27;s FIRM_ADMINISTRATOR or FIRM_ADMIN_NEW_MEMBER, you need a firm_name_or_id

#### get\_password\_rules() {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_password\_rules}

```python
def get_password_rules() -> ApiResponse
```

Password rules are stored in the global court, id 0.

TODO: They&#x27;re in other courts too, including 1. Could they ever be different?

#### get\_notification\_options() {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_notification\_options}

```python
def get_notification_options() -> ApiResponse
```

AKA NotificationPreferencesList

#### get\_firm() {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_firm}

```python
def get_firm() -> ApiResponse
```

Gets info about the &quot;firm&quot; for an associated user. If a user is a pro-se, this
contains their address information.

#### update\_firm(firm: dict) {#EFSPIntegration.py\_efsp\_client.EfspConnection.update\_firm}

```python
def update_firm(firm: dict) -> ApiResponse
```

firm should have the below keys:
* firstName, middleName, lastName if it&#x27;s a person
* firmName if it&#x27;s a business
* address (a dict), with keys addressLine1 addressLine2, city, state, zipCode, country
* phoneNumber
* email

#### get\_courts(fileable\_only: bool = False, with\_names: bool = False) {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_courts}

```python
def get_courts(fileable_only: bool = False,
               with_names: bool = False) -> ApiResponse
```

Gets the list of courts.

#### get\_court(court\_id: str) {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_court}

```python
def get_court(court_id: str) -> ApiResponse
```

Gets codes for a specific court

#### get\_court\_list() {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_court\_list}

```python
def get_court_list() -> ApiResponse
```

Gets a list of all of the courts that you can file into. Slightly more limited than
[get_courts](#EFSPIntegration.py_efsp_client.EfspConnection.get_courts)

#### get\_filing\_list(court\_id: str, user\_id: str = None, start\_date: datetime = None, before\_date: datetime = None) {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_filing\_list}

```python
def get_filing_list(court_id: str,
                    user_id: str = None,
                    start_date: datetime = None,
                    before_date: datetime = None) -> ApiResponse
```

Returns a list of filings that a particular user has made with a court.

#### get\_service\_types(court\_id: str, all\_vars: dict = None) {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_service\_types}

```python
def get_service_types(court_id: str, all_vars: dict = None) -> ApiResponse
```

Checks the court info: if it has conditional service types, call a special API with all filing info so far to get service types

#### get\_cases\_raw(court\_id: str, \*, person\_name: dict = None, business\_name: str = None, docket\_number: str = None) {#EFSPIntegration.py\_efsp\_client.EfspConnection.get\_cases\_raw}

```python
def get_cases_raw(court_id: str,
                  *,
                  person_name: dict = None,
                  business_name: str = None,
                  docket_number: str = None) -> ApiResponse
```

Finds existing cases at a particular court. Only one of person_name, business_name, or docket_number should be
provided at a time.
Params:
court_id (str)
person_name (dict)
business_name (str)
docket_number (str)

