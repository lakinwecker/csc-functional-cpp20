import { FpCPP20 } from './fpcpp20'
import { getCodeFile, CodeFile } from './data'
import { fpcpp20Slides } from './content'
import * as E from 'fp-ts/Either'
import * as F from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as D from './debug'
import { orEmpty } from './fp'
import {
  Slide,
  SlideType,
  ContentType,
  Content,
  Fragment,
  LineSlice,
} from './slides'
import { CodeFileSources } from './codefiles'

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
            <code
              data-trim
              data-noescape
              data-line-numbers={lineSliceFocusesToReveal(
                content.lineSliceFocuses
              )}
            >
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
    case ContentType.JSX:
      return content.content
    case ContentType.Title:
    default:
      return <h2>{content.title}</h2>
  }
}

export const SlideRenderer = (slide: Slide) => {
  switch (slide.type) {
    case SlideType.Single:
      return (
        <section className={slide.className}>
          {F.pipe(
            slide.content,
            D.pp,
            orEmpty((content) => ContentRenderer(content))
          )}
          {F.pipe(
            slide.fragments,
            D.pp,
            orEmpty((fragments) => fragments.map(FragmentRenderer))
          )}
        </section>
      )
    case SlideType.Vertical:
      return (
        <section /*className={slide.className}*/>
          {slide.slides.map(SlideRenderer)}
        </section>
      )
  }
}

export const FragmentRenderer = (frag: Fragment) => (
  <p className={`fragment ${frag.transition}`}>
    {ContentRenderer(frag.content)}
  </p>
)
Promise.all(CodeFileSources.map(getCodeFile)).then((codeFileLists) => {
  const codeFiles: Record<string, CodeFile> = {}
  codeFileLists.forEach((cf) => (codeFiles[cf.title] = cf))

  if (container !== null) {
    const root = createRoot(container)
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
