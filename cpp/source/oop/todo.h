#pragma once
#include <string>

class Todo {
public:
  Todo(std::string inName) : name(inName) {}

std::string getName() const { return name; }
void setName(std::string inName) { name = inName; }

private:
std::string name;
};
