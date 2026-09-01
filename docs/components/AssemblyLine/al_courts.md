# Table of Contents

* AssemblyLine.al\_courts
  * [ALCourt](#AssemblyLine.al_courts.ALCourt)
    * [init](#AssemblyLine.al_courts.ALCourt.init)
    * [short\_label](#AssemblyLine.al_courts.ALCourt.short_label)
    * [short\_label\_and\_address](#AssemblyLine.al_courts.ALCourt.short_label_and_address)
    * [short\_description](#AssemblyLine.al_courts.ALCourt.short_description)
    * [from\_row](#AssemblyLine.al_courts.ALCourt.from_row)
    * [geolocate](#AssemblyLine.al_courts.ALCourt.geolocate)
    * [geocode](#AssemblyLine.al_courts.ALCourt.geocode)
  * [ALCourtLoader](#AssemblyLine.al_courts.ALCourtLoader)
    * [init](#AssemblyLine.al_courts.ALCourtLoader.init)
    * [all\_courts](#AssemblyLine.al_courts.ALCourtLoader.all_courts)
    * [unique\_column\_values](#AssemblyLine.al_courts.ALCourtLoader.unique_column_values)
    * [county\_list](#AssemblyLine.al_courts.ALCourtLoader.county_list)
    * [county\_has\_one\_court](#AssemblyLine.al_courts.ALCourtLoader.county_has_one_court)
    * [county\_court](#AssemblyLine.al_courts.ALCourtLoader.county_court)
    * [matching\_courts\_in\_county](#AssemblyLine.al_courts.ALCourtLoader.matching_courts_in_county)
    * [filter\_courts](#AssemblyLine.al_courts.ALCourtLoader.filter_courts)
    * [as\_court](#AssemblyLine.al_courts.ALCourtLoader.as_court)

---
sidebar_label: al_courts
title: AssemblyLine.al_courts
---

Package for a very simple / MVP list of courts that is mostly signature compatible w/ MACourts for now

## ALCourt Objects {#AssemblyLine.al\_courts.ALCourt}

```python
class ALCourt(Court)
```

Object representing a court in Massachusetts. We use a function on the CourtList object that filters courts by
address and can use any of those three features of the court to do the filtering.

&lt;!-- TODO: it could be interesting to store a jurisdiction on a court. But this is non-trivial. Should it be geo boundaries?
A list of cities? A list of counties? Instead, we use a function on the CourtList object that filters courts by
address and can use any of those three features of the court to do the filtering.--&gt;

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_courts.ALCourt.init}

```python
def init(*pargs, **kwargs) -> None
```

Create a new court object.

**Arguments**:

- `*pargs` - Standard DAObject positional arguments
- `**kwargs` - Standard DAObject keyword arguments

#### short\_label() {#AssemblyLine.al\_courts.ALCourt.short\_label}

```python
def short_label() -> str
```

Returns a string that represents a nice, disambiguated label for the court.
This may not match the court&#x27;s name. If the name omits city, we
append city name to the court name. This is good for a drop-down selection
list.

**Returns**:

- `str` - string representing the court&#x27;s name, with city if needed to disambiguate

#### short\_label\_and\_address() {#AssemblyLine.al\_courts.ALCourt.short\_label\_and\_address}

```python
def short_label_and_address() -> str
```

Returns a markdown formatted string with the name and address of the court.
More concise version without description; suitable for a responsive case.

**Returns**:

- `str` - string representing the court&#x27;s name and address

#### short\_description() {#AssemblyLine.al\_courts.ALCourt.short\_description}

```python
def short_description() -> str
```

Returns a Markdown formatted string that includes the disambiguated name and
the description of the court, for inclusion in the results page with radio
buttons.

**Returns**:

- `str` - string representing the court&#x27;s name and description

#### from\_row(df\_row: Union[pd.Series, pd.DataFrame], ensure\_lat\_long: bool = True) {#AssemblyLine.al\_courts.ALCourt.from\_row}

```python
def from_row(df_row: Union[pd.Series, pd.DataFrame],
             ensure_lat_long: bool = True) -> None
```

Loads data from a single Pandas Dataframe into the current court object.
Note: It will try to convert column names that don&#x27;t make valid
attributes. Best practice is to use good attribute names (no spaces) that don&#x27;t interfere
with existing attributes or methods of DAObject

**Arguments**:

- `df_row` - Pandas Series object
- `ensure_lat_long` - bool, whether to use Google Maps to geocode the address if we don&#x27;t have coordinates

#### geolocate() {#AssemblyLine.al\_courts.ALCourt.geolocate}

```python
def geolocate() -> None
```

Use Google Maps to geocode the court&#x27;s address and store the result in the location attribute.

Deprecated: use geocode() instead.

#### geocode() {#AssemblyLine.al\_courts.ALCourt.geocode}

```python
def geocode() -> None
```

Use Google Maps to geocode the court&#x27;s address and store the result in the location attribute.

## ALCourtLoader Objects {#AssemblyLine.al\_courts.ALCourtLoader}

```python
class ALCourtLoader(DAObject)
```

Object to hold some methods surrounding loading/filtering courts.

Built around Pandas dataframe.

**Attributes**:

- `filename` _str_ - Path to the file containing court information.
- `converters` _Dict[str, Callable]_ - A dictionary of functions to apply to columns in the dataframe.

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_courts.ALCourtLoader.init}

```python
def init(*pargs, **kwargs) -> None
```

Create a new courtloader object.

**Arguments**:

- `*pargs` - Standard DAObject positional arguments
- `**kwargs` - Standard DAObject keyword arguments

#### all\_courts() {#AssemblyLine.al\_courts.ALCourtLoader.all\_courts}

```python
def all_courts() -> List[Tuple[int, str]]
```

Return a list of all courts in the spreadsheet.

**Returns**:

  List[Tuple[int, str]]: List of tuples where each tuple contains (dataframe_index, display_value). The dataframe_index (int) can be used with as_court() to retrieve the full court object. The display_value (str) is the court&#x27;s name or other display column value.

#### unique\_column\_values(column\_name: str) {#AssemblyLine.al\_courts.ALCourtLoader.unique\_column\_values}

```python
def unique_column_values(column_name: str) -> Set[str]
```

Retrieve a set of unique values present in a specified dataframe column.

**Arguments**:

- `column_name` _str_ - The name of the column in the dataframe.
  

**Returns**:

  Set[str]:
  - A set containing unique values from the specified column.
  - Returns an empty set if the column does not exist or an error occurs.

#### county\_list(column\_name: str = "address\_county") {#AssemblyLine.al\_courts.ALCourtLoader.county\_list}

```python
def county_list(column_name: str = "address_county") -> Set[str]
```

Get a set of all unique names for the specified column in the given spreadsheet.
Typically used to get a list of all possible counties that have a court.

**Arguments**:

- `column_name` _str_ - The name of the column in the dataframe.
  

**Returns**:

- `Set[str]` - A list of all unique values in the specified row in the given spreadsheet

#### county\_has\_one\_court(county\_name: str, county\_column: str = "address\_county") {#AssemblyLine.al\_courts.ALCourtLoader.county\_has\_one\_court}

```python
def county_has_one_court(county_name: str,
                         county_column: str = "address_county") -> bool
```

Returns True if there is only one court associated with the specified county
in the spreadsheet. Returns False otherwise.

**Arguments**:

- `county_name` _str_ - The name of the county to check.
- `county_column` _str_ - The name of the column in the dataframe that contains the county names.
  Defaults to &quot;address_county&quot;.
  

**Returns**:

- `bool` - True if there is only one court associated with the specified county in the spreadsheet.

#### county\_court(intrinsicName: str, county\_name: str, county\_column: str = "address\_county") {#AssemblyLine.al\_courts.ALCourtLoader.county\_court}

```python
def county_court(intrinsicName: str,
                 county_name: str,
                 county_column: str = "address_county") -> ALCourt
```

Return the first court matching the county name. Should only be used
when you know there is exactly one match

**Arguments**:

- `intrinsicName` _str_ - The intrinsic name you want the newly returned object to have (used for DA namespace searching).
- `county_name` _str_ - The name of the county to check.
- `county_column` _str_ - The name of the column in the dataframe that contains the county names.
  Defaults to &quot;address_county&quot;.
  

**Returns**:

- `ALCourt` - The first court matching the county name.

#### matching\_courts\_in\_county(county\_name: str, county\_column: str = "address\_county", display\_column: str = "name", search\_string: Optional[str] = None, search\_columns: Optional[Union[List[str], str]] = None) {#AssemblyLine.al\_courts.ALCourtLoader.matching\_courts\_in\_county}

```python
def matching_courts_in_county(
    county_name: str,
    county_column: str = "address_county",
    display_column: str = "name",
    search_string: Optional[str] = None,
    search_columns: Optional[Union[List[str], str]] = None
) -> List[Tuple[int, str]]
```

Retrieve a list of all courts in the specified county.

This function fetches courts suitable for displaying as a drop-down or radio button list
in docassemble. The results are tuples where the first element is the dataframe index
(useful for retrieving the court&#x27;s full details later using the as_court() method) and
the second element is the display value from the specified display_column.

**Arguments**:

- `county_name` _str_ - Name of the county.
- `county_column` _str, optional_ - Column heading which contains county name. Defaults to &quot;address_county&quot;.
- `display_column` _str, optional_ - Column heading used for display in the drop-down. Defaults to &quot;name&quot;.
- `search_string` _Optional[str], optional_ - A keyword to filter the list of results. Defaults to None.
- `search_columns` _Optional[Union[List[str], str]], optional_ - Columns to aggregate and search across with
  the search_string in a case-insensitive manner. Defaults to None.
  

**Returns**:

  List[Tuple[int, str]]: List of tuples where each tuple contains (dataframe_index, display_value). The dataframe_index (int) can be used with as_court() to retrieve the full court object. The display_value (str) is the court&#x27;s name or other display column value.

#### filter\_courts(court\_types: Optional[Union[List[str], str]], column: str = "department", display\_column: str = "name", search\_string: Optional[str] = None, search\_columns: Optional[Union[List[str], str]] = None) {#AssemblyLine.al\_courts.ALCourtLoader.filter\_courts}

```python
def filter_courts(
    court_types: Optional[Union[List[str], str]],
    column: str = "department",
    display_column: str = "name",
    search_string: Optional[str] = None,
    search_columns: Optional[Union[List[str], str]] = None
) -> List[Tuple[int, str]]
```

Return a filtered subset of courts represented as a list of tuples.

Each tuple has the format (index, display_value), where &quot;index&quot; refers to the dataframe index and &quot;display_value&quot;
is determined by the `display_column`.

**Arguments**:

- `court_types` _Optional[Union[List[str], str]]_ - Exact string match or matches used to filter results
  (inclusive). Examples include &quot;District&quot; or [&quot;Municipal&quot;,&quot;Superior&quot;].
- `column` _str, optional_ - Column heading to search. Defaults to &quot;department&quot;.
- `display_column` _str, optional_ - Column heading used for display in the drop-down. Defaults to &quot;name&quot;.
- `search_string` _Optional[str], optional_ - A keyword to filter the list of results. Defaults to None.
- `search_columns` _Optional[Union[List[str], str]], optional_ - Columns to aggregate and search across with
  the search_string in a case-insensitive manner. Defaults to None.
  

**Returns**:

  List[Tuple[int, str]]: List of tuples where each tuple contains (dataframe_index, display_value). The dataframe_index (int) can be used with as_court() to retrieve the full court object. The display_value (str) is the court&#x27;s name or other display column value.

#### as\_court(intrinsicName: str, index: Union[int, str], ensure\_lat\_long: bool = True) {#AssemblyLine.al\_courts.ALCourtLoader.as\_court}

```python
def as_court(intrinsicName: str,
             index: Union[int, str],
             ensure_lat_long: bool = True) -> ALCourt
```

Retrieve the court at the specified index as an ALCourt object.

**Arguments**:

- `intrinsicName` _str_ - The intrinsic name you want to assign to the returned object (used for DA namespace searching).
- `index` _Union[int, str]_ - The index position of the court in the dataframe.
- `ensure_lat_long` _bool, optional_ - Whether to ensure the presence of latitude and longitude data. Defaults to True.
  

**Returns**:

- `ALCourt` - An ALCourt object initialized with data from the specified index.

