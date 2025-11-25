import { useReducer, useEffect } from 'react'
import './App.css'
import torre from './assets/torre.png'
import canion from './assets/canion_turron.png'
import lanzamisiles from './assets/reno_lanza_cohetes.png'
import arbol from './assets/arbol_laser.png'

const INITIAL_STATE = {
  danioOleada: 0,
  danioTotalOleada: 250,

  caramelos: 0,

}

function App() {



  return (
    <>
      <div>
        <h1 className='text-center'>Defensor Polo Norte</h1>
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 className='col-12'></h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_DISPARAR' })}>
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
