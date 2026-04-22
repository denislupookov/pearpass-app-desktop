/// <reference types="@testing-library/jest-dom" />

import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { YourDevicesContent } from './index'
;(globalThis as { React?: typeof React }).React = React

jest.mock('../../../../hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (str: string) => str
  })
}))

const mockSetModal = jest.fn()
jest.mock('../../../../context/ModalContext', () => ({
  useModal: () => ({
    setModal: mockSetModal
  })
}))

let mockVaultData: {
  devices?: Array<{ id?: string; name?: string; createdAt?: number }>
} = {
  devices: []
}

jest.mock('@tetherto/pearpass-lib-vault', () => ({
  useVault: () => ({
    data: mockVaultData
  })
}))

jest.mock('@tetherto/pear-apps-utils-date', () => ({
  formatDate: () => '10 Jan 2026'
}))

jest.mock(
  '../../../../containers/Modal/AddDeviceModalContentV2/AddDeviceModalContentV2',
  () => ({
    AddDeviceModalContentV2: () => <div data-testid="add-device-modal" />
  })
)

jest.mock('./styles', () => ({
  createStyles: () => ({
    root: {},
    sectionHeading: {},
    sectionCard: {},
    list: {},
    listItemBorder: {},
    iconWrap: {},
    footer: {}
  })
}))

const mockTheme = {
  theme: {
    colors: {
      colorTextSecondary: '#888',
      colorTextPrimary: '#fff',
      colorAccentActive: '#22a'
    }
  }
}

jest.mock('@tetherto/pearpass-lib-ui-kit', () => ({
  useTheme: () => mockTheme,
  PageHeader: ({ title }: { title: React.ReactNode }) => <h1>{title}</h1>,
  Text: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ListItem: (props: {
    title?: React.ReactNode
    subtitle?: React.ReactNode
    testID?: string
  }) => (
    <div data-testid={props.testID}>
      <div>{props.title}</div>
      <div>{props.subtitle}</div>
    </div>
  ),
  Button: (props: {
    children?: React.ReactNode
    onClick?: () => void
    'data-testid'?: string
  }) => (
    <button
      type="button"
      data-testid={props['data-testid']}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}))

jest.mock('@tetherto/pearpass-lib-ui-kit/icons', () => ({
  Add: () => null,
  Devices: () => null,
  LaptopMac: () => null,
  LaptopWindows: () => null,
  PhoneIphone: () => null,
  Tablet: () => null
}))

describe('YourDevicesContent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockVaultData = {
      devices: [
        { id: 'ios-1', name: 'iOS 18', createdAt: 1 },
        { id: 'android-1', name: 'Android Pixel', createdAt: 2 },
        { id: 'unknown-1', createdAt: 3 }
      ]
    }
  })

  it('renders devices and normalized display names', () => {
    render(<YourDevicesContent />)

    expect(
      screen.getByRole('heading', { name: 'Your Devices' })
    ).toBeInTheDocument()
    expect(screen.getByTestId('settings-card-your-devices')).toBeInTheDocument()

    expect(screen.getByText('iPhone')).toBeInTheDocument()
    expect(screen.getByText('Android')).toBeInTheDocument()
    expect(screen.getByText('Unknown Device')).toBeInTheDocument()
    expect(screen.getAllByText('Paired on 10 Jan 2026')).toHaveLength(3)
  })

  it('opens add-device modal when button is clicked', () => {
    render(<YourDevicesContent />)

    fireEvent.click(screen.getByTestId('settings-add-device-button'))

    expect(mockSetModal).toHaveBeenCalledTimes(1)
  })
})
