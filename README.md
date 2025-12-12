# Doxygen Awesome

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/jothepro/doxygen-awesome-css)](https://github.com/jothepro/doxygen-awesome-css/releases/latest)
[![GitHub](https://img.shields.io/github/license/jothepro/doxygen-awesome-css)](https://github.com/jothepro/doxygen-awesome-css/blob/main/LICENSE)
![GitHub Repo stars](https://img.shields.io/github/stars/jothepro/doxygen-awesome-css)

<div class="title_screenshot">

![Screenshot of Doxygen Awesome CSS](img/screenshot.png)

</div>

**Doxygen Awesome** is a custom CSS theme for Doxygen HTML documentation with many customization options.

## Motivation

I really like how the Doxygen HTML documentation is structured, but IMHO it looks a bit outdated.

This theme is an attempt to modernize the visuals of Doxygen without changing its overall layout too much.

## Features

- 🌈 Clean, modern design
- 🚀 Highly customizable by adjusting CSS variables
- 🧩 No changes to the HTML structure of Doxygen are required
- 📱 Improved mobile usability
- 🌘 Dark mode support!
- 🥇 Works best with **Doxygen 1.9.1** - **1.9.4** and **1.9.6** - **1.14.0**

## Examples

Some websites using this theme:

- [Documentation of this repository](https://jothepro.github.io/doxygen-awesome-css/)
- [wxWidgets](https://docs.wxwidgets.org/3.2/)
- [OpenCV 5.x](https://docs.opencv.org/5.x/)
- [Zephyr](https://docs.zephyrproject.org/latest/doxygen/html/index.html)
- [Spatial Audio Framework (SAF)](https://leomccormack.github.io/Spatial_Audio_Framework/index.html)
- [Randolf Richardson's C++ classes](https://www.randolf.ca/c++/docs/)
- [libsl3](https://a4z.github.io/libsl3/)
- [DuMu<sup>x</sup>](https://dumux.org/docs/doxygen/master/)
- [OpenRemise](https://openremise.at/)

## Installation

To use the theme when generating your documentation, bring the required CSS and JS files from this repository into your project.

This can be done in several ways:

- manually copying the files
- adding the project as a Git submodule
- downloading the project with CMake FetchContent
- adding the project as an npm/xpm dependency
- installing the theme system-wide

All theme files are located in the root of this repository and start with the prefix `doxygen-awesome-`. You may not need all of them. Follow the installation instructions to determine which files are required for your setup.

### Git submodule

For projects that use Git, add the repository as a submodule and check out the desired release:

```sh
git submodule add https://github.com/jothepro/doxygen-awesome-css.git
cd doxygen-awesome-css
git checkout v2.4.1
```

### CMake with FetchContent

For projects that build with CMake, the `FetchContent` module can be used to download the repository at configuration time.

Add the following snippet to your `CMakeLists.txt`:

```cmake
include(FetchContent)
FetchContent_Declare(
    doxygen-awesome-css
    URL https://github.com/jothepro/doxygen-awesome-css/archive/refs/heads/main.zip
)
FetchContent_MakeAvailable(doxygen-awesome-css)

# Save the location the files were cloned into
# This allows us to get the path to doxygen-awesome.css
FetchContent_GetProperties(doxygen-awesome-css SOURCE_DIR AWESOME_CSS_DIR)

# Generate the Doxyfile
set(DOXYFILE_IN ${CMAKE_CURRENT_SOURCE_DIR}/doc/Doxyfile.in)
set(DOXYFILE_OUT ${CMAKE_CURRENT_BINARY_DIR}/Doxyfile)
configure_file(${DOXYFILE_IN} ${DOXYFILE_OUT} @ONLY)
```

This downloads the latest main (but any other revision could be used) and unpacks in the build folder. The `Doxyfile.in` can reference this location in the `HTML_EXTRA_STYLESHEET` field

```text
HTML_EXTRA_STYLESHEET  = @AWESOME_CSS_DIR@/doxygen-awesome.css
```

When the configure stage of CMake is run, the `Doxyfile.in` is rendered to Doxyfile and Doxygen can be run as usual.

### npm/xpm dependency

In the npm ecosystem, this project can be added as a development dependency
to your project:

```sh
cd your-project
npm install https://github.com/jothepro/doxygen-awesome-css#v2.4.1 --save-dev

ls -l node_modules/@jothepro/doxygen-awesome-css
```

Similarly, in the [xPack](https://xpack.github.io) ecosystem, this project can be added
as a development dependency to an [`xpm`](https://xpack.github.io/xpm/)
managed project.

### System-wide

You can even install the theme system-wide by running `make install`.
The files will be installed to `/usr/local/share/` by default,
but you can customize the install location with `make PREFIX=/my/custom/path install`.

### Choosing a layout

There are two layout options. Choose one of them and configure Doxygen accordingly:

<div class="tabbed">

- <b class="tab-title">Base Theme</b><div class="darkmode_inverted_image">
    ![](img/theme-variants-base.drawio.svg)
    </div>
    Comes with the typical Doxygen titlebar. Optionally the treeview in the sidebar can be enabled.

    Required files: `doxygen-awesome.css`

    Required `Doxyfile` configuration:
    ```
    GENERATE_TREEVIEW      = YES # optional. Also works without treeview
    DISABLE_INDEX = NO
    FULL_SIDEBAR = NO
    HTML_EXTRA_STYLESHEET  = doxygen-awesome-css/doxygen-awesome.css
    HTML_COLORSTYLE        = LIGHT # required with Doxygen >= 1.9.5
    ```

- <b class="tab-title">Sidebar-Only Theme</b><div class="darkmode_inverted_image">
    ![](img/theme-variants-sidebar-only.drawio.svg)
    </div>
    Hides the top titlebar to give more space to the content. The treeview must be enabled in order for this theme to work.

    Required files: `doxygen-awesome.css`, `doxygen-awesome-sidebar-only.css`

    Required `Doxyfile` configuration:
    ```

    GENERATE_TREEVIEW      = YES # required!
    DISABLE_INDEX          = NO
    FULL_SIDEBAR           = NO
    HTML_EXTRA_STYLESHEET  = doxygen-awesome-css/doxygen-awesome.css \
                            doxygen-awesome-css/doxygen-awesome-sidebar-only.css
    HTML_COLORSTYLE        = LIGHT # required with Doxygen >= 1.9.5
    ```

</div>

<br>

@warning
- This theme is not compatible with the `FULL_SIDEBAR = YES` option provided by Doxygen!
- `HTML_COLORSTYLE` must be set to `LIGHT` since Doxygen 1.9.5!

### Further installation instructions

- [Installing extensions](docs/extensions.md)
- [Customizing the theme (colors, spacing, border-radius, ...)](docs/customization.md)
- [Tips and Tricks for further configuration](docs/tricks.md)

## Browser support

Tested with

- Chrome 140, Chrome 140 for Android, Chrome 141 for iOS
- Safari 26, Safari for iOS 26
- Firefox 143, Firefox 142 for Android, Firefox 143 for iOS
- Edge 140
- Opera One 122


The theme does not strive to be backward compatible with (significantly) older browser versions.


## Credits

Thanks for all the bug reports and inspiring feedback on GitHub!

Special thanks to all the contributors:
<br><br>
<a href="https://github.com/jothepro/doxygen-awesome-css/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=jothepro/doxygen-awesome-css" />
</a>


<div class="section_buttons">

|                        Read Next |
|---------------------------------:|
| [Extensions](docs/extensions.md) |

</div>
