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





