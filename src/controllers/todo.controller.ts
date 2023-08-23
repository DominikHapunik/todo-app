import { ToDoService } from "../services/todo.service";
import { NextFunction, Request, Response } from "express";
import { ToDo } from "../interfaces/todo.intereface";

export class ToDoController {
    public todo = new ToDoService();

    public getAllToDo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllToDos: ToDo[] = await this.todo.findAllToDo();

            res.status(200).json({ data: findAllToDos, message: "findAll" })
        } catch (err) {
            next(err)
        }
    }

    public createToDo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const toDoData: ToDo = req.body;
            const createToDoData: ToDo = await this.todo.createToDo(toDoData); 

            res.status(201).json({ data: createToDoData, message: 'created' })
        } catch (err) {
            next(err)
        }
    }

    public updateToDo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const toDoData: ToDo = req.body;
            const toDoId = Number(req.params.id)
            const updatedToDoData: ToDo = await this.todo.updateToDo(toDoId, toDoData)
                
            res.status(200).json({ data: updatedToDoData, message: "updated"})
        } catch (err) {
            next(EvalError)
        }
    }

    public deleteToDo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const toDoId = Number(req.params.id);
            const deleteToDoData: ToDo = await this.todo.deleteToDo(toDoId);

            res.status(200).json({ data: deleteToDoData, message: "deleted"})
        } catch (err) {
            next(err)
        }
    }
}