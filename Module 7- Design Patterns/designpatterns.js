// ------ Singleton pattern --------


// bad code 
class BadSingleton {
	static getInstance(){
		return new BadSingleton()
	}
}
const s1 = BadSingleton.getInstance();
const s2 = BadSingleton.getInstance();
console.log(s1 === s2); // false


// good code
class Singleton {
	static getInstance(){
		if(!this.instance){
			this.instance = new Singleton()
		}
		return this.instance
	}
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true


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



// -------- Observer pattern -----

//Good example
class Subject {

   constructor() {
      this.observers = [];
   }
   subscribe(observer) {
      this.observers.push(observer);
   }
   unsubscribe(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
   }
   notify(data) {
      this.observers.forEach(observer => observer.update(data));
   }
}


class Observer {

   constructor(name) {
      this.name = name;
   }

   update(data) {
      console.log(`${this.name} received data: ${data}`);
   }
}


const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify("Hello from Subject!");


// Bad example

let observers = [];

function subscribe(callback) {
   observers.push(callback);
}

function unsubscribe(callback) {
   observers = observers.filter(cb => cb !== callback);
}

function notify(data) {
   observers.forEach(callback => callback(data));
}
// Usage
subscribe(data => console.log("Observer 1 received:", data));
subscribe(data => console.log("Observer 2 received:", data));
notify("Hello from Subject!");




// -------- Decorator pattern ------------

// Good example

function Coffee() {
   this.cost = 10;
   this.description = "Basic Coffee";
}

Coffee.prototype.getCost = function () {
   return this.cost;
};

Coffee.prototype.getDescription = function () {
   return this.description;
};

function MilkDecorator(coffee) {
   this.coffee = coffee;
   this.cost = 2;
   this.description = " with Milk";
}

MilkDecorator.prototype.getCost = function () {
   return this.coffee.getCost() + this.cost;
};

MilkDecorator.prototype.getDescription = function () {
   return this.coffee.getDescription() + this.description;
};,


// Usage
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
console.log(coffee.getCost()); // 12
console.log(coffee.getDescription()); // Basic Coffee with Milk

// Bad example

function Coffee() {
   this.cost = 10;
   this.description = "Basic Coffee";
}

function addMilk(coffee) {
   coffee.cost += 2;
   coffee.description += " with Milk";
   return coffee;
}
// Usage
let coffee = new Coffee();
coffee = addMilk(coffee);
console.log(coffee.cost); // 12
console.log(coffee.description); // Basic Coffee with Milk



//---------- Proxy Pattern ---------

// Good example
const targetObject = {
   name: "John",
   age: 30,
   greet: function () {
      console.log(`Hello, I'm ${this.name}`);
   }
};


const loggingProxy = new Proxy(targetObject, {
   get(target, prop, receiver) {
      console.log(`Accessing property: ${prop}`);
      return Reflect.get(target, prop, receiver);
   },
   set(target, prop, value, receiver) {
      console.log(`Setting property: ${prop} to ${value}`);
      return Reflect.set(target, prop, value, receiver);
   }
});


loggingProxy.name = "Jane"; // Logs: Setting property: name to Jane
loggingProxy.greet(); // Logs: Accessing property: greet, Hello, I'm Jane



// Bad example
const target = {};
const proxy = new Proxy(target, {
   get(target, prop) {
      if (prop === 'foo') {
         // Complex logic here...
      } else if (prop === 'bar') {
         // More complex logic...
      }
      // ...
   },
   set(target, prop, value) {
      if (prop === 'foo') {
         // Even more complex logic...
      }
      // ...
   }
});




// -------- Command Pattern --------

// Good example

class Light {
   constructor() {
      this.isOn = false;
   }
   on() {
      this.isOn = true;
      console.log('Light is on');
   }
   off() {
      this.isOn = false;
      console.log('Light is off');
   }
}
class LightOnCommand {
   constructor(light) {
      this.light = light;
   }
   execute() {
      this.light.on();
   }
}
class LightOffCommand {
   constructor(light) {
      this.light = light;
   }
   execute() {
      this.light.off();
   }
}
const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);
const remoteControl = {
   executeCommand: function (command) {
      command.execute();
   }
};
remoteControl.executeCommand(lightOnCommand);
remoteControl.executeCommand(lightOffCommand);

// Bad example

function turnLightOn() {
   console.log('Light is on');
}

function turnLightOff() {
   console.log('Light is off');
}
const remoteControl = {
   on: turnLightOn,
   off: turnLightOff
};
remoteControl.on();
remoteControl.off();





