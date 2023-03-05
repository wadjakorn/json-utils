import { useState } from 'react'
import './App.css'

function App() {
  const [result, setResult] = useState('')
  const [textInput, setTextInput] = useState('')
  const [alert, setAlert] = useState('')
  const [actionName, setActionName] = useState('') 
  const [sort, setSort] = useState('asc') 
  const change = (e: string) => {
    setTextInput(e.trim() ?? '')
    setAlert('')
  }
  const stringify = () => {
    setResult(JSON.stringify(textInput))
    setActionName('stringify')
  }
  const parse = () => {
    try {
      setResult(JSON.parse(textInput))
      setActionName('parse')
    } catch(err) {
      setAlert('invalid string!')
      setResult('')
    }
  }
  const sortKey = (by: string) => {
    setSort(by)
    const parsed = JSON.parse(textInput)
    const sorted = Object.keys(parsed).sort((a: string,b: string) => {
      const x = b >= a;
      if (sort === 'asc') {
        return x ? 1 : -1
      }
      return x ? -1 : 1
    }).reduce(
      (obj: any, key: string) => { 
        obj[key] = parsed[key as any]; 
        return obj;
      }, 
      {}
    );
    setActionName('sortKey')
    setResult(JSON.stringify(sorted))
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
        <button className={actionName === 'stringify' ? 'active':''} onClick={stringify}>stringify</button>
        <button className={actionName === 'parse' ? 'active':''} onClick={parse}>parse</button>
        <button className={actionName === 'sortKey' ? 'active':''} onClick={() => sortKey('asc')}>sortKey</button>
      </div>
      <div className="card-left">
        <h2>{actionName} Results</h2>
        {
          actionName === 'sortKey' &&
          <div className='sub-action-btn'>
            <button className={sort === 'asc' ? 'active':''} onClick={() => sortKey('asc')}>ASC</button>
            <button className={sort === 'desc' ? 'active':''} onClick={() => sortKey('desc')}>DESC</button>
          </div>
        }
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
