#pragma once
#include <string>
#include "example.hpp"
#include <iostream>

namespace MyLibrary {

    class SubclassExample : public Example {
    public:

        /**
         * @bug second bug
         * @return
         */
        int virtualfunc() override;

        std::shared_ptr<std::string> super_long_function_with_lots_of_parameters(std::shared_ptr<std::string>& text, std::shared_ptr<std::string>& text2) {
            if(true) {
                std::cout << "this even has some code." << std::endl;
            }
        }

    };

}

