// @flow
import * as React from 'react'
import { Grid } from 'gymnast'
import { colors } from '../../shared'

class Button extends React.Component<*, { counter: number }> {
  state = { counter: 0 }

  onClick = () => this.setState(({ counter }) => ({ counter: counter + 1 }))

  render() {
    const { counter } = this.state

    return (
      <Grid onClick={this.onClick} {...this.props} size={1}>
        {counter}
      </Grid>
    )
  }
}

export default () => (
  <Grid>
    <Grid style={colors.colors1} padding="XL" margin={['L', 0]} show="small">
      <Grid size="auto">Only visible on small screens (&lt; 600px)</Grid>
      <Button />
    </Grid>
    <Grid style={colors.colors2} padding="XL" margin={['L', 0]} show="medium">
      <Grid size="auto">
        Only visible on medium screens (&gt; 600px &amp;&amp; &lt; 900px)
      </Grid>
      <Button />
    </Grid>
    <Grid style={colors.colors3} padding="XL" margin={['L', 0]} show="large">
      <Grid size="auto">Only visible on large screens (&gt; 900px)</Grid>
      <Button />
    </Grid>
    <Grid
      style={colors.colors4}
      padding="XL"
      margin={['L', 0]}
      show={['small', 'medium']}
      size={{ small: 12, medium: 6 }}
    >
      <Grid size="auto">Visible on small and medium screens (&lt; 900px)</Grid>
      <Button />
    </Grid>
    <Grid
      style={colors.colors2}
      padding="XL"
      margin={['L', 0]}
      show={['small', 'large']}
      size={{ small: 12, large: 6 }}
    >
      <Grid size="auto">
        Visible on small and large screens (&lt; 600px &amp;&amp; &gt; 900px)
      </Grid>
      <Button />
    </Grid>
    <Grid
      style={colors.colors1}
      padding="XL"
      margin={['L', 0]}
      show={['medium', 'large']}
      size={{ medium: 6, large: 6 }}
    >
      <Grid size="auto">Visible on medium and large screens (&gt; 600px)</Grid>
      <Button />
    </Grid>
    <Grid
      style={colors.colors3}
      padding="XL"
      margin={['L', 0]}
      size={{ small: 12, medium: 9, large: 6 }}
    >
      <Grid size="auto">Always visible, but changes in size</Grid>
    </Grid>
  </Grid>
)
