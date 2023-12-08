#pragma once
#include <string>
#include <tuple>
#include "action.h"

std::tuple<std::string, std::string> splitFirstSpace(std::string const &command);
std::tuple<size_t, std::string> getFirstNumber(std::string const &command);
Action parseAction(std::string const &command);
ActionType parseActionType(std::string const &actionType);
