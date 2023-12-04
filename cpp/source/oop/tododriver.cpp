#include <iostream>

#include "tododriver.h"
#define DBG_MACRO_NO_WARNING
#include <dbg.h>

auto fp_cpp20::oop::TodoDriver::run() -> int {
    std::cout << dbg("Hello, World!") << std::endl;
    return 0;
}
