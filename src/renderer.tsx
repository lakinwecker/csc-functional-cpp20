import * as F from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { orEmpty } from './fp'

import React from 'react'

import {
  Slide,
  SlideType,
  ContentType,
  Content,
  Fragment,
  LineSlice,
} from './slides'

import LZString from 'lz-string'

export const SlideErrorRenderer = (error: String) => (
  <section>
    <p>Error loading slides</p>
    <h1>{error}</h1>
  </section>
)

const isTypescript = (filename: string) =>
  filename.endsWith('.tsx') || filename.endsWith('.ts')

const editCodeLink = (filename: string, code: string) =>
  isTypescript(filename) ? (
    <a
      target="_blank"
      href={`https://www.typescriptlang.org/play?#code/${LZString.compressToEncodedURIComponent(
        code
      )}`}
    >
      Edit Code
    </a>
  ) : (
    <></>
  )

const lineSliceFocusesToReveal = (lineSliceFocuses: O.Option<LineSlice[]>) =>
  F.pipe(
    lineSliceFocuses,
    O.map((lineSliceFocuses) =>
      lineSliceFocuses.map((lines) => lines.join('-')).join('|')
    ),
    O.getOrElse<string | null>(() => null)
  )

const codeSlide = (
  filename: string,
  code: string,
  lineSliceFocuses: O.Option<LineSlice[]>
) => (
  <>
    <pre>
      <code
        data-trim
        data-noescape
        data-line-numbers={lineSliceFocusesToReveal(lineSliceFocuses)}
      >
        {code}
      </code>
    </pre>
    {editCodeLink(filename, code)}
  </>
)

export const ContentRenderer = (content: Content) => {
  switch (content.type) {
    case ContentType.Code:
      return codeSlide('', content.code, content.lineSliceFocuses)
    // TODO: fix duplicaed code from above/below
    case ContentType.CodeFromFile:
      return codeSlide(
        content.codeFile.title,
        content.codeFile.code.join('\n'),
        content.lineSliceFocuses
      )
    case ContentType.JSX:
      return content.content
  }
}

export const SlideRenderer = (slide: Slide) => {
  switch (slide.type) {
    case SlideType.Single:
      return (
        <section className={slide.className}>
          {F.pipe(
            slide.content,
            orEmpty((content) => ContentRenderer(content))
          )}
          {F.pipe(
            slide.fragments,
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
