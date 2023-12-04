from conan import ConanFile

import json

deps = {}

class Recipe(ConanFile):
    d = open("dependencies.json")
    global deps
    deps = json.load(d)

    settings = "os", "compiler", "build_type", "arch"
    generators = "CMakeToolchain", "CMakeDeps", "VirtualRunEnv"

    def layout(self):
        self.folders.generators = "conan"

    def requirements(self):
        global deps
        for n, v in deps.items():
            self.requires(n + "/" + v["current"])
