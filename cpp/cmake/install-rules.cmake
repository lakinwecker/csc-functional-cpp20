install(
    TARGETS fp_cpp20_exe
    RUNTIME COMPONENT fp_cpp20_Runtime
)

if(PROJECT_IS_TOP_LEVEL)
  include(CPack)
endif()
