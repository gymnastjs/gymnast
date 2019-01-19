
/* eslint-disable no-unused-expressions */
import * as React from 'react'
import { Col, Grid, asGrid, Root } from 'gymnast'

const components = [asGrid('span'), asGrid(() => <div />), Col, Grid, Root]

components.forEach(Component => {
  // valid type permutations
  ;<Component align="top" />
  ;<Component align="center" />
  ;<Component align="bottom" />
  ;<Component align={{ test: 'bottom' }} />
  ;<Component justify="left" />
  ;<Component justify="center" />
  ;<Component justify="right" />
  ;<Component justify={{ test: 'right' }} />
  ;<Component size={1} />
  ;<Component size="2" />
  ;<Component size={{ test: 1, test2: '2' }} />
})

// invalid type permutations
components.forEach(Component => {
  // $ExpectError
  ;<Component align="invalid" />
  // $ExpectError
  ;<Component align={{ test: 'invalid' }} />
  // $ExpectError
  ;<Component justify={3} />
  // $ExpectError
  ;<Component justify="invalid" />
  // $ExpectError
  ;<Component justify={{ test: 'invalid' }} />
  // $ExpectError
  ;<Component size={() => null} />
  // $ExpectError
  ;<Component size={null} />
  // $ExpectError
  ;<Component size={{ test: null, test2: {} }} />
})
