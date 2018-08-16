
exports.up = function(knex, Promise) {
    return knex.schema.createTable('files',function (table) {
        table.increments();
        table.string('fileTitle').notNullable();  //唯一性验证
        table.string('fileImage').notNullable();
        table.string('fileDescription').notNullable();
        table.string('fileReadPrice').notNullable();
        table.string('fileRightPrice').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('files');
};
;
