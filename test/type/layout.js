// @flow
/* eslint-disable no-unused-expressions */
import * as React from 'react'
import { Layout, asLayout } from 'xn-reflex'

const components = [asLayout('span'), asLayout(() => <div />), Layout]

components.forEach(Component => {
  // valid type permutations
  ;<Component fixed="top" />
  ;<Component fixed="bottom" />
  ;<Component fixed={{ test: 'top' }} />
  ;<Component overflow="scrollbars" />
  ;<Component overflow={{ test: 'scrollbars', test2: undefined }} />
  ;<Component height="parent" />
  ;<Component height="auto" />
  ;<Component height="fit" />
  ;<Component height={{ test: 'fit' }} />
})

// invalid type permutations
components.forEach(Component => {
  // $ExpectError
  ;<Component fixed="other" />
  // $ExpectError
  ;<Component fixed={3} />
  // $ExpectError
  ;<Component fixed={{ test: 'other' }} />
  // $ExpectError
  ;<Component fixed={{ test: 3 }} />
  // $ExpectError
  ;<Component overflow="other" />
  // $ExpectError
  ;<Component overflow={{ test: 'other' }} />
  // $ExpectError
  ;<Component overflow={{ test: 3 }} />
  // $ExpectError
  ;<Component height="other" />
  // $ExpectError
  ;<Component height={{ test: 'other' }} />
  // $ExpectError
  ;<Component height={{ test: 3 }} />
})
