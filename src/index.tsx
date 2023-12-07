import { FpCPP20 } from './fpcpp20'
import { getCodeFile, CodeFile } from './data'
import { fpcpp20Slides } from './content'
import * as E from 'fp-ts/Either'
import * as F from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { orEmpty } from './fp'
import { Slide, ContentType, Content, Fragment, LineSlice } from './slides'

import React from 'react'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('app')

export const SlideErrorRenderer = (error: String) => (
  <section>
    <p>Error loading slides</p>
    <h1>{error}</h1>
  </section>
)

const lineSliceFocusesToReveal = (lineSliceFocuses: O.Option<LineSlice[]>) =>
  F.pipe(
    lineSliceFocuses,
    O.map((lineSliceFocuses) =>
      lineSliceFocuses.map((lines) => lines.join('-')).join('|')
    ),
    O.getOrElse<string | null>(() => null)
  )

export const ContentRenderer = (content: Content) => {
  switch (content.type) {
    case ContentType.Code:
      return (
        <>
          {content.title}
          <pre>
            <code data-trim data-noescape data-line-numbers="3-3|2-4">
              {content.code}
            </code>
          </pre>
        </>
      )
    case ContentType.CodeFromFile:
      return (
        <>
          {content.codeFile.title}
          <pre>
            <code
              data-trim
              data-noescape
              data-line-numbers={lineSliceFocusesToReveal(
                content.lineSliceFocuses
              )}
            >
              {content.codeFile.code.join('\n')}
            </code>
          </pre>
        </>
      )
    case ContentType.Title:
    default:
      return <>{content.title}</>
  }
}

export const SlideRenderer = (slide: Slide) => (
  <section>
    {F.pipe(
      slide.content,
      orEmpty((content) => ContentRenderer(content))
    )}
    <>
      {F.pipe(
        slide.fragments,
        orEmpty((fragments) => fragments.map(FragmentRenderer))
      )}
    </>
    {F.pipe(
      slide.subSlides,
      orEmpty((subSlides) => subSlides.map(SlideRenderer))
    )}
  </section>
)

export const FragmentRenderer = (frag: Fragment) => (
  <p className="fragment {frag.transition}">{ContentRenderer(frag.content)}</p>
)
const sources = [
  {
    title: 'oop/main.cpp',
    url: new URL(`../cpp/source/oop/main.cpp`, import.meta.url),
  },
  {
    title: 'oop/tododriver.cpp',
    url: new URL(`../cpp/source/oop/tododriver.cpp`, import.meta.url),
  },
  {
    title: 'oop/tododriver.h',
    url: new URL(`../cpp/source/oop/tododriver.h`, import.meta.url),
  },
]
console.log('sources', sources)
Promise.all(sources.map(getCodeFile)).then((codeFileLists) => {
  const codeFiles: Record<string, CodeFile> = {}
  console.log(codeFiles)
  codeFileLists.forEach((cf) => (codeFiles[cf.title] = cf))
  console.log(codeFiles)

  if (container !== null) {
    const root = createRoot(container)
    console.log(codeFiles)
    const slidesE = fpcpp20Slides(codeFiles)

    F.pipe(
      slidesE,
      E.fold(SlideErrorRenderer, (slides: Slide[]) => (
        <FpCPP20 slides={slides} renderer={SlideRenderer} />
      )),
      (slides) => root.render(slides)
    )
  }
})
