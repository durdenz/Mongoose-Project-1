// User schema

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
});


const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 === 0, // Custom Validator uses Arrow function to validate value (false == invalid),
            message: props => `${props.value} is not an even number`,
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    createdAt: { 
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: { 
        type: Date,
        default: () => Date.now(),
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    hobbies: [String],
    address: addressSchema,
});

// Schema Methods

// Custom Method Example 1
userSchema.methods.sayHi = function() {
    console.log(`Hi. My name is ${this.name}`);
}

// Custom Method Example 2 - statics methods are accessible via an object in the DB
userSchema.statics.findByName = function(name) {
    return this.where({ name: new RegExp(name, 'i')}); // Returns all users with matching name
}

// Custom Method Example 3 - Custom query methods are only accessible thru find() or where() query methods 
userSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i')}); // Returns all users with matching name
}

// Custom Method Example 4 - Virtual Methods
userSchema.virtual('namedEmail').get(function () {
    return `${this.name} <${this.email}>`;
})

// Schema Middleware - 

// Function to run before completing save operation
// Updates the updatedAt field to current date/time
// then calls next function in the chain
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
})

// Function to run after completing save operation
// doc is the object that was just saved
userSchema.post('save', function (doc, next) {
    doc.sayHi();
    next();
})

module.exports = mongoose.model("User", userSchema);

