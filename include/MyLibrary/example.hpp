#pragma once
#include <string>

namespace MyLibrary {

/**
 * class documentation
 */
class Example {
public:
    /**
     * doxygen test documentation
     *
     * # headline
     *
     * some test `with code`.
     *
     * ```javascript
     * function() {
     *   return "test";
     * }
     * ```
     *
     * ## second headline
     *
     * - this is
     * - a list
     * - of things
     *
     * @warning this is only for demonstration purposes
     *
     * @note this is a note
     *
     * @author jothepro
     *
     * @bug this sometimes not works
     *
     * @cite said jesus
     *
     * @deprecated dis not supported
     *
     * @param test this is a test param
     *
     * @code{.cpp}
     * // comment
     * auto example = std::make_shared<Example>(5);
     * example->test("test");
     * @endcode
     */
    std::string test(const std::string& test);
};

}

