# Table of Contents

* EFSPIntegration.efm\_client
  * [ProxyConnection](#EFSPIntegration.efm_client.ProxyConnection)
    * [\_\_init\_\_](#EFSPIntegration.efm_client.ProxyConnection.__init__)
    * [authenticate\_user](#EFSPIntegration.efm_client.ProxyConnection.authenticate_user)
    * [register\_user](#EFSPIntegration.efm_client.ProxyConnection.register_user)
    * [get\_service\_types](#EFSPIntegration.efm_client.ProxyConnection.get_service_types)
  * [serialize\_person](#EFSPIntegration.efm_client.serialize_person)

---
sidebar_label: efm_client
title: EFSPIntegration.efm_client
---

## ProxyConnection Objects {#EFSPIntegration.efm\_client.ProxyConnection}

```python
class ProxyConnection(EfspConnection)
```

The main class you use to communicate with the E-file proxy server from docassemble.

Many methods are unchanged from the parent class, [EfspConnection](py_efsp_client#EFSPIntegration.py_efsp_client.EfspConnection),
and are documented there.

#### \_\_init\_\_(\*, url: str = None, api\_key: str = None, credentials\_code\_block: str = "tyler\_login", default\_jurisdiction: str = None) {#EFSPIntegration.efm\_client.ProxyConnection.\_\_init\_\_}

```python
def __init__(*,
             url: str = None,
             api_key: str = None,
             credentials_code_block: str = "tyler_login",
             default_jurisdiction: str = None)
```

Creates the connection. Tries to get params from docassemble&#x27;s config, but can
be overriden with parameters to __init__.

#### authenticate\_user(tyler\_email: str = None, tyler\_password: str = None, jeffnet\_key: str = None, \*, jurisdiction: str = None) {#EFSPIntegration.efm\_client.ProxyConnection.authenticate\_user}

```python
def authenticate_user(tyler_email: str = None,
                      tyler_password: str = None,
                      jeffnet_key: str = None,
                      *,
                      jurisdiction: str = None) -> ApiResponse
```

Params:
tyler_email (str)
tyler_password (str)
jeffnet_key (str)

#### register\_user(person: Union[Individual, dict], registration\_type: str, \*, password: str = None, firm\_name\_or\_id: str = None) {#EFSPIntegration.efm\_client.ProxyConnection.register\_user}

```python
def register_user(person: Union[Individual, dict],
                  registration_type: str,
                  *,
                  password: str = None,
                  firm_name_or_id: str = None) -> ApiResponse
```

registration_type needs to be INDIVIDUAL, FIRM_ADMINISTRATOR, or FIRM_ADMIN_NEW_MEMBER.
If registration_type is INDIVIDUAL or FIRM_ADMINISTRATOR, you need a password.
If it&#x27;s FIRM_ADMINISTRATOR or FIRM_ADMIN_NEW_MEMBER, you need a firm_name_or_id

#### get\_service\_types(court\_id: str, court\_bundle: Union[ALDocumentBundle, dict] = None) {#EFSPIntegration.efm\_client.ProxyConnection.get\_service\_types}

```python
def get_service_types(
        court_id: str,
        court_bundle: Union[ALDocumentBundle, dict] = None) -> ApiResponse
```

Checks the court info: if it has conditional service types, call a special API with all filing info so far to get service types

#### serialize\_person(person: Union[Person, Individual]) {#EFSPIntegration.efm\_client.serialize\_person}

```python
def serialize_person(person: Union[Person, Individual]) -> Dict
```

Converts a docassemble Person or Individual into a dictionary suitable for
json.dumps and in format expected by Tyler-specific endpoints on the EFSPProxy

