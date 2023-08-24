import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { ToDoController } from "../controllers/todo.controller";

export class ToDoRoute implements Routes {
    public path = '/todo';
    public router = Router();
    public todoController = new ToDoController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.todoController.getAllToDo)
        this.router.post(`${this.path}`, this.todoController.createToDo)
        this.router.delete(`${this.path}/:id`, this.todoController.deleteToDo)
        this.router.put(`${this.path}/:id`, this.todoController.updateToDo)
    }
}