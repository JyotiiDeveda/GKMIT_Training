// --------- 1 ----------
// ------ Raw code ----------- 

class NotificationService {
    
    sendEmail(email, message) {
        // Sending email logic
        console.log(`Sending email to ${email}: ${message}`);
    }

    sendSMS(phoneNumber, message) {
        // Sending SMS logic
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }

    logNotification(message) {
        // Logging logic
        console.log(`Logging notification: ${message}`);
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.sendEmail(recipient, message);
            this.logNotification(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.sendSMS(recipient, message);
            this.logNotification(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

// Usage
const service = new NotificationService();
service.notify("email", "user@example.com", "Hello via Email!");


// The above code violates Single Responsibility Principle
// The above functionality can be implemented using factory pattern



// ----------- Refactored code ------- 

class Email {

    sendEmail(email, message) {
        //sending email logic
        console.log(`Sendinng email to ${email}: ${message}`);
    }
}


class SMS {
    
    sendSMS(phoneNumber, message) {
        // Sending SMS logic
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }

}

class NotificationService {

    logNotification(message) {
        // Logging logic
        console.log(`Logging notification: ${message}`);
    }

    notify(method, recipient, message) {
        if (method === "email") {
            const email = new Email();
            email.sendEmail(recipient, message);
            this.logNotification(`Email sent to ${recipient}`);
        } 
        else if (method === "sms") {
            const sms = new SMS();
            sms.sendSMS(recipient, message)
            this.logNotification(`SMS sent to ${recipient}`);
        } 
        else {
            throw new Error("Unsupported notification method");
        }
    }
}


// Usage
const service = new NotificationService();
service.notify("email", "user1@example.com", "Hello to use 1!");
service.notify("sms", "user2@example.com", "Morning via SMS!");




// ---------- 2 -------------
// -------- Raw code ------------- 

class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            if (item.type === 'book') {
                total += item.price * 0.9; // 10% discount on books
            } else if (item.type === 'electronics') {
                total += item.price;
            }
        });
        return total;
    }
}

// Usage
const cart = new ShoppingCart();
const items = [{ type: 'book', price: 100 }, { type: 'electronics', price: 200 }];
console.log(cart.calculateTotal(items)); // Output: 290


// The above code violates open closed principle


// Strategy Interface
class PricingStrategy {
    calculatePrice(item) {
        throw new Error('This method should be overridden!');
    }
}

// Concrete Strategies
class BookPricingStrategy extends PricingStrategy {
    calculatePrice(item) {
        return item.price * 0.9; // 10% discount on books
    }
}

class ElectronicsPricingStrategy extends PricingStrategy {
    calculatePrice(item) {
        return item.price; // No discount on electronics
    }
}

// Context
class ShoppingCart {
    constructor() {
        this.strategies = {};
    }

    addStrategy(type, strategy) {
        this.strategies[type] = strategy;
    }

    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            const strategy = this.strategies[item.type];
            if (strategy) {
                total += strategy.calculatePrice(item);
            }
        });
        return total;
    }
}

// Usage
const cart = new ShoppingCart();
cart.addStrategy('book', new BookPricingStrategy());
cart.addStrategy('electronics', new ElectronicsPricingStrategy());

const items = [
    { type: 'book', price: 100 },
    { type: 'electronics', price: 200 }
];

console.log(cart.calculateTotal(items)); // Output: 290




// ----------- 3 --------------- 

// --------- Raw code ----------
class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

// Usage
function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);


// The above code violates liskov substitution principle as an object of square cannot be used in place of object of rectangle
// It can be implemented using 


// -------- Refactored code -----------
class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    
    constructor(side) {
        super(side, side);
    }

    area() {
        return this.width * this.height;
    }

}

// Usage
function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);



// --------- 4 --------------


class UserManager {

    createUser(username) {
        console.log(`User ${username} created.`);
    }

    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }

    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }

    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

// Usage
const userManager = new UserManager();
userManager.createUser("john_doe");
userManager.sendEmail(1, "Welcome!");

// tHe code above violates single responsibility principle

// ------ Refactored code ---------
// User Management Class
class UserManager {
    createUser(username) {
        console.log(`User ${username} created.`);
    }

    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }

    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }
}

// Email Notification Class
class EmailService {
    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

// Usage
const userManager = new UserManager();
const emailService = new EmailService();

userManager.createUser('JohnDoe');
emailService.sendEmail('JohnDoe', 'Welcome to our service!');



// -------- 5 ----------------


class PayPalPayment {

    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }

}

class StripePayment {

    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }

}


class PaymentProcessor {

    constructor() {
        this.paymentMethod = new PayPalPayment(); 
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }

}

// Usage
const processor = new PaymentProcessor();
processor.processPayment(100);

// The above code violates open closed principle as PaymentProcessor class is tied to PayPalPayment and to implement StripePayment 
// it has to be modified which violates the principle


// --------- Refactored code --------------- 
// Payment Strategy Interface
class PaymentMethod {
    pay(amount) {
        throw new Error('This method should be overridden!');
    }
}

// Concrete Strategies
class PayPalPayment extends PaymentMethod {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class StripePayment extends PaymentMethod {
    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }
}

// Payment Processor Class
class PaymentProcessor {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

// Usage
const paypalProcessor = new PaymentProcessor(new PayPalPayment());
paypalProcessor.processPayment(100); // Paid 100 using PayPal.

const stripeProcessor = new PaymentProcessor(new StripePayment());
stripeProcessor.processPayment(150); // Paid 150 using Stripe.































