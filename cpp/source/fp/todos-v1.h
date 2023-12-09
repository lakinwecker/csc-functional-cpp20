#pragma once
#include <string>
#include <variant>
#include <immer/flex_vector.hpp>

namespace todo {
struct CreateTodo{std::string name;};
struct UpdateTodo{size_t pos; std::string name;};
struct DeleteTodo{size_t pos;};

using Action = std::variant<
    CreateTodo,
    UpdateTodo,
    DeleteTodo
>;

struct Todo { std::string name; };

struct Model {
    immer::flex_vector<Todo> todos;
};

auto update(Model model, Action action) -> Model;
auto view(Model model) -> std::string;

}
