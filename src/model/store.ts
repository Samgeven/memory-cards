import { forward, Store } from 'effector'
import { domain } from './domain'
import { resetTuple, toggle, setRemovedCard, countAttempt, resetGame } from './events'

type toggledTuple = number[] | []
type removedCards = number[] | []

const INIT_CARDS_LIST = [0, 1, 6, 4, 1, 4, 0, 5, 3, 3, 5, 6]
const INIT_TOGGLED_TUPLE: toggledTuple = []
const INIT_REMOVED_CARDS: removedCards = []

export const $cardsList: Store<number[]> = domain.createStore(INIT_CARDS_LIST)
export const $toggledTuple: Store<toggledTuple> = domain.createStore(INIT_TOGGLED_TUPLE)
export const $toggledTupleValues = $toggledTuple.map(state => state.map(el => INIT_CARDS_LIST[el]))
export const $removedCards: Store<removedCards> = domain.createStore(INIT_REMOVED_CARDS)
export const $attempts: Store<number> = domain.createStore(0)
export const $gameOver: Store<boolean> = $removedCards.map(store => store.length > 5)

$toggledTuple.on(toggle, (state, value) => [...state, value])
$toggledTuple.on(resetTuple, () => [])

$removedCards.on(setRemovedCard, (state, value) => [...state, value])

$attempts.on(countAttempt, state => state + 1)

$toggledTupleValues.watch(store => {
  if (store.length === 2 && store[0] === store[1]) {
    setTimeout(() => {
      setRemovedCard(store[0])
    }, 500)
  }
})

// resetting a pair of cards results in $attempts incrementing
forward({from: resetTuple, to: countAttempt})

$removedCards.reset(resetGame)
$attempts.reset(resetGame)