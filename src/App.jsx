import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [lenght, setLenght] = useState(8)
  const [numberallowed, setNumberAllowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState('')

  // using useRef to store the password
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberallowed) str += '0123456789'
    if (charallowed) str += '!@#$%^&*(){}[]-_+='

    for (let i = 0; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [lenght, numberallowed, charallowed, setPassword])

  const copyToClipboard= useCallback(() =>{
    window.navigator.clipboard.writeText(password)
  }, [password])

  
  useEffect(()=>{
    passwordGenerator()
    },[lenght,numberallowed,charallowed,passwordGenerator]
  )
  return (
    <>
      <div className="w-screen max-w-4xl mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center px-2 py-2 my-3'>Password Generator</h1>
        <div className="flex items-center gap-2 shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
          value={password}
          className='outline-none w-full py-2 px-3 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300'
          placeholder='password'
          readOnly
          ref={passwordRef} />
          <button className='outline-none bg-blue-700 text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-800 hover:shadow-lg transition-all' 
          onClick={copyToClipboard}>
            copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input 
            type="range" 
            min={8}
            max={20} 
            value={lenght}
            className='cursor-pointer'
            onChange={(e) => setLenght(e.target.value)}
            />
            <label htmlFor="">lenght:{lenght}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberallowed}
            id="numberInput"
            onChange={()=>
              setNumberAllowed((prev)=> !prev)
            } />
            <label htmlFor='numberInput'>Allow Number</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charallowed}
            id="characterInput"
            onChange={()=>
              setCharallowed((prev)=> !prev)
            } />
            <label htmlFor='characterInput'>Allow character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
