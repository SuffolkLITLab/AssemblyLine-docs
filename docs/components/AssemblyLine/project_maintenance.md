---
sidebar_label: project_maintenance
title: AssemblyLine.project_maintenance
---

#### get\_package\_names

Fetches the JSON file from the given docassemble server and extracts package names.

**Arguments**:

- `server_name` _str_ - Name or IP address of the docassemble server.
  

**Returns**:

- `List[str]` - List of package names.

#### add\_tag\_to\_repos

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

#### process\_packages\_and\_add\_tag

Fetches package names from a docassemble server, transforms them into repository names,
and adds a specified tag to each repository.

**Arguments**:

- `server_name` _str_ - Name or IP address of the docassemble server.
- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `tag` _str_ - Tag to be added to each repository.

#### get\_project\_by\_name

Finds a GitHub Next-Generation project by its name within an organization using GraphQL API.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `project_name` _str_ - Name of the GitHub project.
  

**Returns**:

- `dict` - The GitHub project object, or None if not found.

#### get\_repos\_by\_topic

Fetches repositories in an organization that have a specific topic.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `topic` _str_ - The GitHub topic to filter repositories by.
  

**Returns**:

- `List[Repository]` - A list of repository objects that have the specified topic.

#### add\_issues\_and\_create\_cards

Adds an issue to each repository with a specific topic and creates a card for each issue in a Next-Generation GitHub project.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `project_name` _str_ - Name of the GitHub project.
- `topic` _str_ - The GitHub topic to filter repositories by.
- `issue_title` _str_ - Title of the issue.
- `issue_body` _str_ - Body of the issue.

#### find\_issues\_by\_title

Finds issues in a list of repositories with a specific title.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `repo_names` _list_ - List of repository names.
- `issue_title` _str_ - Title of the issue to be found.
  

**Returns**:

- `list` - A list of issue node IDs.

#### add\_issue\_to\_project

Adds an issue to a Next-Generation GitHub project.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `project_id` _str_ - Node ID of the GitHub project.
- `issue_node_id` _str_ - Node ID of the GitHub issue.

#### link\_issue\_title\_to\_project

Links issues with a specific title in repositories with a certain topic to a Next-Generation project.

**Arguments**:

- `token` _str_ - GitHub Personal Access Token.
- `org_name` _str_ - Name of the GitHub organization.
- `project_name` _str_ - Name of the GitHub project.
- `topic` _str_ - The GitHub topic to filter repositories by.
- `issue_title` _str_ - Title of the issue to link.

