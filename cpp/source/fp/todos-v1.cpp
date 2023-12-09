#include "todos-v1.h"
#include <lager/util.hpp>
#include <iostream>
#include <format>
#include <range/v3/all.hpp>

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
            return Model{model.todos.push_back(Todo{act.name})};
        },

        [&](UpdateTodo const &act) {
            return Model{model.todos.set(act.pos, Todo{act.name})};
        },

        [&](DeleteTodo const &act) {
            return Model{model.todos.erase(act.pos)};
        },
    }, action);
}

auto todo::view(Model model) -> std::string {
    std::string header = R"output(
-----------------------------------------
TODO Manager 0.1 (my little pony edition)

)output";
    std::string todoFormat =
        ranges::views::enumerate(model.todos)
        | ranges::views::transform([](auto args) -> std::string {
            auto [id, todo] = args;
            return std::format(" * (id: {}) {}", id, todo.name);
        })
        | ranges::views::join("\n")
        | ranges::to<std::string>;
    return header+todoFormat;
}
