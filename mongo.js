const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true)
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://Phonebook:${password}@cluster0-yenpe.mongodb.net/phonebook-app?retryWrites=true`
mongoose.connect(url, { useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: String,
  id: Number
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
  Phonebook.find({}).then(result => {
    console.log('Entries:')
    result.forEach(entry => {
      console.log(entry)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const phone = process.argv[4]
    
  const entry = new Phonebook({
    name,
    phone
  })
  entry.save().then(result => {
    console.log(`Saved ${name}  number ${phone} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid amount of parameters, specify either only password or password, name and number to add')
  process.exit(1)
}
