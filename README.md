#  Doxygen Awesome CSS

![screenshot](img/screenshot.png)

**Doxygen Awesome CSS** is a custom CSS for doxygen html-documentation with lots of customization parameters.

## Motivation

I really like how the doxygen html-documentation is structured! But IMHO it looks a bit outdated.

This theme is an attemt to update the visuals of doxygen without changing it's overall layout.

## Features

- Clean, modern design.
- Heavily customizable by changing just CSS-variables.
- No changes to the HTML structure of Doxygen required.
- improved mobile usability.

## Usage

Add this repository as submodule. This way you can easily update the theme.

```bash
git add submodule https://github.com/jothepro/doxygen-awesome-css.git
```

Then make the option `HTML_EXTRA_STYLESHEET` in your Doxyfile point to the `doxygen-awesome.css` file in this repository.

```
# Doxyfile
# ...
HTML_EXTRA_STYLESHEET  = doxygen-awesome-theme/doxygen-awesome.css
```



## Variants

There is two variants of the theme.

![theme variations](img/theme-variations.drawio.svg)

1. **Base theme**:
```
# Doxyfile
GENERATE_TREEVIEW      = YES # optional. Also works without treeview
HTML_EXTRA_STYLESHEET  = doxygen-awesome-theme/doxygen-awesome.css
```

2. **Sidebar-only theme** (experimental):
```
# Doxyfile
GENERATE_TREEVIEW      = YES # required!
HTML_EXTRA_STYLESHEET  = doxygen-awesome-theme/doxygen-awesome.css doxygen-awesome-sidenav.css
```

## Example

- Documentation of this repository: [jothepro.github.io/doxygen-awesome-css](https://jothepro.github.io/doxygen-awesome-css/) (uses the sidebar-only theme)




## Configuration

The theme is highly customizable because lot of things are parameterized with CSS variables. The following
list of parameters is not complete! You can easily modify all variables in with the developer tools of your browser to find
out what they do.

To customize the existing theme, add your own `custom.css` and overwrite the variables there:
```
HTML_EXTRA_STYLESHEET  = doxygen-awesome-theme/doxygen-awesome.css custom.css
```

If you miss a configuration option or find a bug, please consider [opening an issue](https://github.com/jothepro/doxygen-awesome-css/issues)!

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| **Color Scheme** | | |
| `--primary-color` | Primary theme color | <span style="background:#1982d2;color:white">#1982d2</span> |
| `--primary-dark-color` | Dark primary color for accents | <span style="background:#00559f;color:white">#00559f</span> |
| `--primary-light-color` | Light primary color| <span style="background:#7aabd6;color:black">#7aabd6</span> |
| `--primary-lighter-color` | Extra light primary color. Used for `memitem` focus shadow | <span style="background:#cae1f1;color:black">#cae1f1</span> |
|  `--primary-lightest-color` | Super light primary color. Used for `memitem` focus shadow | <span style="background:#e9f1f8;color:black">#e9f1f8</span> |


## Credits

This theme is heavily inspired by the awesome design of the [vuepress](https://vuepress.vuejs.org/) static site generator default theme!