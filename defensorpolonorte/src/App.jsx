import { useState, useEffect } from 'react'
import './App.css'
import { useReducer } from 'react'


function App() {

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 className='col-12'></h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_DISPARAR' })}>
            <img className='img-fluid' src={} />
          </button>
        </div>
        <div className='row justify-content-center'>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_CANION' })}>
            <img className='img-fluid' src={} />
            x{state.cursorCount}
          </button>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_LANZAMISILES' })}>
            <img className='img-fluid' src={} />
            x{state.clickMultiplier}
          </button>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_ARBOL' })}>
            <img className='img-fluid' src={} />
            x{state.grandmaCount}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
