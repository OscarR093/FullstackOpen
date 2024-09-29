import { useState } from 'react'

const Button=(props) =>{
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Statistics=(props)=>{
  if(props.values[3]===0) return <><h2>Statistics</h2><p>No feedback given</p></>
  return(
    <><h2>Statistics</h2>
    <StatisticsLine text='Good: ' value={props.values[0]} />
    <StatisticsLine text='Neutral: ' value={props.values[1]} />
    <StatisticsLine text='Bad: ' value={props.values[2]} />
    <StatisticsLine text='Total: ' value={props.values[3]} />
    <StatisticsLine text='Average: ' value={props.values[4]} />
    <StatisticsLine text='Positive: ' value={props.values[5]+'%'} />
    </>
  )
}

const StatisticsLine=(props)=>{
  return(<>
  <table>
    <tbody>
  <tr>
    <th>{props.text}</th> 
    <td></td>
    <td>{props.value}</td>
  </tr> 
  </tbody>
  </table>
  </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal]=useState(0)
  const [average, setAverage]=useState(0)
  const[percent, setPercent]=useState(0)
  const values= [good,neutral,bad,total,average,percent]

  const calcAverage=(actualTotal, value)=>{const av=(good-bad+value)/actualTotal
    setAverage(av)
  }

  const calcPercent=(actualTotal,updatedGood)=> {
    if(typeof updatedGood === 'undefined') {return((good*100)/actualTotal)}
    return((updatedGood*100)/actualTotal)
  }

  const handleGoodClick = () => {
    const updatedGood=good+1
    setGood(updatedGood)
    const actualTotal=total+1
    setTotal(actualTotal)
    calcAverage(actualTotal,1)
    setPercent(calcPercent(actualTotal,updatedGood))
  }
  const handleNeutralClick = () => {
    const updatedNeutral=neutral+1
    setNeutral(updatedNeutral)
    const actualTotal=total+1
    setTotal(actualTotal)
    calcAverage(actualTotal,0)
    setPercent(calcPercent(actualTotal))
  }
  const handleBadClick = () => {
    const updatedBad=bad+1
    setBad(updatedBad)
    const actualTotal=total+1
    setTotal(actualTotal)
    calcAverage(actualTotal,-1)
    setPercent(calcPercent(actualTotal))
  }

  return (
    <div>
      <h2>Give Feedback!</h2>
      <nav>
        <Button handleClick={handleGoodClick} text="Good"/>
        <Button handleClick={handleNeutralClick} text="Neutral :| "/>
        <Button handleClick={handleBadClick} text="Bad :( "/>
      </nav>
      <Statistics values={values}/>
    </div>
  )
}

export default App