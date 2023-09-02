import express from 'express';
import { PORT } from '../src/config/index'
import { IRoutes } from './interfaces/routes.interface';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';

export class App {
    public app: express.Application
    public port: string | number;

    constructor(routes: IRoutes[]) {
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
        this.app.use(helmet())
        this.app.use(cookieParser())
    }

    private intializeRoutes(routes: IRoutes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router)
        });
    }
}