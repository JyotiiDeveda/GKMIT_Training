// 1. sum of array elements using reduce
const arr = [1, 2, 3, 4, 5, 6];
const arrSum = arr.reduce((sum, i) => sum += i, 5);
console.log(arrSum);

//2. with no initial value, reduce uses the first array element as initial value
const arrSum2 = arr.reduce((sum, i) => sum += i);

console.log(arrSum2);


const mArr = [
	[1, 2, 3], 
	[4, 5, 6],
	[7, 8, 9]
]

//3. converting a 2d array to object using reduce 
const obj = mArr.reduce((acc, [key, val1, val2]) => {
	acc[key] = [val1, val2];
	return acc;
}, {})


//4. sum of elements of a 2d array using foreach
let sum = 0;
mArr.forEach(arr => {
	const tsum = arr.reduce((acc, e) => acc+e);
	sum += tsum;
})


// 5. sum of elements of a 2d array using nested reduce
let sum2 = 0
sum2 = mArr.reduce((acc1, a) => acc1 + a.reduce((acc2, e) => acc2+e), 0);

console.log("Sum of 2d array: ", sum2);

// 6. flattening the multi dimensional array using reduce
const flatArr = mArr.reduce((acc, arr) => {
	acc.push(...arr);
	return acc;
} ,[]);
console.log("Flattened array:", flatArr);