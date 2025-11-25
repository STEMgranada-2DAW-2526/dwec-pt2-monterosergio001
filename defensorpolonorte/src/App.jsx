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

  canionPrice: 15,
  lanzamisilesPrice: 30,
  arbolPrice: 50,

  canionDamagePerShot: 1,
  lanzamisilesDamagePerShot: 4,
  arbolDamagePerShot: 9,

  oleadas: 1,
}

function App() {

  function canionReducer(state, action) {

    let outputState = state;

    if (action.type == 'CLICK_SHOOT') {
      outputState = { ...state, damageDealt: state.damageDealt + state.damagePerShot }
      if (outputState.damageDealt >= outputState.waveGoal) {
        outputState =
        {
          ...outputState,
          damageDealt: 0,
          waveGoal: outputState.waveGoal + Math.floor(outputState.waveGoal * 0.1),
          caramels: outputState.caramels + 10,
          oleadas: outputState.oleadas + 1,
        }
      }
    }
    else if (action.type == 'BUY_CANION' && state.caramels >= state.canionPrice) {
      if (!state.upgrades.includes('canion') && !state.upgrades.includes('lanzamisiles') && !state.upgrades.includes('arbol')) {
        outputState =
        {
          ...state,
          caramels: state.caramels - state.canionPrice,
          damagePerShot: state.damagePerShot + state.canionDamagePerShot,
          upgrades: [...state.upgrades, 'canion'],
        }
      }
    }
    else if (action.type == 'BUY_LANZAMISILES' && state.caramels >= state.lanzamisilesPrice) {
      if (!state.upgrades.includes('lanzamisiles') && state.upgrades.includes('canion')) {
        outputState =
        {
          ...state,
          caramels: state.caramels - state.lanzamisilesPrice,
          damagePerShot: state.damagePerShot + state.lanzamisilesDamagePerShot,
          upgrades: [...state.upgrades, 'lanzamisiles'],
        }
      }
    }
    else if (action.type == 'BUY_ARBOL' && state.caramels >= state.arbolPrice) {
      if (!state.upgrades.includes('arbol') && state.upgrades.includes('lanzamisiles')) {
        outputState =
        {
          ...state,
          caramels: state.caramels - state.arbolPrice,
          damagePerShot: state.damagePerShot + state.arbolDamagePerShot,
          upgrades: [...state.upgrades, 'arbol'],
        }
      }
    }
    else if (action.type == 'AUTO_SHOOT') {
      outputState =
      {
        ...state,
        damageDealt: state.damageDealt + state.autoShotsPerSecond * state.damagePerShot,
      }
      if (outputState.damageDealt >= outputState.waveGoal) {
        outputState =
        {
          ...state,
          damageDealt: 0,
          waveGoal: state.waveGoal + Math.floor(outputState.waveGoal * 0.1),
          caramels: state.caramels + 10,
          oleadas: state.oleadas + 1,
        }
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
          <p>{state.oleadas}</p>
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
            <p>+2</p>
            <p>({state.canionPrice})</p>
          </button>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_LANZAMISILES' })}>
            <img className='img-fluid' src={lanzamisiles} />
            <p>+5</p>
            <p>({state.lanzamisilesPrice})</p>
          </button>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_ARBOL' })}>
            <img className='img-fluid' src={arbol} />
            <p>+10</p>
            <p>({state.arbolPrice})</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default App
