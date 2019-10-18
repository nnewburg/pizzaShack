"use strict";

require('dotenv').config();

const express = require("express");
const app = express();
const ENV         = process.env.ENV || "development";
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const PORT = 8080;
const bcrypt = require('bcrypt');
var path = require('path');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}));

// Seperated Routes for each Order
const orderRoutes = require("./routes/orders");
const itemRoutes = require("./routes/items");
const allOrderRoutes = require("./routes/allOrders")

// Mount all order routes
app.use("/api/orders", orderRoutes(knex));

// Mount all order routes
app.use("/api/items", itemRoutes(knex));

app.use("/api/allOrders", allOrderRoutes(knex));


app.get("/", (req, res) => {
  if(req.session.user.admin == true){
     res.redirect("/admin")
  }

  let templateVars = {user: req.session.user};
  return res.render("index", templateVars);
})

app.get("/login", (req, res) => {
   if(req.session.user.admin == true){
     res.redirect("/admin")
  }

  let templateVars = {user: req.session.user};
  res.render("login", templateVars)
})

app.get("/checkOut", (req, res) => {
   if(req.session.user.admin == true){
     res.redirect("/admin")
   }

  let templateVars = {user: req.session.user};
  res.render("checkOut", templateVars)
})

app.get("/admin", (req, res) => {
  let templateVars = {user: req.session.user}
  res.render("admin", templateVars)
})


app.post("/login", (req, res) => {

  if(req.body.email === "" || req.body.password === "" || req.body.name === "" || req.body.phone === ""){
    return res.status(400).send("<h1>Status Code: 403<h1> Cannot register with an empty email or password</h1>");
  }

  let cryptedPword = bcrypt.hashSync(req.body.password, 10)

  if(req.body.adminPword == "PizzaShack"){
    knex("users").insert({email: req.body.email, password: cryptedPword, name: req.body.name, admin:true}).then(result => {
    knex("users").where({email: req.body.email}).then(result => {
    req.session.user = result[0]
    res.redirect("/admin")
   })
  })
  }
  else{
    knex("users").insert({email: req.body.email, password: cryptedPword, name: req.body.name, phone: req.body.phone}).then(result => {
     knex("users").where({email: req.body.email}).then(result => {
      req.session.user = result[0]
      res.redirect("/")
     })
    })
  }
})

app.post("/logout", (req, res) => {
  knex("orders").where({user_id: req.session.user.id, currentOrder: true}).update({currentOrder: false}).then(result =>{
    req.session.user = ""
    res.redirect("/")
  })
})

app.post("/addItem", (req, res) => {
  console.log("chirp" + req.body.id)
  knex("orders").where({user_id: req.session.user.id, currentOrder: true}).then(result =>{
    if(!result[0]){
      knex("orders").insert({user_id: req.session.user.id, currentOrder: true, orderCompleted: false}).then(result => {
        knex("orders").where({currentOrder:true}).update({itemsOrdered:req.body.id}).then(result => {
          res.redirect("/")
        })
      })
    }
    else {
      knex.select('itemsOrdered').from("orders").where({currentOrder: true}).then(result => {
        if(result[0].itemsOrdered){
          knex("orders").where({currentOrder:true}).update({itemsOrdered:result[0].itemsOrdered + ',' + req.body.id}).then(result => {
            res.redirect("/")
          })
        }
        else{
          knex("orders").where({currentOrder:true}).update({itemsOrdered:req.body.id}).then(result => {
            res.redirect("/")
          })
        }
      })
      }
  })
})

app.post("/decrementItem", (req,res) => {
  let str = req.body.id + ","
    knex("orders").where({user_id: req.session.user.id, currentOrder: true}).then(result =>{
      knex("orders").where({currentOrder:true}).update({itemsOrdered:result[0].itemsOrdered.replace(str, "")}).then(result => {
        res.redirect("/")
      })
    })
})

app.post("/removeItem", (req, res) => {
   knex("orders").where({user_id: req.session.user.id, currentOrder: true}).then(result => {
      let parse = req.body.id.slice(6, req.body.id.length)
      knex("orders").where({user_id: req.session.user.id, currentOrder: true}).then(result => {
        let matrix = result[0].itemsOrdered.split(',')
        let removed = matrix.filter(word => word !== parse)
        removed = removed.join(",")
        knex("orders").where({currentOrder:true}).update({itemsOrdered:removed}).then(result => {
      })
    })
    })
      res.redirect("/")
})

app.post("/confirmOrder", (req, res) => {

  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  knex("orders").where({user_id: req.session.user.id, currentOrder: true}).update({Phone: req.session.user.phone, totalCost: req.body.totCost, currentOrder: false, orderCompleted:true, Date: date }).then(result =>{
    // twilioClient.messages.create({
    //   to: '+1' + req.session.user.phone,
    //   from: '+12563673421',
    //   body: 'Your order from PizzaShack has been placed'
    // }).then(result => {
      res.redirect("/")
    // })
  })
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

