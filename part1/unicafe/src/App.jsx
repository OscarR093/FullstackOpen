import { useState } from 'react'

const Button=(props) =>{
  console.log(props)
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood=good+1
    console.log(updatedGood)
    setGood(updatedGood)
  }
  const handleNeutralClick = () => {
    const updatedNeutral=neutral+1
    setNeutral(updatedNeutral)
  }
  const handleBadClick = () => {
    const updatedBad=bad+1
    setBad(updatedBad)
  }

  return (
    <div>
      <h2>Give Feedback!</h2>
      <nav>
        <Button handleClick={handleGoodClick} text="Good"/>
        <Button handleClick={handleNeutralClick} text="Neutral :| "/>
        <Button handleClick={handleBadClick} text="Bad :( "/>
      </nav>
      <h2>Statistics</h2>
      <p> Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

export default App