import {init, SessionStrategy} from '@bitdrift/react-native'
import {Statsig} from 'statsig-react-native-expo'
export {debug, error, info, warn} from '@bitdrift/react-native'

import {initPromise} from './statsig/statsig'

const BITDRIFT_API_KEY = process.env.BITDRIFT_API_KEY

initPromise.then(() => {
  let isEnabled = false
  try {
    if (Statsig.checkGate('enable_bitdrift')) {
      isEnabled = true
    }
  } catch (e) {
    // Statsig may complain about it being called too early.
  }
  if (isEnabled && BITDRIFT_API_KEY) {
    init(BITDRIFT_API_KEY, SessionStrategy.Activity, {
      url: 'https://api-bsky.bitdrift.io',
    })
  }
})
