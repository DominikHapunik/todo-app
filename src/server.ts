import { App } from '../src/app';
import { ToDoRoute } from '../src/routes/todo.route';

const app = new App([new ToDoRoute()]);

app.listen();