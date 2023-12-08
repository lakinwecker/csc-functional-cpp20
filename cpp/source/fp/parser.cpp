#include "parser.h"
#include <range/v3/all.hpp>

using namespace fp_cpp20::fp;
using namespace ranges;

auto parser::parseCommand(std::string_view command_str) -> Command {
    auto command = command_str
        | views::take_while([](char c){return c != ' ';})
        | to<std::string>;
    auto args = command_str
        | views::drop_while([](char c){return c != ' ';})
        | to<std::string>;
    return Command{command, args};
}
