const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

mongoose.set('useCreateIndex', true)


console.log('Connecting to', url)
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url, { useNewUrlParser: true })
	.then(result => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('Error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		uniqueCaseInsensitive: true,
		minlength: 3
	},
	phone: {
		type: String,
		minlength: 8
	}
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
module.exports = mongoose.model('phonebooks', personSchema)