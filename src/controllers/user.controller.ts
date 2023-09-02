import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { ITodo } from "../interfaces/todo.intereface";
import { checkForTypesError } from "../utils/types.validator.util";
import { UpdateUserDto, CreateUserDto } from "../dto/user.dto";
import { ApiResponse } from "../types/apiresponse.type";

export class UserController {
    private userService = new UserService()

    public getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users: IUser[] = await this.userService.getAllUsers();
            const jsonResponse: ApiResponse<IUser[]> = { data: users, message: 'getAllUsers'}

            res.status(200).json(jsonResponse)
        } catch(err) {
            const jsonResponse: ApiResponse<null> = { message: 'getAllUsers ' + err, error: true}

            res.status(400).json(jsonResponse)
            next(err)
        }
    }

    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: IUser = req.body
            const createUserData: IUser = await this.userService.createUser(userData)
            const jsonResponse: ApiResponse<IUser> = { data: createUserData, message: 'createUser' }

            res.status(200).json(jsonResponse)
        } catch(err){
            const jsonResponse: ApiResponse<null> = { message: 'createUser ' + err, error: true }

            res.status(400).json(jsonResponse)
            next(err)
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId: number = Number(req.params.id);
            const deleteUserData: IUser = await this.userService.deleteUser(userId)
            const jsonResponse: ApiResponse<IUser> = { data: deleteUserData, message: 'deleteUser' }

            res.status(200).json(jsonResponse)
        } catch(err) {
            const jsonResponse: ApiResponse<null> = { message: 'deleteUser ' + err, error: true }

            res.status(400).json(jsonResponse)
            next(err)
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId: number = Number(req.params.id);
            const userData: IUser = req.body;
            const updateUser: IUser = await this.userService.updateUser(userId, userData)
            const jsonResponse: ApiResponse<IUser> = { data: updateUser, message: 'updateUser' }

            res.status(200).json(jsonResponse)
        } catch(err) {
            const jsonResponse: ApiResponse<null> = { message: 'updateUser ' + err, error: true }

            res.status(400).json(jsonResponse)
            next(err)
        }
    }

    public getUserTodoList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId: number = Number(req.params.id)
            const userTodoList: ITodo[] = await this.userService.getUserTodoList(userId);
            const jsonResponse: ApiResponse<ITodo[]> = { data: userTodoList, message: 'updateUser' }

            res.status(200).json(jsonResponse)
        } catch(err) {
            const jsonResponse: ApiResponse<null> = { message: 'getUserTodoList ' + err, error: true }

            res.status(400).json(jsonResponse)
            next(err)
        }
    }
}