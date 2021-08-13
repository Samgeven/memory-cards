import './style.css';
import { toggle } from '../../model/events'
import { $toggledTuple } from '../../model/store'
import { useStore } from 'effector-react'

type cardProps = {
  value: number,
  index: number,
  cardClass: string,
  isRemoved: boolean,
}

const removedCardStyle = {
  transform: 'scale(0.0001)',
}

export const Card = ({value, index, cardClass, isRemoved}: cardProps): JSX.Element => {
  const tuple = useStore($toggledTuple)

  return (
    <div className={cardClass} style={isRemoved ? removedCardStyle : {}} onClick={() => {
      if (tuple.length === 2 || isRemoved) return
      toggle(index)
    }}>
      <img className='card__img' src={`assets/${value}.svg`} alt=""/>
    </div>
  );
}