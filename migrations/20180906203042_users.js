
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users',function (table) {
        table.increments();
        table.string('username').notNullable().unique();  //唯一性验证
        table.string('email').notNullable().unique();
        table.string('password_digest').notNullable();
        table.integer('balance').defaultTo(0);
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
