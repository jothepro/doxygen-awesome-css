# Tips & Tricks

[TOC]

## Diagrams with Graphviz

To get the best looking class diagrams for your documentation, generate them with Graphviz as vector graphics with transparent background:

```
# Doxyfile
HAVE_DOT = YES
DOT_IMAGE_FORMAT = svg
DOT_TRANSPARENT = YES
```

In case `INTERACTIVE_SVG = YES` is set in the Doxyfile, make sure to add this CSS snippet in order for the interactive svg viewer to be
rendered correctly:

```css
.dotgraph iframe {
  max-width: 100%;
}
```

## Disable Dark Mode

If for some reason you don't want the theme to automatically switch to dark mode depending on the browser preference,
you can disable dark mode by adding the `light-mode` class to the html-tag in the header template:

```html
<html xmlns="http://www.w3.org/1999/xhtml" class="light-mode">
```

The same can be done to always enable dark-mode:

```html
<html xmlns="http://www.w3.org/1999/xhtml" class="dark-mode">
```


**This only works if you don't use the dark-mode toggle extension.**

## Choosing Sidebar Width

If you have enabled the sidebar-only theme variant, make sure to carefully choose a proper width for your sidebar.
It should be wide enough to hold the icon, project title and version number. If the content is too wide, it will be
cut off.

```css
html {
    /* Make sure sidebar is wide enough to contain the page title (logo + title + version) */
    --side-nav-fixed-width: 335px;
}
```

The chosen width should also be set in the Doxyfile:

```
# Doxyfile
TREEVIEW_WIDTH = 335
```

## Formatting Tables

By default tables in this theme are left aligned and as wide as required to fit their content.
Those properties can be changed for individual tables.

### Centering

Tables can be centered by wrapping them in the `<center>` HTML-tag.

**Example:**

```md
<center>

| This table | is centered          |
|------------|----------------------|
| test 1     | test 2               |

</center>
```

**Result:**

<center>

| This table | is centered |
|------------|----------------------|
| test 1     | test 2               |

</center>

### Full Width

To make tables span the full width of the page, no matter how wide the content is, wrap the table in the `full_width_table` CSS class.

@warning Apply with caution! This breaks the overflow scrolling on small screens!

**Example:**

```md
<div class="full_width_table">

| This table | fills the full width |
|------------|----------------------|
| test 1     | test 2               |

</div>
```

**Result:**

<div class="full_width_table">

| This table | fills the full width |
|------------|----------------------|
| test 1     | test 2               |

</div>



<span class="next_section_button">

Read Next: [Example](https://jothepro.github.io/doxygen-awesome-css/class_my_library_1_1_example.html)
</span>