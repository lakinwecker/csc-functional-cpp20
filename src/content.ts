import { CodeFile } from './data'
import * as E from 'fp-ts/Either'
import * as R from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import * as F from 'fp-ts/function'
import * as D from './debug'
import {
  Content,
  ContentSlide,
  Slide,
  TitleContent,
  Code,
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
  console.log(files)
  return E.right([
    ContentSlide(TitleContent('Hello World')),
    ContentSlide(
      Code(
        'Code',
        `
#include <iostream>
int main() {
    std::cout << "Hello World" << std::endl;
}`
      )
    ),
    ContentSlide(
      CodeFromFileOrError(
        files,
        'oop/main.cpp'
      )((codeFile) => CodeFromFile(codeFile))
    ),
    ContentSlide(
      CodeFromFileOrError(
        files,
        'oop/tododriver.h'
      )((codeFile) => CodeFromFile(codeFile))
    ),
    ContentSlide(
      CodeFromFileOrError(
        files,
        'oop/tododriver.cpp'
      )((codeFile) => CodeFromFile(codeFile))
    ),
  ])
  //return E.left(`TODO fetch ${files.length} code files`)
}
