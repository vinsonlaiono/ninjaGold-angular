// =========== REQUIRE MODULES ==============
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const flash = require('express-flash')
const port = 5001;

// var session = require('express-session');
var path = require('path');

// =========== Use =================
// app.use(session({
//     secret: 'keyboardkitteh',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
// }))

// app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Points to the angular file to server the index.html
app.use(express.static(__dirname + '/public/dist/public'));

// =========== LISTEN PORT ===========
app.listen(port, function () {
    console.log("You are listening on port 5001")
})
// =========== MONGOOSE CONNECTION ===========
// Here is where you can change the database information
// from the name to the collections 

mongoose.connect('mongodb://localhost/ninjaGold');
var UserSchema = new mongoose.Schema({
    // first_name: { type: Number, required: [true, "First name cannot be empty"], minlength: 1 },
    totalgold: {type: Number, default: 0},
    activities: {type: []}
}, { timestamps: true });

const User = mongoose.model('Users', UserSchema)
mongoose.Promise = global.Promise;

// =========== ROUTES ===========

app.get('/', function (req, res) {
    res.json({ message: "you made it to the root route" })
})
app.get('/users', function (req, res) {
    console.log("this is the server file")
    User.find({}, (err, users) => {
        res.json({ message: "Retrieved all authors", users })
    })
})

app.post('/users', (req, res) => {
    console.log(req.body)
    User.create({totalgold: 0, activities: []}, (err, user) => {
        if(err){
            console.log("Error message", err)
        }else{
            res.json({message: "Successfully create a new author", user})
        }
    })
})

app.get('/farm', (req, res) => {
    let randNum = Math.floor((Math.random() * 4) + 2)
    console.log("Random Number: ",randNum)
    let str = `You earned ${randNum} gold at the Farm`
    console.log(str)

    User.findOne({_id: "5b4cfae6e18ef26ae0babf91"}, (err, user) => {
        user.totalgold += randNum
        user.activities.push(str)
        user.save((err) => {
            if(err){
                console.log(err)
            }else{
                console.log("Success")
                console.log("User: ======", user)
                res.json({message: "Successfully updated usergold:  ", user: user})
            }
        })
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});