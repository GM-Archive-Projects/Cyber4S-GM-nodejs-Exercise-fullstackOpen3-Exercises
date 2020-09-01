const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
const {generateId, generateRandId, generatePhoneNumber} = require("./utils/Generator");
const getDate = require("./utils/getCurrentDateTime");

//Morgan Middleware Token To Log Request Body
morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

//Morgan Middleware Function To Log Request Details
app.use(
	morgan("Morgan Token =  :method :url :status :res[content-length] - :response-time ms :body")
);

// Persons JSON Content
let persons = [
	{
		name: "Michael Moshkovitz",
		number: "050-111-1111",
		id: 1,
	},
    {
		name: "Rachel Moshkovitz",
		number: "050-222-2222",
		id: 2,
	},
	{
		name: "Guy Moshkovitz",
		number: "054-333-3333",
		id: 3,
	},
	{
		name: "Ziv Moshkovitz",
		number: "054-444-4444",
		id: 4,
	},
	{
		name: "Or Moshkovitz",
		number: "054-555-5555",
		id: 5,
	},
	{
		name: "Gal Moshkovitz",
		number: "054-666-6666",
		id: 6,
	}
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

// //===============Post Requests Area===============
// //====Post Specific Note====

app.post("/api/persons", (req, res) => {
	//PostNew Note to Notes
    const body = req.body;
    let id = req.body.id

	//If The Body Content Is Empty Retrurn Error Page
	if (!body.name) {
		return res.status(400).json({
			error: "Name Must be Specified",
		});
	}
	const personIndluded = persons.find(
		(personIndluded) => personIndluded.name === body.name
	);
	if (personIndluded) {
		return res.status(404).json({
			error: "name must be unique",
		});
    }
    if(!id) {
        id = generateId(persons)
    }


    // const idNew = persons.find((obj) => obj.id === id) ? persons.find((obj) => obj.id === id) : 
    const idNew = persons.find((obj) => obj.id === id) 
    const person = {
		name: body.name,
		number: body.number ? body.number : generatePhoneNumber(persons),
		id: idNew ? generateId(persons) : id
		// id: idNew ? generateId(persons) : id ? id : generateId(persons)
    };
    console.log("New Person", person)
	persons = persons.concat(person); //Creating New Array from The new Objects Added and the Existing One

	res.json(person);
});

//===============Delete Requests Area===============
//====Delete Specific Note===

app.delete("/api/persons/:id", (req, res) => {
	//Delete The Note with The ID from the Request
	const id = Number(req.params.id); //Request ID type is String ==> Neeeds to be converted to Number
	persons = persons.filter((person) => person.id !== id); // Filter Created New Array withoud the Unwanted Objects (with the id from the req)
	console.log(`Person Id : ${req.params.id} Has been Deleted`);
	res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
