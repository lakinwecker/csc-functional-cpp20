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
      ContentSlide(SubTitleContent('What is Functional Programming?')),
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
        Fragment(JSX(<blockquote>Avoid mutation and side effects</blockquote>)),
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
      ]),
      ContentSlide(
        JSX(
          <p>
            We're going to talk about <strong>C++'s support</strong> for
            functional programming style
          </p>
        )
      ),
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
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent("Let's build a CLI TODO app")),
      FragmentsSlide(SubTitleContent('TODO app requirements (basic CRUD)'), [
        Fragment(JSX(<p>Create Todo</p>)),
        Fragment(JSX(<p>Read Todo</p>)),
        Fragment(JSX(<p>Update Todo</p>)),
        Fragment(JSX(<p>Delete Todo</p>)),
        Fragment(JSX(<p>Undo</p>)),
      ]),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('In the OOP style')),
      ContentSlide(codeFromFile('oop/main.cpp')),
      ContentSlide(codeFromFile('oop/clidriver.h')),
      ContentSlide(codeFromFile('oop/clidriver.cpp')),
      ContentSlide(codeFromFile('oop/todomanager.h')),
      ContentSlide(codeFromFile('oop/todomanager.cpp')),
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
      FragmentsSlide(SubTitleContent('Trailing Return Types'), [
        Fragment(
          Code(
            '',
            `
// Traditional return types
int add2(int x) { return x + 2; }

// Trailing return types
auto add2(int x) -> int { return x + 2; }
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
      FragmentsSlide(SubTitleContent('Pipes'), [
        Fragment(
          Code(
            '',
            `
#include <range/v3/all.hpp>
#include <vector>

int main() {
    // And assuming we have a list of ints
    std::vector<int> ints = {1, 2, 3, 4, 5};

    // And a function that squares ints
    auto square = [](int x ){ return x * x; };

    // We can use ranges with the pipe operator to transform them
    std::vector<int> strings = ints
        | ranges::view::transform(square)
        | ranges::to_vector;

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
        codeFromFile(
          'fp/parser.cpp',
          O.some([
            [2, 2],
            [8, 8],
            [9, 13],
            [15, 21],
          ])
        )
      ),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('std::variant / std::visit')),
      ContentSlide(
        codeFromFile(
          'fp/model.h',
          O.some([
            [3, 3],
            [6, 10],
            [12, 16],
          ])
        )
      ),
      ContentSlide(codeFromFile('fp/model.cpp')),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('tl::expected, tl::optional')),
      ContentSlide(codeFromFile('fp/errors.cpp')),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('immer / lager')),
      ContentSlide(codeFromFile('fp/model.cpp')),
      ContentSlide(codeFromFile('fp/main.cpp')),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent('Undo!')),
      ContentSlide(codeFromFile('fp/model.cpp')),
    ]),
  ])
}
