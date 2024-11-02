const mongoose = require('mongoose')

if (process.argv.length<3 ) {
  console.log('wrong arguments, needed password')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullStack:${password}@fullstackcluster.yk7vf.mongodb.net/phoneBookDB?retryWrites=true&w=majority&appName=fullstackCluster`
const name=process.argv[3]
const number=process.argv[4]


const addPerson=(name, number, url)=>{
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})
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

const showPersons=(url)=>{
    const noteSchema = new mongoose.Schema({
        name: String,
        number: String,
      })
      const Person = mongoose.model('persons', noteSchema)

    mongoose.set('strictQuery',false)
    mongoose.connect(url)
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