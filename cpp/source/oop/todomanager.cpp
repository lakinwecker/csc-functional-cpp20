#include "todomanager.h"
#include <iterator>
#include <iostream>

void TodoManager::createTodo(std::string const &name) {
    todos.emplace_back(name);
}

// Read
std::vector<Todo> const &TodoManager::getTodos() const {
    return todos;
}

// Update
void TodoManager::updateTodo(size_t i, std::string name) {
    if (i < todos.size())
        todos[i].setName(name);

}

// Delete
void TodoManager::deleteTodo(size_t i) {
    if (i < todos.size()) {
        auto location = todos.begin();
        std::advance(location, i);
        todos.erase(location);
    }

}

// Undo
void TodoManager::undo() {
    std::cerr << "Undo not implemented" << std::endl;
}
