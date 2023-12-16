import React from 'react'
import { CodeFile } from './data'
import * as E from 'fp-ts/Either'
import * as R from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import * as F from 'fp-ts/function'

import {
  Content,
  ContentSlide,
  Slide,
  JSX,
  CodeFromFile,
  LineSlice,
} from './slides'

export const CodeFromFileOrError =
  (files: Record<string, CodeFile>, name: string) =>
  (f: (codeFile: CodeFile) => CodeFromFile): Content =>
    F.pipe(
      R.lookup(name)(files),
      O.fold<CodeFile, Content>(() => JSX(<h2>loading: ${name}</h2>), f)
    )

export const fpSlides = (
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
      codeFromFile(
        'ts/fp.ts',
        O.some([
          [1, 2],
          [4, 4],
          [6, 6],
          [8, 11],
          [13, 13],
          [15, 16],
        ])
      )
    ),
  ])
}
