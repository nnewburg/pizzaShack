"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.get("/", (req, res) => {
    if(req.session.user){
    knex('items').where({size: null})
      .then((results) => {
        res.json(results);
    });
    }
  });

  return router;
}