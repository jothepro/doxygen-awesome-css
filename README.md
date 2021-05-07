#  Doxygen Awesome

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/jothepro/doxygen-awesome-css)](https://github.com/jothepro/doxygen-awesome-css/releases/latest)
[![GitHub](https://img.shields.io/github/license/jothepro/doxygen-awesome-css)](https://github.com/jothepro/doxygen-awesome-css/blob/main/LICENSE)

<div style="margin: -1% -4.4%;">

[![Screenshot of Doxygen Awesome CSS](img/screenshot.png)](https://jothepro.github.io/doxygen-awesome-css/)

</div>

**Doxygen Awesome** is a custom **CSS theme for doxygen** html-documentation with lots of customization parameters.

## Motivation

I really like how the doxygen html-documentation is structured! But IMHO it looks a bit outdated.

This theme is an attemt to update the visuals of doxygen without changing it's overall layout too much.

## Features

- 🌈 Clean, modern design
- 🚀 Heavily customizable by adjusting CSS-variables
- 🧩 No changes to the HTML structure of Doxygen required
- 📱 Improved mobile usability
- 🌘 Dark mode support!
- 🥇 Works best with **doxygen 1.9.1**
 
## Installation

Copy the `css` files from this repository into your project or add this repository as submodule and check out the latest release:

```bash
git submodule add https://github.com/jothepro/doxygen-awesome-css.git
cd doxygen-awesome-css
git checkout <release-version> # e.g. v0.0.1
```

Then make the option `HTML_EXTRA_STYLESHEET` in your Doxyfile point to the `css` files:

```
# Doxyfile
# ...
HTML_EXTRA_STYLESHEET  = doxygen-awesome-css/doxygen-awesome.css
```

## Variants

There is two variants of the theme.

![theme variations](img/theme-variations.drawio.svg)

1. **Base theme**:
```
# Doxyfile
GENERATE_TREEVIEW      = YES # optional. Also works without treeview
HTML_EXTRA_STYLESHEET  = doxygen-awesome-css/doxygen-awesome.css
```

2. **Sidebar-only theme** (experimental):
```
# Doxyfile
GENERATE_TREEVIEW      = YES # required!
HTML_EXTRA_STYLESHEET  = doxygen-awesome-css/doxygen-awesome.css doxygen-awesome-css/doxygen-awesome-sidebar-only.css
```

## Examples

- Sidebar-Only theme: [Documentation of this repository](https://jothepro.github.io/doxygen-awesome-css/)
- Base theme: [libsl3](https://a4z.github.io/libsl3/)


## Configuration

### CSS Variables

This theme is highly customizable because a lot of things are parameterized with CSS variables. The following
list of parameters is not complete! You can easily modify any variable with the developer tools of your browser to find
out what it does.

To customize the existing theme, add your own `custom.css` and overwrite the variables there:
```
HTML_EXTRA_STYLESHEET  = doxygen-awesome-theme/doxygen-awesome.css custom.css
```

| Parameter                 | Default     |
| :------------------------ | :---------- |
| **Color Scheme**:<br>primary theme color. This will affect the entire websites color scheme: links, arrows, labels, ... ||
| `--primary-color`         | <span style="background:#1982d2;color:white">#1982d2</span> |
| `--primary-dark-color`    | <span style="background:#00559f;color:white">#00559f</span> |
| `--primary-light-color`   | <span style="background:#7aabd6;color:black">#7aabd6</span> |
| `--primary-lighter-color` | <span style="background:#cae1f1;color:black">#cae1f1</span> |
| `--primary-lightest-color`| <span style="background:#e9f1f8;color:black">#e9f1f8</span> |
| **Spacing:**<br>default spacings. Most compontest reference these values for spacing, to provide uniform spacing on the page. ||
| `--spacing-small`         | `5px`  |
| `--spacing-medium`        | `10px` |
| `--spacing-large`         | `16px` |
| **Border Radius**:<br>border radius for all rounded components. Will affect many components, like dropdowns, memitems, codeblocks, ...    ||
| `--border-radius-large`   | `8px`  |
| `--border-radius-small`   | `4px`  |
| `--border-radius-medium`  | `6px`  |
| **Content Width**:<br>The content is centered and constraint in it's width. To make the content fill the whole page, set the following variable to `auto`. ||
| `--content-maxwidth`      | `900px` |
| **Code Fragment Colors**:<br>Color-Scheme of multiline codeblocks ||
| `--fragment-background` | <span style="background:#282c34;color:white">#282c34</span> |
| `--fragment-foreground` | <span style="background:#fff;wolor:black">#fff</span> |
| ...and many more                   ||

If you miss a configuration option or find a bug, please consider [opening an issue](https://github.com/jothepro/doxygen-awesome-css/issues)!

### Doxygen generator

The theme overrides most colors with the `--primary-color-*` variables.

But there is a few small images and graphics that the theme cannot adjust or replace. To make these blend in better with
the rest, it is recommended to adjust the [doxygen color settings](https://www.doxygen.nl/manual/customize.html#minor_tweaks_colors) 
to something that matches the chosen color-scheme.

For the default color-scheme, these values work out quite well:

```
# Doxyfile
HTML_COLORSTYLE_HUE    = 209
HTML_COLORSTYLE_SAT    = 255
HTML_COLORSTYLE_GAMMA  = 113
```

## Browser support

Tested with

- Chrome 89, Chrome 89 for Android, Chrome 87 for iOS
- Safari 14, Safari for iOS 14
- Firefox 86, Firefox Daylight 86 for Android, Firefox Daylight 32 for iOS

## Credits

This theme is heavily inspired by the beautiful [vuepress](https://vuepress.vuejs.org/) static site generator default theme!
