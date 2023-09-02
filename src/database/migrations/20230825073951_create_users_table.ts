import { Knex } from "knex";
import { DatabaseEnum } from "../../enums/database.enum";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DatabaseEnum.DATABASE_USER_TABLE_NAME, tabel => {
        tabel.increments('id').primary()
        tabel.string('userName', 16).notNullable()
        tabel.string('password', 255).notNullable()
        tabel.timestamp('createdAt').defaultTo(knex.fn.now())
        tabel.timestamp('lastLogin')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(DatabaseEnum.DATABASE_USER_TABLE_NAME)
}

