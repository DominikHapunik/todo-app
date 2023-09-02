import { TodoService } from "../services/todo.service";
import { NextFunction, Request, Response } from "express";
import { ITodo } from "../interfaces/todo.intereface";
import { ApiResponse } from "../types/apiresponse.type";

export class ToDoController {
    public todoService = new TodoService();

    public getAllTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllToDos: ITodo[] = await this.todoService.findAllTodo();
            const jsonResponse: ApiResponse<ITodo[]> = { data: findAllToDos, message: 'getAllTodo' }

            res.status(200).json(jsonResponse);
        } catch (err) {
            const jsonResponse: ApiResponse<null> = { message: 'getAllTodo ' + err, error: true }

            res.status(400).json(jsonResponse);
            next(err);
        }
    }

    public createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todoData: ITodo = req.body;
            const createToDoData: ITodo = await this.todoService.createTodo(todoData);
            const jsonResponse: ApiResponse<ITodo> = { data: createToDoData, message: 'createTodo' };

            res.status(200).json(jsonResponse);
        } catch (err) {
            const jsonResponse: ApiResponse<null> = { message: 'createTodo ' + err, error: true }

            res.status(400).json(jsonResponse);
            next(err);
        }
    }

    public updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todoId: number = Number(req.params.id);
            const todoData: ITodo = req.body;
            const updatedToDoData: ITodo = await this.todoService.updateTodo(todoId, todoData);
            const jsonResponse: ApiResponse<ITodo> = { data: updatedToDoData, message: 'updateTodo' }

            res.status(200).json(jsonResponse);
        } catch (err) {
            const jsonResponse: ApiResponse<null> = { message: 'updateTodo ' + err, error: true }

            res.status(400).json(jsonResponse);
            next(err);
        }
    }

    public deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todoId: number = Number(req.params.id);
            const deleteTodoData: ITodo = await this.todoService.deleteTodo(todoId);
            const jsonResponse: ApiResponse<ITodo> = { data: deleteTodoData, message: 'deleteTodo' }

            res.status(200).json(jsonResponse);
        } catch (err) {
            const jsonResponse: ApiResponse<null> = { message: 'deleteTodo ' + err, error: true }

            res.status(400).json(jsonResponse);
            next(err);
        }
    }
}