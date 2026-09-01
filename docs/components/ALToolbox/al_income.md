# Table of Contents

* ALToolbox.al\_income
  * [times\_per\_year](#ALToolbox.al_income.times_per_year)
  * [recent\_years](#ALToolbox.al_income.recent_years)
  * [ALPeriodicAmount](#ALToolbox.al_income.ALPeriodicAmount)
    * [\_\_str\_\_](#ALToolbox.al_income.ALPeriodicAmount.__str__)
    * [total](#ALToolbox.al_income.ALPeriodicAmount.total)
  * [ALIncome](#ALToolbox.al_income.ALIncome)
    * [total](#ALToolbox.al_income.ALIncome.total)
  * [ALExpense](#ALToolbox.al_income.ALExpense)
  * [ALIncomeList](#ALToolbox.al_income.ALIncomeList)
    * [init](#ALToolbox.al_income.ALIncomeList.init)
    * [sources](#ALToolbox.al_income.ALIncomeList.sources)
    * [matches](#ALToolbox.al_income.ALIncomeList.matches)
    * [total](#ALToolbox.al_income.ALIncomeList.total)
    * [move\_checks\_to\_list](#ALToolbox.al_income.ALIncomeList.move_checks_to_list)
  * [ALJob](#ALToolbox.al_income.ALJob)
    * [init](#ALToolbox.al_income.ALJob.init)
    * [gross\_total](#ALToolbox.al_income.ALJob.gross_total)
    * [deductions](#ALToolbox.al_income.ALJob.deductions)
    * [net\_total](#ALToolbox.al_income.ALJob.net_total)
    * [employer\_name\_address\_phone](#ALToolbox.al_income.ALJob.employer_name_address_phone)
    * [normalized\_hours](#ALToolbox.al_income.ALJob.normalized_hours)
  * [ALJobList](#ALToolbox.al_income.ALJobList)
    * [init](#ALToolbox.al_income.ALJobList.init)
    * [total](#ALToolbox.al_income.ALJobList.total)
    * [gross\_total](#ALToolbox.al_income.ALJobList.gross_total)
    * [net\_total](#ALToolbox.al_income.ALJobList.net_total)
    * [deductions](#ALToolbox.al_income.ALJobList.deductions)
  * [ALExpenseList](#ALToolbox.al_income.ALExpenseList)
  * [ALAsset](#ALToolbox.al_income.ALAsset)
    * [total](#ALToolbox.al_income.ALAsset.total)
    * [equity](#ALToolbox.al_income.ALAsset.equity)
  * [ALAssetList](#ALToolbox.al_income.ALAssetList)
    * [market\_value](#ALToolbox.al_income.ALAssetList.market_value)
    * [balance](#ALToolbox.al_income.ALAssetList.balance)
    * [equity](#ALToolbox.al_income.ALAssetList.equity)
    * [owners](#ALToolbox.al_income.ALAssetList.owners)
  * [ALVehicle](#ALToolbox.al_income.ALVehicle)
    * [year\_make\_model](#ALToolbox.al_income.ALVehicle.year_make_model)
  * [ALVehicleList](#ALToolbox.al_income.ALVehicleList)
  * [ALSimpleValue](#ALToolbox.al_income.ALSimpleValue)
    * [total](#ALToolbox.al_income.ALSimpleValue.total)
    * [\_\_str\_\_](#ALToolbox.al_income.ALSimpleValue.__str__)
  * [ALSimpleValueList](#ALToolbox.al_income.ALSimpleValueList)
    * [sources](#ALToolbox.al_income.ALSimpleValueList.sources)
    * [total](#ALToolbox.al_income.ALSimpleValueList.total)
  * [ALItemizedValue](#ALToolbox.al_income.ALItemizedValue)
    * [income\_fields](#ALToolbox.al_income.ALItemizedValue.income_fields)
    * [total](#ALToolbox.al_income.ALItemizedValue.total)
    * [\_\_str\_\_](#ALToolbox.al_income.ALItemizedValue.__str__)
  * [ALItemizedValueDict](#ALToolbox.al_income.ALItemizedValueDict)
    * [hook\_after\_gather](#ALToolbox.al_income.ALItemizedValueDict.hook_after_gather)
    * [total](#ALToolbox.al_income.ALItemizedValueDict.total)
    * [\_\_str\_\_](#ALToolbox.al_income.ALItemizedValueDict.__str__)
  * [ALItemizedJob](#ALToolbox.al_income.ALItemizedJob)
    * [total](#ALToolbox.al_income.ALItemizedJob.total)
    * [gross\_total](#ALToolbox.al_income.ALItemizedJob.gross_total)
    * [deduction\_total](#ALToolbox.al_income.ALItemizedJob.deduction_total)
    * [net\_total](#ALToolbox.al_income.ALItemizedJob.net_total)
    * [employer\_name\_address\_phone](#ALToolbox.al_income.ALItemizedJob.employer_name_address_phone)
    * [normalized\_hours](#ALToolbox.al_income.ALItemizedJob.normalized_hours)
  * [ALItemizedJobList](#ALToolbox.al_income.ALItemizedJobList)
    * [sources](#ALToolbox.al_income.ALItemizedJobList.sources)
    * [total](#ALToolbox.al_income.ALItemizedJobList.total)
    * [gross\_total](#ALToolbox.al_income.ALItemizedJobList.gross_total)
    * [deduction\_total](#ALToolbox.al_income.ALItemizedJobList.deduction_total)
    * [net\_total](#ALToolbox.al_income.ALItemizedJobList.net_total)

---
sidebar_label: al_income
title: ALToolbox.al_income
---

#### times\_per\_year(times\_per\_year\_list: List[Tuple[int, str]], times\_per\_year: float) {#ALToolbox.al\_income.times\_per\_year}

```python
def times_per_year(times_per_year_list: List[Tuple[int, str]],
                   times_per_year: float) -> str
```

Get the lower-case textual description that matches a time period contained
in a &quot;times per year&quot; list.

The goal of this function is to allow you to reflect the user&#x27;s selection
back to them, either on screen or in a document.

In `al_income.yml` there is a default `times_per_year_list`, but the list
that you use must be passed as a parameter as it&#x27;s common to want to
customize this for a given financial statement.

For example: if the `times_per_year` is 12, it will return &quot;monthly&quot; from
the default `times_per_year_list`.

If the times per year does not exist in the given list, it will return a
literal string like &quot;five times per year&quot;.

Fractional or floating point-based times_per_year are permissible in the
times_per_year_list, although they are not commonly used. E.g., `.5` would
represent &quot;every two years&quot;. Items not contained in the list (to provide a
specific lookup name) will have a string representation that is rounded to
the nearest whole integer.

**Arguments**:

- `times_per_year_list` _List[Tuple[int, str]]_ - List of tuples containing
  (frequency, description) pairs to match against.
- `times_per_year` _float_ - The numeric frequency to look up in the list.
  

**Returns**:

  The lowercase textual description of the frequency, or a generated
  description if not found in the list.
  

**Examples**:

  &gt;&gt;&gt; times_per_year([(12, &quot;Monthly&quot;), (1, &quot;Annually&quot;)], 12)
  &#x27;monthly&#x27;
  &gt;&gt;&gt; times_per_year([(12, &quot;Monthly&quot;)], 5)
  &#x27;Five times per year&#x27;

#### recent\_years(past: int = 25, order: str = "descending", future: int = 1) {#ALToolbox.al\_income.recent\_years}

```python
def recent_years(past: int = 25,
                 order: str = "descending",
                 future: int = 1) -> List[int]
```

Returns a list of the most recent past years, continuing into the future.

Defaults to most recent 25 years+1. Useful to populate a combobox of years
where the most recent ones are most likely. E.g. automobile years or
birthdate.

**Arguments**:

- `past` _int, optional_ - The number of past years to list, including the
  current year. Defaults to 25.
- `order` _str, optional_ - &#x27;descending&#x27; or &#x27;ascending&#x27;. Defaults to &#x27;descending&#x27;.
- `future` _int, optional_ - Number of future years to include. Defaults to 1.
  

**Returns**:

- `List[int]` - List of years in the specified order.
  

**Examples**:

  &gt;&gt;&gt; recent_years(past=3, future=1)  # if current year is 2023
  [2024, 2023, 2022, 2021]
  &gt;&gt;&gt; recent_years(past=2, order=&quot;ascending&quot;, future=0)
  [2022, 2023]

## ALPeriodicAmount Objects {#ALToolbox.al\_income.ALPeriodicAmount}

```python
class ALPeriodicAmount(DAObject)
```

Represents an amount (could be an income or an expense depending on the context)
that reoccurs some times per year. E.g, to express a weekly period, use 52. The default
is 1 (a year).

**Attributes**:

- `value` _str | float | Decimal_ - A number representing an amount of money accumulated during
  the `times_per_year` of this income.
- `times_per_year` _float | Decimal_ - Represents a number of the annual frequency of
  the income. E.g. 12 for a monthly income.
- `source` _str, optional_ - The &quot;source&quot; of the income, like a &quot;job&quot; or a &quot;house&quot;.
- `display_name` _str, optional_ - If present, will have a translated string to show the
  user, as opposed to a raw english string from the program.

#### \_\_str\_\_() {#ALToolbox.al\_income.ALPeriodicAmount.\_\_str\_\_}

```python
def __str__() -> str
```

Returns the income&#x27;s total value as a string representation.

**Returns**:

  The string representation of this income&#x27;s total value.

#### total(times\_per\_year: float = 1) {#ALToolbox.al\_income.ALPeriodicAmount.total}

```python
def total(times_per_year: float = 1) -> Decimal
```

Returns the income over the specified times_per_year.

To calculate `.total()`, an ALPeriodicAmount must have a `.times_per_year` and `.value`.

**Arguments**:

- `times_per_year` _float, optional_ - The frequency to convert the income to.
  Defaults to 1 (annual).
  

**Returns**:

- `Decimal` - The calculated income amount for the specified frequency.
  

**Examples**:

  &gt;&gt;&gt; income = ALPeriodicAmount(value=1000, times_per_year=12)  # $1000/month
  &gt;&gt;&gt; income.total(1)  # Annual total
  Decimal(&#x27;12000&#x27;)
  &gt;&gt;&gt; income.total(12)  # Monthly total
  Decimal(&#x27;1000&#x27;)

## ALIncome Objects {#ALToolbox.al\_income.ALIncome}

```python
class ALIncome(ALPeriodicAmount)
```

Represents an income which may have an hourly rate or a salary. Hourly rate
incomes must include hours per period (times per year). Period is some
denominator of a year. E.g, to express a weekly period, use 52. The default
is 1 (a year).

**Attributes**:

- `value` _str | float | Decimal_ - A number representing an amount of money accumulated during
  the `times_per_year` of this income.
- `times_per_year` _float | Decimal_ - Represents a number of the annual frequency of
  the income. E.g. 12 for a monthly income.
- `is_hourly` _bool, optional_ - True if the income is hourly.
- `hours_per_period` _float | Decimal, optional_ - If the income is hourly, the number of
  hours during the annual frequency of this job. E.g. if the annual
  frequency is 52 (weekly), the hours per week might be 50. That is, 50
  hours per week. This attribute is required if `.is_hourly` is True.
- `source` _str, optional_ - The &quot;source&quot; of the income, like a &quot;job&quot; or a &quot;house&quot;.
- `owner` _str, optional_ - Full name of the income&#x27;s owner as a single string.

#### total(times\_per\_year: float = 1) {#ALToolbox.al\_income.ALIncome.total}

```python
def total(times_per_year: float = 1) -> Decimal
```

Calculate the income over the specified times_per_year frequency.

Returns the income over the specified times_per_year, taking into account
hours per period for hourly items. For example, for an hourly income of 10
an hour, 40 hours a week, `income.total(1)` would be 20,800, the yearly income,
and `income.total(52)` would be 400, the weekly income.

To calculate `.total()`, an ALIncome must have a `.times_per_year` and `.value`.
It can also have `.is_hourly` and `.hours_per_period`.

**Arguments**:

- `times_per_year` _float, optional_ - The frequency to calculate income for.
  Defaults to 1 (annual).
  

**Returns**:

  The calculated income amount for the specified frequency.

## ALExpense Objects {#ALToolbox.al\_income.ALExpense}

```python
class ALExpense(ALPeriodicAmount)
```

Not much changes from ALPeriodic Amount, just the generic object questions

## ALIncomeList Objects {#ALToolbox.al\_income.ALIncomeList}

```python
class ALIncomeList(DAList)
```

Represents a filterable DAList of incomes-type items.

This list expects its items to have the following attributes and methods:
- source: Source identifier for filtering
- owner: Owner name for filtering
- times_per_year: Frequency of the income
- value: Amount value
- total(): Calculate total amount for a given frequency

#### init(\*pargs, \*\*kwargs) {#ALToolbox.al\_income.ALIncomeList.init}

```python
def init(*pargs, **kwargs) -> None
```

Initialize an ALIncomeList object with default settings.

Sets up the object type to ALIncome if not already specified, ensuring
the list contains appropriate income objects for processing.

**Arguments**:

- `*pargs` - Variable length argument list passed to parent class.
- `**kwargs` - Arbitrary keyword arguments passed to parent class.

#### sources() {#ALToolbox.al\_income.ALIncomeList.sources}

```python
def sources() -> Set[str]
```

Returns a set of the unique sources in the ALIncomeList.

**Returns**:

- `Set[str]` - A set containing all unique source names from items in the list.
  

**Examples**:

  &gt;&gt;&gt; income_list = ALIncomeList([
  ...     ALIncome(source=&quot;wages&quot;),
  ...     ALIncome(source=&quot;tips&quot;),
  ...     ALIncome(source=&quot;wages&quot;)
  ... ])
  &gt;&gt;&gt; income_list.sources()
  \{&#x27;wages&#x27;, &#x27;tips&#x27;\}

#### matches(source: SourceType, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALIncomeList.matches}

```python
def matches(source: SourceType,
            exclude_source: Optional[SourceType] = None) -> "ALIncomeList"
```

Returns an ALIncomeList consisting only of elements matching the specified income source.

Assists in filling PDFs with predefined spaces by filtering income items
by their source. The source parameter may be a string or a list.

**Arguments**:

- `source` _SourceType_ - The income source(s) to match. Can be a string or list of strings.
- `exclude_source` _Optional[SourceType], optional_ - Source(s) to exclude from the results.
  Defaults to None.
  

**Returns**:

- `ALIncomeList` - A new ALIncomeList containing only items with matching sources.
  

**Examples**:

  &gt;&gt;&gt; income_list = ALIncomeList([
  ...     ALIncome(source=&quot;wages&quot;, value=1000),
  ...     ALIncome(source=&quot;tips&quot;, value=200),
  ...     ALIncome(source=&quot;wages&quot;, value=1200)
  ... ])
  &gt;&gt;&gt; wages_only = income_list.matches(&quot;wages&quot;)
  &gt;&gt;&gt; len(wages_only)
  2

#### total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None, owner: Optional[str] = None) {#ALToolbox.al\_income.ALIncomeList.total}

```python
def total(times_per_year: float = 1,
          source: Optional[SourceType] = None,
          exclude_source: Optional[SourceType] = None,
          owner: Optional[str] = None) -> Decimal
```

Returns the total periodic value in the list, gathering the list items if necessary.

You can optionally filter by `source` (string or list) and/or by one `owner`.
To calculate `.total()` correctly, all items must have a `.total()` method
and it should be a positive value. Job-type incomes should automatically
exclude deductions.

**Arguments**:

- `times_per_year` _float, optional_ - The frequency to convert income to.
  Defaults to 1 (annual).
- `source` _Optional[SourceType], optional_ - Income source(s) to include.
  Can be string or list. Defaults to None (all sources).
- `exclude_source` _Optional[SourceType], optional_ - Source(s) to exclude.
  Defaults to None.
- `owner` _Optional[str], optional_ - Filter by specific owner name.
  Defaults to None (all owners).
  

**Returns**:

- `Decimal` - The total income amount for the specified frequency and filters.
  

**Examples**:

  &gt;&gt;&gt; income_list = ALIncomeList([wages_income, tips_income])
  &gt;&gt;&gt; income_list.total(times_per_year=12)  # Monthly total
  Decimal(&#x27;5000.00&#x27;)
  &gt;&gt;&gt; income_list.total(source=&quot;wages&quot;)  # Annual wages only
  Decimal(&#x27;60000.00&#x27;)

#### move\_checks\_to\_list(selected\_types: Optional[DADict] = None, selected\_terms: Optional[Mapping] = None) {#ALToolbox.al\_income.ALIncomeList.move\_checks\_to\_list}

```python
def move_checks_to_list(selected_types: Optional[DADict] = None,
                        selected_terms: Optional[Mapping] = None) -> None
```

Gives a &#x27;gather by checklist&#x27; option.
If no selected_types param is passed, requires that a .selected_types
attribute be set by a `datatype: checkboxes` fields
If &quot;other&quot; is in the selected_types, the source will not be set directly.

Sets the attribute &quot;moved&quot; to true, doesn&#x27;t set gathered, because this isn&#x27;t
idempotent, so trying to also gather all info about the checks in the list doesn&#x27;t
work well.

**Arguments**:

- `selected_types` _Optional[DADict]_ - A dictionary of selected types.
- `selected_terms` _Optional[Mapping]_ - A mapping of selected terms.

## ALJob Objects {#ALToolbox.al\_income.ALJob}

```python
class ALJob(ALIncome)
```

Represents a single job that may be hourly or pay-period based.

The job can have a net and gross income figure, but it does not represent
individual items like wages, tips or deductions that may appear on a paycheck--the
user must enter the total amount for &quot;net&quot; and &quot;gross&quot; income for a given period.

Can be stored in an ALJobList.

**Attributes**:

- `value` _float | Decimal_ - A number representing an amount of money accumulated during
  the `times_per_year` of this income.
- `times_per_year` _float_ - Represents a number of the annual frequency of
  the value. E.g. 12 for a monthly value.
- `is_hourly` _bool, optional_ - Whether the gross total should be calculated based on hours
  worked per week.
- `hours_per_period` _float, optional_ - The number of hours during the annual
  frequency of this job. E.g. if the annual frequency is 52 (weekly), the
  hours per week might be 50. That is, 50 hours per week.
- `deduction` _float, optional_ - The amount of money deducted from the total value each period.
  If this job is hourly, deduction is still from each period, not each hour. Used to
  calculate the net income in `net_income()`.
- `employer` _Individual, optional_ - A docassemble Individual object, employer.address is the address
  and employer.phone is the phone.

#### init(\*pargs, \*\*kwargs) {#ALToolbox.al\_income.ALJob.init}

```python
def init(*pargs, **kwargs)
```

Initialize an ALJob object with employer setup.

Initializes the employer attribute based on the employer_type if available,
defaulting to Individual type if no specific type is set.

#### gross\_total(times\_per\_year: float = 1) {#ALToolbox.al\_income.ALJob.gross\_total}

```python
def gross_total(times_per_year: float = 1) -> Decimal
```

Calculate the gross total income over the specified times_per_year.

Same as ALIncome total. Returns the income over the specified times_per_year,
representing the `.value` attribute of the item.

**Arguments**:

- `times_per_year` _float, optional_ - The frequency to calculate income for.
  Is some denominator of a year. E.g. to express a weekly period,
  use 52. The default is 1 (a year).
  

**Returns**:

  The calculated gross income amount for the specified frequency.

#### deductions(times\_per\_year: float = 1) {#ALToolbox.al\_income.ALJob.deductions}

```python
def deductions(times_per_year: float = 1) -> Decimal
```

Calculate the total deductions from someone&#x27;s pay over the specified times_per_year.

Returns the total deductions from someone&#x27;s pay over the specified times_per_year
(not per hour if hourly).

**Arguments**:

- `times_per_year` _float, optional_ - The frequency to calculate deductions for.
  Is some denominator of a year. E.g. to express a weekly period,
  use 52. The default is 1 (a year).
  

**Returns**:

  The calculated deduction amount for the specified frequency.

#### net\_total(times\_per\_year: float = 1) {#ALToolbox.al\_income.ALJob.net\_total}

```python
def net_total(times_per_year: float = 1) -> Decimal
```

Calculate the net income over a time period using value and deduction.

Returns the net income over a time period, found using
`self.value` and `self.deduction`.

**Arguments**:

- `times_per_year` _float, optional_ - The frequency to calculate net income for.
  Is some denominator of a year. E.g, to express a weekly period,
  use 52. The default is 1 (a year).
  

**Returns**:

  The calculated net income amount (gross - deductions) for the specified frequency.
  

**Notes**:

  `self.deduction` is the amount deducted from one&#x27;s pay over a period (not
  per hour if hourly). This will force the gathering of the ALJob&#x27;s `.value`
  and `.deduction` attributes.

#### employer\_name\_address\_phone() {#ALToolbox.al\_income.ALJob.employer\_name\_address\_phone}

```python
def employer_name_address_phone() -> str
```

Get formatted employer information as a string.

Returns name, address and phone number of employer as a string. Forces
gathering the `.employer`, `.employer_address`, and `.employer_phone`
attributes.

**Returns**:

  A formatted string containing employer name, optionally with address
  and/or phone number if available.

#### normalized\_hours(times\_per\_year: float = 1) {#ALToolbox.al\_income.ALJob.normalized\_hours}

```python
def normalized_hours(times_per_year: float = 1) -> float
```

Calculate the normalized number of hours worked in a given times_per_year.

Returns the normalized number of hours worked in a given times_per_year,
based on the self.hours_per_period and self.times_per_year attributes.

**Arguments**:

- `times_per_year` _float, optional_ - The frequency to normalize hours for.
  Is some denominator of a year. E.g, to express a weekly period,
  use 52. The default is 1 (a year).
  

**Returns**:

  The normalized number of hours worked for the specified frequency.
  

**Examples**:

  If the person works 10 hours a week, it will return
  520 when the times_per_year parameter is 1.
  

**Notes**:

  This will force the gathering of the attributes `.hours_per_period` and
  `.times_per_year`.

## ALJobList Objects {#ALToolbox.al\_income.ALJobList}

```python
class ALJobList(ALIncomeList)
```

Represents a list of ALJobs. Adds the `.gross_total()` and
`.net_total()` methods to the ALIncomeList class. It&#x27;s a more common
way of reporting income than ALItemizedJobList.

#### init(\*pargs, \*\*kwargs) {#ALToolbox.al\_income.ALJobList.init}

```python
def init(*pargs, **kwargs)
```

Initialize an ALJobList with ALJob as the default object type.

**Arguments**:

- `*pargs` - Variable length argument list passed to parent class.
- `**kwargs` - Arbitrary keyword arguments passed to parent class.

#### total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None, owner: Optional[str] = None) {#ALToolbox.al\_income.ALJobList.total}

```python
def total(times_per_year: float = 1,
          source: Optional[SourceType] = None,
          exclude_source: Optional[SourceType] = None,
          owner: Optional[str] = None) -> Decimal
```

Returns the sum of the gross incomes of its ALJobs divided by the time
times_per_year. You can filter the jobs by `source`. `source` can be a
string or a list.

`times_per_year` is some denominator of a year. E.g, to express a weekly
period, use 52. The default is 1 (a year).

#### gross\_total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALJobList.gross\_total}

```python
def gross_total(times_per_year: float = 1,
                source: Optional[SourceType] = None,
                exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the sum of the gross incomes of its ALJobs divided by the time
times_per_year. You can filter the jobs by `source`. `source` can be a
string or a list.

**Arguments**:

- `times_per_year` _float_ - The time period to divide the gross income by. Defaults to 1.
- `source` _Optional[SourceType]_ - The source of the jobs to include. Defaults to None.
- `exclude_source` _Optional[SourceType]_ - The source of the jobs to exclude. Defaults to None.
  

**Returns**:

  The sum of the gross incomes of its ALJobs divided by the time times_per_year.

#### net\_total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALJobList.net\_total}

```python
def net_total(times_per_year: float = 1,
              source: Optional[SourceType] = None,
              exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the sum of the net incomes of its ALJobs divided by the time
times_per_year. You can filter the jobs by `source`. `source` can be a
string or a list. Leaving out `source` will use all sources.

If the job is hourly, the `net_total()` may not be comparable to the
`gross_total()`.

**Arguments**:

- `times_per_year` _float_ - The time period to divide the net income by. Defaults to 1.
- `source` _Optional[SourceType]_ - The source of the jobs to include. Defaults to None.
- `exclude_source` _Optional[SourceType]_ - The source of the jobs to exclude. Defaults to None.
  

**Returns**:

  The sum of the net incomes of its ALJobs divided by the time times_per_year.

#### deductions(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALJobList.deductions}

```python
def deductions(times_per_year: float = 1,
               source: Optional[SourceType] = None,
               exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the sum of the deductions of its ALJobs divided by the time
times_per_year. You can filter the jobs by `source`. Leaving out `source`
will use all sources.

**Arguments**:

- `times_per_year` _float_ - The time period to divide the deductions by. Defaults to 1.
- `source` _Optional[SourceType]_ - The source of the jobs to include. Defaults to None.
- `exclude_source` _Optional[SourceType]_ - The source of the jobs to exclude. Defaults to None.
  

**Returns**:

  The sum of the deductions of its ALJobs divided by the time times_per_year.

## ALExpenseList Objects {#ALToolbox.al\_income.ALExpenseList}

```python
class ALExpenseList(ALIncomeList)
```

A list of expenses.

Each element has:
value: The monetary value of the expense
source: The source category of the expense
display_name: Human-readable name for display

## ALAsset Objects {#ALToolbox.al\_income.ALAsset}

```python
class ALAsset(ALIncome)
```

An ALAsset represents an asset that has a market value, an optional income
that the asset earns, and an optional balance which may be helpful if the
asset represents a financial account rather than a physical asset.

Can be stored in an ALAssetList.

**Attributes**:

- `market_value` _float | Decimal_ - Market value of the asset.
- `balance` _float | Decimal_ - Current balance of the account, e.g., like
  the balance in a checking account, but could also represent a loan
  amount.
- `value` _float | Decimal, optional_ - Represents the income the asset earns
  for a given `times_per_year`, such as interest earned in a checking
  account. If not defined, the income will be set to 0, to simplify
  representing the many common assets that do not earn any income.
- `times_per_year` _float, optional_ - Number of times per year the asset
  earns the income listed in the `value` attribute.
- `owner` _str, optional_ - Full name of the asset owner as a single string.
- `source` _str, optional_ - The &quot;source&quot; of the asset, like &quot;vase&quot;.

#### total(times\_per\_year: float = 1) {#ALToolbox.al\_income.ALAsset.total}

```python
def total(times_per_year: float = 1) -> Decimal
```

Returns the .value attribute divided by the times per year you want to calculate. The value defaults to 0.

`times_per_year` is some denominator of a year. E.g, to express a weekly period, use 52. The default is 1 (a year).

**Arguments**:

- `times_per_year` _float, optional_ - The number of times per year to calculate. Defaults to 1.
  

**Returns**:

- `Decimal` - The .value attribute divided by the times per year.

#### equity(loan\_attribute="balance") {#ALToolbox.al\_income.ALAsset.equity}

```python
def equity(loan_attribute="balance") -> Decimal
```

Returns the total equity in the asset (e.g., market value minus balance).

**Arguments**:

- `loan_attribute` _str, optional_ - The attribute of the asset to use as the loan value. Defaults to &quot;balance&quot;.
  

**Returns**:

- `Decimal` - The total equity in the asset.

## ALAssetList Objects {#ALToolbox.al\_income.ALAssetList}

```python
class ALAssetList(ALIncomeList)
```

A list of ALAssets. The `total()` of the list will be the total income
earned, which may not be what you want for a list of assets. To get the
total value of all assets, use the `market_value()` method.

**Attributes**:

- `market_value` _float | Decimal_ - Market value of the asset.
- `balance` _float | Decimal_ - Current balance of the account, e.g., like
  the balance in a checking account, but could also represent a loan
  amount.
- `value` _float | Decimal, optional_ - Represents the income the asset earns
  for a given `times_per_year`, such as interest earned in a checking
  account. If not defined, the income will be set to 0, to simplify
  representing the many common assets that do not earn any income.
- `times_per_year` _float, optional_ - Number of times per year the asset
  earns the income listed in the `value` attribute.
- `owner` _str, optional_ - Full name of the asset owner as a single string.
- `source` _str, optional_ - The &quot;source&quot; of the asset, like &quot;vase&quot;.

#### market\_value(source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALAssetList.market\_value}

```python
def market_value(source: Optional[SourceType] = None,
                 exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the total `.market_value` of assets in the list.

You can filter the assets by `source`. `source` can be a string or a list.

**Arguments**:

- `source` _Optional[SourceType]_ - The source of the assets to include in the calculation.
  If None, all sources are included. Can be a string or a list.
- `exclude_source` _Optional[SourceType]_ - The source of the assets to exclude from the calculation.
  If None, no sources are excluded.
  

**Returns**:

- `Decimal` - The total market value of the assets.

#### balance(source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALAssetList.balance}

```python
def balance(source: Optional[SourceType] = None,
            exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the total `.balance` of assets in the list, which typically corresponds to the available funds in a financial account.

You can filter the assets by `source`. `source` can be a string or a list.

**Arguments**:

- `source` _Optional[SourceType]_ - The source of the assets to include in the calculation.
  If None, all sources are included. Can be a string or a list.
- `exclude_source` _Optional[SourceType]_ - The source of the assets to exclude from the calculation.
  If None, no sources are excluded.
  

**Returns**:

- `Decimal` - The total balance of the assets.

#### equity(source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None, loan\_attribute: str = "balance") {#ALToolbox.al\_income.ALAssetList.equity}

```python
def equity(source: Optional[SourceType] = None,
           exclude_source: Optional[SourceType] = None,
           loan_attribute: str = "balance") -> Decimal
```

Calculates and returns the total equity in the assets.

This method triggers the gathering of assets, then iterates over each asset. If a source or exclude_source is not
specified, or if the asset&#x27;s source satisfies the source criteria, the equity of the asset is added to the total.

**Arguments**:

- `source` _Optional[SourceType]_ - The source of the assets to include in the calculation. If None, all sources are included.
- `exclude_source` _Optional[SourceType]_ - The source of the assets to exclude from the calculation. If None, no sources are excluded.
- `loan_attribute` _str, optional_ - The attribute of the asset to use as the loan value. Defaults to &quot;balance&quot;.
  

**Returns**:

- `Decimal` - The total equity in the assets.

#### owners(source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALAssetList.owners}

```python
def owners(source: Optional[SourceType] = None,
           exclude_source: Optional[SourceType] = None) -> Set[str]
```

Returns a set of the unique owners of the assets.

You can filter the assets by `source`. `source` can be a string or a list.

**Arguments**:

- `source` _Optional[SourceType]_ - The source of the assets to include in the calculation.
  If None, all sources are included. Can be a string or a list.
- `exclude_source` _Optional[SourceType]_ - The source of the assets to exclude from the calculation.
  If None, no sources are excluded.
  

**Returns**:

- `Set[str]` - A set of the unique owners of the assets.

## ALVehicle Objects {#ALToolbox.al\_income.ALVehicle}

```python
class ALVehicle(ALAsset)
```

Represents a vehicle as a specialized type of ALAsset.

This subclass of ALAsset adds specific attributes relevant to vehicles,
such as year, make, and model, and includes methods for representing
these attributes in a standardized format, as often required on financial
statement forms.

**Attributes**:

- `year` _str_ - The model year of the vehicle, e.g., &#x27;2022&#x27;.
- `make` _str_ - The make of the vehicle, e.g., &#x27;Honda&#x27;.
- `model` _str_ - The model of the vehicle, e.g., &#x27;Accord&#x27;.
- `market_value` _float or Decimal_ - Market value of the vehicle.
- `balance` _float or Decimal_ - Balance of the loan on the vehicle.
- `value` _float or Decimal, optional_ - Income earned by the vehicle, typically 0.
- `times_per_year` _int_ - The frequency over which the `value` is earned annually.
- `owner` _str_ - Full name of the vehicle owner.
- `source` _str, optional_ - The source of the asset, defaults to &#x27;vehicle&#x27;.

#### year\_make\_model(separator: str = " / ") {#ALToolbox.al\_income.ALVehicle.year\_make\_model}

```python
def year_make_model(separator: str = " / ") -> str
```

Returns a string of the format year/make/model of the vehicle.

Triggers gathering those attributes and formats them as a single string.

**Arguments**:

- `separator` _str, optional_ - The separator between the year, make and model.
  Defaults to &quot; / &quot;.
  

**Returns**:

- `str` - A formatted string combining year, make, and model of the vehicle.
  

**Examples**:

  &gt;&gt;&gt; vehicle = ALVehicle(year=2020, make=&quot;Toyota&quot;, model=&quot;Camry&quot;)
  &gt;&gt;&gt; vehicle.year_make_model()
  &#x27;2020 / Toyota / Camry&#x27;
  &gt;&gt;&gt; vehicle.year_make_model(separator=&quot;, &quot;)
  &#x27;2020, Toyota, Camry&#x27;

## ALVehicleList Objects {#ALToolbox.al\_income.ALVehicleList}

```python
class ALVehicleList(ALAssetList)
```

List of ALVehicles. Extends ALAssetList.

## ALSimpleValue Objects {#ALToolbox.al\_income.ALSimpleValue}

```python
class ALSimpleValue(DAObject)
```

Represents a currency value. It&#x27;s meant to be stored in a list. Can be an
item in an ALSimpleValueList.

**Attributes**:

- `value` _str | float_ - The monetary value of the item.
- `transaction_type` _str, optional_ - Can be &quot;expense&quot;, which will give a
  negative value to the total of the item.
- `source` _str, optional_ - The &quot;source&quot; of the item, like &quot;vase&quot;.

#### total() {#ALToolbox.al\_income.ALSimpleValue.total}

```python
def total() -> Decimal
```

If desired, to use as a ledger, values can be signed (mixed positive and
negative). Setting transaction_type = &#x27;expense&#x27; makes the value negative.
Use min=0 in that case.

If you use signed values, be careful when placing in an ALIncomeList
object. The `total()` method may return unexpected results in that case.

**Returns**:

  The total value of the item, taking into account the transaction type.

#### \_\_str\_\_() {#ALToolbox.al\_income.ALSimpleValue.\_\_str\_\_}

```python
def __str__() -> str
```

Returns the total as a formatted string

## ALSimpleValueList Objects {#ALToolbox.al\_income.ALSimpleValueList}

```python
class ALSimpleValueList(DAList)
```

Represents a filterable DAList of ALSimpleValues.

#### sources() {#ALToolbox.al\_income.ALSimpleValueList.sources}

```python
def sources() -> Set
```

Returns a set of the unique sources of values stored in the list.

**Returns**:

  A set of the unique sources of values stored in the list.

#### total(source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALSimpleValueList.total}

```python
def total(source: Optional[SourceType] = None,
          exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the total value in the list, gathering the list items if
necessary. You can filter the values by `source`. `source` can be a
string or a list.

**Arguments**:

- `source` _Optional[SourceType]_ - The source of the values to include. Defaults to None.
- `exclude_source` _Optional[SourceType]_ - The source of the values to exclude. Defaults to None.
  

**Returns**:

  The total value in the list.

## ALItemizedValue Objects {#ALToolbox.al\_income.ALItemizedValue}

```python
class ALItemizedValue(DAObject)
```

An item in an ALItemizedValueDict (a line item like wages, tips or union dues).
Should be a positive number, even if it will later be subtracted from the
job&#x27;s net total.

**Warnings**:

  This item&#x27;s period-based value can&#x27;t be calculated correctly
  outside of an ALItemizedJob. Its value should only be accessed through the
  filtering methods of the ALItemizedJob that contains it.
  

**Attributes**:

- `value` _float | Decimal_ - A number representing an amount of money accumulated
  during the `times_per_year` of this item or this item&#x27;s job.
- `is_hourly` _bool_ - Whether this particular item is calculated hourly.
- `times_per_year` _float_ - A denominator of a year representing the annual
  frequency of the job. E.g. 12 for monthly.
- `exists` _bool, optional_ - Allows an interview author to pre-define some common
  descriptors, like &quot;wages&quot; or &quot;union dues&quot; without requiring the user to
  provide a value for each item.
  
  If the &quot;.exists&quot; attribute is False or undefined, the item will not be used
  when calculating totals.

#### income\_fields(use\_exists=True) {#ALToolbox.al\_income.ALItemizedValue.income\_fields}

```python
def income_fields(use_exists=True) -> List[Dict[str, Any]]
```

Returns a YAML structure representing the list of fields for an itemized value,
to be passed to a `code` attribute of a question&#x27;s fields

**Arguments**:

- `use_exists` _bool_ - Whether to include the &#x27;exists&#x27; field. Defaults to True.
  

**Returns**:

  A list of dictionaries representing the fields for an itemized value.

#### total() {#ALToolbox.al\_income.ALItemizedValue.total}

```python
def total() -> Decimal
```

Calculate the total value of this itemized income item.

If an item&#x27;s value doesn&#x27;t exist or the item is marked as not existing,
returns 0. Otherwise returns the decimal value of the item.

**Returns**:

  The total value of this item, or 0 if the item doesn&#x27;t exist
  or has no value.
  

**Examples**:

  &gt;&gt;&gt; item = ALItemizedValue(value=1500, exists=True)
  &gt;&gt;&gt; item.total()
  Decimal(&#x27;1500&#x27;)
  &gt;&gt;&gt; item_disabled = ALItemizedValue(exists=False)
  &gt;&gt;&gt; item_disabled.total()
  Decimal(&#x27;0&#x27;)

#### \_\_str\_\_() {#ALToolbox.al\_income.ALItemizedValue.\_\_str\_\_}

```python
def __str__() -> str
```

Returns a string of the value of the item with two decimal places.

## ALItemizedValueDict Objects {#ALToolbox.al\_income.ALItemizedValueDict}

```python
class ALItemizedValueDict(DAOrderedDict)
```

Dictionary that can contain ALItemizedValues (e.g. line items) for an
ALItemizedJob. E.g., wages, tips and deductions being the most common.

An ALItemizedJob will have two ALItemizedValueDicts, one for income
and one for deductions.

**Warnings**:

  Should only be accessed through an ALItemizedJob. Otherwise
  you may get unexpected results.

#### hook\_after\_gather() {#ALToolbox.al\_income.ALItemizedValueDict.hook\_after\_gather}

```python
def hook_after_gather() -> None
```

Update item lists after they&#x27;ve been gathered or edited to remove non-existent
items. Will still allow the developer to set `auto_gather=False` if they
want without affecting this functionality.
See https://docassemble.org/docs/objects.html#DAList.hook_after_gather.

If a developer wants to remove these items _before_ gathering is finished,
they can use similar code in their question&#x27;s `validation code:`

#### total() {#ALToolbox.al\_income.ALItemizedValueDict.total}

```python
def total() -> Decimal
```

Calculate the total value of all items in this itemized value dictionary.

Sums up all values in the dictionary, skipping items that are marked
as not existing (exists=False).

**Returns**:

- `Decimal` - The sum of all existing item values in the dictionary.
  

**Examples**:

  &gt;&gt;&gt; value_dict = ALItemizedValueDict()
  &gt;&gt;&gt; value_dict[&#x27;wages&#x27;] = ALItemizedValue(value=1000, exists=True)
  &gt;&gt;&gt; value_dict[&#x27;bonus&#x27;] = ALItemizedValue(value=500, exists=False)
  &gt;&gt;&gt; value_dict.total()
  Decimal(&#x27;1000&#x27;)  # Only includes wages, not bonus

#### \_\_str\_\_() {#ALToolbox.al\_income.ALItemizedValueDict.\_\_str\_\_}

```python
def __str__() -> str
```

Returns a string of the dictionary&#x27;s key/value pairs as two-element lists in a list.
E.g. &#x27;[[&quot;federal_taxes&quot;, &quot;2500.00&quot;], [&quot;wages&quot;, &quot;15.50&quot;]]&#x27;

## ALItemizedJob Objects {#ALToolbox.al\_income.ALItemizedJob}

```python
class ALItemizedJob(DAObject)
```

An &quot;Itemized&quot; job is a job which allows the user to report very specific,
granular details about the money that they earn in that job and any
deductions that they have on their paycheck. This detailed accounting of
money for each job is required on some financial statements, although in
many financial statements, just reporting gross and net income is sufficient.

For example, an ALItemizedJob can let the user report:
- Wages at one hourly rate
- Overtime at a second hourly rate
- Tips earned during that time period
- A fixed salary earned for that pay period
- Union Dues
- Insurance
- Taxes

If the financial statement only requires &quot;gross&quot; and &quot;net&quot; income, the
ALJobList has a simpler API and may be the preferred way to represent the
income in code.

**Attributes**:

- `to_add` _ALItemizedValueDict_ - Dict of ALItemizedValues that would be added
  to a job&#x27;s net total, like wages and tips.
- `to_subtract` _ALItemizedValueDict_ - Dict of ALItemizedValues that would be
  subtracted from a net total, like union dues or insurance premiums.
- `times_per_year` _float_ - A denominator of a year, like 12 for monthly, that
  represents how frequently the income is earned.
- `is_hourly` _bool, optional_ - Whether the value represents a figure that the
  user earns on an hourly basis, rather than for the full time period.
- `hours_per_period` _int, optional_ - If the job is hourly, how many hours the
  user works per period.
- `employer` _Individual, optional_ - Individual assumed to have a name and,
  optionally, an address and phone.
- `source` _str, optional_ - The category of this item, like &quot;public service&quot;.
  Defaults to &quot;job&quot;.
  

**Warnings**:

  Individual items in `.to_add` and `.to_subtract` should not be used
  directly. They should only be accessed through the filtering methods of
  this job.
  
  Fulfills these requirements:
  - A job can be hourly. Its wages will be calculated with that in mind.
  - Despite an hourly job, some individual items must be calculated using the
  job&#x27;s whole period.
  - Some items will have their own periods.
  - In a list of jobs, a developer may need to access full time and part time
  jobs separately.
  - In a list of jobs, a developer may need to sum all items from one source,
  such as tips or taxes.
  - The developer needs access to total money coming in, total money going out,
  and the total of money going in and money coming out.
  - A user must be able to add their own arbitrary items.

#### total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALItemizedJob.total}

```python
def total(times_per_year: float = 1,
          source: Optional[SourceType] = None,
          exclude_source: Optional[SourceType] = None) -> Decimal
```

Alias for ALItemizedJob.gross_total to integrate with ALIncomeList math.

**Arguments**:

- `times_per_year` _float_ - The time period to divide the gross total by. Defaults to 1.
- `source` _Optional[SourceType]_ - The source of the items to include. Defaults to None.
- `exclude_source` _Optional[SourceType]_ - The source of the items to exclude. Defaults to None.
  

**Returns**:

  The gross total of the job.

#### gross\_total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALItemizedJob.gross\_total}

```python
def gross_total(times_per_year: float = 1,
                source: Optional[SourceType] = None,
                exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the sum of positive values (payments) for a given times_per_year.
You can filter the items by `source`. `source` can be a string or a list.
If you use sources from deductions, they will be ignored.

**Arguments**:

- `times_per_year` _float, optional_ - Number of times per year you want to
  calculate. E.g, to express a weekly period, use 52. Defaults to 1.
- `source` _str | List[str], optional_ - Source or list of sources of desired
  item(s). Defaults to None.
- `exclude_source` _str | List[str], optional_ - Source or list of sources to
  exclude from calculation. Defaults to None.
  

**Returns**:

- `Decimal` - The sum of positive values for the given parameters.

#### deduction\_total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALItemizedJob.deduction\_total}

```python
def deduction_total(times_per_year: float = 1,
                    source: Optional[SourceType] = None,
                    exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the sum of money going out (normally, deductions like union
dues) divided by a pay times_per_year as a positive value. You can
filter the items by `source`. `source` can be a string or a list.

**Arguments**:

- `times_per_year` _float, optional_ - Number of times per year you want to
  calculate. E.g, to express a weekly period, use 52. Defaults to 1.
- `source` _str | List[str], optional_ - Source or list of sources of desired
  item(s). Defaults to None.
- `exclude_source` _str | List[str], optional_ - Source or list of sources to
  exclude from calculation. Defaults to None.
  

**Returns**:

- `Decimal` - The sum of deductions for the given parameters as a positive value.

#### net\_total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALItemizedJob.net\_total}

```python
def net_total(times_per_year: float = 1,
              source: Optional[SourceType] = None,
              exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the net (gross minus deductions) value of the job divided by
`times_per_year`. You can filter the items by `source`. `source` can be a
string or a list. E.g. &quot;full time&quot; or [&quot;full time&quot;, &quot;union dues&quot;]

**Arguments**:

- `times_per_year` _float, optional_ - Number of times per year you want to
  calculate. E.g, to express a weekly period, use 52. Defaults to 1.
- `source` _str | List[str], optional_ - Source or list of sources of desired
  item(s). Defaults to None.
- `exclude_source` _str | List[str], optional_ - Source or list of sources to
  exclude from calculation. Defaults to None.
  

**Returns**:

- `Decimal` - The net value (gross minus deductions) for the given parameters.

#### employer\_name\_address\_phone() {#ALToolbox.al\_income.ALItemizedJob.employer\_name\_address\_phone}

```python
def employer_name_address_phone() -> str
```

Returns concatenation of employer name and, if they exist, employer
address and phone number.

**Returns**:

  A string containing the employer&#x27;s name, address, and phone number.

#### normalized\_hours(times\_per\_year: float = 1) {#ALToolbox.al\_income.ALItemizedJob.normalized\_hours}

```python
def normalized_hours(times_per_year: float = 1) -> float
```

Returns the normalized number of hours worked in a given times_per_year,
based on the self.hours_per_period and self.times_per_year attributes.

For example, if the person works 10 hours a week, it will return
520 when the times_per_year parameter is 1.

**Arguments**:

- `times_per_year` _float_ - The time period to normalize the hours to. Defaults to 1.
  

**Returns**:

  The normalized number of hours worked in the given time period.

## ALItemizedJobList Objects {#ALToolbox.al\_income.ALItemizedJobList}

```python
class ALItemizedJobList(DAList)
```

Represents a list of ALItemizedJobs that can have both payments and money
out. This is a less common way of reporting income.

#### sources(which\_side: Optional[str] = None) {#ALToolbox.al\_income.ALItemizedJobList.sources}

```python
def sources(which_side: Optional[str] = None) -> Set[str]
```

Returns a set of the unique sources in all of the jobs.
By default gets from both sides, if which_side is &quot;deductions&quot;, only gets from deductions.

**Arguments**:

- `which_side` _Optional[str]_ - The side of the job to get the sources from. Can be &quot;incomes&quot;, &quot;deductions&quot;, or &quot;all&quot;. Defaults to &quot;all&quot;.
  

**Returns**:

  A set of the unique sources in all of the jobs.

#### total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALItemizedJobList.total}

```python
def total(times_per_year: float = 1,
          source: Optional[SourceType] = None,
          exclude_source: Optional[SourceType] = None) -> Decimal
```

Alias for ALItemizedJobList.gross_total to integrate with
ALIncomeList math.

**Arguments**:

- `times_per_year` _float_ - The time period to divide the gross total by. Defaults to 1.
- `source` _Optional[SourceType]_ - The source of the items to include. Defaults to None.
- `exclude_source` _Optional[SourceType]_ - The source of the items to exclude. Defaults to None.
  

**Returns**:

  The gross total of the list.

#### gross\_total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALItemizedJobList.gross\_total}

```python
def gross_total(times_per_year: float = 1,
                source: Optional[SourceType] = None,
                exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the sum of the gross incomes of the list&#x27;s jobs divided by the
times_per_year. You can filter the items by `source`. `source` can be a
string or a list.

**Arguments**:

- `times_per_year` _float, optional_ - Number of times per year you want to
  calculate. E.g, to express a weekly period, use 52. Defaults to 1.
- `source` _str | List[str], optional_ - Source or list of sources of
  desired job items to sum from every itemized job.
  E.g. [&#x27;tips&#x27;, &#x27;commissions&#x27;]. Defaults to None.
- `exclude_source` _str | List[str], optional_ - Source or list of sources to
  exclude from calculation. Defaults to None.
  

**Returns**:

- `Decimal` - The sum of the gross incomes for the given parameters.

#### deduction\_total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALItemizedJobList.deduction\_total}

```python
def deduction_total(times_per_year: float = 1,
                    source: Optional[SourceType] = None,
                    exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the sum of the deductions of the list&#x27;s jobs divided by the
times_per_year. You can filter the items by `source`. `source` can be a
string or a list.

**Arguments**:

- `times_per_year` _float, optional_ - Number of times per year you want to
  calculate. E.g, to express a weekly period, use 52. Defaults to 1.
- `source` _str | List[str], optional_ - Source or list of sources of
  desired job items to sum from every itemized job.
  E.g. [&#x27;taxes&#x27;, &#x27;dues&#x27;]. Defaults to None.
- `exclude_source` _str | List[str], optional_ - Source or list of sources to
  exclude from calculation. Defaults to None.
  

**Returns**:

- `Decimal` - The sum of the deductions for the given parameters.

#### net\_total(times\_per\_year: float = 1, source: Optional[SourceType] = None, exclude\_source: Optional[SourceType] = None) {#ALToolbox.al\_income.ALItemizedJobList.net\_total}

```python
def net_total(times_per_year: float = 1,
              source: Optional[SourceType] = None,
              exclude_source: Optional[SourceType] = None) -> Decimal
```

Returns the net of the list&#x27;s jobs (money in minus money out) divided by
the times_per_year. You can filter the items by `source`. `source` can be a
string or a list.

**Arguments**:

- `times_per_year` _float, optional_ - Number of times per year you want to
  calculate. E.g, to express a weekly period, use 52. Defaults to 1.
- `source` _str | List[str], optional_ - Source or list of sources of
  desired job items to sum from every itemized job.
  E.g. [&#x27;tips&#x27;, &#x27;taxes&#x27;]. Defaults to None.
- `exclude_source` _str | List[str], optional_ - Source or list of sources to
  exclude from calculation. Defaults to None.
  

**Returns**:

- `Decimal` - The net total (gross minus deductions) for the given parameters.

