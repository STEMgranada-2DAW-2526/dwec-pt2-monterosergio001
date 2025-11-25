import { useReducer, useEffect } from 'react'
import './App.css'
import torre from './assets/torre.png'
import canion from './assets/canion_turron.png'
import lanzamisiles from './assets/reno_lanza_cohetes.png'
import arbol from './assets/arbol_laser.png'

const INITIAL_STATE = {
  damageDealt: 0,
  waveGoal: 100,
  caramels: 20,
  damagePerShot: 1,
  autoShotsPerSecond: 1,
  upgrades: [],
}

function App() {

  function canionReducer(state, action) {

    let outputState = state;

    if (action.type == 'CLICK_SHOOT') {
      outputState = { ...state, danioOleada: state.danioOleada + state.danioPorClick}
    }
    else if (action.type == 'BUY_MULTIPLIER' && state.cookies >= state.multiplierPrice) {
      outputState =
      {
        ...state,
        clickMultiplier: state.clickMultiplier + 1,
        cookies: state.cookies - state.multiplierPrice,
        multiplierPrice: Math.round(state.multiplierPrice * state.multiplierPriceIncrement)
      }
    }
    else if (action.type == 'AUTO_SHOOT') {
      outputState =
      {
        ...state,
        danioOleada: state.danioOleada + ,
      }
    }

    return outputState;

  }

  const [state, dispatch] = useReducer(canionReducer, INITIAL_STATE)

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch({ type: 'AUTO_SHOOT' })
    }, 1000);

    return () => clearInterval(timer)
  }, []);

  return (
    <>
      <div>
        <h1 className='text-center'>Defensor Polo Norte</h1>
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 className='col-12'></h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_SHOOT' })}>
            <img className='img-fluid' src={torre} />
          </button>
        </div>
        <div className='row justify-content-center'>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_CANION' })}>
            <img className='img-fluid' src={canion} />
          </button>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_LANZAMISILES' })}>
            <img className='img-fluid' src={lanzamisiles} />
          </button>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_ARBOL' })}>
            <img className='img-fluid' src={arbol} />
          </button>
        </div>
      </div>
    </>
  )
}

export default App
