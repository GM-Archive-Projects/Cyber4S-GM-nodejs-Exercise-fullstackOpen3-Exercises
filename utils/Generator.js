const generateId = (arr) => {
    console.log(`Generating ID --->`)
    const maxId = arr.length > 0 ? Math.max(...arr.map(n => n.id)) : 0          //Checkig The Length of the Array And Adding an Id higher than The Max ID
    console.log(`ID Generated ${maxId + 1}`)
    return maxId + 1

}


const generateRandId = (arr) => {
    console.log(`Generating ID --->`)
    const id = Math.floor(Math.random() * 10000000)
    const idNew = arr.find((obj) => obj.id === id);           

    if (idNew) {
        generateRandId(arr)
    } else {
        console.log(`ID Generated ${id}`)
        return id

    }
}

const generatePhoneNumber = (arr) => {
    console.log(`Generating Phone Number --->`)
    const phoneNumber = `0${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 10000000)}`
    const phoneNumberNew = arr.find((obj) => obj.number === phoneNumber);           

    if (phoneNumberNew) {
        generatePhoneNumber(arr)
    } else {
        console.log(`phoneNumber: ${phoneNumber} Generated`)
        return phoneNumber
    }
}
module.exports = {generateId, generateRandId, generatePhoneNumber}