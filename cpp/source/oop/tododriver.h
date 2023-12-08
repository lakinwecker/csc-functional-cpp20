#pragma once
#include "todomanager.h"
#include "action.h"

class TodoDriver {
public:
    auto run() -> int;
    Action getAction();
    void displayTodos();
    void displayHelp();

private:
    TodoManager todoManager;
};
