#pragma once
#include <string>
#include <tl/expected.hpp>

#include "todos.h"

auto strToSizeT(std::string const & str)
    -> tl::expected<size_t, std::string>;
auto takeFirstWord(std::string line)
    -> std::tuple<std::string, std::string>;
auto parseCommand(std::string line)
    -> tl::expected<todo::Action, std::string>;
