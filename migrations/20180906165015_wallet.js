
exports.up = function(knex, Promise) {
    return knex.schema.createTable('wallet',function (table) {
        table.increments();
        table.integer('userId').unsigned().notNullable();
        table.string('balance').notNullable();  //唯一性验证
        table.timestamps();
        table.foreign('userId').references('id').inTable('users');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('wallet');
};
