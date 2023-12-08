#include <iostream>
#include <string>
#include <lager/store.hpp>
#include <lager/event_loop/manual.hpp>

#include "todos.h"
#include "parser.h"

int main() {
    auto store = lager::make_store<todo::Action>(
        todo::Model{},
        lager::with_manual_event_loop{});
    todo::view(store.get());
    watch(store, todo::view);

    std::string line;
    while (std::getline(std::cin, line)) {
        parseCommand(line).map([&](auto act) {
            store.dispatch(act);
        }).map_error([&](auto const &err) {
            std::cout << "Invalid command: " << err << std::endl;
        });
    }
}
