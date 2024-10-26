//---------  Execution context -----------
// 	- When a javascript program is executed it creates a global execution context
// 	- An execution context has two phases
// 		Creation phase or Memory: Variables and functions are allocated memory in this phases
// 		~ Variables declared using var keyword are assigned undefined
// 		~ Functions are assigned the entire function code
// 		~ Arrow functions are treated as variables(when declared using var) therefore assigned undefined
//	- Each time a new function is invoked it creates a new execution context within global execution context

// --------- Call stack ----------
// Call stack keeps track of execution context and maintains the order of execution of execution context

//---------- Hoisting -------------
// - As variables and functions are allocated memory in memory creation phase,
// 	when these variables and functions can be accessed before declaration which is called hoisting
// - Hoisting is not supported for arrow functions and variables declared using let

getName(); // Hello Jyoti
console.log(x); // undefined
console.log(getName); // logs the function code
console.log(a); // gives error as - a in not initialized 
// (because variable 'a' exists and it has been assigned memory but let variables cannot be accessed before initialization)
console.log(y) // error - variable y is not defined as js engine could not find this variable in scope
// undefined and not defined are therefore two different things

let a = 12;
var x = 7;
var getName = () => {
	console.log("Hello Jyoti");
};

// -------- Functions ---------
// Each function has their own execution context(isolated environment) and memory scope

var x = 1;
a();
b();
console.log(x);

function a() {
	var x = 10;
	console.log(x);
}

function b() {
	var x = 100;
	console.log(x);
}

// --------- global object ---------
// When a js program executes the js engine creates a global object that provides several built-in functions and properties
// 	- in browsers it is called 'window'
// 	- in node it is called 'global'
// 	- whenever a variable or function is declared ing global scope they are attached to this global object as its properties
// 	- the global object can be accessed using 'this' keyword in global scope

var x = 10;
// all the logs below point to same x in global scope
console.log(window.x);
console.log(x);
console.log(this.x);

// ---------- Lexical environment -----------
// - a lexical environmentis created along with execution context creation
// - local memory along with parents lexical environment
// - Lexical means 'in heirarchy' i.e a variable is first searched in it's local scope and then it it's parent scope and so on

// Scope chain - chain of references to parent's lexical environment

function a() {
	var x = 10;
	function b() {
		console.log(y);
		function c() {
			// has accesss to all the variables declared in it's outer scope
			console.log(x);
		}
	}
}

var y = 20;
a();


//  ---------- let and const --------
// 	- let and const are hoisted i.e. assigned undefined in memory execution phase
// 	- but are not attached to global object and stored in a separate memory space 
// 	- therefore cannot be accessed before initialization as they are in temporal dead zone.
//  - accessing these variables give reference error
// 	* temporal dead zone - the phase from hoisting to initialization
// 	- let variable cannotbe redeclared gives syntax error
// 	- const cannot be declared without initialization it gives initializer does not exist error
// 	- const variable cannot be reassigned gives type error


// ---------- scope of let and const -----
// Block 
// 	- also known as compound statement 
// 	- A block is used to group multiple statements, 
// 	we need to goup multiple statements so as to be used at a place where js expects a single statement

// Block scope
// 	- All the variables and function that can be accessed within a block is the scope of the block

// Block also follows lexical scope


{
	var a = 10;
	let b = 20,
	const c = 30;
	console.log(a) // 10
	console.log(b) // 20
	console.log(c) // 30
}

console.log(a) // 10
// let and const are block scoped cannot be accessed out of the block
console.log(b) // reference error
console.log(c) // reference error


// Shadowing- When a variable declared in a scope already exists with same name in outer scope it is called shadowing	
// 	- a var variable when shadowed as var modifies the value of the variable for the rest of the program as both points to same variable
// 	- a var variable can be shadowed using let and does not modify outer var variable
// 	- a let variable can be shadowed as let and inner let variable scope is within the inner block only
// 	- a let variable cannot be shadowed as var, this is illegal shadowing it throws error variable already exists.
// Shadowing with const works same as let
// Shadowing in functions works same for let and const but 
// for var it does not work same as in block scope here var within function does not modify outer var




// --------- closures --------
// A combination of function bundled together with it's lexical scope forms a closure
// Closure gives a function access to its outer scope


function outer() {
    var name = 'Jyoti';
    function inner() {
        console.log(name);
    }
    return inner;
}

const x = outer();
console.log(x);
x();


// SettimeOut makes use of closures

// the function below does not work as expected
// as the loop variable is defined as var in each iteration the same variable is being updated 
// set time out stores the callback and the timeset in a different memory space
// the callback is bundled with closure so by the time when the loop has iterated completely the value of the variable in the closure is the latest updated value and it therefore prints 6 for all iterations
function x() {

    for(var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i*1000);
    }
    console.log("Hello world");
}
x();

// to make the function work as expected we can enclose the settimeout within a function and pass i as parameter
// this will create a different variable in every iteration keeping the variable value different in each closure
function x() {
    for(var i = 1; i <= 5; i++) {
        function close(i) {
        	setTimeout(function () {
	            console.log(i);
	        }, i*1000);
        }
        close(i);
    }
    console.log("Hello world");
}
x();



// the expected behaviour can be achieved by using let
function x() {
    var i = 1;
    for(var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i*1000);
    }
    console.log("Hello world");
}
x();













































