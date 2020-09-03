import React, { useEffect, useState } from "react";
import personService from "./services/persons";

function Phonebook() {
	const [book, setBook] = useState([]);
	const [name, setName] = useState();
	const [number, setNumber] = useState();

	const fetch = () => {
		personService.getAll().then((initialPersons) => setBook(initialPersons));
	};
	useEffect(() => {
		fetch();
	}, []);

	// const addPerson = (event) => {
	//   event.preventDefault()
	//   const personObject = {
	//       name: name,
	//       number: number,
	//     }

	//     personService
	//     .create(personObject)
	//     .then(returnedPerson => {
	//         setBook(book.concat(returnedPerson))
	//         setName('')
	//     })

	// }

	const handleSend = () => {
    const personExist = book.find((person) => person.name === name);
    debugger
    const personObject = {
      name: name,
      number: number,
    };
		if (personExist) {
      // const persIndex = book.findIndex((pers) => pers.id === personExist.id)
      personService.update(personExist.id, personObject)
		} else {
			    personService
			    .create(personObject)
			    .then(returnedPerson => {
			        setBook(book.concat(returnedPerson))
			        setName('')
		}
	)}};

	const handleDelete = (e) => {
		personService.remove(e.target.id).then(() => fetch());
	};

	return (
		<div className="App">
			<h1>Phone Book</h1>
			<ul>
				{book.map((item) => (
					<li key={item.id}>
						{item.name} {item.number}{" "}
						<button id={item.id} onClick={handleDelete}>
							delete
						</button>
					</li>
				))}
			</ul>

			<form onSubmit={handleSend}>
				<input
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="name"
				/>
				<input
					onChange={(e) => setNumber(e.target.value)}
					type="text"
					placeholder="number"
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Phonebook;
