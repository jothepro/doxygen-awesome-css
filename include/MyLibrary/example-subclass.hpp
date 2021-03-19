#pragma once
#include <string>
#include "example.hpp"

namespace MyLibrary {

    class ExampleSubclass : public Example {
    public:

        int virtualfunc() override;

    };

}

