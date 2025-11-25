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
  damagePerShot: 0,
  autoShotsPerSecond: 1,
  upgrades: [],

  canionPrice: 15,
  lanzamisilesPrice: 30,
  arbolPrice: 50,

  canionDamagePerShot: 2,
  lanzamisilesDamagePerShot: 5,
  arbolDamagePerShot: 10,
}

function App() {

  function canionReducer(state, action) {

    let outputState = state;

    if (action.type == 'CLICK_SHOOT') {
      outputState = { ...state, damageDealt: state.damageDealt + state.damagePerShot }
    }
    else if (action.type == 'BUY_CANION' && state.caramels >= state.canionPrice) {
      outputState =
      {
        ...state,
        caramels: state.caramels - state.canionPrice,
        damagePerShot: state.damagePerShot + state.canionDamagePerShot,
        upgrades: [...state.upgrades, 'canion'],
      }
    }
    else if (action.type == 'BUY_LANZAMISILES' && state.caramels >= state.lanzamisilesPrice) {
      outputState =
      {
        ...state,
        caramels: state.caramels - state.lanzamisilesPrice,
        damagePerShot: state.damagePerShot + state.lanzamisilesDamagePerShot,
        upgrades: [...state.upgrades, 'lanzamisiles'],
      }
    }
    else if (action.type == 'BUY_ARBOL' && state.caramels >= state.arbolPrice) {
      outputState =
      {
        ...state,
        caramels: state.caramels - state.arbolPrice,
        damagePerShot: state.damagePerShot + state.arbolDamagePerShot,
        upgrades: [...state.upgrades, 'arbol'],
      }
    }
    else if (action.type == 'AUTO_SHOOT') {
      outputState =
      {
        ...state,
        danioOleada: state.danioOleada + state.autoShotsPerSecond * state.damagePerShot
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
          <h3 className='col-12'>Daño de oleada</h3>
          <p>{state.damageDealt} / {state.waveGoal}</p>
        </div>
        <div className='row justify-content-center'>
          <h3 className='col-12'>Caramelos</h3>
          <p>{state.caramels}</p>
        </div>
        <div className='row justify-content-center'>
          <h3 className='col-12'>Oleada</h3>
          <p>{Math.floor(state.damageDealt / state.waveGoal) + 1}</p>
        </div>
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 className='col-12'></h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_SHOOT' })}>
            <img className='img-fluid' src={torre} />
          </button>
        </div>
        <div className='row justify-content-center'>
          <h3 className='col-12 mt-4'>Mejoras de daño</h3>
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
