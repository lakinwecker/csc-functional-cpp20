// TODO: rename this file.
import React from 'react'
import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.js'

import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/dracula.css'
//import 'reveal.js/plugin/highlight/zenburn.css'
import 'highlight.js/styles/tokyo-night-dark.css'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.js'
import { Slide, Renderer } from './slides'

export const FpCPP20 = ({
  slides,
  renderer,
}: {
  slides: Slide[]
  renderer: Renderer
}) => {
  React.useEffect(() => {
    let deck = new Reveal({
      plugins: [Markdown, RevealHighlight],
    })
    deck.initialize()
  }, [slides])

  return (
    <div className="reveal">
      <div className="slides">{slides.map(renderer)}</div>
    </div>
  )
}
