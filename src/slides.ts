import React from 'react'
import { CodeFile } from './data'
import * as O from 'fp-ts/Option'

export enum ContentType {
  Title,
  Code,
  CodeFromFile,
  Fragment,
}

export type TitleContent = {
  type: ContentType.Title
  title: string
}
export const TitleContent = (title: string): TitleContent => ({
  title,
  type: ContentType.Title,
})

export type Code = {
  type: ContentType.Code
  title: string
  code: string
}
export const Code = (title: string, code: string): Code => ({
  title,
  code,
  type: ContentType.Code,
})

export type LineSlice = [number, number]

export type CodeFromFile = {
  type: ContentType.CodeFromFile
  codeFile: CodeFile
  lineSlice: O.Option<LineSlice>
  lineSliceFocuses: O.Option<LineSlice[]>
}
export const CodeFromFile = (
  codeFile: CodeFile,
  lineSlice: O.Option<LineSlice> = O.none,
  lineSliceFocuses: O.Option<LineSlice[]> = O.none
): CodeFromFile => ({
  codeFile,
  lineSlice,
  lineSliceFocuses,
  type: ContentType.CodeFromFile,
})

// TODO: make it so we can inject other types into this union
export type Content = TitleContent | Code | CodeFromFile
export type FragmentTransition =
  | ''
  | 'fade-out'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-in-then-out'
  | 'current-visible'
  | 'fade-in-then-semi-out'
  | 'grow'
  | 'semi-fade-out'
  | 'shrink'
  | 'strike'
  | 'highlight-red'
  | 'highlight-green'
  | 'highlight-blue'
  | 'highlight-current-red'
  | 'highlight-current-green'
  | 'highlight-current-blue'

export type Fragment = {
  type: ContentType.Fragment
  content: Content
  transition: FragmentTransition
}

export type Slide = {
  content: O.Option<Content>
  fragments: O.Option<Fragment[]>
  subSlides: O.Option<Slide[]>
}
export const ContentSlide = (
  content: Content,
  subSlides: Slide[] = [],
  fragments: O.Option<Fragment[]> = O.none
): Slide => {
  return {
    content: O.some(content),
    subSlides: O.some(subSlides),
    fragments,
  }
}

export const FragmentsSlide = (
  fragments: Fragment[],
  subSlides: O.Option<Slide[]>,
  content: O.Option<Content>
): Slide => {
  return { fragments: O.some(fragments), subSlides, content }
}

export type Renderer = (slide: Slide) => React.JSX.Element
