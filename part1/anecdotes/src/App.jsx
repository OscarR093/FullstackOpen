import { useState } from 'react'

const Button=(props) =>{
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}
const MostVoted =(props)=>{ 
  const mostVoted=props.count.indexOf(Math.max(...props.count))
  return(<>
<h2>Anecdote with most votes</h2>
  <div> {props.anecdotes[mostVoted]}  </div>
  <br />
  <div>Has {props.count[mostVoted]} Votes</div>
  <br />
</>)}

const Anecdotes=(props)=>{
  return(
    <>
    <h2>Anecdote of the day</h2>
  <div> {props.anecdotes[props.selected]}  </div>
  <br />
  <div>Has {props.count[props.selected]} Votes</div>
  <br />
  
 </>
 )
  
} 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const max = anecdotes.length;
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(Array(max).fill(0))

  const handleSelected = ()=> {
    const newRandom=Math.floor(Math.random() * max)
    setSelected(newRandom)
  }

  const incrementCount = () => {
    const newCount = count.map((cont, i) =>
      i === selected ? cont + 1 : cont
    );
    setCount(newCount);
  };

  return (
    <>
    <Anecdotes anecdotes={anecdotes} selected={selected} count={count} />
    <Button handleClick={handleSelected} text="Next Anecdote"/>
    <Button handleClick={incrementCount} text="Vote"/>
    <MostVoted anecdotes={anecdotes} count={count}/>
    </>
  )
}

export default App