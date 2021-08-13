import { useStore } from 'effector-react';
import './App.css';
import { $attempts, $gameOver } from './model/store';
import { Playground } from './view/playground'
import { ScoreScreen } from './view/scoreScreen'

function App() {
  const attempts = useStore($attempts)
  const gameIsOver = useStore($gameOver)

  return (
    <div className="app">
      <h1 className='app__title'>React + effector memory card game</h1>
      { !gameIsOver && <div className='app__counter'>Attempt counter: {attempts}</div> }
      { !gameIsOver && <Playground /> }
      { gameIsOver && <ScoreScreen /> }
    </div>
  );
}

export default App;
