const mongoose = require('mongoose')

//comprobar contraseña
if (process.argv.length<3 ) {
  console.log('wrong arguments, needed password')
  process.exit(1)
}

//datos estaticos
const password = process.argv[2]
const url = `mongodb+srv://fullStack:${password}@fullstackcluster.yk7vf.mongodb.net/phoneBookDB?retryWrites=true&w=majority&appName=fullstackCluster`
const name=process.argv[3]
const number=process.argv[4]

const schema={ 
  name: String, 
  number: String,
}

//establecer conexion con mongoDB 
const setConection=(url)=>{
  mongoose.set('strictQuery',false)
  mongoose.connect(url)
}

//metodo agregar persona
const addPerson=(name, number, url)=>{
setConection(url)
const noteSchema = new mongoose.Schema(schema)
const Person = mongoose.model('persons', noteSchema)
const person = new Person({
    name:name,
    number: number,
}, )
person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

//mostrar personas
const showPersons=(url)=>{
  setConection(url)
  const noteSchema = new mongoose.Schema(schema)
  const Person = mongoose.model('persons', noteSchema)
  Person.find({}).then(result => {
    result.forEach(note => {
    console.log(note)
    })
  mongoose.connection.close()
  })}
    
if (process.argv.length===5) {
  addPerson(name,number,url)
}
else{
    if(process.argv.length===3){
      showPersons(url)
      }
    }