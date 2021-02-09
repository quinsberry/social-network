import { TAppState } from '@typings/types'
import { createSelectorHook } from 'react-redux'

export const useTypedSelector = createSelectorHook<TAppState>()
