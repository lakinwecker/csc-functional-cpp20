#pragma once
#include <string>
#include <variant>
#include <immer/flex_vector.hpp>

namespace todo {
struct CreateTodo{std::string name;};
struct UpdateTodo{size_t pos; std::string name;};
struct DeleteTodo{size_t pos;};
struct Undo{};

using Action = std::variant<
    CreateTodo,
    UpdateTodo,
    DeleteTodo,
    Undo
>;

struct Todo { std::string name; };

struct Model {
    immer::flex_vector<Todo> todos;
    immer::flex_vector<immer::flex_vector<Todo>> previousStates;

    auto pushState() const -> Model;
    auto popState() const -> Model;
    auto withTodos(immer::flex_vector<Todo> newTodos) const -> Model;
};

auto update(Model model, Action action) -> Model;
auto view(Model model) -> std::string;

}
