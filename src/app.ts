import express from 'express';
import { PORT } from '../src/config/index'
import { Routes } from './interfaces/routes.interface';

export class App {
    public app: express.Application
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = PORT || 3000;

        this.initializeMiddlewares();
        this.intializeRoutes(routes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Sever is running on port: ' + this.port)
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private intializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router)
        });
    }
}