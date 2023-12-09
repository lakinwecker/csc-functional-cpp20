#pragma once
#include "todo.h"
#include <vector>

class TodoManager {
public:
    // CRUD

    // Create
    void createTodo(std::string const &name);
    // Read
    std::vector<Todo> const &getTodos() const;
    // Update
    void updateTodo(size_t i, std::string name);
    // Delete
    void deleteTodo(size_t i);
    // Undo
    void undo();

private:
    std::vector<Todo> todos;
};
