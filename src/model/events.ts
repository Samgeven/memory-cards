import type { Event } from 'effector'
import { domain } from './domain'

export const toggle: Event<number> = domain.createEvent('card is being toggled')
export const resetTuple = domain.createEvent('tuple is cleared')
export const setRemovedCard: Event<number> = domain.createEvent('card is being removed')
export const countAttempt = domain.createEvent('Attempt counter is increased')
export const resetGame = domain.createEvent('Game has been reset')