import './style.css';
import { toggle } from '../../model/events'
import { $toggledTuple } from '../../model/store'
import { useStore } from 'effector-react'

type cardProps = {
  value: number,
  index: number,
  isToggled: boolean,
  isRemoved: boolean,
}

const removedCardStyle = {
  transform: 'scale(0.0001)',
}

export const Card = ({value, index, isToggled, isRemoved}: cardProps): JSX.Element => {
  const tuple = useStore($toggledTuple)

  return (
    <div 
      className={isToggled ? 'card card--toggled' : 'card'} 
      style={isRemoved ? removedCardStyle : {}} 
      onClick={() => {
        if (tuple.length === 2 || isRemoved || isToggled) return
        toggle(index)
      }
    }>
      <img className='card__img' src={`assets/${value}.svg`} alt=""/>
    </div>
  );
}