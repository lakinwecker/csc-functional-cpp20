function (fp_cpp20_find_dependencies_thirdparty)
    find_package(doctest REQUIRED)
    find_package(fmt REQUIRED)
    find_package(immer REQUIRED)
    find_package(lager REQUIRED)
    find_package(zug REQUIRED)
    find_package(range-v3 REQUIRED)
    find_package(dbg-macro REQUIRED)
    find_package(tl-expected REQUIRED)
    find_package(tl-optional REQUIRED)
endfunction()

function (fp_cpp20_find_dependencies_internal)
    find_package(doctest REQUIRED)
    find_package(fmt REQUIRED)
    find_package(immer REQUIRED)
    find_package(lager REQUIRED)
    find_package(zug REQUIRED)
    find_package(range-v3 REQUIRED)
    find_package(dbg-macro REQUIRED)
    find_package(tl-expected REQUIRED)
    find_package(tl-optional REQUIRED)
endfunction()

function (fp_cpp20_dependency_targets)
    set(FP_CPP20_DEPENDENCY_TARGETS
        doctest::doctest
        fmt::fmt
        immer::immer
        lager::lager
        zug::zug
        range-v3::range-v3
        dbg-macro::dbg-macro
        tl::expected
        tl::optional
        PARENT_SCOPE
    )
list(REMOVE_DUPLICATES FP_CPP20_DEPENDENCY_TARGETS)
endfunction()
