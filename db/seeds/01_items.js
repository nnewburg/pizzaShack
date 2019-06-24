exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({description: 'Pepperoni Pizza'}),
        knex('items').insert({description: 'Wings'}),
        knex('items').insert({description: 'Vegetarian Pizza'}),
      ]);
    });
}