import { forward, Store } from 'effector'
import { domain } from './domain'
import { resetTuple, toggle, setRemovedCard, countAttempt, resetGame } from './events'
import { GAME_CONFIG } from '../data'

type toggledTuple = number[] | []
type removedCards = number[] | []

const INIT_CARDS_LIST = (quantity: number) => {
  const lastCardValue = quantity / 2
  let cardTuples: Array<number>[] = []
  
  for (let i = 0; i < lastCardValue; i++) {
    const tuple = [i, i]
    cardTuples = [...cardTuples, tuple]
  }

  return cardTuples.flat().sort(() => Math.random() - 0.5)
}

const INIT_TOGGLED_TUPLE: toggledTuple = []
const INIT_REMOVED_CARDS: removedCards = []

export const $cardsList: Store<number[]> = domain.createStore(INIT_CARDS_LIST(GAME_CONFIG.CARDS_QUANTITY))
export const $toggledTuple: Store<toggledTuple> = domain.createStore(INIT_TOGGLED_TUPLE)

let cardsListExtracted = $cardsList.getState()

export const $toggledTupleValues = $toggledTuple.map(state => state.map(el => cardsListExtracted[el]))
export const $removedCards: Store<removedCards> = domain.createStore(INIT_REMOVED_CARDS)
export const $attempts: Store<number> = domain.createStore(0)
export const $gameOver: Store<boolean> = $removedCards.map(store => store.length > GAME_CONFIG.CARDS_QUANTITY / 2 - 1)

$toggledTuple.on(toggle, (state, value) => [...state, value])
$toggledTuple.on(resetTuple, () => [])

$cardsList.on(resetGame, (state) => state = INIT_CARDS_LIST(GAME_CONFIG.CARDS_QUANTITY))

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

resetGame.watch(() => {
  cardsListExtracted = $cardsList.getState()
})