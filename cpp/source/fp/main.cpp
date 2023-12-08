#include <iostream>
#include <string>
#include <lager/store.hpp>
#include <lager/event_loop/manual.hpp>

#include "todos.h"
#include "parser.h"

int main() {
    // Create the data store with the initial model
    auto store = lager::make_store<todo::Action>(
        todo::Model{},
        lager::with_manual_event_loop{});

    // Show the initial view
    todo::view(store.get());

    // Tell lager to watch the store and when it changes
    // to update the view
    watch(store, todo::view);

    // Get a line of text
    std::string line;
    while (std::getline(std::cin, line)) {

        // Parse the line into an action
        parseCommand(line)
            .map(
                [&](auto act) {
                    // If the action parsing was successful, dispatch it
                    // to the store, which will call update
                    store.dispatch(act);
                }
            )
            .map_error(
                [&](auto const &err) {
                    // If the action parsing failed, print the error
                    std::cout << "Invalid command: " << err << std::endl;
                }
            );
    }
}
