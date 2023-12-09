import React from 'react'
import { CodeFile } from './data'
import * as E from 'fp-ts/Either'
import * as R from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import * as F from 'fp-ts/function'

import {
  Content,
  ContentSlide,
  FragmentsSlide,
  VerticalSlide,
  Slide,
  TitleContent,
  SubTitleContent,
  JSX,
  Fragment,
  Code,
  CodeFromFile,
  LineSlice,
} from './slides'

import * as I from './codefiles'

export const CodeFromFileOrError =
  (files: Record<string, CodeFile>, name: string) =>
  (f: (codeFile: CodeFile) => CodeFromFile): Content =>
    F.pipe(
      R.lookup(name)(files),
      O.fold<CodeFile, Content>(() => TitleContent(`ERROR loading: ${name}`), f)
    )

const iFrag = (
  url: URL,
  index: number | undefined = undefined,
  width: number | undefined = undefined
) => (
  <img
    className="fragment fade-in-then-out"
    data-fragment-index={index}
    src={url.toString()}
    width={width}
    alt=""
  />
)

const mutationSlide = ContentSlide(
  JSX(
    <>
      <h3>Mutation</h3>
      <h4>Changing Values</h4>
      <div className="r-stack">
        {iFrag(I.immutable0, 0, 400)}
        {iFrag(I.immutable1, undefined, 400)}
        {iFrag(I.immutable2, undefined, 400)}
        {iFrag(I.immutable3, undefined, 400)}
        {iFrag(I.immutable4, undefined, 400)}
      </div>
    </>
  )
)
const immutabilitySlide = ContentSlide(
  JSX(
    <>
      <h3>Immutability</h3>
      <h4>Copying Values</h4>
      <div className="r-stack">
        {iFrag(I.immutable5, 0, 400)}
        {iFrag(I.immutable6, undefined, 400)}
        {iFrag(I.immutable7, undefined, 400)}
        {iFrag(I.immutable8, undefined, 400)}
        {iFrag(I.immutable9, undefined, 400)}
      </div>
    </>
  )
)

const immerSlide = ContentSlide(
  JSX(
    <>
      <h3>Immutability (with Immer)</h3>
      <h4>Copying (some values)</h4>
      <div className="r-stack">
        {iFrag(I.immutable10, 0, 400)}
        {iFrag(I.immutable11, undefined, 400)}
        {iFrag(I.immutable12, undefined, 400)}
        {iFrag(I.immutable13, undefined, 400)}
        {iFrag(I.immutable14, undefined, 400)}
      </div>
    </>
  )
)

export const fpcpp20Slides = (
  files: Record<string, CodeFile>
): E.Either<string, Slide[]> => {
  const codeFromFile = (
    name: string,
    focusLines: O.Option<LineSlice[]> = O.none
  ): Content =>
    CodeFromFileOrError(
      files,
      name
    )((codeFile) => CodeFromFile(codeFile, O.none, focusLines))
  return E.right([
    ContentSlide(
      JSX(
        <>
          <h2>Functional Programming in C++20</h2>
          <p>
            <img src={I.cppLogo.toString()} width="256" height="256" />
          </p>
        </>
      )
    ),
    VerticalSlide([
      ContentSlide(
        JSX(
          <>
            <h3>About Me</h3>
            <div className="logos">
              <div className="logo sa-logo">
                <a href="https://www.structuredabstraction.com/">
                  <img
                    src="https://www.structuredabstraction.com/static/website/images/logo.svg"
                    alt="Structured Abstraction Logo"
                  />
                </a>
              </div>
              <div className="logo uofc-logo">
                <a href="https://pages.cpsc.ucalgary.ca/~samavati/">
                  <img
                    src="https://www.ucalgary.ca/sites/default/files/styles/ucws_image_desktop/public/2019-10/UCalgary_Horizontal_logo_colour_BlackBackground.webp?itok=q4Jp3h7j"
                    alt="University of Calgary Logo"
                  />
                </a>
              </div>
              <div className="logo vt-logo">
                <a href="https://www.vividtheory.com/">
                  <img
                    src="https://vividtheory.com/_next/image?url=%2Fassets%2Flogos%2Fvivid-theory-logo-white.png&w=128&q=75"
                    alt="Vivid Theory Logo"
                  />
                </a>
              </div>
              <div className="logo bg-logo">
                <a href="https://www.biggeo.com/">
                  <img
                    src="https://assets-global.website-files.com/6345ad9c87035c200bff8d84/65501e2c308e88ddc8140c09_Type%3DWhite%20%26%20Default%2C%20Variant%3DHorizontal.svg"
                    alt="BigGeo Logo"
                  />
                </a>
              </div>
            </div>
          </>
        )
      ),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('What is Functional Programming?')),
      ContentSlide(
        Code(
          "We're not playing code golf!",
          `quicksort :: Ord a => [a] -> [a]
quicksort []     = []
quicksort (p:xs) =
    (quicksort lesser) ++ [p] ++ (quicksort greater)
    where
        lesser  = filter (< p) xs
        greater = filter (>= p) xs
`
        )
      ),
      FragmentsSlide(SubTitleContent('Functional Programming Style'), [
        Fragment(
          JSX(
            <>
              <a href="https://www.youtube.com/watch?v=QyJZzq0v7Z4">
                Why isn't functional programming the norm?
              </a>{' '}
              &mdash;
              <em>Richard Feldman</em>
            </>
          )
        ),
        Fragment(
          JSX(
            <>
              Avoid <strong>mutation</strong> and <strong>side effects</strong>
            </>
          )
        ),
      ]),
      ContentSlide(
        JSX(
          <>
            <h3>Side Effects</h3>
            <h4>Functions as Pipes</h4>
            <div className="r-stack">
              {iFrag(I.sideEffects0, 0, 300)}
              {iFrag(I.sideEffects1, undefined, 400)}
              {iFrag(I.sideEffects2, undefined, 400)}
              {iFrag(I.sideEffects3, undefined, 400)}
              {iFrag(I.sideEffects4, undefined, 400)}
              {iFrag(I.sideEffects5, undefined, 600)}
            </div>
          </>
        )
      ),
      mutationSlide,
      immutabilitySlide,
      FragmentsSlide(SubTitleContent('Functional Programming Style in C++'), [
        Fragment(
          JSX(
            <>
              No specific language features are <strong>required</strong>
            </>
          )
        ),
        Fragment(
          JSX(
            <>
              Languages differ in their <strong>support</strong> for this style
            </>
          )
        ),
        Fragment(
          JSX(
            <p>
              We're going to talk about <strong>C++'s support</strong> for
              functional programming style
            </p>
          )
        ),
      ]),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent("Let's build a CLI TODO app")),
      FragmentsSlide(SubTitleContent('TODO app requirements (basic CRUD)'), [
        Fragment(JSX(<p>Create Todo</p>)),
        Fragment(JSX(<p>Read Todo</p>)),
        Fragment(JSX(<p>Update Todo</p>)),
        Fragment(JSX(<p>Delete Todo</p>)),
        Fragment(JSX(<p>Undo</p>)),
        Fragment(
          JSX(
            <p>
              And you'll notice that the way we do this in C++ is{' '}
              <strong>very</strong> similar to how you do it in React, or
              Svelte, or Vue or Angular.
            </p>
          )
        ),
      ]),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('In the OOP style')),
      ContentSlide(codeFromFile('oop/main.cpp')),
      ContentSlide(
        codeFromFile(
          'oop/clidriver.h',
          O.some([
            [5, 5],
            [7, 10],
            [9, 10],
            [13, 13],
          ])
        )
      ),
      ContentSlide(
        codeFromFile(
          'oop/clidriver.cpp',
          O.some([
            [6, 6],
            [7, 8],
            [9, 10],
            [11, 12],
            [13, 14],
            [15, 16],
            [17, 18],
            [21, 21],
            [21, 21],
            [22, 26],
            [32, 38],
            [41, 51],
            [53, 60],
          ])
        )
      ),
      ContentSlide(
        codeFromFile(
          'oop/todomanager.h',
          O.some([
            [5, 5],
            [9, 18],
            [12, 12],
            [21, 21],
          ])
        )
      ),
      ContentSlide(
        codeFromFile(
          'oop/todomanager.cpp',
          O.some([
            [5, 9],
            [10, 13],
            [15, 20],
            [21, 28],
            [30, 33],
          ])
        )
      ),
      mutationSlide,
      ContentSlide(
        JSX(
          <>
            <h3>Design Patterns: Gang of Four</h3>
            <p>
              <img src={I.designPatternsCover.toString()} />
            </p>
            <cite>
              <a href="https://en.wikipedia.org/wiki/Design_Patterns#/media/File:Design_Patterns_cover.jpg">
                Source: WorldCat; presumably copyright Addison-Wesley used via
                Fair Use
              </a>
            </cite>
          </>
        )
      ),
      ContentSlide(
        JSX(
          <>
            <h3>Memento pattern!</h3>
            <p>
              <img src={I.mementoPatternJpg.toString()} />
            </p>
            <cite>
              <a href="https://en.wikipedia.org/wiki/Memento_pattern#/media/File:W3sDesign_Memento_Design_Pattern_UML.jpg">
                Source: Vanderjoe used by CC BY-SA 4.0
              </a>
            </cite>
          </>
        )
      ),
    ]),
    ContentSlide(SubTitleContent('In the FP style')),
    VerticalSlide([
      ContentSlide(SubTitleContent('Syntax Preliminaries')),
      FragmentsSlide(SubTitleContent('Traditional Return Types'), [
        Fragment(
          Code(
            '',
            `
// Traditional return types
int square(int x) { return x * x; }
`,
            O.some([[1, 2]])
          )
        ),
      ]),
      ContentSlide(
        JSX(
          <>
            <h3>Functions as Pipes</h3>
            <div className="r-stack">
              {iFrag(I.sideEffects0, 0, 400)}
              {iFrag(I.pipes1, undefined, 400)}
              {iFrag(I.pipes0, undefined, 400)}
              {iFrag(I.pipes2, undefined, 400)}
              {iFrag(I.pipes3, undefined, 400)}
              {iFrag(I.pipes4, undefined, 400)}
              {iFrag(I.pipes5, undefined, 600)}
              {iFrag(I.pipes6, undefined, 500)}
              {iFrag(I.pipes1, undefined, 400)}
            </div>
          </>
        )
      ),
      FragmentsSlide(SubTitleContent('Trailing Return Types'), [
        Fragment(
          Code(
            '',
            `
// Traditional return types
int square(int x) { return x * x; }

// Trailing return types
auto square(int x) -> int { return x * x; }
`,
            O.some([
              [1, 2],
              [4, 5],
            ])
          )
        ),
      ]),
      FragmentsSlide(SubTitleContent('Function Syntax'), [
        Fragment(
          Code(
            '',
            `
// Functions defined at the top level scope
auto add2(int x) -> int { return x + 2; }

// Lambda syntax
auto add2 = [](int x) -> int { return x + 2; };
`,
            O.some([
              [1, 2],
              [4, 5],
            ])
          )
        ),
      ]),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('Ranges-v3')),
      FragmentsSlide(SubTitleContent('Pipes Again!'), [
        Fragment(JSX(<img src={I.pipes6.toString()} width={500} alt="" />)),
        Fragment(JSX(<img src={I.pipes7.toString()} width={500} alt="" />)),
        Fragment(
          Code(
            '',
            `
y = x |> f |> g
`
          )
        ),
        Fragment(
          Code(
            '',
            `
#!/bin/bash
cat code.cpp | grep "#include" | wc --lines
`
          )
        ),
      ]),
      FragmentsSlide(SubTitleContent('std::ranges Pipes'), [
        Fragment(
          Code(
            'C++20 ranges',
            `
#include <ranges>
#include <vector>

int main() {
    // And assuming we have a list of ints
    std::vector<int> ints = {1, 2, 3, 4, 5};

    // And a function that squares ints
    auto square = [](int x ){ return x * x; };

    // We can use ranges with the pipe operator to transform them
    std::vector<int> strings = ints
        | std::views::transform(square)
        | ranges::to<std::vector>;

    return 0;
}
`,
            O.some([
              [1, 1],
              [5, 6],
              [8, 9],
              [11, 14],
            ])
          )
        ),
      ]),
      ContentSlide(
        JSX(
          <>
            <h3>Ranges-v3</h3>
            <p className="fragment fade-in">
              <a href="https://ericniebler.github.io/range-v3/">Ranges</a> are
              an extension of the Standard Template Library that makes its
              iterators and algorithms more powerful by making them{' '}
              <strong>composable</strong>.
            </p>
            <p className="fragment fade-in">
              The default{' '}
              <a href="https://ericniebler.github.io/range-v3/">
                Documentation for Ranges v3
              </a>{' '}
              is not as good as I'd like. There are better ones out there, like
              this{' '}
              <a href="https://www.walletfox.com/course/quickref_range_v3.php">
                quick reference by walletfox
              </a>
            </p>
          </>
        )
      ),
      ContentSlide(
        codeFromFile(
          'fp/parser.cpp',
          O.some([
            [2, 2],
            [8, 8],
            [9, 13],
          ])
        )
      ),
      ContentSlide(
        JSX(
          <>
            <h3>RX-Marbles</h3>
            <p>
              <a href="https://rxmarbles.com/#takeWhile">takeWhile example</a>
            </p>
            <p>
              <a href="https://rxmarbles.com/#skipWhile">skipWhile example</a>
            </p>
          </>
        )
      ),
      ContentSlide(codeFromFile('fp/parser.cpp', O.some([[15, 21]]))),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('std::variant / std::visit')),
      ContentSlide(
        Code(
          '',
          `
#include <variant>
#include <string>
#include <lager/util.hpp>

 // And a function that print either an int or a string
auto displayValue(std::variant<int, std::string> x) -> void {
    std::visit(lager::visitor{
        [](int arg) {
            std::cout << "this is an int: " << arg << ' ';
        },
        [](const std::string& arg) {
            std::cout << "this is a string: "std::quoted(arg) << ' ';
        }
    }, x);
};

int main() {
    displayValue(1);
    displayValue("Lakin Wecker");

    return 0;
}
`,
          O.some([
            [1, 1],
            [3, 3],
            [6, 6],
            [7, 14],
            [18, 19],
          ])
        )
      ),
      ContentSlide(
        codeFromFile(
          'fp/todos.h',
          O.some([
            [3, 3],
            [6, 10],
            [12, 16],
            [30, 30],
          ])
        )
      ),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('tl::expected')),
      ContentSlide(
        codeFromFile(
          'fp/parser.h',
          O.some([
            [3, 3],
            [7, 8],
            [8, 8],
            [12, 12],
          ])
        )
      ),
      ContentSlide(
        codeFromFile(
          'fp/parser.cpp',
          O.some([
            [27, 39],
            [33, 34],
            [36, 37],
            [53, 58],
          ])
        )
      ),
    ]),
    VerticalSlide([
      ContentSlide(
        JSX(
          <>
            <h3>immer</h3>
            <p dir="auto">
              <a href="https://github.com/arximboldi/immer">
                <strong>immer</strong>
              </a>{' '}
              is a library of{' '}
              <a
                href="https://en.wikipedia.org/wiki/Persistent_data_structure"
                rel="nofollow"
              >
                persistent
              </a>{' '}
              and{' '}
              <a
                href="https://en.wikipedia.org/wiki/Immutable_object"
                rel="nofollow"
              >
                immutable
              </a>{' '}
              data structures written in C++. These enable whole new kinds of
              architectures for interactive and concurrent programs of striking
              simplicity, correctness, and performance.
            </p>
          </>
        )
      ),
      ContentSlide(
        JSX(
          <>
            <h3>immer</h3>
            <p className="fragment">
              Instead of mutating them <strong>in place</strong>, they provide
              manipulation functions that{' '}
              <em>return a new transformed value</em>.
            </p>
            <p className="fragment">
              Leaves the original value <strong>unaltered</strong>. In the
              context of data-structures, this property of preserving old values
              is called <strong>persistence</strong>.
            </p>
          </>
        )
      ),
      ContentSlide(
        JSX(
          <>
            <h3>immer</h3>
            <p className="fragment">
              Most of these containers use data-structures in which these
              operations can be done <strong>efficiently</strong>.
            </p>
            <p className="fragment">
              {' '}
              In particular, <strong>not all data is copied</strong> when a new
              value is produced.
            </p>
            <p className="fragment">
              Instead, the new values <strong>may share common data</strong>{' '}
              with other objects. We sometimes refer to this property as{' '}
              <strong>structural sharing</strong>. This behaviour is transparent
              to the user.
            </p>
          </>
        )
      ),
      immerSlide,
    ]),
    VerticalSlide([
      ContentSlide(
        JSX(
          <>
            <h3>lager</h3>
            <p>
              <a href="https://github.com/arximboldi/lager">Lager</a> is a C++
              library for <strong>value-oriented</strong> design using the{' '}
              <strong>unidirectional data-flow architecture</strong> —{' '}
              <strong>Redux</strong> for C++
            </p>
          </>
        )
      ),
      ContentSlide(
        JSX(
          <>
            <h3>Unidirectional Data-Flow</h3>
            <div className="r-stack">
              {iFrag(I.unidirectional0, 0, 800)}
              {iFrag(I.unidirectional1, undefined, 800)}
              {iFrag(I.unidirectional2, undefined, 800)}
              {iFrag(I.unidirectional3, undefined, 500)}
            </div>
          </>
        )
      ),
    ]),
    VerticalSlide([
      ContentSlide(
        JSX(
          <>
            <h3>Putting it all together</h3>
          </>
        )
      ),
      ContentSlide(
        codeFromFile(
          'fp/todos-v1.h',
          O.some([
            [17, 21],
            [7, 15],
            [23, 24],
          ])
        )
      ),
      ContentSlide(
        codeFromFile(
          'fp/todos-v1.cpp',
          O.some([
            [7, 7],
            [14, 19],
            [18, 18],
            [21, 23],
            [25, 27],
            [31, 46],
          ])
        )
      ),
      ContentSlide(
        codeFromFile(
          'fp/main.cpp',
          O.some([
            [3, 3],
            [11, 14],
            [15, 16],
            [18, 25],
            [27, 29],
            [31, 46],
          ])
        )
      ),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('Undo!')),
      ContentSlide(
        codeFromFile(
          'fp/todos.h',
          O.some([
            [10, 10],
            [16, 16],
            [23, 27],
          ])
        )
      ),
      ContentSlide(
        codeFromFile(
          'fp/todos.cpp',
          O.some([
            [8, 12],
            [14, 22],
            [24, 29],
            [42, 44],
            [59, 62],
          ])
        )
      ),
      ContentSlide(SubTitleContent('Demo!')),
    ]),
    VerticalSlide([
      ContentSlide(
        JSX(
          <>
            <h3>Thank you!</h3>
            <p>Any Questions?</p>
            <p>
              <a href="https://github.com/lakinwecker/csc-functional-cpp20">
                Source Code
              </a>
            </p>
            <p>
              <img src={I.qrCode.toString()} />
            </p>
          </>
        )
      ),
      ContentSlide(codeFromFile('fp/model.cpp')),
    ]),
  ])
}
