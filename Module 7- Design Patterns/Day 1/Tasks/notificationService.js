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

