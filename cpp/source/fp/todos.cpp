#include "todos.h"
#include <lager/util.hpp>
#include <iostream>
#include <range/v3/all.hpp>


auto todo::Model::pushState() const -> todo::Model {
    return Model{
        todos,
        previousStates.push_back(todos)
    };
}
auto todo::Model::popState() const -> todo::Model {
    if (previousStates.size() > 0) {
        return Model{
            previousStates.back(),
            previousStates.erase(previousStates.size() - 1)
        };
    }
    return *this;
}

auto todo::Model::withTodos(immer::flex_vector<Todo> newTodos) const -> todo::Model {
    return Model{
        newTodos,
        previousStates
    };
}

auto todo::update(Model model, Action action) -> Model {
    // std::visit is a form of pattern matching for std::variant
    // https://en.cppreference.com/w/cpp/utility/variant/visit
    return std::visit(lager::visitor{

        // We have to define a function for each action type
        // And if we miss one, the compiler will tell us
        [&](CreateTodo const &act) {
            // Because we are using immutable data structures
            // we can return a new copy of the model in each of these
            // functions
            return model
                .pushState()
                .withTodos(model.todos.push_back(Todo{act.name}));
        },

        [&](UpdateTodo const &act) {
            return model
                .pushState()
                .withTodos(model.todos.set(act.pos, Todo{act.name}));
        },

        [&](DeleteTodo const &act) {
            return model
                .pushState()
                .withTodos(model.todos.erase(act.pos));
        },

        [&](Undo const &) {
            return model
                .popState();
        }
    }, action);
}

auto todo::view(Model model) -> void {
    std::cout << std::endl;
    std::cout << std::endl;
    std::cout << "-----------------------------------------" << std::endl;
    std::cout << "TODO Manager 0.1 (my little pony edition)" << std::endl;
    for (auto const & [id, todo] : ranges::views::enumerate(model.todos)) {
        std::cout << " * (id: " << id << ") " << todo.name << std::endl;
    }
}
