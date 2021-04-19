#pragma once
#include <string>

namespace MyLibrary {

enum Color { red, green, blue };

/**
 * Example class to demonstrate the features of the custom CSS.
 *
 * @author jothepro
 *
 */
class Example {
public:
    /**
     * @brief brief summary
     *
     * doxygen test documentation
     *
     * @param test this is the only parameter of this test function. It does nothing!
     *
     * # Supported elements
     *
     * These elements have been tested with the custom CSS.
     *
     *
     * ## Lists
     *
     * - element 1
     * - element 2
     *
     * 1. element 1
     *    ```
     *    code in lists
     *    ```
     * 2. element 2
     *
     * ## Quotes
     *
     * > This is an **awesome** design...
     * >
     * > ...do you agree?
     * *- jothepro*
     *
     * ## Code block
     *
     * ```
     * code within md fences (```)
     * ```
     *
     * @code{.cpp}
     * // code within @code block
     * if(true) {
     *    auto example = std::make_shared<Example>(5);
     *    example->test("test");
     * }
     * 
     * @endcode
     *
     *     // code within indented code block
     *     auto test = std::shared_ptr<Example(5);
     *
     *
     * Inline `code` elements in a text. Lorem Ipsum set dolor. This also works within multiline text and does not break the `layout`.
     *
     *
     * ## special hints
     *
     * @warning this is a warning only for demonstration purposes
     *
     * @note this is a note to show that notes work. They can also include `code`:
     * @code{.c}
     * void this_looks_awesome();
     * @endcode
     *
     * @bug this css has no bugs, it is perfect... NOT!
     *
     * @deprecated None of this will be deprecated, because it's beautiful!
     *
     * @invariant This is an invariant
     *
     * @pre This is a precondition
     *
     *
     *
     */
    std::string test(const std::string& test);

    virtual int virtualfunc() = 0;

    static bool staticfunc();


};

}

