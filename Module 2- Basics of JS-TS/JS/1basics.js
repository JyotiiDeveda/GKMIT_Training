// ------------------- types of variables - let, const, var -------------------
// Let, const
// 	- block scoped
//  	- cannot be redeclared within the same block
// 	- hoisted but not intialized i.e gives reference error while using therefore should be declared before use
// 	- variable declared with const can neither be redeclared nor redefined 
//	- const variables are initialzed during declaration

// Var 
// 	- 'var' variables are globally scoped or function scoped (it acts as a local variable only when defined within a function) 
// 	  when defined within the function
// 	- variable defined with 'var' keyword can be redeclared and the later value becomes 
// 	  the value of the variable irrespective of the scope the variable is redeclared in
// 	- hoisted and initialized as 'undefined' i.e can be used before declaration


// functional scope of var variable
	function greet(){
	    var name = "Jyoti";
	    console.log("Hello ", name);
	}
	console.log(name) //gives error as name is not defined


// hoisting - function and variable declarations are moved to the top (not initialization)
	console.log(name); // does not gives error prints name as undefined
	var name = "Test user";


// redeclaring a var variable redefines the original one
	var msg = "Hello Sir";
	console.log("Msg before block: ", msg)
	
	if(1) {
		var msg = "How are you? "; //redefines the original msg variable
		console.log("Msg within block: ", msg)
	}

	console.log("Msg after block: ", msg)


// let variables cannot be redeclared within the same block but can be updated
	let name = "Test user 1";
	let name = "Test user 2"; // gives error

// let variable with same name can be declared in different blocks
	let msg = "Hello Sir";
	console.log("Msg before block: ", msg)
	
	if(1) {
		let msg = "How are you? "; //redefines the original msg variable
		console.log("Msg within block: ", msg)
	}

	console.log("Msg after block: ", msg)



// an object declared using const cannot be updated but its properties can be updated
	const student = {
		name: "Student 1",
		rollNo: 12
	}

	console.log(student);

	student.dept = "CSE";
	console.log(student)



// --------------- Objects -------------------

// Creating object using constructor function 
// 	- name of a constructor function is written in PascalCase 
// 	- an object is created using 'new' keyword

	function Feature(name, developer, deadline) {
	    this.name = name,
	    this.developer,
	    this.deadline = deadline || 2;
	}

	const f1 = new Feature("Payment-gateway", "Developer 1");
	console.log(f1);


// a property or method cannot be added directly to the constructor function like it has to be added to the function prototype
	// this does not add the property
	Feature.project = "E-commerce";

	const f1 = new Feature("Payment-gateway", "Developer 1");
	console.log(f1.project); //gives undefined

	// adding a property to function prototype
	Feature.prototype.project = "E-commerce";




















































