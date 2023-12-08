cmake_minimum_required(VERSION 3.22)
project(starter)

include(cmake/prelude.cmake)

project(
    fp-cpp20
    VERSION 0.1.0
    DESCRIPTION "Example project for using functional programming in C++20 talk"
    HOMEPAGE_URL "https://github.com/lakinwecker/csc-functional-cpp20"
    LANGUAGES CXX C
)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")

include(cmake/project-is-top-level.cmake)
include(cmake/variables.cmake)
include(fp_cpp20_dependencies)
include(fp_cpp20_targets)

# ---- Dependencies ----
fp_cpp20_find_dependencies_thirdparty()
fp_cpp20_find_dependencies_internal()
fp_cpp20_dependency_targets()

# ---- Declare library ----
oop_cpp20_declare_lib("")
fp_cpp20_declare_lib("")

# ---- Declare executable ----
oop_cpp20_declare_exe("")
fp_cpp20_declare_exe("")

# ---- Install rules ----

if(NOT CMAKE_SKIP_INSTALL_RULES)
  include(cmake/install-rules.cmake)
endif()

# ---- Developer mode ----

if(NOT fp_cpp20_DEVELOPER_MODE)
  return()
elseif(NOT PROJECT_IS_TOP_LEVEL)
  message(
      AUTHOR_WARNING
      "Developer mode is intended for developers of fp_cpp20"
  )
endif()

include(cmake/dev-mode.cmake)
