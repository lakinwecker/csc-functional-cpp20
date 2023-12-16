import React from 'react'
import { CodeFile } from './data'
import * as O from 'fp-ts/Option'

export enum ContentType {
  Title,
  Code,
  CodeFromFile,
  JSX,
  Fragment,
}
export type Content = Code | JSX | CodeFromFile

export type JSX = {
  type: ContentType.JSX
  content: React.JSX.Element
}
export const JSX = (content: React.JSX.Element): JSX => ({
  content,
  type: ContentType.JSX,
})

export type Code = {
  type: ContentType.Code
  title: string
  code: string
  lineSliceFocuses: O.Option<LineSlice[]>
}
export const Code = (
  title: string,
  code: string,
  lineSliceFocuses: O.Option<LineSlice[]> = O.none
): Code => ({
  title,
  code,
  lineSliceFocuses,
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

export const Fragment = (
  content: Content,
  transition: FragmentTransition = ''
): Fragment => ({
  type: ContentType.Fragment,
  content,
  transition,
})

export enum SlideType {
  Single,
  Vertical,
}

export type SingleSlide = {
  type: SlideType.Single
  content: O.Option<Content>
  fragments: O.Option<Fragment[]>
  className: string
}
export const ContentSlide = (
  content: Content,
  fragments: O.Option<Fragment[]> = O.none,
  className = ''
): SingleSlide => {
  return {
    content: O.some(content),
    fragments,
    type: SlideType.Single,
    className,
  }
}

export const FragmentsSlide = (
  content: Content,
  fragments: Fragment[],
  className = ''
): SingleSlide => {
  return {
    fragments: O.some(fragments),
    content: O.some(content),
    type: SlideType.Single,
    className,
  }
}

export type VerticalSlide = {
  type: SlideType.Vertical
  slides: SingleSlide[]
}
export const VerticalSlide = (slides: SingleSlide[]): VerticalSlide => {
  return {
    slides,
    type: SlideType.Vertical,
  }
}

export type Slide = SingleSlide | VerticalSlide

export type Renderer = (slide: Slide) => React.JSX.Element
