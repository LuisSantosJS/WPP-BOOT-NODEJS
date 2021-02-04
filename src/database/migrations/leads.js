
exports.up = async (knex) => {
    // return knex.raw('CREATE EXTENSION pgcrypto').then(() => {
        return knex.schema.createTable('leads', table => {
            table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()')).notNullable();
            table.boolean('is_active').notNullable();
            table.string('email', 255).notNullable();
            table.string('number', 12).notNullable();
            table
                .datetime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .datetime('updated_at')
                .notNullable()
                .defaultTo(knex.fn.now());
        })
    // });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('leads');
}