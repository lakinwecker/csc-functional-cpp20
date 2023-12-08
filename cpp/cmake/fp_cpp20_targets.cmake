include(fp_cpp20_dependencies)

function (fp_cpp20_declare_lib BASE_DIR)
    fp_cpp20_dependency_targets()
    # add generated files to library
    add_library(
        fp_cpp20_lib OBJECT
        "${BASE_DIR}source/oop/clidriver.cpp"
        "${BASE_DIR}source/oop/clidriver.h"
        "${BASE_DIR}source/oop/todo.h"
        "${BASE_DIR}source/oop/parser.cpp"
        "${BASE_DIR}source/oop/parser.h"
        "${BASE_DIR}source/oop/todomanager.cpp"
        "${BASE_DIR}source/oop/todomanager.h"
    )

    # includes
    target_include_directories(
        fp_cpp20_lib SYSTEM ${warning_guard}
        PUBLIC
        "$<BUILD_INTERFACE:${PROJECT_SOURCE_DIR}/source>"
        ${CMAKE_CURRENT_BINARY_DIR}
    )

    target_compile_features(fp_cpp20_lib PUBLIC cxx_std_20)
    target_link_libraries(fp_cpp20_lib PRIVATE ${FP_CPP20_DEPENDENCY_TARGETS})

endfunction()

function (fp_cpp20_declare_exe BASE_DIR)
    if (CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
        add_link_options(-Wl,--disable-new-dtags)
    endif()

    fp_cpp20_dependency_targets()

    add_executable(fp_cpp20_exe
        "${BASE_DIR}source/oop/main.cpp"
    )
    add_executable(fp_cpp20::exe ALIAS fp_cpp20_exe)
    set_property(TARGET fp_cpp20_exe PROPERTY OUTPUT_NAME fp_cpp20)
    target_include_directories(
        fp_cpp20_exe SYSTEM ${warning_guard}
        PUBLIC
        "$<BUILD_INTERFACE:${PROJECT_SOURCE_DIR}/source>"
        ${CMAKE_CURRENT_BINARY_DIR}
    )
    target_compile_features(fp_cpp20_exe PRIVATE cxx_std_20)
    target_link_libraries(fp_cpp20_exe PRIVATE fp_cpp20_lib ${FP_CPP20_DEPENDENCY_TARGETS})
endfunction()
