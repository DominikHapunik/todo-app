import { Knex } from "knex";
import { DatabaseEnum } from "../../enums/database.enum";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DatabaseEnum.DATABASE_TODO_TABLE_NAME, tabel => {
        tabel.increments('id').primary();
        tabel.integer('userId').notNullable();
        tabel.string('todoDescription').notNullable();
        tabel.timestamp('createdAt').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(DatabaseEnum.DATABASE_TODO_TABLE_NAME);
}

