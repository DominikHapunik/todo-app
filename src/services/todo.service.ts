import { ITodo } from "../interfaces/todo.intereface";
import { DatabaseEnum } from "../enums/database.enum";

import { database, databaseTodoTabel } from "../database/db";
import { HttpException } from "../exeptions/http.exception";

export class TodoService {
    public async findAllTodo(): Promise<ITodo[]> {
        const todo: ITodo[] = await databaseTodoTabel().select();

        return todo;
    }

    public async createTodo(todoData: ITodo): Promise<ITodo> {
        const createToDoData: ITodo = await databaseTodoTabel().insert({...todoData});
        return createToDoData;
    }

    public async updateTodo(todoId: number, todoData: ITodo): Promise<ITodo> {
        const todo: ITodo = await databaseTodoTabel().where('id', "=", todoId).first()
        if (!todo) throw new HttpException(409, "Cannot find todo!")
        
        await databaseTodoTabel().update({ ...todoData }).where('id', '=', todoId);

        const updatedTodoData: ITodo = await databaseTodoTabel().where('id', '=', todoId).first()
        return updatedTodoData;
    }

    public async deleteTodo(todoId: number): Promise<ITodo> {
        const todo = await databaseTodoTabel().where('id', "=", todoId).first()
        if (!todo) throw new HttpException(409, "Cannot find todo!")

        await database().delete().where("id", "=", todoId).into(DatabaseEnum.DATABASE_TODO_TABLE_NAME)
        return todo;
    }
} 