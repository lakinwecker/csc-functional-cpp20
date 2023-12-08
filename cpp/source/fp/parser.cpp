#include "parser.h"
#include <range/v3/all.hpp>
#include <format>
#include <functional>

namespace r = ranges;

auto takeFirstWord(std::string line) -> std::tuple<std::string, std::string> {
    auto firstWord = line
        | r::views::take_while([](char c){return !std::isspace(c);})
        | r::to<std::string>;
    auto theRest = line
        | r::views::drop_while([](char c){return !std::isspace(c);})
        | r::views::drop_while([](char c){return std::isspace(c);})
        | r::to<std::string>;
    return std::make_tuple(firstWord, theRest);
}

auto strToSizeT(std::string const & str) -> tl::expected<size_t, std::string> {
    try {
        return std::stoul(str);
    } catch (std::out_of_range const & e) {
        return tl::unexpected{std::format("Could not convert {} to size_t [out of range]", str)};
    } catch (std::invalid_argument const & e) {
        return tl::unexpected{std::format("Could not convert {} to size_t [invalid argument]", str)};
    }
}

auto parseCommand(std::string line) -> tl::expected<todo::Action, std::string> {
    auto [command, theRest] = takeFirstWord(line);

    command = command
            | r::views::transform(::tolower)
            | r::to<std::string>;

    if (command == "create") {
        return todo::CreateTodo{theRest};
    } else if (command == "edit") {
        auto [indexStr, name] = takeFirstWord(theRest);
        return strToSizeT(indexStr)
            .map([&](size_t index){return todo::UpdateTodo{index, name};});
    } else if (command == "delete") {
        auto [indexStr, _] = takeFirstWord(theRest);
        return strToSizeT(indexStr)
            .map([&](size_t index){return todo::DeleteTodo{index};});
    }
    return tl::unexpected{std::format("Unknown command: {}", command)};
}
