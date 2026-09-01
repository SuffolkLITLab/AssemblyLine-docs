# Table of Contents

* formfyxer.pdf\_wrangling
  * [FieldType](#formfyxer.pdf_wrangling.FieldType)
    * [TEXT](#formfyxer.pdf_wrangling.FieldType.TEXT)
    * [AREA](#formfyxer.pdf_wrangling.FieldType.AREA)
    * [LIST\_BOX](#formfyxer.pdf_wrangling.FieldType.LIST_BOX)
    * [CHOICE](#formfyxer.pdf_wrangling.FieldType.CHOICE)
  * [FormField](#formfyxer.pdf_wrangling.FormField)
    * [\_\_init\_\_](#formfyxer.pdf_wrangling.FormField.__init__)
  * [set\_fields](#formfyxer.pdf_wrangling.set_fields)
  * [rename\_pdf\_fields](#formfyxer.pdf_wrangling.rename_pdf_fields)
  * [unlock\_pdf\_in\_place](#formfyxer.pdf_wrangling.unlock_pdf_in_place)
  * [has\_fields](#formfyxer.pdf_wrangling.has_fields)
  * [get\_existing\_pdf\_fields](#formfyxer.pdf_wrangling.get_existing_pdf_fields)
  * [swap\_pdf\_page](#formfyxer.pdf_wrangling.swap_pdf_page)
  * [copy\_pdf\_fields](#formfyxer.pdf_wrangling.copy_pdf_fields)
  * [get\_textboxes\_in\_pdf](#formfyxer.pdf_wrangling.get_textboxes_in_pdf)
  * [get\_bracket\_chars\_in\_pdf](#formfyxer.pdf_wrangling.get_bracket_chars_in_pdf)
  * [intersect\_bbox](#formfyxer.pdf_wrangling.intersect_bbox)
  * [intersect\_bboxs](#formfyxer.pdf_wrangling.intersect_bboxs)
  * [contain\_boxes](#formfyxer.pdf_wrangling.contain_boxes)
  * [get\_dist\_sq](#formfyxer.pdf_wrangling.get_dist_sq)
  * [get\_dist](#formfyxer.pdf_wrangling.get_dist)
  * [get\_connected\_edges](#formfyxer.pdf_wrangling.get_connected_edges)
  * [bbox\_distance](#formfyxer.pdf_wrangling.bbox_distance)
  * [get\_possible\_fields](#formfyxer.pdf_wrangling.get_possible_fields)
  * [get\_possible\_checkboxes](#formfyxer.pdf_wrangling.get_possible_checkboxes)
  * [get\_possible\_radios](#formfyxer.pdf_wrangling.get_possible_radios)
  * [get\_possible\_text\_fields](#formfyxer.pdf_wrangling.get_possible_text_fields)
  * [auto\_add\_fields](#formfyxer.pdf_wrangling.auto_add_fields)
  * [is\_tagged](#formfyxer.pdf_wrangling.is_tagged)

---
sidebar_label: pdf_wrangling
title: formfyxer.pdf_wrangling
---

## FieldType Objects {#formfyxer.pdf\_wrangling.FieldType}

```python
class FieldType(Enum)
```

#### TEXT {#formfyxer.pdf\_wrangling.FieldType.TEXT}

Text input Field

#### AREA {#formfyxer.pdf\_wrangling.FieldType.AREA}

Text input Field, but an area

#### LIST\_BOX {#formfyxer.pdf\_wrangling.FieldType.LIST\_BOX}

allows multiple selection

#### CHOICE {#formfyxer.pdf\_wrangling.FieldType.CHOICE}

allows only one selection

## FormField Objects {#formfyxer.pdf\_wrangling.FormField}

```python
class FormField()
```

A data holding class, used to easily specify how a PDF form field should be created.

#### \_\_init\_\_(field\_name: str, type\_name: Union[FieldType, str], x: int, y: int, font\_size: Optional[int] = None, tooltip: str = "", configs: Optional[Dict[str, Any]] = None) {#formfyxer.pdf\_wrangling.FormField.\_\_init\_\_}

```python
def __init__(field_name: str,
             type_name: Union[FieldType, str],
             x: int,
             y: int,
             font_size: Optional[int] = None,
             tooltip: str = "",
             configs: Optional[Dict[str, Any]] = None)
```

Constructor

**Arguments**:

- `x` - the x position of the lower left corner of the field. Should be in X,Y coordinates,
  where (0, 0) is the lower left of the page, x goes to the right, and units are in
  points (1/72th of an inch)
- `y` - the y position of the lower left corner of the field. Should be in X,Y coordinates,
  where (0, 0) is the lower left of the page, y goes up, and units are in points
  (1/72th of an inch)
- `config` - a dictionary containing any keyword argument to the reportlab field functions,
  which will vary depending on what type of field this is. See section 4.7 of the
  [reportlab User Guide](https://www.reportlab.com/docs/reportlab-userguide.pdf)
- `field_name` - the name of the field, exposed to via most APIs. Not the tooltip, but `users1_name__0`

#### set\_fields(in\_file: Union[str, Path, BinaryIO], out\_file: Union[str, Path, BinaryIO], fields\_per\_page: Iterable[Iterable[FormField]], \*, overwrite=False) {#formfyxer.pdf\_wrangling.set\_fields}

```python
def set_fields(in_file: Union[str, Path, BinaryIO],
               out_file: Union[str, Path, BinaryIO],
               fields_per_page: Iterable[Iterable[FormField]],
               *,
               overwrite=False)
```

Adds fields per page to the in_file PDF, writing the new PDF to a new file.

Example usage:

```python
set_fields('no_fields.pdf', 'four_fields_on_second_page.pdf',
  [
    [],  # nothing on the first page
    [ # Second page
      FormField('new_field', 'text', 110, 105, configs=\{'width': 200, 'height': 30\}),
      # Choice needs value to be one of the possible options, and options to be a list of strings or tuples
      FormField('new_choices', 'choice', 110, 400, configs=\{'value': 'Option 1', 'options': ['Option 1', 'Option 2']\}),
      # Radios need to have the same name, with different values
      FormField('new_radio1', 'radio', 110, 600, configs=\{'value': 'option a'\}),
      FormField('new_radio1', 'radio', 110, 500, configs=\{'value': 'option b'\})
    ]
  ]
)
```

**Arguments**:

- `in_file` - the input file name or path of a PDF that we&#x27;re adding the fields to
- `out_file` - the output file name or path where the new version of in_file will
  be written. Doesn&#x27;t need to exist.
- `fields_per_page` - for each page, a series of fields that should be added to that
  page.
- `owerwrite` - if the input file already some fields (AcroForm fields specifically)
  and this value is true, it will erase those existing fields and just add
  `fields_per_page`. If not true and the input file has fields, this won&#x27;t generate
  a PDF, since there isn&#x27;t currently a way to merge AcroForm fields from
  different PDFs.
  

**Returns**:

  Nothing.

#### rename\_pdf\_fields(in\_file: Union[str, Path, BinaryIO], out\_file: Union[str, Path, BinaryIO], mapping: Mapping[str, str]) {#formfyxer.pdf\_wrangling.rename\_pdf\_fields}

```python
def rename_pdf_fields(in_file: Union[str, Path, BinaryIO],
                      out_file: Union[str, Path, BinaryIO],
                      mapping: Mapping[str, str]) -> None
```

Given a dictionary that maps old to new field names, rename the AcroForm
field with a matching key to the specified value.

**Example**:

```python
rename_pdf_fields(&#x27;current.pdf&#x27;, &#x27;new_field_names.pdf&#x27;,
    \{&#x27;abc123&#x27;: &#x27;user1_name&#x27;, &#x27;abc124&#x27;, &#x27;user1_address_city&#x27;\})

Args:
  in_file: the filename of an input file
  out_file: the filename of the output file. Doesn&#x27;t need to exist,
      will be overwritten if it does exist.
  mapping: the python dict that maps from a current field name to the desired name

Returns:
  Nothing

```

#### unlock\_pdf\_in\_place(in\_file: Union[str, Path, BinaryIO]) {#formfyxer.pdf\_wrangling.unlock\_pdf\_in\_place}

```python
def unlock_pdf_in_place(in_file: Union[str, Path, BinaryIO]) -> None
```

Try using pikePDF to unlock the PDF it it is locked. This won&#x27;t work if it has a non-zero length password.

#### has\_fields(pdf\_file: str) {#formfyxer.pdf\_wrangling.has\_fields}

```python
def has_fields(pdf_file: str) -> bool
```

Check if a PDF has at least one form field using PikePDF.

**Arguments**:

- `pdf_file` _str_ - The path to the PDF file.
  

**Returns**:

- `bool` - True if the PDF has at least one form field, False otherwise.

#### get\_existing\_pdf\_fields(in\_file: Union[str, Path, BinaryIO, Pdf]) {#formfyxer.pdf\_wrangling.get\_existing\_pdf\_fields}

```python
def get_existing_pdf_fields(
        in_file: Union[str, Path, BinaryIO, Pdf]) -> List[List[FormField]]
```

Use PikePDF to get fields from the PDF

#### swap\_pdf\_page(\*, source\_pdf: Union[str, Path, Pdf], destination\_pdf: Union[str, Path, Pdf], source\_offset: int = 0, destination\_offset: int = 0, append\_fields: bool = False) {#formfyxer.pdf\_wrangling.swap\_pdf\_page}

```python
def swap_pdf_page(*,
                  source_pdf: Union[str, Path, Pdf],
                  destination_pdf: Union[str, Path, Pdf],
                  source_offset: int = 0,
                  destination_offset: int = 0,
                  append_fields: bool = False) -> Pdf
```

(DEPRECATED: use copy_pdf_fields) Copies the AcroForm fields from one PDF to another blank PDF form. Optionally, choose a starting page for both
the source and destination PDFs. By default, it will remove any existing annotations (which include form fields)
in the destination PDF. If you wish to append annotations instead, specify `append_fields = True`

#### copy\_pdf\_fields(\*, source\_pdf: Union[str, Path, Pdf], destination\_pdf: Union[str, Path, Pdf], source\_offset: int = 0, destination\_offset: int = 0, append\_fields: bool = False) {#formfyxer.pdf\_wrangling.copy\_pdf\_fields}

```python
def copy_pdf_fields(*,
                    source_pdf: Union[str, Path, Pdf],
                    destination_pdf: Union[str, Path, Pdf],
                    source_offset: int = 0,
                    destination_offset: int = 0,
                    append_fields: bool = False) -> Pdf
```

Copies the AcroForm fields from one PDF to another blank PDF form (without AcroForm fields).
Useful for getting started with an updated PDF form, where the old fields are pretty close to where
they should go on the new document.

Optionally, you can choose a starting page for both
the source and destination PDFs. By default, it will remove any existing annotations (which include form fields)
in the destination PDF. If you wish to append annotations instead, specify `append_fields = True`

**Example**:

```python
new_pdf_with_fields = copy_pdf_fields(
    source_pdf="old_pdf.pdf",
    destination_pdf="new_pdf_with_no_fields.pdf")
new_pdf_with_fields.save("new_pdf_with_fields.pdf")
```
  

**Arguments**:

- `source_pdf` - a file name or path to a PDF that has AcroForm fields
- `destination_pdf` - a file name or path to a PDF without AcroForm fields. Existing fields will be removed.
- `source_offset` - the starting page that fields will be copied from. Defaults to 0.
- `destination_offset` - the starting page that fields will be copied to. Defaults to 0.
- `append_annotations` - controls whether formfyxer will try to append form fields instead of
  overwriting. Defaults to false; when enabled may lead to undefined behavior.
  

**Returns**:

  A pikepdf.Pdf object with new fields. If `blank_pdf` was a pikepdf.Pdf object, the
  same object is returned.

#### get\_textboxes\_in\_pdf(in\_file: Union[str, Path, BinaryIO], line\_margin=0.02, char\_margin=2.0) {#formfyxer.pdf\_wrangling.get\_textboxes\_in\_pdf}

```python
def get_textboxes_in_pdf(in_file: Union[str, Path, BinaryIO],
                         line_margin=0.02,
                         char_margin=2.0) -> List[List[Textbox]]
```

Gets all of the text boxes found by pdfminer in a PDF, as well as their bounding boxes

#### get\_bracket\_chars\_in\_pdf(in\_file: Union[str, Path, BinaryIO], line\_margin=0.02, char\_margin=0.0) {#formfyxer.pdf\_wrangling.get\_bracket\_chars\_in\_pdf}

```python
def get_bracket_chars_in_pdf(in_file: Union[str, Path, BinaryIO],
                             line_margin=0.02,
                             char_margin=0.0) -> List
```

Gets all of the bracket characters (&#x27;[&#x27; and &#x27;]&#x27;) found by pdfminer in a PDF, as well as their bounding boxes
TODO: Will eventually be used to find [ ] as checkboxes, but right now we can&#x27;t tell the difference between [ ] and [i].
This simply gets all of the brackets, and the characters of [hi] in a PDF and [ ] are the exact same distance apart.
Currently going with just &quot;[hi]&quot; doesn&#x27;t happen, let&#x27;s hope that assumption holds.

#### intersect\_bbox(bbox\_a, bbox\_b, vert\_dilation=2, horiz\_dilation=2) {#formfyxer.pdf\_wrangling.intersect\_bbox}

```python
def intersect_bbox(bbox_a, bbox_b, vert_dilation=2, horiz_dilation=2) -> bool
```

bboxes are [left edge, bottom edge, horizontal length, vertical length]

#### intersect\_bboxs(bbox\_a, bboxes, vert\_dilation=2, horiz\_dilation=2) {#formfyxer.pdf\_wrangling.intersect\_bboxs}

```python
def intersect_bboxs(bbox_a,
                    bboxes,
                    vert_dilation=2,
                    horiz_dilation=2) -> Iterable[bool]
```

Returns an iterable of booleans, one of each of the input bboxes, true if it collides with bbox_a

#### contain\_boxes(bbox\_a: BoundingBoxF, bbox\_b: BoundingBoxF) {#formfyxer.pdf\_wrangling.contain\_boxes}

```python
def contain_boxes(bbox_a: BoundingBoxF, bbox_b: BoundingBoxF) -> BoundingBoxF
```

Given two bounding boxes, return a single bounding box that contains both of them.

#### get\_dist\_sq(point\_a: XYPair, point\_b: XYPair) {#formfyxer.pdf\_wrangling.get\_dist\_sq}

```python
def get_dist_sq(point_a: XYPair, point_b: XYPair) -> float
```

returns the distance squared between two points. Faster than the true euclidean dist

#### get\_dist(point\_a: XYPair, point\_b: XYPair) {#formfyxer.pdf\_wrangling.get\_dist}

```python
def get_dist(point_a: XYPair, point_b: XYPair) -> float
```

euclidean (L^2 norm) distance between two points

#### get\_connected\_edges(point: XYPair, point\_list: Sequence) {#formfyxer.pdf\_wrangling.get\_connected\_edges}

```python
def get_connected_edges(point: XYPair, point_list: Sequence)
```

point list is always ordered clockwise from the bottom left,
i.e. bottom left, top left, top right, bottom right

#### bbox\_distance(bbox\_a: BoundingBoxF, bbox\_b: BoundingBoxF) {#formfyxer.pdf\_wrangling.bbox\_distance}

```python
def bbox_distance(
    bbox_a: BoundingBoxF, bbox_b: BoundingBoxF
) -> Tuple[float, Tuple[XYPair, XYPair], Tuple[XYPair, XYPair]]
```

Gets our specific &quot;distance measure&quot; between two different bounding boxes.
This distance is roughly the sum of the horizontal and vertical difference in alignment of
the closest shared field-bounding box edge. We are trying to find which, given a list of text boxes
around a field, is the most likely to be the actual text label for the PDF field.

bboxes are 4 floats, x, y, width and height

#### get\_possible\_fields(in\_pdf\_file: Union[str, Path], textboxes: Optional[List[List[Textbox]]] = None) {#formfyxer.pdf\_wrangling.get\_possible\_fields}

```python
def get_possible_fields(
        in_pdf_file: Union[str, Path],
        textboxes: Optional[List[List[Textbox]]] = None
) -> List[List[FormField]]
```

Given an input PDF, runs a series of heuristics to predict where there
might be places for user enterable information (i.e. PDF fields), and returns
those predictions.

**Example**:

```python
fields = get_possible_fields('no_field.pdf')
print(fields[0][0])
# Type: FieldType.TEXT, Name: name, User name: , X: 67.68, Y: 666.0, Configs: \{'fieldFlags': 'doNotScroll', 'width': 239.4, 'height': 16\}
```
  

**Arguments**:

- `in_pdf_file` - the input PDF
- `textboxes` _optional_ - the location of various lines of text in the PDF.
  If not given, will be calculated automatically. This allows us to
  pass through expensive info to calculate through several functions.
  

**Returns**:

  For each page in the input PDF, a list of predicted form fields

#### get\_possible\_checkboxes(img: Union[str, cv2.Mat], find\_small=False) {#formfyxer.pdf\_wrangling.get\_possible\_checkboxes}

```python
def get_possible_checkboxes(img: Union[str, cv2.Mat],
                            find_small=False) -> Union[np.ndarray, List]
```

Uses boxdetect library to determine if there are checkboxes on an image of a PDF page.
Assumes the checkbox is square.

find_small: if true, finds smaller checkboxes. Sometimes will &quot;find&quot; a checkbox in letters,
like O and D, if the font is too small

#### get\_possible\_radios(img: Union[str, BinaryIO, cv2.Mat]) {#formfyxer.pdf\_wrangling.get\_possible\_radios}

```python
def get_possible_radios(img: Union[str, BinaryIO, cv2.Mat])
```

Even though it&#x27;s called &quot;radios&quot;, it just gets things shaped like circles, not
doing any semantic analysis yet.

#### get\_possible\_text\_fields(img: Union[str, BinaryIO, cv2.Mat], text\_lines: List[Textbox], default\_line\_height: int = 44) {#formfyxer.pdf\_wrangling.get\_possible\_text\_fields}

```python
def get_possible_text_fields(
        img: Union[str, BinaryIO, cv2.Mat],
        text_lines: List[Textbox],
        default_line_height: int = 44) -> List[Tuple[BoundingBox, int]]
```

Uses openCV to attempt to find places where a PDF could expect an input text field.

Caveats so far: only considers straight, normal horizonal lines that don&#x27;t touch any vertical lines as fields
Won&#x27;t find field inputs as boxes

default_line_height: the default height (16 pt), in pixels (at 200 dpi), which is 45

#### auto\_add\_fields(in\_pdf\_file: Union[str, Path], out\_pdf\_file: Union[str, Path]) {#formfyxer.pdf\_wrangling.auto\_add\_fields}

```python
def auto_add_fields(in_pdf_file: Union[str, Path], out_pdf_file: Union[str,
                                                                       Path])
```

Uses [get_possible_fields](#formfyxer.pdf_wrangling.get_possible_fields) and
[set_fields](#formfyxer.pdf_wrangling.set_fields) to automatically add new detected fields
to an input PDF.

**Example**:

```python
auto_add_fields('no_fields.pdf', 'newly_added_fields.pdf')
```
  

**Arguments**:

- `in_pdf_file` - the input file name or path of the PDF where we&#x27;ll try to find possible fields
- `out_pdf_file` - the output file name or path of the PDF where a new version of `in_pdf_file` will
  be stored, with the new fields. Doesn&#x27;t need to existing, but if a file does exist at that
  filename, it will be overwritten.
  

**Returns**:

  Nothing

#### is\_tagged(in\_pdf\_file: Union[str, Path, pikepdf.Pdf]) {#formfyxer.pdf\_wrangling.is\_tagged}

```python
def is_tagged(in_pdf_file: Union[str, Path, pikepdf.Pdf]) -> bool
```

Determines if the input PDF file is tagged for accessibility.

**Arguments**:

- `in_pdf_file` _Union[str, Path]_ - The path to the PDF file, as a string or a Path object.
  

**Returns**:

- `bool` - True if the PDF is tagged, False otherwise.

