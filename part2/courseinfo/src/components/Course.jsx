const Header=({course})=>{
    return(
        <h2>{course.name}</h2>
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

const Courses=({courses})=>{
    return(
            <>
            <Header course={courses} />
            <Content course={courses} />
            <Total course={courses}/>
            </>
    )
}

const Course = ({course}) => {
    return(
        course.map(courses=>
            <Courses key={courses.id} courses={courses}/>
          )
        )
  }

  export default Course