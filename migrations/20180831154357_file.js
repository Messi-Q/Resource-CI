
exports.up = function(knex, Promise) {
    return knex.schema.createTable('file',function (table) {
        table.increments();
        table.integer('userId').unsigned().notNullable();
        table.string('fileTitle').notNullable();  //唯一性验证
        table.string('fileImage').notNullable();
        table.string('fileDescription').notNullable();
        table.string('fileReadPrice').notNullable();
        table.string('fileRightPrice').notNullable();
        table.timestamps();
        table.foreign('userId').references('id').inTable('users');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('file');
};
