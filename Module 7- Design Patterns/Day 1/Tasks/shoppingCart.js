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
