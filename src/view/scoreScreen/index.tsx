import './style.css';
import { $attempts } from '../../model/store'
import { useStore } from 'effector-react';
import { resetGame } from '../../model/events';
import { useEffect } from 'react';

let scoreScreenClass = 'score'

export const ScoreScreen = () => {
  const attempts = useStore($attempts)

  useEffect(() => {
    scoreScreenClass = 'score score--loaded'
    return () => {
      scoreScreenClass = 'score'
    }
  }, [])

  return (
    <div className={scoreScreenClass}>
      <img className='score__img' src='assets/trophy.svg' alt='winner!'/>
      <div className='score__title'>Congrats! You've beaten the game in {attempts} attempts!</div>
      <button className='score__btn' onClick={() => resetGame()}>PLAY AGAIN</button>
    </div>
  );
}