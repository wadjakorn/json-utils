import { SetStateAction, useState } from 'react'
import './App.css'

type Direction = 1|-1
const defaultDirection: Direction = 1
type ProcessFunc = (input: string) => string

const sampleJson = '{"message": "hi"}'

function App() {
  
  const [leftText, setLeftText] = useState(sampleJson)
  const [rightText, setRightText] = useState('')
  const [alert, setAlert] = useState('')
  const [actionName, setActionName] = useState('Choose action')
  const [sort, setSort] = useState('asc')
  const [direction, setDirection] = useState(defaultDirection)

  const resultSetter = (processFunc: ProcessFunc) => {
    if (direction===1) {
      setRightText(processFunc(leftText))
    } else {
      setLeftText(processFunc(rightText))
    }
  }

  const validate = () => {
    if (leftText === '' && rightText === '') {
      setAlert('please fill at least one side!')
      return false
    } else if (leftText === '' && direction === 1) {
      setAlert('please fill left side or change direction!')
      return false
    } else if (rightText === '' && direction === -1) {
      setAlert('please fill right side or change direction!')
      return false
    }
    return true
  }

  const changeLeft = (e: string) => {
    setLeftText(e.trim() ?? '')
    setAlert('')
  }

  const changeRight = (e: string) => {
    setRightText(e.trim() ?? '')
    setAlert('')
  }

  const format = () => {
    if (!validate()) return
    resultSetter(function (input: string) {
      return formatIndent(input);
    })
    setActionName('format')
  }

  const minify = () => {
    if (!validate()) return
    resultSetter(function (input: string) {
      return JSON.stringify(JSON.parse(input));
    })
    setActionName('minify')
  }

  const stringify = () => {
    if (!validate()) return
    resultSetter(function (input: string) {
      return JSON.stringify(JSON.parse(JSON.stringify(input)));
    })
    setActionName('stringify')
  }

  const parse = () => {
    if (!validate()) return
    try {
      resultSetter(function (input: string) {
        return JSON.parse(input);
      })
      setActionName('parse')
    } catch(err) {
      setAlert('invalid string!')
      resultSetter(function (input: string) {
        return JSON.parse('');
      })
    }
  }

  const sortKey = (by: string) => {
    if (!validate()) return
    setSort(by)
    setActionName('sortKey')

    resultSetter(function (input: string) {
      const parsed = JSON.parse(input)
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
      return formatIndent(JSON.stringify(sorted))
    })
  }

  const toggleDirection = () => {
    if (direction===1) {
      setDirection(-1)
    } else {
      setDirection(1)
    }
  }

  function formatIndent(input: string) {
    return JSON.stringify(JSON.parse(input), undefined, 4);
  }

  return (
    <div className="App">
      <h1>JsoN UtilS</h1>
      <p className='alert-text'>{alert}</p>

      <div className="main-container flex-horizontal" >
        <div className="card-left card">
          <textarea className='json-textarea' onChange={(e) => changeLeft(e.target.value)} value={leftText}></textarea>
        </div> 

        <div className='action-wrapper flex-vertical'>
          <button className={`action-button ${actionName === 'direction' ? 'active':''}`} onClick={() => toggleDirection()}>Toggle direction</button>

          <h2>{`${direction === -1 ? '<<< ' :'' }${actionName}${direction === 1 ? ' >>>' : ''}`}</h2>
          <button className='action-button' onClick={format}>format</button>
          <button className='action-button' onClick={minify}>minify</button>
          <button className='action-button' onClick={stringify}>stringify</button>
          <button className='action-button' onClick={parse}>parse</button>
          <button className='action-button' onClick={() => sortKey('asc')}>sortKey</button>
          {
            actionName === 'sortKey' &&
            <div className='sub-action-btn'>
              <button className={sort === 'asc' ? 'active':''} onClick={() => sortKey('asc')}>ASC</button>
              <button className={sort === 'desc' ? 'active':''} onClick={() => sortKey('desc')}>DESC</button>
            </div>
          }
        </div>

        <div className="card-right card">
          <textarea className='json-textarea' onChange={(e) => changeRight(e.target.value)} value={rightText}></textarea>
        </div>
      </div>
      

      <p className="read-the-docs">
        Check out <a href='https://github.com/wadjakorn/json-utils'>Wadjakorn Github</a>
      </p>
    </div>
  )
}

export default App
