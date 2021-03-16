# doxygen-awesome-css

Custom CSS for doxygen html-documentation with lot's of customization parameters.

## Motivation

I really like how the doxygen html-documentation is structured. But IMHO it looks a bit outdated.

## Usage

Make the option `HTML_EXTRA_STYLESHEET` in your Doxyfile point to the `doxygen-awesome.css` file in this repository.

It is recommended to add this repository as submodule. This way you can easily update the theme.

```bash
git add submodule https://github.com/jothepro/doxygen-awesome-css.git
```

```
# Doxyfile
# ...
HTML_EXTRA_STYLESHEET  = doxygen-awesome-theme/doxygen-awesome.css
```

## Example

## Configuration

The theme is highly customizable because lot of things are parameterized with CSS variables.
