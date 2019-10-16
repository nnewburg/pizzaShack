
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table){
      table.increments('id');
      table.string('itemsOrdered');
      table.boolean('currentOrder');
      table.boolean('orderCompleted');
      table.integer('totalCost');
      table.string('Date');
      table.string('Phone')
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users');
    })

  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
