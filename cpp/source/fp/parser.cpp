#include "parser.h"
#include <range/v3/all.hpp>
#include <format>
#include <functional>

namespace r = ranges;

auto takeFirstWord(std::string line) -> std::tuple<std::string, std::string> {
    // Find the first word by taking all of the character we see until
    // we find a space
    auto firstWord = line
        | r::views::take_while([](char c){return !std::isspace(c);})
        | r::to<std::string>;

    // Take the rest of the line by dropping all of the characters until
    // we find a space
    auto theRest = line
        | r::views::drop_while([](char c){return !std::isspace(c);})
        | r::views::drop_while([](char c){return std::isspace(c);})
        | r::to<std::string>;

    // Return the two values as a tuple
    return std::make_tuple(firstWord, theRest);
}

auto strToSizeT(std::string const & str)
    -> tl::expected<size_t, std::string> {
    // Because many of the C++ standard library functions throw exceptions
    // we will need to manually convert these into tl::expected values
    try {
        return std::stoul(str);

    } catch (std::out_of_range const & e) {
        return tl::unexpected{std::format("Could not convert {} to size_t [out of range]", str)};

    } catch (std::invalid_argument const & e) {
        return tl::unexpected{std::format("Could not convert {} to size_t [invalid argument]", str)};
    }
}

auto parseCommand(std::string line)
    -> tl::expected<undo::Action<todo::Action>, std::string> {
    auto [command, theRest] = takeFirstWord(line);

    command = command
            | r::views::transform(::tolower)
            | r::to<std::string>;

    if (command == "create") {
        return todo::CreateTodo{theRest};

    } else if (command == "edit") {
        auto [indexStr, name] = takeFirstWord(theRest);
        return strToSizeT(indexStr)
            .map(
                [&](size_t index) {
                    return todo::UpdateTodo{index, name};
                }
            );

    } else if (command == "delete") {
        auto [indexStr, _] = takeFirstWord(theRest);
        return strToSizeT(indexStr)
            .map(
                [&](size_t index) {
                    return todo::DeleteTodo{index};
                }
            );
    } else if (command == "undo") {
        return undo::Undo{};
    }
    return tl::unexpected{std::format("Unknown command: {}", command)};
}
