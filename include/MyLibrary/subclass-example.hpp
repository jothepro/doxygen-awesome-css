#pragma once
#include <string>
#include "example.hpp"
#include <iostream>

namespace MyLibrary {

    /**
     * @brief some subclass
     */
    class SubclassExample : public Example {
    public:

        /**
         * @bug second bug
         * @return
         */
        int virtualfunc() override;

        /**
         * @brief Extra long function with lots of parameters
         * @param param1 first parameter
         * @param param2 second parameter
         * @param parameter3 third parameter
         */
        template <typename T>
        std::shared_ptr<std::string> long_function_with_many_parameters(std::shared_ptr<T>& param1, std::shared_ptr<std::string>& param2, bool parameter3) {
            if(true) {
                std::cout << "this even has some code." << std::endl;
            }
        }

    };

}

