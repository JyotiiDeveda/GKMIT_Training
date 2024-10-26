// Typescript provides an ectra layer of type checking above js.
// It is like a superset of JS as it can execute everything that JS can and along with provides type checking

// Type Assignment can be 
// 	- implicit: TS infers the type of the variable on the basis of the value assigned

// 	- explicit: The type is explicitly defined

// ----------- Data Types  ----------
// 1. string
// 2. boolean
// 3. number

// 4. any
// 	disables type checking i.e a variable can have different types of values

// 5. unknown
// 	same as any but safer as ts will prevent unknown varialbes from being used

// 6. never
// 	throws an error whenever defined


// 7. undefined and null
// 	are considered as the sub types of all other types as undefined and null can be assigned to any type of variable


// Arrays - a list of same data type elements

// Tuples - typed array

// Enums - is like a class that defines constant variables
// 	- Numeric
//  - String



// primitive types 
	let isLearning: boolean = true;
	let name: string = "Jyoti";
	let score: number = 7;

	let sentence: string = `My name is ${name}.
		I am trying to learn basics of TS`;


	console.log(sentence);
	name = 22; // Type 'number' is not assignable to type 'string'.

	let n: null = null;
	let u: undefined = undefined;

	let isNew: boolean = null;
	let myName: string = undefined;


	// declaring an array
	let list1: number[]= {1, 2, 3};
	let list2: Array<number> = [1, 2, 3];

	// Tuple - a typed array with pre-defined length and type for each element
	let user : [string, number] = ['user 1', 34];

	// tuple have no type checking for extra elements whose type is not defined
	let tArr: [string, boolean, number]
	tArr = ["hello", true, 12];
	console.log(tArr);
	tArr.push("Welcome")
	console.log(tArr)

	// tuples can also be destructured
	const [a, b] = tArr;
	console.log(a, b); // "hello", true


	// object types in type script
	// object types
	const student: { name: string, isRegular: boolean, rollNo: number} = {
	    name : "Jyoti",
	    isRegular: true,
	    rollNo: 12
	}

	console.log(student);


	// enum 
	//numeric enums
	// by default enums initialize the first value as 0, we can also give unique numeric values to each of them
	enum Domains {
		Nodejs = 12,
		Python,
		Datascience,
		Devops
	}
	const index = Domains.Devops;
	console.log(index); // 15

	// string enums

	 enum Domains {
		Nodejs = "Backend",
		Python = "AI-ML",
		Datascience = "Analysis",
		Devops = "Deployment"
	}
	let node: Domains = Domains.Datascience;
	console.log(node); // 0

    node = "C++"; //gives error - Type '"C++"' is not assignable to type 'Domains'










