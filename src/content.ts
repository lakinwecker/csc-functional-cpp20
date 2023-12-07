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
  ParagraphContent,
  Fragment,
  CodeFromFile,
} from './slides'

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
  const codeFromFile = (name: string): Content =>
    CodeFromFileOrError(files, name)((codeFile) => CodeFromFile(codeFile))
  return E.right([
    ContentSlide(TitleContent('Functional Programming in C++20')),
    VerticalSlide([
      ContentSlide(SubTitleContent('What is Functional Programming?')),
      FragmentsSlide(
        [
          Fragment(ParagraphContent('Pure functions')),
          Fragment(ParagraphContent('Immutability')),
        ],
        O.some(SubTitleContent('Functional Programming Style'))
      ),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent("Let's build a TODO app")),
      ContentSlide(codeFromFile('oop/main.cpp')),
      ContentSlide(codeFromFile('oop/tododriver.h')),
      ContentSlide(codeFromFile('oop/tododriver.cpp')),
    ]),
    VerticalSlide([
      ContentSlide(SubTitleContent("Let's build a TODO app")),
      ContentSlide(codeFromFile('oop/main.cpp')),
      ContentSlide(codeFromFile('oop/tododriver.h')),
      ContentSlide(codeFromFile('oop/tododriver.cpp')),
    ]),
  ])
  //return E.left(`TODO fetch ${files.length} code files`)
}
