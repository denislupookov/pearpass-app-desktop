import { useMemo } from 'react'

// @ts-expect-error - package does not ship declarations in this repo
import { formatDate } from '@tetherto/pear-apps-utils-date'
import {
  Button,
  ListItem,
  PageHeader,
  Text,
  useTheme
} from '@tetherto/pearpass-lib-ui-kit'
import {
  Add,
  Devices,
  LaptopMac,
  LaptopWindows,
  PhoneIphone,
  Tablet
} from '@tetherto/pearpass-lib-ui-kit/icons'
import { useVault } from '@tetherto/pearpass-lib-vault'

import { AddDeviceModalContentV2 } from '../../../../containers/Modal/AddDeviceModalContentV2/AddDeviceModalContentV2'
import { useModal } from '../../../../context/ModalContext'
import { useTranslation } from '../../../../hooks/useTranslation'
import { createStyles } from './styles'

const TEST_IDS = {
  root: 'settings-your-devices',
  deviceSection: 'settings-card-your-devices',
  extensionSection: 'settings-card-browser-extension-connections',
  addDeviceButton: 'settings-add-device-button',
  extensionActionButton: 'settings-browser-extension-action'
} as const

type VaultDevice = {
  id?: string
  name?: string
  createdAt?: string | number | Date
}

const getDeviceDisplayName = (
  deviceName: string | undefined,
  t: (value: string) => string
) => {
  if (!deviceName) {
    return t('Unknown Device')
  }

  const lowerName = deviceName.toLowerCase()

  if (lowerName.startsWith('ios')) {
    return t('iPhone')
  }

  if (lowerName.startsWith('android')) {
    return t('Android')
  }

  return deviceName
}

const getDeviceIcon = (deviceName?: string) => {
  if (!deviceName) {
    return Devices
  }

  const lowerName = deviceName.toLowerCase()

  if (lowerName.startsWith('ios') || lowerName.includes('iphone')) {
    return PhoneIphone
  }

  if (lowerName.startsWith('android')) {
    return PhoneIphone
  }

  if (lowerName.includes('ipad') || lowerName.includes('tablet')) {
    return Tablet
  }

  if (
    lowerName.includes('mac') ||
    lowerName.includes('imac') ||
    lowerName.includes('darwin') ||
    lowerName.includes('macbook')
  ) {
    return LaptopMac
  }

  if (lowerName.includes('windows')) {
    return LaptopWindows
  }

  return Devices
}

export const YourDevicesContent = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const styles = createStyles(theme.colors)
  const { setModal } = useModal()
  const { data } = useVault()
  const vaultData = data as { devices?: VaultDevice[] } | undefined

  const devices = useMemo(
    () => (Array.isArray(vaultData?.devices) ? vaultData.devices : []),
    [vaultData]
  )

  const handleAddDevice = () => {
    setModal(<AddDeviceModalContentV2 />)
  }

  return (
    <div data-testid={TEST_IDS.root} style={styles.root}>
      <PageHeader
        as="h1"
        title={t('Your Devices')}
        subtitle={t(
          'Devices listed here stay in sync. Changes made on one device update across all your vaults on every synced device.'
        )}
      />

      <div style={styles.sectionHeading}>
        <Text variant="caption" color={theme.colors.colorTextSecondary}>
          {t('Synced Personal Devices')}
        </Text>
      </div>

      <div data-testid={TEST_IDS.deviceSection} style={styles.sectionCard}>
        <div style={styles.list}>
          {devices.map((device, index) => {
            console.log('device', device)
            const deviceName = getDeviceDisplayName(device.name, t)
            const DeviceIcon = getDeviceIcon(device.name)
            const createdAt = device.createdAt
              ? formatDate(device.createdAt, 'dd-mmm-yyyy', ' ')
              : null

            return (
              <div
                key={device.id ?? `${deviceName}-${index}`}
                style={
                  index < devices.length - 1 ? styles.listItemBorder : undefined
                }
              >
                <ListItem
                  key={device.id}
                  icon={
                    <div style={styles.iconWrap}>
                      <DeviceIcon
                        width={16}
                        height={16}
                        color={theme.colors.colorAccentActive}
                      />
                    </div>
                  }
                  title={deviceName}
                  subtitle={`${t('Paired on')} ${createdAt}`}
                  testID={`settings-device-item-${device.id ?? index}`}
                />
              </div>
            )
          })}
        </div>

        <div style={styles.footer}>
          <Button
            variant="tertiary"
            size="small"
            onClick={handleAddDevice}
            iconBefore={<Add width={16} height={16} />}
            data-testid={TEST_IDS.addDeviceButton}
          >
            {t('Sync Another Personal Device')}
          </Button>
        </div>
      </div>
    </div>
  )
}
