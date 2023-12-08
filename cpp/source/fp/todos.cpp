#include "todos.h"
#include <lager/util.hpp>
#include <iostream>

auto todo::update(Model model, Action action) -> Model {
    return std::visit(lager::visitor{
        [&](CreateTodo const &act) {
            return Model{model.todos.push_back(Todo{act.name})};
        },
        [&](UpdateTodo const &act) {
            return Model{model.todos.set(act.pos, Todo{act.name})};
        },
        [&](DeleteTodo const &act) {
            return Model{model.todos.erase(act.pos)};
        }
    }, action);
}

auto todo::view(Model model) -> void {
    std::cout << std::endl;
    std::cout << std::endl;
    std::cout << "-----------------------------------------" << std::endl;
    std::cout << "TODO Manager 0.1 (my little pony edition)" << std::endl;
    size_t id = 0;
    for (auto const & todo : model.todos) {
        std::cout << " * (id: " << id << ") " << todo.name << std::endl;
        ++id;
    }

}
