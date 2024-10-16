// ----------------- strings -----------------------

// Strings are immutable they can only be replaced cant be changed 
// 	- at(index) vs charAt(index)
// 		* both returns the character at given position
// 		* but at() supports neegative indexing whereas charAt does not

// 	- string.length

// 	- string.toUpperCase()

// 	- string.toLowerCase()

// 	- string.slice(start, end) 
// 		where end is excluded
// 		also supports negative indexes as positions

// 	- string.substring(start, end) 
// 	  	similar to slice but the difference is that position less than 0 are treated as 0 by substring method.log

// 	- string.substr(start, length)
// 		similar to slice but second parameter gives the lenght of the extracted parameter
// 		if second parameter is not specified it return the rest of the array

// 	- string.trim
// 		trims of the leading and trailing spaces in Strings

// 	- string.trimStart();

// 	- string.trimEnd();

// 	- string.padStart(length, strToPadWith)
// 		pads the original string with given string unless the length of original string become the given length

// 	- string.padEnd();

// 	- string.repeat(noOfTimes);
// 		Repeats a string given number of times.

// 	- string.replace(existingSubStr, newSubStr)
// 		replace does not modify the original string it return a new string
// 		replaces only the first occurrence

// 	- string.split(separator);
// 		splits a string to an array
// 		if separator is ommitted, entire string is stored a single element of array
// 		if separator is "" string is splitted into an array of single characters

// 	- string.includes(subStr)

// 	- string.startsWith(subStr);

// 	- string.endsWith(subStr);


// 	...etc.


// ---- string search ------
// 	- string.indexOf(string)

// 	- string.search(string)
// 		both search and indexof are same and returns the index of first character of the string found  
// 		indexOf cannot search with regex but search can and	
// 		search cannot take a second argument i.e start position but indexOf can 

// 	- string.includes(str) 
// 		return true or false

// 	- string.match(str) 
// 		returns an array containing the results of matching a string against a string (or a regular expression).


	const name = 'Jyoti deveda'

	console.log('Charater: ', name.at(-2));	// d

	console.log('Charater: ', name.charAt(-1)); // no output

	console.log('Charater: ', name.slice(-4, -1)) // ved

	console.log('Charater: ', name.substring(-4, -1)); // negative indexes trated as 0 therefore gives no output

	console.log('Charater: ', name.substring(-1, -1)) // veda
	
	const remark = prompt("Give remark? ")
	console.log(name.concat(": ", remark));





