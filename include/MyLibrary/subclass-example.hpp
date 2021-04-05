#pragma once
#include <string>
#include "example.hpp"

namespace MyLibrary {

    class SubclassExample : public Example {
    public:

        /**
         * @bug second bug
         * @return
         */
        int virtualfunc() override;

        std::shared_ptr<std::string> super_long_function_with_lots_of_parameters(std::shared_ptr<std::string>& text, std::shared_ptr<std::string>& text2);

    };

}

