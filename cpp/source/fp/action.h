#pragma once
#include <string>
#include <variant>

namespace fp_cpp20::fp {
namespace actions {
struct CreateTodo{std::string name;};
struct UpdateTodo{int pos; std::string name;};
struct DeleteTodo{int pos;};
}

using Action = std::variant<
    actions::CreateTodo,
    actions::UpdateTodo,
    actions::DeleteTodo
>;
}
