const { MongoClient } = require("mongodb");

const express = require('express');
const session = require('express-session'); // Added express-session
const port = process.env.PORT || 7020;
const app = express();
var path = require('path');
const mongoURI=process.env.MONGODB_URI;
const client= new MongoClient(mongoURI)
const collection = require("./src/mongodb")
function connectToMongo(callback) {
        client.connect().then((client)=>{
        return callback();
    }).catch(err=>{
        callback(err)
    })
}
module.exports = { connectToMongo };

function getDb(db = process.env.DB_NAME) {
    return client.db(dbName)
}
module.exports = { getDb };


// Use express-session middleware
app.set('view engine', 'ejs');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes'));
app.use(express.urlencoded({ extend: false }))

// Middleware to check login status
app.use((req, res, next) => {
    // Check if user is logged in
    req.session.loggedIn = req.session.loggedIn || false;
    next();
});

app.get("/", (req, res) => {
    res.render("wiki");
});

app.get("/login.ejs", (req, res) => {
    res.render("login");
});
app.get("/socials.ejs", (req, res) => {
      // Check if the user is logged in
      if (req.session.loggedIn) {
        res.render("socials");
    } else {
        res.redirect("/login.ejs");
    }
});
app.get("/wiki", (req, res) => {
    res.render("wiki");
});

app.get("/fesabout.ejs", (req, res) => {
    // Check if the user is logged in
    if (req.session.loggedIn) {
        res.render("fesabout");
    } else {
        // If not logged in, save the original URL to redirect back after login
        req.session.returnTo = "/fesabout.ejs";
        res.redirect("/login.ejs");
    }
});

app.get("/blog.ejs", (req, res) => {
    // Check if the user is logged in
    if (req.session.loggedIn) {
        res.render("blog");
    } else {
        res.redirect("/login.ejs");
    }
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/wiki", async (req, res) => {
    // Check if the user is logged in
    if (req.session.loggedIn) {
        // Handle blog post logic here
        const postData = {
            title: req.body.title,
            content: req.body.content,
            // Add other properties as needed
        };

        // Add your logic to save the blog post data to the database
        // Example: await blogPostCollection.insertOne(postData);

        res.send("Data post submitted successfully!");
    } else {
        res.redirect("/wiki");
    }
});

app.post("/signup.ejs", async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender
    };

    try {
        await collection.create(data);
        // Assuming successful signup, set login status in the session
        req.session.loggedIn = true;
        res.redirect("/wiki");
        console.log('Sign in successful');
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});


app.post("/login.ejs", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check && check.password === req.body.password) {
            // Set login status in the session
            req.session.loggedIn = true;
            res.redirect("/wiki");
            console.log('Sign in successful');
        } else {
            res.send("Invalid Password");
        }
    } catch {
        res.send("Wrong Details");
    }
});


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Successfully running on port:", port);
    }
});
