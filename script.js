const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://localhost/testdb");

async function run() {
    try {
        // Create New User and save to DB
        const user = await User.create({ 
            name: 'Kyle', 
            age: 26,
            email: "Kyle@gmail.com",
            hobbies: ["WeightLifting", "Bowling"],
            address: {
                street: "Main St"
            },
        });


        // Alternative method:
        // const user = new User({ name: "Kyle", age: 26 });
        // await user.save();

        // Change User name
        // user.name = "Sally"; // Change user name
        // await user.save(); // Save to DB

        // Print user to console
        console.log(user);
    } catch (e) {
        console.log(e.message);
    }
}

async function run2() {
    try {
        // const user = await User.findById("686421977afe09dc37666aa6");
        // const user = await User.find({ name: "Kyle" });
        // const user = await User.deleteOne({ name: "Kyle"});
        // const user = await User.deleteMany({ name: "Kyle"});
        const user = await User.findOne({ name: "Kyle" });

        console.log(user);
    } catch (e) {
        console.log(e.message);
    }
}

async function run3() {
    try {
        const user = await User.where("age")
            .gt(12)
            .where("name")
            .equals("Kyle")
            .limit(1);
        user[0].bestFriend = "686426dfb20cd51d8fd8abae";
        await user[0].save();
        console.log(user);
    } catch (e) {
        console.log(e.message);
    }
}

async function run4() {
    try {
        const user = await User
            .where("age")
                .gt(12)
            .where("name")
                .equals("Kyle")
            .populate("bestFriend")
            .limit(1)       // Return 1 records or less

        console.log(user);
    } catch (e) {
        console.log(e.message);
    }
}

async function run5() {
    try {
        const user = await User.findOne({ name: "Kyle" });
        console.log( user );
        user.sayHi(); // Call custom method on user
    } catch (e) {
        console.log(e.message);
    }
}

async function run6() {
    try {
        const user = await User.findByName("Kyle"); // Returns all entries with name: "Kyle" from DB
        console.log( user );
    } catch (e) {
        console.log(e.message);
    }
}

async function run7() {
    try {
        const user = await User.find().byName("Kyle"); // Returns all entries with name: "Kyle" from DB
        console.log( user );
    } catch (e) {
        console.log(e.message);
    }
}

async function run8() {
    try {
        const user = await User.findOne({ name: "Kyle" }); 
        console.log( user );
        console.log( user.namedEmail );
    } catch (e) {
        console.log(e.message);
    }
}

async function run9() {
    try {
        const user = await User.findOne({ name: "Kyle" }); 
        console.log( user );
        await user.save();
        console.log(`User: ${user.name} updated at: ${user.updatedAt}` );
    } catch (e) {
        console.log(e.message);
    }
}

run9();
