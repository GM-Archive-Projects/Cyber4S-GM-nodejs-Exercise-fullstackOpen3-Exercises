const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
const idGenerator = require("./utils/Generator");
const getDate = require("./utils/getCurrentDateTime");

//Morgan Middleware Token To Log Request Body
morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

//Morgan Middleware Function To Log Request Details
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Persons JSON Content
let persons = [
	{
		name: "Gal Moshkovitz",
		number: "054-765-2686",
		id: 1,
	},
	{
		name: "Or Moshkovitz",
		number: "054-770-3850",
		id: 2,
	},
	{
		name: "Ziv Moshkovitz",
		number: "054-526-2689",
		id: 3,
	},
	{
		name: "Guy Moshkovitz",
		number: "054-526-2687",
		id: 4,
	},
];

//===============GET Requests Area===============//
//====GET Home Page====//
app.get("/", (req, res) => {
	res.send(`<h1>Hello Phonebook! </h1>`);
});

//====GET All Persons====//
app.get("/api/persons", (req, res) => {
	res.json(persons);
});

//====GET Info Page====
app.get("/info", (req, res) => {
	res.send(
		`<div><h1> Phonebook has info for ${
			persons.length
		} people </h1><h2>Nice Date: ${getDate()}</h2> <h3> ${new Date()} </h3> </div>`
	);
});

//====GET Specific Person====
app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id); //Find Gives a response with the specific Object

	if (person) {
		//If there is Existing Note with The Request Specified ID

		console.log(`Person Has Been Found:`, person);
		res.json(person);
	} else {
		//If There is not Note with this ID return Error Page not Found
		console.log(`Person ID: ${req.params.id} Not Found`);
		res.status(404).end();
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
