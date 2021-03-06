"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.get("/", (req, res) => {
    if(req.session.user){
    knex('orders')
      .where({user_id: req.session.user.id, currentOrder: true})
      .then((results) => {
        res.json(results);
    });
    }
  });


  router.post("/addItem", (req, res) => {
    if(req.session.user){
    knex('orders')
      .where({user_id: req.session.user.id, currentOrder: true})
      .then((results) => {
        res.json(results);
    });
    }
  });




  return router;
}