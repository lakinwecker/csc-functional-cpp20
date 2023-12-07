import * as O from 'fp-ts/Option'
import React from 'react'

export const orEmpty =
  <T>(f: (t: T) => React.JSX.Element[] | React.JSX.Element) =>
  (o: O.Option<T>) =>
    O.isSome(o) ? f(o.value) : null
