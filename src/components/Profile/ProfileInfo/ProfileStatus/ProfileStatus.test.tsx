import React from 'react'
import { create, act } from 'react-test-renderer'

import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
  const mockUpdateStatus = (text: string) => {
    console.log(text)
  }

  test('Status should be in the props', () => {
    let component = create(
      <ProfileStatus status={'testing'} updateStatus={mockUpdateStatus} isOwner={true} />,
    )
    const tree = component.toTree()

    expect(tree!.props.status).toBe('testing')
  })

  test('After creating <span> should be displayed', () => {
    let component = create(
      <ProfileStatus status={'testing'} updateStatus={mockUpdateStatus} isOwner={true} />,
    )
    const root = component.root

    const span = root.findByType('span')
    expect(span.children.length).not.toBeNull()
  })

  test('After creating <input> should not be displayed', () => {
    let component = create(
      <ProfileStatus status={'testing'} updateStatus={mockUpdateStatus} isOwner={true} />,
    )
    const root = component.root

    expect(() => {
      const input = root.findByType('input')
    }).toThrow()
  })

  test('After creating <span> should be displayed with correct status', () => {
    let component = create(
      <ProfileStatus status={'testing'} updateStatus={mockUpdateStatus} isOwner={true} />,
    )
    const root = component.root

    const span = root.findByType('span')
    expect(span.children[0]).toBe('testing')
  })

  test('Input should be displayed in editMode instead of span', () => {
    let component = create(
      <ProfileStatus status={'testing'} updateStatus={mockUpdateStatus} isOwner={true} />,
    )
    const root = component.root

    const span = root.findByType('span')
    act(() => {
      span.props.onDoubleClick()
    })
    const input = root.findByType('input')
    expect(input.props.value).toBe('testing')
  })
})
