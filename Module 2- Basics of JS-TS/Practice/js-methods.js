arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//using filter - optimal
const arr2 = arr.filter(e => (e%2 === 0))
console.log(arr2);

//using foreach
arr.forEach(e => {
	if(e%2 == 0) console.log(e);
})



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



