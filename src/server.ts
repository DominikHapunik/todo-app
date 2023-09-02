import { App } from '../src/app';
import { ToDoRoute } from '../src/routes/todo.route';
import { UserRoute } from './routes/user.route';

const app = new App([new ToDoRoute(), new UserRoute]);

app.listen();