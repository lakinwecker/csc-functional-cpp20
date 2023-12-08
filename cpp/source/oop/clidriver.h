#pragma once
#include "todomanager.h"
#include "action.h"

class CliDriver {
public:
    auto run() -> int;
    Action getAction();
    void displayTodos();
    void displayHelp();

private:
    TodoManager todoManager;
};
