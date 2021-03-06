import './style.css';
import { useStore } from 'effector-react';
import { resetTuple } from '../../model/events'
import { $cardsList, $toggledTuple, $removedCards } from '../../model/store';
import { Card } from '../card'
import { useEffect } from 'react';

export const Playground = () => {
  const cards = useStore($cardsList)
  const tuple = useStore($toggledTuple)
  const removedCards: number[] = useStore($removedCards)

  const isToggled = (index: number) => {
    if (index === tuple[0] || index === tuple[1]) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (tuple.length === 2) {
      setTimeout(() => resetTuple(), 1000)
    }
  }, [tuple])

  return (
    <div className='cards-list'>
      {
        cards.map((value, index) => {
          return (
            <Card 
              value={value} 
              index={index}
              key={index}
              isToggled={isToggled(index)}
              isRemoved={removedCards.includes(value)}
            />
          )
        })
      }
    </div>
  )
}