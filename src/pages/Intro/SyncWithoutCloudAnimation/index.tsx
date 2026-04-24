import React, { useMemo } from 'react'
import { Alignment, Fit, Layout, RuntimeLoader } from '@rive-app/webgl2'
import { useRive } from '@rive-app/react-webgl2'

RuntimeLoader.setWasmUrl('assets/rive/rive_webgl2.wasm')

export const SyncWithoutCloudAnimation = (): React.ReactElement => {
  const riveParams = useMemo(
    () => ({
      src: 'assets/animations/sync_without_the_cloud_animation.riv',
      stateMachines: ['State Machine 1'],
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center
      }),
      autoplay: true
    }),
    []
  )

  const { RiveComponent } = useRive(riveParams)

  return <RiveComponent style={{ width: '100%', height: '100%' }} />
}
