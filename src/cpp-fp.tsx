import { Presentation } from './reveal'
import { getCodeFile, CodeFile } from './data'
import { fpcpp20Slides } from './content'
import { Slide } from './slides'
import { CodeFileSources } from './codefiles'
import * as R from './renderer'
import * as F from 'fp-ts/function'
import * as E from 'fp-ts/Either'

import React from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app')

Promise.all(CodeFileSources.map(getCodeFile)).then((codeFileLists) => {
  const codeFiles: Record<string, CodeFile> = {}
  codeFileLists.forEach((cf) => (codeFiles[cf.title] = cf))

  if (container !== null) {
    const root = createRoot(container)
    const slidesE = fpcpp20Slides(codeFiles)

    F.pipe(
      slidesE,
      E.fold(R.SlideErrorRenderer, (slides: Slide[]) => (
        <Presentation slides={slides} renderer={R.SlideRenderer} />
      )),
      (slides) => root.render(slides)
    )
  }
})
