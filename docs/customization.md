# Customization

[TOC]


## CSS-Variables

This theme is highly customizable because a lot of things are parameterized with CSS variables.

Just to give you an idea on how flexible the styling is, click this button:

<div class="alter-theme-button" onclick="toggle_alternative_theme()" onkeypress="if (event.keyCode == 13) toggle_alternative_theme()" tabindex=0>Alter theme</div>

The following list of parameters is not complete!

| Parameter                         | Default (Light)                                             | Default (Dark)                                              |
| :-------------------------------- | :---------------------------------------------------------- | ----------------------------------------------------------- |
| **Color Scheme**:<br>primary theme color. This will affect the entire websites color scheme: links, arrows, labels, ...                                     |||
| `--primary-color`                 | <span style="background:#1779c4;color:white">#1779c4</span> | <span style="background:#1982d2;color:white">#1982d2</span> |
| `--primary-dark-color`            | <span style="background:#00559f;color:white">#00559f</span> | <span style="background:#5ca8e2;color:white">#5ca8e2</span> |
| `--primary-light-color`           | <span style="background:#7aabd6;color:black">#7aabd6</span> | <span style="background:#4779ac;color:white">#4779ac</span> |
| `--primary-lighter-color`         | <span style="background:#cae1f1;color:black">#cae1f1</span> | <span style="background:#191e21;color:white">#191e21</span> |
| `--primary-lightest-color`        | <span style="background:#e9f1f8;color:black">#e9f1f8</span> | <span style="background:#191a1c;color:white">#191a1c</span> |
| **Spacing:**<br>default spacings. Most ui components reference these values for spacing, to provide uniform spacing on the page.                            |||
| `--spacing-small`                 | `5px`                                                       |                                                             |
| `--spacing-medium`                | `10px`                                                      |                                                             |
| `--spacing-large`                 | `16px`                                                      |                                                             |
| **Border Radius**:<br>border radius for all rounded ui components. Will affect many components, like dropdowns, memitems, codeblocks, ...                   |||
| `--border-radius-small`           | `4px`                                                       |                                                             |
| `--border-radius-medium`          | `6px`                                                       |                                                             |
| `--border-radius-large`           | `8px`                                                       |                                                             |
| **Content Width**:<br>The content is centered and constrained in its width. To make the content fill the whole page, set the following variable to `auto`.  |||
| `--content-maxwidth`              | `1000px`                                                     |                                                             |
| **Code Fragment Colors**:<br>Color-Scheme of multiline codeblocks                                                                                           |||
| `--fragment-background`           | <span style="background:#282c34;color:white">#282c34</span> |                                                             |
| `--fragment-foreground`           | <span style="background:#fff;wolor:black">#fff</span>       |                                                             |
| **Arrow Opacity**:<br>By default the arrows in the sidebar are only visible on hover. You can override this behaviour so they are visible all the time.     |||
| `--side-nav-arrow-opacity`        | `0`                                                         |                                                             |
| `--side-nav-arrow-hover-opacity`  | `0.9`                                                       |                                                             |
| ...and many more                                                                                                                                            |||


It is recommended to add your own `custom.css` and overwrite the variables there:
```
HTML_EXTRA_STYLESHEET  = doxygen-awesome.css custom.css
```

```css
/* custom.css */
html {
    /* define light-mode variable overrides here */
}

@media (prefers-color-scheme: dark) {
    html:not(.light-mode) {
        /* define dark-mode variable overrides here if you DON'T use doxygen-awesome-darkmode-toggle.js */
    }
}

html.dark-mode {
    /* define dark-mode variable overrides here if you DO use doxygen-awesome-darkmode-toggle.js */
}
```

If you miss a configuration option or find a bug, please consider [opening an issue](https://github.com/jothepro/doxygen-awesome-css/issues)!

## Doxygen generator

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

## Share your customizations

If you customized the theme with custom colors, spacings, font-sizes, etc. and you want to share your creation with others, you can to this [here](https://github.com/jothepro/doxygen-awesome-css/discussions/13).

I am always curious to learn about how you made the theme look even better!

