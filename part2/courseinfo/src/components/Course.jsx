const Header=({course})=>{
    return(
        <h1>{course.name}</h1>
    )
}
const Content=({course})=>{
    return( course.parts.map(part => 
      <p key={part.id}>{part.name} {part.exercises}</p>
     ))
  }
const Total=({course})=>{
 const  total= course.parts.map(part=>
       part.exercises)
       .reduce((acc,curr)=>acc+curr,0)
  
  return (
    <h3>Total of {total} excercises</h3>
  )
}

const Course = ({course}) => {
    
    
    return(
    <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course}/>
    </>
    )
  }

  export default Course