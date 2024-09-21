import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

  const [paswrd, setPswrd] = useState("")
  const [length, setLength] = useState(7)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [btnColor, setBtnColor] = useState('bg-blue-800')
  const [btnText, setBtnText] = useState('COPY')

  const passwordGenerator = useCallback(() => {
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num = "0123456789"
    let sym = "!@#$%^&"

    if (number) {
      str += num      // if number is true, add num to generate password
    }
    if (character) {
      str += sym     // if character is true, add sym to generate password
    }

    for (let i = 1; i < + length; i++) {
      let char = Math.floor(Math.random() * str.length + 1) // this will generate a random number between 1 and str.length
      password += str.charAt(char) //this will bring the character at the index of char that is generated randomly from the str
    }

    setPswrd(password)

  }, [length, number, character, setPswrd]) // this will only run when length, number, character and setPswrd changes and here we have defined the dependencies,  basically for optimize the code

  const pswrdref = useRef()

  const CopyPassword = () => {
    pswrdref.current?.select()
    window.navigator.clipboard.writeText(paswrd)
    setBtnColor('bg-green-500')
    setBtnText('COPIED')

    setTimeout(() => {
      setBtnColor("bg-blue-500");
      setBtnText("COPY");
    }, 2000);
  }

  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator, length, number, character]) // This will re-render the password when the length, number and character changes
  
  
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center bg-zinc-800'>
        <div className='w-1/3 py-6 px-5 bg-slate-600 text-center rounded-lg'>
          <h1 className='font-bold mb-4 text-4xl text-[#333]'>Password Generator</h1>
          <div className='w-full flex my-6 gap-5'>
            <input
              className='w-full py-2 pl-4 text-lg border-none outline-none font-bold rounded-md text-orange-500'
              type="text"
              placeholder='password'
              value={paswrd}
              readOnly 
              ref={pswrdref} />
            <button onClick={CopyPassword} className= {`${btnColor} text-white text-lg font-semibold px-2 rounded-md`}>{btnText}</button>
          </div>
          <div className='w-full flex gap-x-2 px-4 font-semibold text-orange-400'>
            <input
              className='cursor-pointer '
              min={5}
              max={50}
              type="range"
              onChange={(e) => setLength(e.target.value)}
              value={length} />
            <label>Length: {length}</label>
            <input
              type="checkbox"
              defaultChecked={number}
              onChange={(e) => setNumber((prev) => !prev)}
              value={number} />
            <label htmlFor="NumberInput">Number</label>
            <input
              type="checkbox"
              defaultChecked={character}
              onChange={(e) => setCharacter((prev) => !prev)}
              value={character} />
            <label htmlFor="CharacterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App