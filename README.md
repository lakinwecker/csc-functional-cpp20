# Functional Programming in C++20
A presentation and example code for a presentation on constructs and libraries available for programming in a Functional Programming Style in C++


## How to build the Presentation
I don't know which version of node is actually required, but I'm using `18.18.2`.  I'm using `pnpm` version `8.11.0`.
```
pnpm install
pnpm run:dev
```
and then load https://localhost:1234

## How to build the C++
Building C++ is a bit of a chore. What I have in place is loosely based on how we do it at work, but I won't claim it's easy or will work well on all OSes. Why? Because C++ build systems are the biggest headache that has ever been unleashed on unsuspecting software developers. I use `conan` to manage dependencies, I use `poetry` to install conan. And `cmake` to build the C++.

Here is the approximate process / set of commands I used:

First, install `poetry` via whatever python packaging system you prefer or via Homebrew or Apt or whatever. I have poetry version `1.7.1`.
Next, install `cmake` via whatever you prefer such as Homebrew or Apt or downloaded manually, make sure it's on your `$PATH`. I have cmake version `3.27.9`. Older versions will likely work, but I can never keep track of what version support what, so YMMV.

Enter the `cpp` directory:
`cd cpp`

Enter a poetry shell:
`poetry shell`
Install conan:
`poetry install`

Make a conan profile with defaults:
`conan profile new default --detect`

This will create a file in `~/.conan/profiles/default`. It has your compiler settings that conan was able to autodetect. You can change them if they are incorrect.

Install `conan` dependencies:
`conan install . -if build/deps/conan --build missing -s build_type=RelWithDebInfo -pr:b=default -pr:h=default`

Generate the build files:
`cmake --preset="dev-unix"`

There are other presets besides `dev-unix` in the `CMakePresets.json` file. You may need to use one of those for MacOS or Windows. I haven't tested either of these platforms yet.

Build the app:
`cmake --build ./build/dev-unix/`
Note that you'll need to match up the build directory to your preset.

Run the apps:
`./build/dev-unix/fp_cpp20`
`./build/dev-unix/oop_cpp20`


## Resources
- [Why isn't functional programming the norm?](https://www.youtube.com/watch?v=QyJZzq0v7Z4)
- [Domain Modeling Made Functional - Scott Wlaschin - KanDDDinsky 2019](https://www.youtube.com/watch?v=2JB1_e5wZmU)
- [Why Functional Programming matters](https://www.cse.chalmers.se/~rjmh/Papers/whyfp.pdf)
- [Grokking simplicity](https://www.manning.com/books/grokking-simplicity)
- [Functional Programming in C++](https://www.manning.com/books/functional-programming-in-c-plus-plus)
- [Functional Programming in Scala](https://www.manning.com/books/functional-programming-in-scala)
- [What if the user was a function - Slides](https://speakerdeck.com/staltz/what-if-the-user-was-a-function)
- [What if he user was a function - Video](https://youtu.be/1zj7M1LnJV4?feature=shared)
- [The introduction to Reactive Programming you've been missing - Andre Staltz](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [WalletFox Ranges Quick Reference](https://www.walletfox.com/course/quickref_range_v3.php)
- [Ranges-v3](https://github.com/ericniebler/range-v3)
- [immer](https://github.com/arximboldi/immer)
- [lager](https://github.com/arximboldi/lager)
- [tl-expected](https://github.com/TartanLlama/expected)
- [tl-optional](https://github.com/TartanLlama/optional)
- [A large list of resources for Functional Programming in C++](https://github.com/graninas/cpp_functional_programming)
- [RxMarbles - Visual Examples of stream operations](https://rxmarbles.com)
