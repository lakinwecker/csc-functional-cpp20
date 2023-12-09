#pragma once
#include <string>
#include <tl/expected.hpp>

#include "undo.h"
#include "todos.h"

auto strToSizeT(std::string const & str)
    -> tl::expected<size_t, std::string>;
auto takeFirstWord(std::string line)
    -> std::tuple<std::string, std::string>;
auto parseCommand(std::string line)
    -> tl::expected<undo::Action<todo::Action>, std::string>;
