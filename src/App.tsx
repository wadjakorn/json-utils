import { useState } from 'react'
import './App.css'

function App() {
  const [result, setResult] = useState('')
  const [textInput, setTextInput] = useState('')
  const [alert, setAlert] = useState('')
  const [actionName, setActionName] = useState('') 
  const change = (e: string) => {
    setTextInput(e.trim() ?? '')
    setAlert('')
  }
  const stringify = () => {
    setResult(JSON.stringify(textInput))
    setActionName('Stringify')
  }
  const parse = () => {
    try {
      setResult(JSON.parse(textInput))
      setActionName('Parse')
    } catch(err) {
      setAlert('invalid string!')
      setResult('')
    }
  }
  return (
    <div className="App">
      <h1>JsoN UtilS</h1>
      <div className="card">
        <textarea className='input' onChange={(e) => change(e.target.value)} ></textarea>
        <br/>
        <p className='alert-text'>{alert}</p>
      </div> 
      <div className='action-btn'>
        <button onClick={stringify}>stringify</button>
        <button onClick={parse}>parse</button>
      </div>
      <div className="card-left">
        <h2>{actionName} Results</h2>
        <br/>
        <textarea className='result' readOnly value={result}></textarea>
      </div>
      <p className="read-the-docs">
        Check out <a href='https://github.com/wadjakorn/json-utils'>Wadjakorn Github</a>
      </p>
    </div>
  )
}

export default App
