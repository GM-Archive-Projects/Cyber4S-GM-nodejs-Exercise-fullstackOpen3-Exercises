import React, { useEffect, useState } from 'react';
import Notification from './components/Notification'
import personService from './services/persons'


function Phonebook() {
  const [book, setBook] = useState([]);
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  const [errorMessage, setErrorMessage] = useState(null)



  const fetch = () => {
      personService.getAll().then(initialPersons => setBook(initialPersons))
  }
    useEffect(() => {
    fetch();
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: name,
        number: number,
      }

      personService
      .create(personObject)
      .then(returnedPerson => {
          setBook(book.concat(returnedPerson))
          setName('')
      })
    
  }
  


  const handleDelete = (e) => {
          personService
          .remove(e.target.id).then(() => fetch())
  }

//   const handleSubmit = async () => {
//     const checkPerson = book.find(person => person.name === name)
//     if (checkPerson) {
//         personService.update(checkPerson.id, {name, number}).then(() => fetch())
//     } else {
//         personService.create({name, number}).then(() => fetch())
//     }
//   }

  return (
    <div className="App">
      <h1>Phone Book</h1>
      <Notification message={errorMessage} />
      <ul>
        {book.map((item) => 
          <li key={item.id}> {item.id} {item.name} {item.number} <button id={item.id} onClick={handleDelete}>delete</button></li>
        )}
      </ul>

      <form onSubmit={addPerson}>
        <input onChange={(e) => setName(e.target.value)} type='text' placeholder='name'/>
        <input onChange={(e) => setNumber(e.target.value)} type='text' placeholder='number'/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Phonebook;