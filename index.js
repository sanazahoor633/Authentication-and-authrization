const express = require("express");
const app = express();
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// fs.writeFile(path.join(__dirname,  'views', 'index.ejs'), 'this is ejs file', ()=>{})
///middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      console.log(createdUser);
      
      // let token = jwt.sign({email}, 'secret')
      // res.cookie('token', token)

      let token = jwt.sign({ email }, "secret");
      res.cookie("token", token);

      res.send(createdUser);
      // })
    });
  });
});





app.get('/logout', (req, res)=> {
    res.cookie('token', '');
    res.redirect('/')
})

app.get('/login', (req, res) => {
res.render('login')

})
app.post('/login', async (req, res) => {
let user = await userModel.findOne({email: req.body.email})
// console.log(user.password, req.body.password)
bcrypt.compare(req.body.password, user.password, (err, result)=>{
    
if(result) {
     let token = jwt.sign({email: user.email }, "secret");
      res.cookie("token", token);
    return res.send('yes you can login')
}
else console.log('something is wrong');

})
// if(!user) return res.send('something went wrong')
    // else {}
})




const PORT = process.env.PORT || 2020;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
