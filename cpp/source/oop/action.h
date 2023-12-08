#pragma once
#include <string>

enum class ActionType {
    Create,
    Read,
    Update,
    Delete,
    Quit,
    Help,
    Undo
};

struct Action {
    ActionType type = ActionType::Read;
    std::string name;
    size_t index;
};
