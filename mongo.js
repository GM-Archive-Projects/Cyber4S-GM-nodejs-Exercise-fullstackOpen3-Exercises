const mongoose = require("mongoose");
const { generatePhoneNumber, generateId} = require("./utils/Generator");

if (process.argv.length < 3) {
	console.log(
		"Please provide the password as an argument: node mongo.js <password>"
	);
	process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4]
	? process.argv[4]
	: process.argv[3] ? generatePhoneNumber() : undefined;

const url = `mongodb+srv://fullstack:${password}@cluster0.wiesv.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (personName) {
	const person = new Person({
		name: personName,
		number: personNumber,
	});
	person.save().then(result => {
		console.log(`added ${personName} number ${personNumber} to phonebook`)
		mongoose.connection.close()
	})
} else {
	Person.find({}).then(people => {
		console.log(`Phonebook: `)
		people.forEach(person => {
			console.log(person.name + " " + person.number)
			mongoose.connection.close()		
		})
	})
}
