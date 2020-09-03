require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const getDate = require("./utils/getCurrentDateTime");
const Person = require("./models/persons");
const { generatePhoneNumber } = require("./utils/Generator");
const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

//Middleware Functions

//Morgan Middleware Token To Log Request Body
morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

//Morgan Middleware Function To Log Request Details
app.use(
	morgan(
		"Morgan Token =  :method :url :status :res[content-length] - :response-time ms :body"
	)
);

//===============GET Requests Area===============//
//====GET Home Page====//
app.get("/", (req, res) => {
	res.send(`<h1>Hello Phonebook! </h1>`);
});

// //====GET All Persons====//
// app.get("/api/persons", (req, res) => {
// 	res.json(persons);
// });
app.get("/api/persons", (request, response) => {
	Person.find({}).then((people) => {
		response.json(people);
	});
});
//====GET Info Page====
app.get("/info", (req, res) => {
	Person.find({}).then((people) => {
		res.send(`Phonebook has info for ${people.length} people`);
	});
});

//====GET Specific Person====
app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				console.log(`Person Has Been Found:`, person);
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});
// //===============Post Requests Area===============
// //====Post Specific Note====

app.post("/api/persons", (req, res, next) => {
	//PostNew Note to Notes
	const body = req.body;
	// let id;
	let id = body.id;
	if (!body.number) {
		console.log("Number Has been Generated");
	}

	// const idNew = persons.find((obj) => obj.id === id) ? persons.find((obj) => obj.id === id) :
	const person = new Person({
		name: body.name,
		number: body.number ? body.number : generatePhoneNumber(),
	});
	person
		.save()
		.then(savedPerson => savedPerson.toJSON())
		.then((savedAndFormattedPerson) => {
			res.json(savedAndFormattedPerson);
		})
		.catch((error) => next(error));
});

//===============Delete Requests Area===============
//====Delete Specific Note===
app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then((result) => {
			console.log(`Person Id : ${req.params.id} Has been Deleted`);
			res.status(204).end();
		})
		.catch((error) => next(error));
});

//===============Put Requests Area===============
//====Change Specific Person===
app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number ? body.number : generatePhoneNumber(),
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then((updatedPerson) => {
			console.log("Updated");
			res.json(updatedPerson);
		})
		.catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({
		error: `Unkown Endpoint URL: http://localhost:${PORT}${req.path}`,
	});
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
