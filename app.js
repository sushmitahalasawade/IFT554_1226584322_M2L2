const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// create an instance of express
const app = express();

// we use 'body-parser' middleware to parse the incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
console.log("views", path.join(__dirname, "views"));

// the get route for the home page
app.get("/", (req, res) => {
  // render the form and pass in the current student data
  res.render("index");
});


//create route for users to enter numbers
app.post("/calculate", (req, res) => {
  const { num1, num2 } = req.body;
  const sum = Number(num1) + Number(num2);
  const difference = Number(num1) - Number(num2);
  const product = Number(num1) * Number(num2);
  const quotient = Number(num1) / Number(num2);
  res.render("result", { sum, difference, product, quotient });
});

// Exercise 2. array and objects
const books = [];
// the get route for book page
app.get("/book", (req, res) => {
  res.render("book",{books});
});

app.post("/addBook", (req, res) => {
  const { title, author, publicationYear } = req.body;
  books.push({title,author,publicationYear});
  res.redirect("/book");
});

// Exercise 3. Constructors and DE structuring
function User(name, age, email){
  this.name = name;
  this.age = age;
  this.email=email;
}
const users = [];
app.get("/user", (req, res) => {
  userName="";
  userAge="";
  userEmail="";
  res.render("userInfo",{users});
});
 // route handler
 app.post("/createUser", (req, res) => {
  const { name, age, email } = req.body;
  const user = new User(name,age,email);
  const{ name:userName,age:userAge,email:userEmail} = user;
  users.push({userName,userAge,userEmail});
  //res.render("userInfo",{userName,userAge,userEmail});
  res.redirect("/user")
});

//Exercise 4: Spread Operator
const fruits = [];
// the get route for book page
app.get("/fruit", (req, res) => {
  res.render("fruits",{fruits});
});

app.post("/addFruit", (req, res) => {
  const { fruit } = req.body;
  fruits.push(fruit);
  res.redirect("/fruit");
});

//Exercise 5: Promises
app.get("/async", (req, res) => {
  res.render("async");
});

app.get("/simulateAsync",(req,res)=>{
  setTimeout(() => {
    res.json({message: "Asynchronous operation completed!",success:true});
  }, 2000);

});

// start server on port 4000
var port = 4000;
app.listen(port, () => {
  console.log(`server is runnning on port ${port}`);
});
