const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullStack:${password}@fullstackcluster.yk7vf.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fullstackCluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy x2',
  important: true,
}, )

const note1 = new Note({
    content: 'Hello mongo',
    important: false,
  }, )

  const note2 = new Note({
    content: 'I am using mongoose',
    important: true,
  }, )

/*
note.save().then(result => {
  console.log('note saved!')
  //mongoose.connection.close()
})
note1.save().then(result => {
    console.log('note1 saved!')
 //   mongoose.connection.close()
  })

  note2.save().then(result => {
    console.log('note2 saved!')
    mongoose.connection.close()
  })*/
 
    Note.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
      })