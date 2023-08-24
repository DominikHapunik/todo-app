import { ToDoService } from "../services/todo.service";
import { NextFunction, Request, Response } from "express";
import { ToDo } from "../interfaces/todo.intereface";
import { isNumber, isString } from "class-validator";

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
            if (!isString(toDoData.todoDescription)) {
                res.status(400).json({ data: null, message: "todo description must be a string!", error: true})
                return;
            } 

            const createToDoData: ToDo = await this.todo.createToDo(toDoData); 

            res.status(201).json({ data: createToDoData, message: 'created' })
        } catch (err) {
            next(err)
        }
    }

    public updateToDo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {   
            
            const toDoData: ToDo = req.body;
            if (!isNumber(toDoData.id)) {
                res.status(400).json({ data: null, message: "todo id must be a number!", error: true})
                return;
            }

            const toDoId = Number(req.params.id)
            const updatedToDoData: ToDo = await this.todo.updateToDo(toDoId, toDoData)
                
            res.status(200).json({ data: updatedToDoData, message: "updated"})
        } catch (err) {
            next(EvalError)
        }
    }

    public deleteToDo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todoId = Number(req.params.id);
            if (!isNumber(todoId)) {
                res.status(400).json({ data: null, message: "todo id must be a number!", error: true})
                return;
            }

            const deleteTodoData: ToDo = await this.todo.deleteToDo(todoId);

            res.status(200).json({ data: deleteTodoData, message: "deleted"})
        } catch (err) {
            next(err)
        }
    }
}