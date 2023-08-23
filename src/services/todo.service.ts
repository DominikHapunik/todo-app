import { ToDo } from "../interfaces/todo.intereface";
import { DatabaseEnum } from "../enums/database.enum";

import { database } from "../database/db";

export class ToDoService {
    public async findAllToDo(): Promise<ToDo[]> {
        const todo: ToDo[] = await database().select().from(DatabaseEnum.DATABASE_TABLE_NAME)
        
        return todo;
    }

    public async createToDo(toDoData: ToDo): Promise<ToDo> {
        if (!toDoData.todoDescription) throw new Error("Todo description is null!")

        const createToDoData: ToDo = await database().insert({...toDoData}).into(DatabaseEnum.DATABASE_TABLE_NAME);
        return createToDoData;
    }

    public async updateToDo(toDoId: number, toDoData: ToDo): Promise<ToDo> {
        if (isNaN(toDoId)) throw new Error("Todo Id is not a number!")
        if (!toDoData.todoDescription) throw new Error("Todo description is null!")

        const todo: ToDo[] = await database().select().from(DatabaseEnum.DATABASE_TABLE_NAME).where('id', '=', toDoId);
        if (!todo) throw new Error("Cannot find todo!")

        await database().update({ ...toDoData }).where('id', '=', toDoId).into(DatabaseEnum.DATABASE_TABLE_NAME);

        const updatedToDoData: ToDo = await database().select().from(DatabaseEnum.DATABASE_TABLE_NAME).where('id', '=', toDoId).first()
        return updatedToDoData;
    }

    public async deleteToDo(toDoId: number): Promise<ToDo> {
        if (isNaN(toDoId)) throw new Error("Todo Id is not a number!")

        const todo = await database().select().from(DatabaseEnum.DATABASE_TABLE_NAME).where('id', "=", toDoId).first()
        if (!todo) throw new Error("Cannot find todo!")

        await database().delete().where("id", "=", toDoId).into(DatabaseEnum.DATABASE_TABLE_NAME)
        return todo;
    }
} 