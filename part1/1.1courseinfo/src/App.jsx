const Header =(props) =>{
  return(
  <h1>{props.course}</h1>
  )
}

const Content=(props)=>{
  return(
    <>
    <p>{props.part1} Exercises: {props.exercises1}</p>
    <p>{props.part2} Exercises: {props.exercises2}</p>
    <p>{props.part3} Exercises: {props.exercises3}</p>
    </>
  )
}
const Total=(props)=>{
return(<p>Total number of exercises = {props.exercises1+props.exercises2+props.exercises3}</p>)
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App