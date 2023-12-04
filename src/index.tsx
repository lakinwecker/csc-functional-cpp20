import { HelloWorld } from './helloworld'

import * as React from 'react'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('app')
if (container !== null) {
  const root = createRoot(container)
  root.render(<HelloWorld />)
}
