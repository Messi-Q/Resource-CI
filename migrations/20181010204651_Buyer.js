
exports.up = function (knex, Promise) {
    return knex.schema.createTable('Buyer', function (table) {
        table.increments();
        table.integer('buyerId').unsigned().notNullable();
        table.integer('fileId').unsigned().notNullable();
        table.string('fileTitle').notNullable();  //唯一性验证
        table.string('fileImage').notNullable();
        table.string('fileDescription').notNullable();
        table.string('fileReadPrice').notNullable();
        table.string('fileRightPrice').notNullable();
        table.timestamps();
        table.foreign('buyerId').references('id').inTable('users');
        table.foreign('fileId').references('id').inTable('files');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('Buyer');
};