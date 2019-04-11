import * as React from 'react'
import { render } from 'react-testing-library'
import useGrid from './index'
import { GridProps } from '../types'

function RenderGrid({
  children,
  ...props
}: GridProps & {
  children: jest.Mocked<any>
  passThrough?: string
}) {
  const [shouldRender, { passThrough, ...resolvedProps }] = useGrid(props)

  return shouldRender ? (
    <div {...resolvedProps}>{children({ passThrough, ...resolvedProps })}</div>
  ) : null
}

describe('useGrid', () => {
  let children: jest.Mocked<any>

  beforeEach(() => {
    children = jest.fn(() => null)
  })

  it('should resolve multi resolution margin prop to a single one', () => {
    render(
      <RenderGrid margin={{ default: '0', small: '1' }}>{children}</RenderGrid>
    )

    expect(children.mock.calls[0][0]).toMatchObject({
      style: expect.objectContaining({
        borderBottomWidth: 0,
        borderLeftWidth: 0,
      }),
    })
  })

  it('should resolve multi resolution direction prop to a single one', () => {
    const { container } = render(
      <RenderGrid direction={{ default: 'row', small: 'column' }}>
        {children}
      </RenderGrid>
    )
    const child = (container || {}).firstChild as any
    const flexDirection = (window.getComputedStyle(child) as any)[
      'flex-direction'
    ]

    expect(flexDirection).toBe('row')
  })

  it('should return false as first item when the component should not be rendered', () => {
    const { container } = render(
      <RenderGrid show="small">{children}</RenderGrid>
    )
    expect(container.firstChild).toBeNull()
  })

  it('should return true as first item when the component should be rendered', () => {
    const { container } = render(
      <RenderGrid show="default">{children}</RenderGrid>
    )
    expect(container.firstChild).not.toBeNull()
  })

  it('should pass through unrelated props', () => {
    render(<RenderGrid passThrough="meow">{children}</RenderGrid>)
    expect(children).toHaveBeenCalledWith(
      expect.objectContaining({ passThrough: 'meow' })
    )
  })

  it('should preserve input className', () => {
    render(<RenderGrid className="woof">{children}</RenderGrid>)

    expect(children.mock.calls[0][0].className).toContain('woof')
  })

  it('should preserve style props passed', () => {
    render(
      <RenderGrid style={{ background: 'rebeccapurple' }}>
        {children}
      </RenderGrid>
    )

    expect(children.mock.calls[0][0].style).toMatchObject({
      background: 'rebeccapurple',
    })
  })

  it('should add grid specific classes for size prop', () => {
    render(<RenderGrid size={1}>{children}</RenderGrid>)
    render(<RenderGrid size={2}>{children}</RenderGrid>)

    const [[sizeOne], [sizeTwo]] = children.mock.calls

    expect(sizeOne.className).not.toEqual(sizeTwo.className)
  })
})
