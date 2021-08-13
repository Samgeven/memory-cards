import './style.css';
import { $attempts } from '../../model/store'
import { useStore } from 'effector-react';
import { resetGame } from '../../model/events';

export const ScoreScreen = () => {
  const attempts = useStore($attempts)

  return (
    <div className="score">
      <div className='score__title'>Congrats! You've beaten the game in {attempts} attempts!</div>
      <button onClick={() => resetGame()}>PLAY AGAIN</button>
    </div>
  );
}