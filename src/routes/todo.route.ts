import { Router } from "express";
import { IRoutes } from "../interfaces/routes.interface";
import { ToDoController } from "../controllers/todo.controller";
import { ValidationMiddleware } from "../middlewares/validation.middlerware";
import { TodoDto } from "../dto/todo.dto";

export class ToDoRoute implements IRoutes {
    public path = '/todo';
    public router = Router();
    public todoController = new ToDoController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.todoController.getAllTodo)
        this.router.post(`${this.path}/create`, ValidationMiddleware(TodoDto), this.todoController.createTodo)
        this.router.delete(`${this.path}/delete/:id`, this.todoController.deleteTodo)
        this.router.put(`${this.path}/update/:id`, ValidationMiddleware(TodoDto), this.todoController.updateTodo)
    }
}