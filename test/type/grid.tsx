/* eslint-disable no-unused-expressions */

import * as React from 'react'
import { Grid, useGrid, GridProps } from 'gymnast'

function TheGrid(props: GridProps & { A?: number }) {
  const [shouldShow, allProps] = useGrid(props)

  return shouldShow ? <div {...allProps} /> : null
}

const components = [TheGrid, Grid]

components.forEach(Component => {
  // it should work without parameters
  ;<Component />
  // it should allow additional properties without errors
  ;<Component A={5} />
  // valid type permutations
  ;<Component className="a" />
  ;<Component ref={() => null} />
  ;<Component margin={2} />
  ;<Component margin="L" />
  ;<Component margin={['L']} />
  ;<Component margin={['L', 'L/2', 3]} />
  ;<Component margin="0" />
  ;<Component margin={{ test: 2, test2: 'L', test3: [2] }} />
  ;<Component marginTop={2} />
  ;<Component marginTop="2" />
  ;<Component marginTop="L" />
  ;<Component marginTop={{ test: 2, test2: 'L' }} />
  ;<Component marginRight={2} />
  ;<Component marginRight="2" />
  ;<Component marginRight="L" />
  ;<Component marginRight={{ test: 2, test2: 'L' }} />
  ;<Component marginBottom={2} />
  ;<Component marginBottom="2" />
  ;<Component marginBottom="L" />
  ;<Component marginBottom={{ test: 2, test2: 'L' }} />
  ;<Component marginLeft={2} />
  ;<Component marginLeft="2" />
  ;<Component marginLeft="L" />
  ;<Component marginLeft={{ test: 2, test2: 'L' }} />
  ;<Component padding={2} />
  ;<Component padding="L" />
  ;<Component padding={['L']} />
  ;<Component padding={['L', 'L/2', 3]} />
  ;<Component padding="0" />
  ;<Component padding={{ test: 2, test2: 'L', test3: [2] }} />
  ;<Component paddingTop={2} />
  ;<Component paddingTop="2" />
  ;<Component paddingTop="L" />
  ;<Component paddingTop={{ test: 2, test2: 'L' }} />
  ;<Component paddingRight={2} />
  ;<Component paddingRight="2" />
  ;<Component paddingRight="L" />
  ;<Component paddingRight={{ test: 2, test2: 'L' }} />
  ;<Component paddingBottom={2} />
  ;<Component paddingBottom="2" />
  ;<Component paddingBottom="L" />
  ;<Component paddingBottom={{ test: 2, test2: 'L' }} />
  ;<Component paddingLeft={2} />
  ;<Component paddingLeft="2" />
  ;<Component paddingLeft="L" />
  ;<Component paddingLeft={{ test: 2, test2: 'L' }} />
  ;<Component show="small" padding={{ small: 'L', default: 'S' }} />
  ;<Component align="start" />
  ;<Component align="center" />
  ;<Component align="end" />
  ;<Component align={{ test: 'end' }} />
  ;<Component justify="start" />
  ;<Component justify="center" />
  ;<Component justify="end" />
  ;<Component justify={{ test: 'end' }} />
  ;<Component size={1} />
  ;<Component size="2" />
  ;<Component size={{ test: 1, test2: '2' }} />
})

// invalid type permutations
components.forEach(Component => {
  // @ts-ignore
  ;<Component className={3} />
  // @ts-ignore
  ;<Component ref={3} />
  // @ts-ignore
  ;<Component base={3} />
  // @ts-ignore
  ;<Component base="4" />
  // @ts-ignore
  ;<Component align="invalid" />
  // @ts-ignore
  ;<Component align={{ test: 'invalid' }} />
  // @ts-ignore
  ;<Component justify={3} />
  // @ts-ignore
  ;<Component justify="invalid" />
  // @ts-ignore
  ;<Component justify={{ test: 'invalid' }} />
  // @ts-ignore
  ;<Component size={() => null} />
  // @ts-ignore
  ;<Component size={null} />
  // @ts-ignore
  ;<Component size={{ test: null, test2: {} }} />
})
