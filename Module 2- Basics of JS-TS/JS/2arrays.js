
// --------------------- Arrays ---------------------

// 	- array.length

// 	- array.toString()
// 		Converts the array to a comma separated string.log

// 	- array.at(index)
// 		returns element at given index

// 	- array.join(separator)
// 		similar to toString but here we can specify saperator

// 	- arrap.pop()
// 		removes the last element from the array

// 	- array.push()
// 		push an element to the array and returns the length of the new array

// 	- array.shift()
// 		works like pop but removes the first element and shifts all the elements one position forward
// 		returns the popped value

// 	- array.unshift(ele)
// 		adds an element to the beginning of an array and unshifts all the array elements one position backward.log

// 	- array.concat(arr2, arr3)
// 		concatenates two or more arrays and returns new arrays

// 	- array.slice(start, end)
// 		slices an array, it does not modify original array creates a new array with sliced elements.

// 	- array.splice(addAt, noOfEleToBeRemoved, ele1, ele2, ..)
// 		adds elements to the array at given index, first parameter is the index at element should be added,
// 		second parameter is the number of elemets to be removed 

// 	------ array search ------

// 	- array.indexOf(ele)

// 	- array.includes(ele)

// 	- array.find(function)
// 		return the first array element that passes the test


// 	------ array sort ------
	

// 	- array.sort();
// 		sort function sorts elements as strings by default i.e in alphabetical order
// 		sort function sorts elemets inplace			

// 	- array.reverse();

// 	- array.toSorted()
// 		does not modify original array and returns the sorted array

// 	- array.toReversed();
// 		does not modify original array and returns the reversed array


// 	------ array iteration --------

// 	- array.forEach(cb)
// 		executes the cb function for each element of the array, the return value of the cb function is discarded
// 		and the return value of forEach is undefined i.e it returns nothing
// 		does not change the original array

// 	- array.map(cb)
// 		creates a new array with the result of cb function executed on each element of the array 
// 		if cb does not return anything it takes the return value as undefined and create the resulting array
// 		does not change the original array

// 	- array.filter(cb)
// 		creates an array of all the elements that pass the test

// 	- array.reduce(cb(acc, ele))
// 		executes a function for each element of the array and reduces it to a single value


	const arr = ["Javascript", "Typescript", "Java", "C++"];

	console.log(arr.toString()); // Javascript,Typescript,Java,C++

	console.log(arr.join(' - ')); // Javascript - Typescript - Java - C++

	console.log("Element at index 2: ", arr.at(3)) // Java

	console.log(arr.push("GO", "C", "CSharp")); // 7
 
	console.log(arr.pop()); // CSharp

	console.log(arr.pop()); // Javascript

	const slicedArr = arr.slice(3);
	console.log(slicedArr);  //[ 'C++', 'GO', 'CSharp' ]

	const slicedArr2 = arr.slice(3, 5) // [ 'C++', 'GO' ]

	const newArr = arr.flatMap(e => [e, "is a language"])

	const mdArr = [
	    [1, 2], [3, 4],
	    [5, 6], [7, 8]
	]
	const nmdArr = mdArr.flat();
	console.log(nmdArr);  // [  1, 2, 3, 4, 5, 6, 7, 8 ]

	const found = arr.find(e => {
	    const index = e.indexOf("type");
	    if(index != -1) return e;
	})

	arr.sort(); // asc order [ 'C++', 'Java', 'Javascript', 'Typescript' ]

	// if comparator return positive val swapping is done
	//sorting string in dsc order
	arr.sort((a, b) => {
	    if(a > b) return -1;
	    else if(a < b) 1;
	    else 0;
	});
	console.log(arr); //[ 'Typescript', 'Javascript', 'Java', 'C++' ]

	//numeric sort
	const numArr = [12, 89, 116, 226, 1]
	console.log(numArr.sort());	// sorts numbers as strings by default therefore we need to pass a comparator
								// [ 1, 116, 12, 226, 89 ]

	// sorting using a comparator
	numArr.sort((e1, e2) => (e1-e2))
	console.log(numArr); //asc [ 1, 12, 89, 116, 226 ]

	numArr.sort((e1, e2) => (e2-e1));
	console.log(numArr); // dsc [ 226, 116, 89, 12, 1 ]


	//forEach
	const pArr = numArr.forEach(e => {
	    console.log(e*2); 
	})
	// 24 178 232 452 2 

	console.log(numArr); //forEach does not return anything-  undefined

	// map
	const mArr = numArr.map(e => {
	    return e*2;
	})

	console.log(mArr); // [ 24, 178, 232, 452, 2 ]

	// if cb function does not return anything it is considered undefined			
	const mArr = numArr.map(e => {
	    console.log(e*2);
	})

	console.log(mArr); // [ undefined, undefined, undefined, undefined, undefined ]

	//forEach vs map
	
	const objs = [
		{name: "Riya", place: "Mandsuar", mobile: 12345}, 
		{name: "Sita", place: "Ratlam", mobile: 457824}, 
		{name: "Rahul", place: "Udaipur", mobile: 892362}
	];

	//print an array name: place using forEach
	let newArr = [];
	objs.forEach(obj => {
		newArr.push(`${obj.name}: ${obj.place}`);
	})

	console.log(newArr);

	//using map
	const newArr2 = objs.map(obj => {
		return `${obj.name}: ${obj.place}`;
	})
	console.log(newArr2);

	// log the first user with even number
	const user = objs.find(obj => obj.mobile%2 == 0)

	console.log(user.name);


	// filter
	const fArr = numArr.filter(e => {
	    if(e%2 == 0) {
	        return e;
	    } 
	})

	console.log(fArr);

	//reduce
	// sum of array elements using reduce
	const arr = [1, 2, 3, 4, 5, 6];
	const arrSum = arr.reduce((sum, i) => sum += i, 5);
	console.log(arrSum);

	//with no initial value, reduce uses the first array element as initial value
	const arrSum2 = arr.reduce((sum, i) => sum += i);

	console.log(arrSum2);

	const mArr = [
		[1, 2, 3], 
		[4, 5, 6],
		[7, 8, 9]
	]

	//Converting a 2d array to object using reduce 
	const obj = mArr.reduce((acc, [key, val1, val2]) => {
		acc[key] = [val1, val2];
		return acc;
	}, {})


	// sum of elements of a 2d array using foreach
	let sum = 0;
	mArr.forEach(arr => {
		const tsum = arr.reduce((acc, e) => acc+e);
		sum += tsum;
	})


	//  sum of elements of a 2d array using nested reduce
	let sum2 = 0
	sum2 = mArr.reduce((acc1, a) => acc1 + a.reduce((acc2, e) => acc2+e), 0);

	console.log("Sum of 2d array: ", sum2);

	// flattening the multi dimensional array using reduce
	const flatArr = mArr.reduce((acc, arr) => {
		acc.push(...arr);
		return acc;
	} ,[]);
	console.log("Flattened array:", flatArr);


























