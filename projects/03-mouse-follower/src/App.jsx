import {useEffect, useState} from "react"
//useEffects can be used to connect to 3rd party APIs. Data fetching, tracking, etc. 

const FollowMouse = () =>{
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  //initialize a State with the correct type data is good practice

  //pointer move effect
  useEffect(()=>{
    console.log("efecto", {enabled})

    const handleMove = (event)=>{
      const {clientX, clientY} = event
      console.log({clientX, clientY})
      setPosition({x: clientX, y: clientY})
    }
    if(enabled){
      window.addEventListener('pointermove', handleMove)
    }

    return () => { //cleanup function
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])
  // [] -> executes when component is rendered on the DOM
  // [dependencies] -> executes when component is rendered and when the dependencies changes
  // undefined -> always executes on rendering

  //change body className
  useEffect(()=>{
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(255, 0, 255, 0.6)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      {/* ternary operator */}
      <button onClick={()=>setEnabled(!enabled)}>
        {enabled ? 'Desactivar':'Activar'} efecto
      </button>
    </>
  )
}
function App() {
  return (
    <main>
      <FollowMouse/>
    </main>
  )
}

export default App
