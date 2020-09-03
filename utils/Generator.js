const generateId = (arr) => {
	console.log(`Generating ID --->`);
	const maxId = arr.length > 0 ? Math.max(...arr.map((n) => n.id)) : 0; //Checkig The Length of the Array And Adding an Id higher than The Max ID
	console.log(`ID Generated ${maxId + 1}`);
	return maxId + 1;
};

const generateRandId = (arr) => {
	console.log(`Generating ID --->`);
	const id = Math.floor(Math.random() * 10000000);
	const idNew = arr.find((obj) => obj.id === id);

	if (idNew) {
		generateRandId(arr);
	} else {
		console.log(`ID Generated ${id}`);
		return id;
	}
};

const generatePhoneNumber = () => {
	console.log(`Generating Phone Number --->`);
	const phoneNumber = `05${Math.floor(Math.random() * 10)}-${Math.floor(
		Math.random() * 1000
	)}-${Math.floor(Math.random() * 10000)}`;
	console.log(`phoneNumber: ${phoneNumber} Generated`);
	return phoneNumber;
};
module.exports = { generateId, generateRandId, generatePhoneNumber };
