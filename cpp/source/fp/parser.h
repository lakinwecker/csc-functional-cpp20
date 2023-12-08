#pragma once
#include <string>

namespace fp_cpp20::fp::parser {
struct Command{};
auto parseCommand(std::string_view command) -> Command;
}
