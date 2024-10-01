//sort 
const strArr = ["John", "Arya", "Sheena", "Rahul"];

strArr.sort();

// console.log(strArr);


const numArr = [89, 67, 90, 23, 1111, 9000, 8];

//without comparator sort function sorts the numbers as strings
numArr.sort();

// console.log(numArr);

const objArr = [
	{
		name: "Jyoti", 
		enroll: 32
	},
	{
		name: "Ram", 
		enroll: 40
	},
	{
		name: "Ranu", 
		enroll: 12
	}
]

objArr.sort();

objArr.sort((obj1, obj2) => obj1.enroll - obj2.enroll);
console.log(objArr);

