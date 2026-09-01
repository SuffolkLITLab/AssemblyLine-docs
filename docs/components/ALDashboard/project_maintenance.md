# Table of Contents

* ALDashboard.project\_maintenance
  * [get\_package\_names](#ALDashboard.project_maintenance.get_package_names)
  * [add\_tag\_to\_repos](#ALDashboard.project_maintenance.add_tag_to_repos)
  * [process\_packages\_and\_add\_tag](#ALDashboard.project_maintenance.process_packages_and_add_tag)
  * [get\_project\_by\_name](#ALDashboard.project_maintenance.get_project_by_name)
  * [get\_repos\_by\_topic](#ALDashboard.project_maintenance.get_repos_by_topic)
  * [add\_issues\_and\_create\_cards](#ALDashboard.project_maintenance.add_issues_and_create_cards)
  * [find\_issues\_by\_title](#ALDashboard.project_maintenance.find_issues_by_title)
  * [add\_issue\_to\_project](#ALDashboard.project_maintenance.add_issue_to_project)
  * [link\_issue\_title\_to\_project](#ALDashboard.project_maintenance.link_issue_title_to_project)
  * [main](#ALDashboard.project_maintenance.main)

---
sidebar_label: project_maintenance
title: ALDashboard.project_maintenance
---

#### get\_package\_names(server\_name: str) {#ALDashboard.project\_maintenance.get\_package\_names}

```python
def get_package_names(server_name: str) -> List[str]
```

Fetches the JSON file from the given docassemble server and extracts package names.

**Arguments**:

- `server_name` _str_ - Name or IP address of the docassemble server.
  

**Returns**:

- `List[str]` - List of package names.

#### add\_tag\_to\_repos(token: str, org\_name: str, repo\_names: List[str], tag: str) {#ALDashboard.project\_maintenance.add\_tag\_to\_repos}

```python
def add_tag_to_repos(token: str, org_name: str, repo_names: List[str],
                     tag: str) -> None
```

Adds a specific tag to each repository in the given list.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token (PAT) with appropriate permissions.
- `org_name` _str_ - Name of the GitHub organization.
- `repo_names` _List[str]_ - List of repository names to which the tag will be added.
- `tag` _str_ - The tag to be added to the repositories.
  
  This function iterates through each repository in the provided list, fetching the
  current topics (tags) of the repository. If the specified tag is not already present,
  it adds the tag to the repository. The function includes error handling to catch and
  print any errors that occur while processing each repository.
  
  Example usage:
  personal_access_token = &quot;YOUR_PERSONAL_ACCESS_TOKEN&quot;
  organization_name = &quot;YourOrgName&quot;
  repositories = [&quot;repo1&quot;, &quot;repo2&quot;, &quot;repo3&quot;]
  tag_to_add = &quot;your-tag&quot;
  
  add_tag_to_repos(personal_access_token, organization_name, repositories, tag_to_add)

#### process\_packages\_and\_add\_tag(server\_name: str, token: str, org\_name: str, tag: str) {#ALDashboard.project\_maintenance.process\_packages\_and\_add\_tag}

```python
def process_packages_and_add_tag(server_name: str, token: str, org_name: str,
                                 tag: str) -> None
```

Fetches package names from a docassemble server, transforms them into repository names,
and adds a specified tag to each repository.

**Arguments**:

- `server_name` _str_ - Name or IP address of the docassemble server.
- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `tag` _str_ - Tag to be added to each repository.

#### get\_project\_by\_name(token: str, org\_name: str, project\_name: str) {#ALDashboard.project\_maintenance.get\_project\_by\_name}

```python
def get_project_by_name(token: str, org_name: str,
                        project_name: str) -> Optional[dict]
```

Finds a GitHub Next-Generation project by its name within an organization using GraphQL API.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `project_name` _str_ - Name of the GitHub project.
  

**Returns**:

- `dict` - The GitHub project object, or None if not found.

#### get\_repos\_by\_topic(token: str, org\_name: str, topic: str) {#ALDashboard.project\_maintenance.get\_repos\_by\_topic}

```python
def get_repos_by_topic(token: str, org_name: str,
                       topic: str) -> List[Repository]
```

Fetches repositories in an organization that have a specific topic.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `topic` _str_ - The GitHub topic to filter repositories by.
  

**Returns**:

- `List[Repository]` - A list of repository objects that have the specified topic.

#### add\_issues\_and\_create\_cards(token: str, org\_name: str, project\_name: str, topic: str, issue\_title: str, issue\_body: str) {#ALDashboard.project\_maintenance.add\_issues\_and\_create\_cards}

```python
def add_issues_and_create_cards(token: str, org_name: str, project_name: str,
                                topic: str, issue_title: str,
                                issue_body: str) -> None
```

Adds an issue to each repository with a specific topic and creates a card for each issue in a Next-Generation GitHub project.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `project_name` _str_ - Name of the GitHub project.
- `topic` _str_ - The GitHub topic to filter repositories by.
- `issue_title` _str_ - Title of the issue.
- `issue_body` _str_ - Body of the issue.

#### find\_issues\_by\_title(token: str, org\_name: str, repo\_names: List[str], issue\_title: str) {#ALDashboard.project\_maintenance.find\_issues\_by\_title}

```python
def find_issues_by_title(token: str, org_name: str, repo_names: List[str],
                         issue_title: str) -> List[str]
```

Finds issues in a list of repositories with a specific title.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `repo_names` _list_ - List of repository names.
- `issue_title` _str_ - Title of the issue to be found.
  

**Returns**:

- `list` - A list of issue node IDs.

#### add\_issue\_to\_project(token: str, project\_id: str, issue\_node\_id: str) {#ALDashboard.project\_maintenance.add\_issue\_to\_project}

```python
def add_issue_to_project(token: str, project_id: str,
                         issue_node_id: str) -> None
```

Adds an issue to a Next-Generation GitHub project.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `project_id` _str_ - Node ID of the GitHub project.
- `issue_node_id` _str_ - Node ID of the GitHub issue.

#### link\_issue\_title\_to\_project(token: str, org\_name: str, project\_name: str, topic: str, issue\_title: str) {#ALDashboard.project\_maintenance.link\_issue\_title\_to\_project}

```python
def link_issue_title_to_project(token: str, org_name: str, project_name: str,
                                topic: str, issue_title: str) -> None
```

Links issues with a specific title in repositories with a certain topic to a Next-Generation project.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `project_name` _str_ - Name of the GitHub project.
- `topic` _str_ - The GitHub topic to filter repositories by.
- `issue_title` _str_ - Title of the issue to link.

#### main() {#ALDashboard.project\_maintenance.main}

```python
def main() -> None
```

Main function to run the specified project maintenance command.

