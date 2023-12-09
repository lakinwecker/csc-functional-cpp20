#pragma once
#include <variant>
#include <immer/flex_vector.hpp>
#include <lager/util.hpp>

namespace undo {
struct Undo{};
template <class ActionT>
using Action = std::variant<
    Undo,
    ActionT
>;

template <class T>
struct Model {
    T model;

    immer::flex_vector<T> states;
};
template <class T, class ActionT>
auto update(
    Model<T> model,
    Action<ActionT> action
) -> Model<T> {
    return std::visit(lager::visitor{
        [&](Undo const &) {
            if (model.states.size() > 0) {
                return Model<T>{
                    model.states.back(),
                    model.states.erase(model.states.size() - 1)
                };
            }
            return model;
        },
        [&](ActionT const &act) {
            return Model<T>{
                update(model.model, act),
                model.states.push_back(model.model)
            };
        }
    }, action);
}

template <class T>
auto view(Model<T> model)
    -> std::string {
    return view(model.model);
}

}
