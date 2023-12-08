#include "parser.h"
#include <stdexcept>


std::tuple<std::string, std::string> splitFirstSpace(std::string const &command) {
    size_t firstSpace = command.find(' ');
    std::string first = command;
    std::string rest;
    if (firstSpace != std::string::npos) {
        first = command.substr(0, firstSpace);
        rest = command.substr(firstSpace + 1);
    }
    return std::make_tuple(first, rest);
}

std::tuple<size_t, std::string> getFirstNumber(std::string const &command) {
    auto [number, rest] = splitFirstSpace(command);
    size_t index = static_cast<size_t>(std::stol(number));
    return std::make_tuple(index, rest);
}

ActionType parseActionType(std::string const &actionType) {
    if (actionType == "create") {
        return ActionType::Create;
    } else if (actionType == "read") {
        return ActionType::Read;
    } else if (actionType == "update") {
        return ActionType::Update;
    } else if (actionType == "delete") {
        return ActionType::Delete;
    } else if (actionType == "help") {
        return ActionType::Help;
    } else if (actionType == "quit") {
        return ActionType::Quit;
    } else if (actionType == "undo") {
        return ActionType::Undo;
    } else {
        throw std::runtime_error("Invalid action type");
    }

}

Action parseAction(std::string const &command) {
    auto [commandName, args] = splitFirstSpace(command);
    ActionType actionType = parseActionType(commandName);
    size_t index = 0;

    // If this action requires an index, parse it.
    if (
        actionType == ActionType::Update ||
        actionType == ActionType::Delete
    ) {
        std::tie(index, args) = getFirstNumber(args);
    }

    return Action{actionType, args, index};
}
