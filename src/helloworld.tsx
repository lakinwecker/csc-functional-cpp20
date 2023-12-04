import React from 'react'
import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js'

import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/solarized.css'

// const downloadUrl = new URL('../cpp/source/oop/main.cpp', import.meta.url)

export const HelloWorld = () => {
  React.useEffect(() => {
    let deck = new Reveal({
      plugins: [Markdown],
    })
    deck.initialize()
  }, [])
  return (
    <div className="reveal">
      <div className="slides">
        <section>
          Slide whatever the fuck
          <pre>
            <code data-sample="cpp/source/oop/main.cpp"></code>
          </pre>
        </section>
        <section>Slide 2</section>
        <section>Slide 3</section>
        <section>Slide 4</section>
      </div>
    </div>
  )
}
