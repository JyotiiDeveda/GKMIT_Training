

// -------- Factory method ------- 

// bad code 
class CollegeFacility {

	library() {
		console.log("You are in the Library")
		// more functions

	}

	seminarHall() {
		console.log("You are in the seminar hall")
		// more functions
	}

	getFacility(facility) {
		switch (facility) {

		case 'library': new Library();
			break;

		case 'seminarhall': new SeminarHall();
			break;
		}


	}

}


const c = new CollegeFacility();
c.getFacility('library');



 // ------ good code -------- 
class Library {

	constructor() {
		console.log("You are in the Library")
	}
	
	// more library related code

}

class SeminarHall {

	constructor() {
		console.log("You are in the seminar hall")
	}

	// more seminar hall related code

}


class CollegeFacility {

	getFacility(facility) {
		switch (facility) {

		case 'library': new Library();
			break;

		case 'seminarhall': new SeminarHall();
			break;
		}


	}

}

const c = new CollegeFacility();
c.getFacility('library');
