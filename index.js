const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});